# Import Modules
import flask
from flask import request
from flask_cors import CORS
from datetime import datetime, timedelta
import mariadb
import json
import jwt

# MariaDB Configuration
config = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'root',
    'password': 'yeg',
    'database': 'psa_db'
}

# Define App
app = flask.Flask(__name__)
CORS(app)
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)

# Helper Functions


def generate_jwt(username):
    try:
        secret = "s3cur3p@$$w0rd"
        token = jwt.encode(
            payload={
                "username": username,
                "iat": datetime.timestamp(datetime.now()),
                "expires": datetime.timestamp(datetime.now() + timedelta(hours=6)),
            },
            key=secret,
            algorithm="HS256"
        )
        return {"success": True, "token": token}
    except:
        return {"success": False, "message": "Unable to generate token!"}


def validate_token(token):
    secret = "s3cur3p@$$w0rd"
    try:
        payload = jwt.decode(
            jwt=token,
            key=secret,
            algorithms=["HS256"]
        )
        expiry = datetime.fromtimestamp(payload["expires"])
        if expiry > datetime.now():
            return {"success": True, "message": None}
        else:
            return {"success": False, "message": "Invalid Token!"}
    except:
        return {"success": False, "message": "Decode failed!"}

# Routes


@app.route('/login', methods=['POST'])
def index():
    data = request.get_json()
    hr_uname = data["username"]
    password = data["password"]
    try:
        conn = mariadb.connect(**config)
        cur = conn.cursor()
        cur.execute(
            f"select * from hr_users where hr_uname=? and password =?",
            (hr_uname, password)
        )
        if len(cur.fetchall()) != 1:
            return json.dumps({"success": False, "message": "Incorrect Username or Password!"})
        conn.close()
        jwt_response = generate_jwt(hr_uname)
        if not jwt_response["success"]:
            return json.dumps({"success": False, "message": "Failed to generate token!"})
        return json.dumps({"success": True, "message": jwt_response["token"]})
    except mariadb.DatabaseError:
        return json.dumps({"success": False, "message": "Error in database operation!"})
    except Exception as Error:
        print(f"Error: {Error}")
        return json.dumps({"success": False, "message": "Internal Server Error!"}), 500


@app.route('/signUp', methods=['POST'])
def sign_up():
    data = request.get_json()
    hr_uname = data["username"]
    password = data["password"]
    try:
        conn = mariadb.connect(**config)
        cur = conn.cursor()
        cur.execute(f"select * from hr_users where hr_uname=?", [hr_uname])
        if len(cur.fetchall()) > 0:
            return json.dumps({"success": False, "message": "Username already exists!"})
        cur.execute(
            f"insert into hr_users (hr_uname, password) VALUES (?, ?)", (hr_uname, password))
        conn.commit()
        conn.close()
        return json.dumps({"success": True, "message": None})
    except mariadb.DatabaseError:
        return json.dumps({"success": False, "message": "User creation failed!"})
    except Exception as Error:
        print(f"Error: {Error}")
        return json.dumps({"success": False, "message": "Internal Server Error!"}), 500


@app.route('/listJobs', methods=['GET'])
def list_jobs():
    # Parse parameters
    try:
        req_body = request.get_json()
        req_param = (request.args).to_dict()
        token = req_body["authorization"]
        category = req_param["category"]
        search = req_param["search"]
        sorted = req_param["sorted"]
    except Exception as Error:
        print(f"Error: {Error}")
        return json.dumps({"success": False, "message": "Bad Request Parameters!"}), 500
    # Parse token
    validation = validate_token(token)
    if not validation["success"]:
        return json.dumps(validation), 401
    try:
        conn = mariadb.connect(**config)
        cur = conn.cursor()
        # Use sort filter
        if sorted == "ASC":
            sort_string = " ORDER BY closing ASC"
        elif sorted == "DESC":
            sort_string = " ORDER BY closing DESC"
        else:
            sort_string = ""
        # Use category filter
        if category != "":
            cur.execute(f"SELECT * FROM jobs WHERE jobcat=?{sort_string}", [req_param["category"]])
        else:
            cur.execute(f"SELECT * FROM jobs{sort_string}")
        data = []
        for entry in cur.fetchall():
            if not search in entry[1]:
                continue
            data.append([
                entry[0],
                entry[1],
                entry[2],
                entry[3],
                entry[4].strftime("%m/%d/%Y"),
                entry[5]
            ])
        conn.close()
        return json.dumps({"success": True, "length": len(data), "data": data})
    except mariadb.DatabaseError:
        return json.dumps({"success": False, "message": "Error in database operation!"})
    except Exception as Error:
        print(f"Error: {Error}")
        return json.dumps({"success": False, "message": "Internal Server Error!"}), 500


@app.route('/match', methods=['GET'])
def match_candidates():
    return "to be implemented"
