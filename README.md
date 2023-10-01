## Fire up the frontend server

First, ensure you have node version >= 18.17.1

Then, under the root directory, install project dependencies by runnning any of the following command
```bash
npm install
# or
yarn
```
Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:7777](http://localhost:7777) with your browser to see the result.


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
- password VARCHAR 50

### jobs

- jobid (PK auto increment)
- jobname VARCHAR 200
- joblink VARCHAR 150
- jobcat VARCHAR 100
- closing TIMESTAMP
- jobdesc VARCHAR 2000
