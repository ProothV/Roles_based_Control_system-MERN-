# Role-Based Access Control System

A web application implementing a Role-Based Access Control (RBAC) system with a responsive React.js frontend and a Node.js/Express backend, connected to a MySQL database. The system supports user authentication via JWT, role-based permissions, CRUD operations for managing Roles, Users, Enterprises, Employees, and Products, and a Dashboard displaying role-specific data (e.g., entity counts). The application is designed for enterprise use, allowing Admins to manage all modules and non-Admin users to access permitted modules based on their roles.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Docker Deployment](#docker-deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Authentication**: Secure JWT-based login with username and password.
- **Role-Based Access Control (RBAC)**:
  - Admins (role_id = 1) access all modules (Roles, Users, Enterprises, Employees, Products).
  - Non-Admin users access modules based on permissions defined in the `permissions` table.
- **CRUD Operations**: Create, Read, Update, Delete functionality for:
  - Roles: Manage roles and their permissions.
  - Users: Manage user accounts and roles.
  - Enterprises: Manage enterprise details.
  - Employees: Manage employee records.
  - Products: Manage product information.
- **Dashboard**: Displays role-specific data, such as counts of entities (e.g., number of employees, products).
- **Responsive UI**: Built with React and Bootstrap for a seamless experience across devices.
- **Secure API**: Endpoints protected with JWT authentication and role-based authorization.
- **Error Handling**: Standardized error responses for invalid requests or unauthorized access.

## Technologies
- **Frontend**:
  - React.js (v18)
  - React Router (for navigation)
  - Axios (for API requests)
  - Bootstrap (for styling)
- **Backend**:
  - Node.js (v16)
  - Express.js (v4)
  - MySQL2 (for database connectivity)
  - JWT (for authentication)
  - Bcrypt (for password hashing)
- **Database**: MySQL (v8)
- **Deployment**: Docker and Docker Compose
- **Tools**: Git, npm

## Project Structure


to be add soon..

## Prerequisites
- **Node.js**: v16 or higher
- **MySQL**: v8 or higher
- **Docker**: Docker Desktop (for containerized deployment)
- **Git**: For cloning the repository
- **npm**: Included with Node.js

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd role-based-system-backend

Install dependencies:
bash
npm install
Create a .env file in role-based-system-backend:
env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=role_based_system
JWT_SECRET=your_secret_key
PORT=5000

Replace your_mysql_password with your MySQL root password.
Replace your_secret_key with a secure key (e.g., mysecretkey123).

-----------------------------------------------------------------------------------------------------

### Frontend Setup
Navigate to the frontend directory:
bash

cd role-based-system-frontend

Install dependencies:
bash

npm install

Create a .env file in role-based-system-frontend:
env

REACT_APP_API_URL=http://localhost:5000

npm start // for running frontend
---------------------------------------------------------------------------------------------------------------
### Databse Setup
Start MySQL server:
bash

mysql -u root -p

Create the database:
sql

CREATE DATABASE role_based_system;

create tables by using databse folder and generate admin and some roles like manger,sales.
generate passsword for admin by using hashpassword.js file for authentications..

------------------------------------------------------------------------------------------------------------------------

running whole app
npm start for frontend appp
and 
nodemon server.js for backend....
------------------------------------------------------------------------------------------------------------------------
Usage
Login: Use username: admin, password: admin123 to access the Admin portal.

Admin Portal (/admin): Access all modules (Roles, Users, Enterprises, Employees, Products) for CRUD operations.

User Portal (/user): Non-Admin users see only permitted modules based on permissions (e.g., Employees for HR roles).

Dashboard: View role-specific data, such as counts of users, employees, or products.

CRUD Operations:
Navigate to module-specific pages (e.g., Role Management) to add, edit, or delete records.

Admins can manage all entities; non-Admins are restricted by permissions.

Logout: Clears session and returns to the login page.

--------------------------------------------------------------------------------------------------------------------------
repo link :-   https://github.com/ProothV/Roles_based_Control_system-MERN-
--


