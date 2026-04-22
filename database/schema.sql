-- Create database
CREATE DATABASE IF NOT EXISTS task_tracker;
USE task_tracker;

-- Projects table
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('active', 'completed', 'archived') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('todo', 'in_progress', 'done') DEFAULT 'todo',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO projects (name, description, status) VALUES
('Website Redesign', 'Redesign company website', 'active'),
('Mobile App', 'Build iOS and Android app', 'in_progress'),
('Database Migration', 'Migrate to new database', 'active');

INSERT INTO tasks (project_id, title, description, status, priority, due_date) VALUES
(1, 'Design mockups', 'Create UI mockups', 'done', 'high', '2026-04-30'),
(1, 'Frontend development', 'Develop frontend', 'in_progress', 'high', '2026-05-15'),
(2, 'API setup', 'Setup backend API', 'todo', 'high', '2026-05-01'),
(2, 'Database design', 'Design database schema', 'in_progress', 'medium', '2026-04-25'),
(3, 'Data backup', 'Backup existing data', 'todo', 'high', '2026-04-23');
