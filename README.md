# Post-Quantum App

This App is based on Post-Quantum cryptographic algorithms.

## System Requirements

- Node version 16.17.0

- NPM version 8.15.0

- MongoDb version 5.0.15

## Installation

To run the Application on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   $ git clone https://github.com/ankkyprasad/Post-Quantum-App.git
   ```

2. Install the necessary dependencies:

   ```bash
   $ npm install
   ```

3. Create a file ".env" and set the MONGO_URL variable:

   ```bash
   $  echo "MONGO_URL=<mongodb-url-here>" >> .env
   ```

4. Start the mongodb instance locally:

   ```bash
   $  sudo mongod --dbpath ~/data/db
   ```

5. Start the server:

   ```
   $ npm start
   ```

6. Go to [Localhost](http://localhost:3000) to access the application.

   <br />

## API Details

<br/>

### **User Login**

**Endpoint: `POST - /api/v1/users/login`**

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

<br/>

### **User Registration**

**Endpoint: `POST - /api/v1/users/register`**

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

<br/>

### **Dashboard**

**Endpoint: `GET - /api/v1/dashboard`**

**Request Body:**

```json
{
  "signature": "string"
}
```
