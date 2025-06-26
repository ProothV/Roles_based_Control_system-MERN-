USE rbac_system;

-- Roles table
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    enterprise_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(id)
);

-- Enterprises table
CREATE TABLE enterprises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    contact_info VARCHAR(255)
);

-- Employees table
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    role VARCHAR(50),
    salary DECIMAL(10,2),
    status VARCHAR(20),
    enterprise_id INT,
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(id)
);

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    price DECIMAL(10,2),
    category VARCHAR(50),
    status VARCHAR(20),
    enterprise_id INT,
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(id)
);

-- Permissions table
CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    module VARCHAR(50) NOT NULL,
    can_read BOOLEAN DEFAULT FALSE,
    can_create BOOLEAN DEFAULT FALSE,
    can_update BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Dashboards table (stores widget configurations)
CREATE TABLE dashboards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    widget_data JSON,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

