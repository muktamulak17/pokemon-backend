# Node.js + TypeScript + Express

This repository contains a **Node.js** application built with **TypeScript** and **Express**. Below you'll find instructions for setting up, running, and understanding the project's architecture.

---

## **Project Setup**

### 1. **Clone the Repository**
```bash
git clone <repository_url>
cd <project_directory>
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Environment Configuration**
Create a `.env` file in the root directory with the following variables:
```bash
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your secret>
```

### 4. **Run the Application Locally**

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm install && npm run build
npm start
```

---

## **Project Structure**
```plaintext
src/
    ├── config/         # Database and configuration files
    ├── controllers/    # Express route controllers
    ├── models/         # Mongoose models
    ├── routes/         # Application routes
    ├── middlewares/    # Custom middlewares
    └── index.ts        # Entry point

dist/                  # Compiled TypeScript files
.env                   # Environment variables
package.json
```

---

## **Key Features & Approaches**

- **Modular Architecture**: Follows a clean folder structure for scalability.
- **TypeScript**: Static typing for improved code quality.
- **Express**: Fast and minimalist web framework.
- **Mongoose**: ODM for MongoDB.
- **Environment Management**: Configuration using `.env`.
- **Security**: Basic security with **jwt**.

---

## **API Endpoints**

### 1. **User Routes**
- `POST /auth/register` – Register a new user.
- `POST /auth//login` – Authenticate a user.

### 2. **Pokemon Routes** *(Example)*
- `GET /pokemon/list` – Fetch all Pokemon.
- `GET /pokemon/:name` – Fetch a specific Pokemon details.

### 3. **User's Favorites Routes** *(Example)*
- `GET /favorites/list` – Fetch favorites of the user.
- `GET /favorites/update` – Add/Remove user's favorites.

---

## 🧪 **Testing the API**

Use tools like **Postman** or **cURL** to test the endpoints.

---

## **Troubleshooting Common Issues**

1. **MongoDB Connection Error:**
   - Ensure your **MongoDB URI** is correctly set in `.env`.
   - Whitelist IP addresses in **MongoDB Atlas**.

2. **Port Already in Use:**
   - Check if another process is using the port.
   - Change `PORT` in `.env` if needed.

---

## **Deployment Guidelines** *(Render)*

- Ensure environment variables are set on the deployment platform.
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

**Render Specific:**
- Add MongoDB **Atlas IP Whitelisting** for Render.

---

