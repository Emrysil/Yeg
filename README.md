This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install project dependencies
```bash
npm install
# or
yarn
```
Then, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

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

### /listJobs - Show Jobs based on search parameters

- Request method - POST
- Request body in JSON format
    - authorization - JSON Web Token
- Request params
    - category - A job category to search or empty string (Required)
    - search - A search keyword or empty string (Required)
    - sorted - "ASC" or "DESC" or empty string (Required)
- On success
    - Return { "success": true, "length", data length, "data", [
        [index, name, url, category, closing, description],
    ]}
- On failure
    - Return { "success": false, "message", Error message }
    - Error 1 - Bad request parameters
    - Error 2 - Database error
    - Error 3 - Internal server error

### /match - Match candidates based on job description

- Request method - GET


## Database Schema

### candidate

- candidate id (PK auto increment)
- name VARCHAR 100
- gendar CHAR 1
- birthyear SMALLINT 6
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
