USE rbac_system;

-- Insert Admin role
INSERT INTO roles (name) VALUES ('Admin');

-- Insert Admin user (password: 'admin123' hashed with bcrypt)
INSERT INTO users (username, password, role_id) 
VALUES ('admin', '$2b$10$9z5Qz7s7Y6X9m2x3k4y5zO8w9v0x1y2z3a4b5c6d7e8f9g0h', 1);

-- Insert default permissions for Admin (full access)
INSERT INTO permissions (role_id, module, can_read, can_create, can_update, can_delete)
VALUES 
    (1, 'Roles', TRUE, TRUE, TRUE, TRUE),
    (1, 'Users', TRUE, TRUE, TRUE, TRUE),
    (1, 'Enterprises', TRUE, TRUE, TRUE, TRUE),
    (1, 'Employees', TRUE, TRUE, TRUE, TRUE),
    (1, 'Products', TRUE, TRUE, TRUE, TRUE),
    (1, 'Dashboards', TRUE, TRUE, TRUE, TRUE);