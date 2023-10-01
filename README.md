## Setting up the application

### Import Database
1. Set up MariaDB Server
2. Import the `/flask/dbImport.sql` file using HeidiSQL or MySQL Workbench
3. Change the MariaDB configuration in `/flask/app.py` under MariaDB Configuration

### Back End Server

1. Start a new terminal
2. Change working directory to `/yeg/flask/`
3. Install python dependencies with pip
   ```
   PyJWT
   mariadb
   flask-cors
   flask
   fuzzywuzzy
   spacy
   scikit-learn
   python-Levenshtein
   ```
4. Additionally run `python -m spacy download en_core_web_sm`
5. Run `flask run --host 0.0.0.0 --port 80`

### Front End Server

1. Start a new terminal
2. Ensure you have node version >= 18.17.1
3. Under the root directory, install project dependencies by runnning any of the following command
```bash
npm install
# or
yarn
```
4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:7777](http://localhost:7777) with your browser to visit the website.

You can create an account to start exploring the rich variety of features YEG has to offer.

## Flask Endpoints

### /login - Allow valid HR user to login

- Request method - POST
- Request body in JSON format
    - username - Required field, employee username
    - password - Required field, employee password
- On success
    - Return { "success": true, "message", Json Web Token }
- On failure
    - Return { "success": false, "message", Error message }
    - Error 1 - Username/password wrong
    - Error 2 - JWT generation unsuccessful
    - Error 3 - Database error
    - Error 4 - Internal server error

### /signUp - Allow HR to create a user account

- Request method - POST
- Request body in JSON format
    - username - Required field, employee username
    - password - Required field, employee password
- On success
    - Return { "success": true, "message", null }
- On failure
    - Return { "success": false, "message", Error message }
    - Error 1 - Username already exists
    - Error 2 - Database error
    - Error 3 - Internal server error

### /job - Get job listing by ID

- Request method - GET
- Authorization - JWT in http headers
- Request params
    - id - A valid employee ID
- On success
    - Return { "success": true, "data": {
        id: id, name: name, link: link,
        description: description, type: type, closing: closing
        }
    }
- On failure
    - Return { "success": false, "message", Error message }
    - Error 1 - Bad request parameters
    - Error 2 - Database error
    - Error 3 - Internal server error

### /listJobs - Show Jobs based on search parameters

- Request method - GET
- Authorization - JWT in http headers
- Request params
    - category - A job category to search or empty string (Required)
    - search - A search keyword or empty string (Required)
    - sorted - "ASC" or "DESC" or empty string (Required)
- On success
    - Return { "success": true, "length": data length, "data": [
        {
            id: id, name: name, link: link,
            description: description, type: type, closing: closing
        },
    ]}
- On failure
    - Return { "success": false, "message", Error message }
    - Error 1 - Bad request parameters
    - Error 2 - Database error
    - Error 3 - Internal server error

### /match - Match candidates based on job description

- Request method - GET
- Authorization - JWT in http headers

## Database Schema

### candidate

- candidate id (PK auto increment)
- name VARCHAR 100
- gendar CHAR 1
- age SMALLINT 6
- education VARCHAR 50
- skillset VARCHAR 1000

### hr_users

- hr_uname VARCHAR 50 (PK)
- password VARCHAR 100

### jobs

- jobid (PK auto increment)
- jobname VARCHAR 200
- joblink VARCHAR 150
- jobcat VARCHAR 100
- closing TIMESTAMP
- jobdesc VARCHAR 2000

## Here are some snapshots of our application

### Login Page
<img width="1652" alt="Screenshot 2023-10-01 at 6 49 15 PM" src="https://github.com/Emrysil/yeg/assets/107340960/3a6f32d0-7534-4f11-b29d-ca18ac66c661">

### Jobs
<img width="1659" alt="Screenshot 2023-10-01 at 6 49 28 PM" src="https://github.com/Emrysil/yeg/assets/107340960/c61238e3-0290-4688-b652-002d38920e35">
<img width="1653" alt="Screenshot 2023-10-01 at 6 49 59 PM" src="https://github.com/Emrysil/yeg/assets/107340960/ca57a6c6-09ae-4769-8716-d55c384d9172">

### Suitable Candidates
<img width="1653" alt="Screenshot 2023-10-01 at 6 49 39 PM" src="https://github.com/Emrysil/yeg/assets/107340960/09895b0a-992b-43af-8b5f-794c4dc52242">
