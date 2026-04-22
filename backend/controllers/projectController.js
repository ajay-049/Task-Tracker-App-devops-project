const pool = require('../config/db');

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single project with tasks
exports.getProjectById = async (req, res) => {
    try {
        const [project] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
        if (project.length === 0) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        const [tasks] = await pool.query('SELECT * FROM tasks WHERE project_id = ? ORDER BY created_at DESC', [req.params.id]);
        res.json({ success: true, data: { ...project[0], tasks } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create project
exports.createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: 'Project name is required' });
        }
        const [result] = await pool.query('INSERT INTO projects (name, description) VALUES (?, ?)', [name, description]);
        res.json({ success: true, message: 'Project created', id: result.insertId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        const { name, description, status } = req.body;
        await pool.query('UPDATE projects SET name = ?, description = ?, status = ? WHERE id = ?', 
            [name, description, status, req.params.id]);
        res.json({ success: true, message: 'Project updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
