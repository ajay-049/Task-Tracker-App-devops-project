const pool = require('../config/db');

// Get all tasks or filter by project
exports.getAllTasks = async (req, res) => {
    try {
        const projectId = req.query.project_id;
        let query = 'SELECT t.*, p.name as project_name FROM tasks t JOIN projects p ON t.project_id = p.id';
        let params = [];
        
        if (projectId) {
            query += ' WHERE t.project_id = ?';
            params.push(projectId);
        }
        
        query += ' ORDER BY t.due_date ASC, t.priority DESC';
        const [rows] = await pool.query(query, params);
        res.json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single task
exports.getTaskById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create task
exports.createTask = async (req, res) => {
    try {
        const { project_id, title, description, priority, due_date } = req.body;
        
        if (!project_id || !title) {
            return res.status(400).json({ success: false, message: 'Project ID and Title are required' });
        }
        
        const [result] = await pool.query(
            'INSERT INTO tasks (project_id, title, description, priority, due_date) VALUES (?, ?, ?, ?, ?)',
            [project_id, title, description, priority, due_date]
        );
        res.json({ success: true, message: 'Task created', id: result.insertId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update task
exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, priority, due_date } = req.body;
        await pool.query(
            'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ? WHERE id = ?',
            [title, description, status, priority, due_date, req.params.id]
        );
        res.json({ success: true, message: 'Task updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update task status
exports.updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;
        await pool.query('UPDATE tasks SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ success: true, message: 'Task status updated' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
        res.json({ success: true, message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
