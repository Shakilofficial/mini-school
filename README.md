# Mini School Management API

A **robust and scalable API** for managing school operations, built with **Express.js**, **TypeScript**, and **PostgreSQL** using **Prisma ORM**. This API enables efficient management of **users, students, and classes** with **JWT-based authentication** and **role-based authorization**.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Database Setup](#database-setup)
* [Running the Application](#running-the-application)
* [Docker Setup](#docker-setup)
* [API Endpoints](#api-endpoints)

  * [Authentication](#authentication-endpoints)
  * [User Management](#user-endpoints)
  * [Student Management](#student-endpoints)
  * [Class Management](#class-endpoints)
* [Project Structure](#project-structure)
* [Authentication & Authorization](#authentication-and-authorization)
* [Contributing](#contributing)
* [License](#license)

---

## Features

### **Authentication & Authorization**

* JWT-based authentication with **access** and **refresh tokens**
* Role-based access control: **Admin**, **Teacher**, **Student**
* Login, logout, and refresh token support

### **User Management**

* Create and manage users
* Role-based restrictions
* View own profile

### **Student Management**

* Create, update, view, and delete students
* Assign students to classes

### **Class Management**

* Create and manage classes
* Enroll students into classes
* Retrieve students in a class
* Filtering and searching for classes

---

## Tech Stack

* **Backend**: Node.js, Express.js, TypeScript
* **Database**: PostgreSQL
* **ORM**: Prisma
* **Authentication**: JWT (JSON Web Tokens)
* **Validation**: Zod
* **Containerization**: Docker & Docker Compose

---

## Prerequisites

* Node.js (v18+)
* Yarn package manager
* PostgreSQL
* Docker & Docker Compose (optional)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Shakilofficial/mini-school.git
cd mini-school
```

2. Install dependencies:

```bash
yarn install
```

3. Set up the `.env` file (see below)

---

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://postgres:123456@localhost:5432/miniSchoolDB?schema=public"

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Admin credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# Bcrypt
BCRYPT_SALT_ROUNDS=8
```

---

## Database Setup

1. Create PostgreSQL database:

```sql
CREATE DATABASE miniSchoolDB;
```

2. Run Prisma migrations:

```bash
npx prisma migrate dev
```

---

## Running the Application

Start the development server:

```bash
yarn dev
```

API will run at: `http://localhost:5000`

---

## Docker Setup (Optional)

1. Build and start containers:

```bash
docker-compose up -d
```

2. API available at: `http://localhost:5000`

---

## API Endpoints

### Authentication Endpoints

| Method | Endpoint                | Role | Description          |
| ------ | ----------------------- | ---- | -------------------- |
| POST   | /api/auth/login         | All  | Login user           |
| POST   | /api/auth/refresh-token | All  | Refresh access token |
| POST   | /api/auth/logout        | All  | Logout user          |

---

### User Endpoints

| Method | Endpoint     | Role                  | Description                   |
| ------ | ------------ | --------------------- | ----------------------------- |
| GET    | /api/user    | Admin                 | Get all users                 |
| GET    | /api/user/me | Admin/Teacher/Student | Get profile of logged-in user |
| POST   | /api/user    | Admin                 | Create a new user             |

---

### Student Endpoints

| Method | Endpoint          | Role          | Description         |
| ------ | ----------------- | ------------- | ------------------- |
| POST   | /api/student      | Admin         | Create a student    |
| GET    | /api/student      | Admin/Teacher | Get all students    |
| GET    | /api/student/\:id | Admin/Teacher | Get student by ID   |
| PATCH  | /api/student/\:id | Admin         | Update student info |
| DELETE | /api/student/\:id | Admin         | Delete student      |

---

### Class Endpoints

| Method | Endpoint               | Role          | Description                 |
| ------ | ---------------------- | ------------- | --------------------------- |
| POST   | /api/class             | Admin         | Create a new class          |
| GET    | /api/class             | Admin/Teacher | Get all classes             |
| GET    | /api/class/\:id        | Admin/Teacher | Get class by ID             |
| PATCH  | /api/class/\:id        | Admin         | Update class                |
| DELETE | /api/class/\:id        | Admin         | Delete class                |
| POST   | /api/class/\:id/enroll | Admin/Teacher | Enroll a student in a class |

---

## API Documentation

I have created a **Postman API documentation JSON** for this project so all routes are ready to test with examples and auth tokens.

You can explore and test all API endpoints using the Postman collection:

[**Open Postman Collection**](https://cgen55.postman.co/workspace/Assignment~3937c878-9731-4041-a5a4-197178344591/collection/34712513-1e508887-0571-4b95-a82c-e11aa8ba5117?action=share&creator=34712513&active-environment=34712513-f1f28a89-0bc5-4e68-a367-30fb6f74dbe4)

---

## Project Structure

```
├── prisma/                  # Prisma schema & migrations
├── src/
│   ├── app/
│   │   ├── app.ts           # Express app setup
│   │   ├── config/          # Environment & config files
│   │   ├── errors/          # Error handling
│   │   ├── interface/       # TypeScript interfaces
│   │   ├── middleware/      # Express middlewares
│   │   ├── modules/         # Feature modules
│   │   │   ├── auth/        # Authentication module
│   │   │   ├── class/       # Class management
│   │   │   ├── student/     # Student management
│   │   │   └── user/        # User management
│   │   ├── routes/          # API routes
│   │   └── utils/           # Utility functions
│   └── server.ts            # App entry point
├── .env                     # Environment variables
├── Dockerfile               # Docker config
├── docker-compose.yml       # Docker Compose config
├── package.json             # Project dependencies
└── tsconfig.json            # TypeScript config
```

---

## Authentication & Authorization

* **JWT Authentication**: Users get access and refresh tokens on login.
* **Role-Based Authorization**:

  * **Admin**: Full access
  * **Teacher**: Can manage students and classes
  * **Student**: Can view only their own profile

---

## Contributing

1. Fork repository
2. Create branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

**Developed by [Md. Shakil Hossain](mailto:mrshakilhossain@outlook.com)**

