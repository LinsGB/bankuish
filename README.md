# Tec-Test

> In the project, NestJS, Prisma, Postgres, Docker, and Firebase were used.

### What I accomplished and what I intended to do if I had more time.

The project was completed within the time I had available.

- [x] Solve the target problem of the techinical test.
- [x] Criate a good documentation
- [x] Create docker file
- [ ] Handle more errors.
- [ ] Put 100% of coverage on the project
- [ ] Create E2E without using diferent DB.

## 💻 Prerequisites

Before starting, ensure you meet the following requirements:

- You have installed `<docker>`.
- The project was developed on a Linux machine, so it’s best to run it on `<Linux>`.

#### Copy .env.example
Copy the .env.example and create a .env file

#### Download Firebase File
In the Firebase project settings, navigate to **Service Accounts**. The URL should look like:  
`https://console.firebase.google.com/project/{YOUR_PROJECT}/settings/serviceaccounts/adminsdk`  

Click on **Generate new private key**, save the JSON file to the root folder of the project, and rename it to `firebase-file.json`.

#### Get Firebase API Key
Again, in the Firebase project settings, navigate to **General** and retrieve your API Key. Add this API Key to your `.env` file.

---

## 🚀 Running the Project

To run the `micro-service-node`, follow these steps:

### Linux

```bash
docker-compose up --build
RUN THE MIGRATIONS: npm run migration
ACCESS the swagger at http://localhost:3000/api
```

---
## Explanation
The aplication has a endpoint for create a account on firbase and other to login, you should use then to get your token and use on the other requests

## ☕ Helper

#### Access PG Admin:
```bash
Access PG Admin: http://localhost:5050

Login with the following credentials:
    Email: admin@admin.com
    Password: pgadmin4

To add a new 'server': Click the 'Add New Server' button.
In the 'Connection' tab, update the settings:
    'Host name/address': db
    'Username': postgres
    'Password': postgres
Save the settings.
```

#### Run Migrations:
```bash
Update your `.env` file so the `DATABASE_URL` variable has the value:
    "postgresql://postgres:postgres@localhost:5433/postgres"

Run the following command:
    npm run migration
```

### Access Swagger:
```bash
Access the URL: http://localhost:3000/api
```

### Access PG Admin:
```bash
Access the URL: http://localhost:5050
    Email: admin@admin.com
    Password: pgadmin4
```