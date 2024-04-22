# SQL Query Hasher App

## Description

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It provides a web interface for hashing SQL query column names. It features a SQLite database to store and manage the hashed column names, an API for hashing queries, and a front-end for user interactions. The application allows users to input SQL queries, returns queries with hashed column names, and provides the ability to view and delete entries in the database.

**A weekend project** and a proof-of-concept for something I've been working for a while. 
Full blog about it will follow soon!

## Getting Started

### Prerequisites

- Node.js (minimum v18 for compatibility with latet Next.js)
- Docker and Docker Compose (for deployment)

### Cloning the Repository

To clone the project and get started, run the following commands:

```bash
git clone https://github.com/ahmad-alkadri/sql-hasher-app.git
cd sql-hasher-app
```

### Installation and Dev Mode

To install all necessary Node.js packages, simply run:

```bash
npm install
```

To initialize the SQLite database that'll hold the column name x hashed column
name, run the following:

```bash
node initializeDb.js
```

If it goes well, it'll output the following on terminal:

```bash
Connected to the hashmap SQLite database.
Table created
Close the database connection.
sql-hasher-app $ 
```

And finally, to run the application in Development mode:

```bash
npm run dev
```

This will start the Next.js development server, by default accessible
at http://localhost:3000.

## Development

### Making Code Changes

Just like typical Next.js app, the structure of the application is as follows:

- `pages/api`: Contains the API endpoints, including hashing logic and database interactions
- `pages/index.js`: The main front-end component of the application.
- Additional utility scripts and components as needed.

### Running Tests

This project uses `Jest` for unit testing. To run the tests:

```bash
npm test
```

The tests cover:

+ API endpoints functionality (hashing and database interactions).
+ `hashAllColumnRefObjects` function correctness.

More test cases will follow. You're also free to contribute to more test cases.

## Deployment

Currently there's only one mode of deployment, that is, using Docker Compose
for local deployment.

### Deploying with Docker Compose

1. Build the Docker image:

```bash
docker-compose build
# For new build without cache at all: 
# `docker-compose build --no-cache`
```

2. Start the application:

```bash
docker-compose up -d # In detached mode
```

The two commands above will build the Docker image, run tests, and if successful, start the application. The app will be accessible at http://localhost:3000 or the respective host's IP address.

3. Stop the application:

```bash
docker-compose down
```

4. Remove docker containers completely (optional):

```bash
docker-compose down --rmi all -v
```

