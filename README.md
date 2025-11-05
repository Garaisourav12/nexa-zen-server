# 🔗 CRM Service API - ExpressJS

A secure, scalable CRM Service API built using **ExpressJS**, supporting user authentication, custom short codes, expiration, and detailed Swagger documentation.

---

## 📄 Live Documentation

- **Swagger UI:** [https://crm-server-q5ga.onrender.com/api-docs](https://crm-server-q5ga.onrender.com/api-docs)

---

## 🚀 Features

- ✅ **User Authentication** – Register, Login, and Logout APIs with JWT stored securely in cookies  
- 🔒 **Protected Routes** – Access control using `verifyToken` middleware  
- 🧠 **Enquiry Management** – Create, claim, and fetch unclaimed or user-claimed enquiries  
- 🧾 **Input Validation** – DTO-based validation using `class-validator`  
- 📚 **Swagger Integration** – Auto-generated API documentation for every route  
- 🧩 **Clean Architecture** – Organized controllers, services, DTOs, and middleware  
- 💾 **MongoDB + Mongoose** – Reliable NoSQL database layer  
- ⚙️ **Global Error Handling** – Centralized and structured error responses

---

## 🛠️ Tech Stack

- **Backend:** [ExpressJS](https://expressjs.com/) (TypeScript)  
- **Database:** MongoDB (via Mongoose)  
- **Authentication:** JWT (stored in `HttpOnly` cookie)  
- **Validation:** class-validator, class-transformer  
- **Documentation:** Swagger (`swagger-ui-express`, `swagger-jsdoc`)  
- **Utilities:** bcryptjs, dotenv, cookie-parser  
- **Dev Tools:** VS Code, Yarn, Postman, Swagger UI

---

## 📦 Installation & Run (Local)

### 1. Clone & Setup

```bash
git clone https://github.com/Garaisourav12/crm-server.git
cd 
cp .env
```

Fill in your Mongo URI, JWT secret, and environment variables.

### 2. Install dependencies

Using **Yarn**:

```bash
yarn install
```

### 3. Run the app

#### With Yarn:

```bash
# Development
yarn dev

# Build
yarn build

# Production
yarn start
```

- API base: `http://localhost:8080`
- Swagger docs: `http://localhost:8080/api-docs`

---

## 🧪 Swagger API Docs

> View and test APIs interactively via Swagger UI.

### 🔐 Auth Endpoints

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| POST   | `/api/auth/register`    | Register new user          |
| POST   | `/api/auth/login`       | Login & receive JWT cookie |
| GET    | `/api/auth/logout`      | Logout (clear cookie)      |

### 🔗 Enquiry Endpoints

| Method | Endpoint                         | Description                                                 |
| ------ | -------------------------------- | ----------------------------------------------------------- |
| POST   | `/api/enquiry`                   | Submit a public enquiry                                     |
| PATCH  | `/api/enquiry/:id/claim`         | Claim an unassigned enquiry (**Private**)                   |
| GET    | `/api/enquiry/getAllUnclaimed`   | Fetch all unclaimed enquiries (**Private**)                 |
| GET    | `/api/enquiry/getMyAllClaimed`   | Fetch enquiries claimed by the logged-in user (**Private**) |

### ✅ Misc

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/`             | Entry route        |

---

## 🔐 Authentication

- JWT stored in `HttpOnly` cookie (`accessToken`)
- Swagger supports Authorization via `@ApiBearerAuth()`
- Alternatively, you can send JWT in the `Authorization: Bearer <token>` header

<!-- ---

## 📽️ Video Explanation

🎥 [Watch Project Overview on Loom / Google Drive](https://drive.google.com/your-demo-link)

--- -->

---

## 👤 Author

**Sourav Garai**
🔗 [GitHub](https://github.com/Garaisourav12) | ✉️ [garaisourav12@gmail.com](mailto:garaisourav12@gmail.com)

---

## 📄 License

This project is **not open-source** and is **unlicensed**.

All rights are reserved © 2025 by **Sourav Garai**.  
You may not use, copy, modify, or distribute this software without prior written permission from the author.

For inquiries, please contact [**Sourav Garai**](https://www.linkedin.com/in/sourav-garai-9a4891199)
