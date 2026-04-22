// API Base URL
const API_URL = 'http://localhost:5000/api';

// DOM Elements
const projectsTab = document.getElementById('projects');
const tasksTab = document.getElementById('tasks');
const tabButtons = document.querySelectorAll('.tab-button');
const newProjectBtn = document.getElementById('newProjectBtn');
const newTaskBtn = document.getElementById('newTaskBtn');
const projectForm = document.getElementById('projectForm');
const taskForm = document.getElementById('taskForm');
const createProjectForm = document.getElementById('createProjectForm');
const createTaskForm = document.getElementById('createTaskForm');
const cancelProjectBtn = document.getElementById('cancelProjectBtn');
const cancelTaskBtn = document.getElementById('cancelTaskBtn');
const projectsList = document.getElementById('projectsList');
const tasksList = document.getElementById('tasksList');
const projectModal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadProjects();
    loadTasks();
});

// Event Listeners
function setupEventListeners() {
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
    });

    // Project operations
    newProjectBtn.addEventListener('click', () => showProjectForm());
    cancelProjectBtn.addEventListener('click', () => hideProjectForm());
    createProjectForm.addEventListener('submit', handleCreateProject);

    // Task operations
    newTaskBtn.addEventListener('click', () => showTaskForm());
    cancelTaskBtn.addEventListener('click', () => hideTaskForm());
    createTaskForm.addEventListener('submit', handleCreateTask);

    // Modal
    modalClose.addEventListener('click', closeModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeModal();
    });
}

// Tab Management
function switchTab(e) {
    const tabName = e.target.dataset.tab;
    
    // Update active tab button
    tabButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Update active tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

// Project Form Management
function showProjectForm() {
    projectForm.classList.remove('hidden');
    document.getElementById('projectName').focus();
}

function hideProjectForm() {
    projectForm.classList.add('hidden');
    createProjectForm.reset();
}

async function handleCreateProject(e) {
    e.preventDefault();
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDesc').value;

    try {
        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, description })
        });
        
        const data = await response.json();
        if (data.success) {
            hideProjectForm();
            loadProjects();
            showNotification('Project created successfully!');
        }
    } catch (error) {
        console.error('Error creating project:', error);
        showNotification('Error creating project', 'error');
    }
}

// Task Form Management
function showTaskForm() {
    loadProjectsForSelect();
    taskForm.classList.remove('hidden');
    document.getElementById('taskTitle').focus();
}

function hideTaskForm() {
    taskForm.classList.add('hidden');
    createTaskForm.reset();
}

async function loadProjectsForSelect() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        const data = await response.json();
        const projectSelect = document.getElementById('taskProject');
        projectSelect.innerHTML = '<option value="">Select Project</option>';
        data.data.forEach(project => {
            projectSelect.innerHTML += `<option value="${project.id}">${project.name}</option>`;
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

async function handleCreateTask(e) {
    e.preventDefault();
    const project_id = document.getElementById('taskProject').value;
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDesc').value;
    const priority = document.getElementById('taskPriority').value;
    const due_date = document.getElementById('taskDueDate').value;

    if (!project_id) {
        showNotification('Please select a project', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                project_id: parseInt(project_id),
                title,
                description,
                priority,
                due_date
            })
        });
        
        const data = await response.json();
        if (data.success) {
            hideTaskForm();
            loadTasks();
            showNotification('Task created successfully!');
        }
    } catch (error) {
        console.error('Error creating task:', error);
        showNotification('Error creating task', 'error');
    }
}

// Load Projects
async function loadProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        const data = await response.json();
        
        if (data.success) {
            displayProjects(data.data);
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsList.innerHTML = '<p class="loading">Error loading projects</p>';
    }
}

function displayProjects(projects) {
    if (projects.length === 0) {
        projectsList.innerHTML = '<p class="loading">No projects yet. Create one to get started!</p>';
        return;
    }

    projectsList.innerHTML = projects.map(project => `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p>${project.description || 'No description'}</p>
            <div class="project-meta">
                <span class="status-badge status-${project.status}">${project.status}</span>
                <span>${formatDate(project.created_at)}</span>
            </div>
            <div class="project-card-actions">
                <button class="btn btn-primary btn-sm" onclick="viewProject(${project.id})">View</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProject(${project.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Load Tasks
async function loadTasks() {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const data = await response.json();
        
        if (data.success) {
            displayTasks(data.data);
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        tasksList.innerHTML = '<p class="loading">Error loading tasks</p>';
    }
}

function displayTasks(tasks) {
    if (tasks.length === 0) {
        tasksList.innerHTML = '<p class="loading">No tasks yet. Create one to get started!</p>';
        return;
    }

    tasksList.innerHTML = tasks.map(task => `
        <div class="task-item">
            <div class="task-content">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">
                    <span>📁 ${task.project_name}</span>
                    <span>⚡ ${task.priority}</span>
                    ${task.due_date ? `<span>📅 ${formatDate(task.due_date)}</span>` : ''}
                </div>
            </div>
            <div class="task-actions">
                <select class="task-status-select" onchange="updateTaskStatus(${task.id}, this.value)">
                    <option value="todo" ${task.status === 'todo' ? 'selected' : ''}>To Do</option>
                    <option value="in_progress" ${task.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                    <option value="done" ${task.status === 'done' ? 'selected' : ''}>Done</option>
                </select>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// View Project Details
async function viewProject(projectId) {
    try {
        const response = await fetch(`${API_URL}/projects/${projectId}`);
        const data = await response.json();
        
        if (data.success) {
            const project = data.data;
            const tasks = project.tasks || [];
            
            const projectDetail = document.getElementById('projectDetail');
            projectDetail.innerHTML = `
                <h2>${project.name}</h2>
                <p><strong>Status:</strong> ${project.status}</p>
                <p><strong>Description:</strong> ${project.description || 'No description'}</p>
                <p><strong>Created:</strong> ${formatDate(project.created_at)}</p>
            `;

            const projectTasksList = document.getElementById('projectTasksList');
            if (tasks.length === 0) {
                projectTasksList.innerHTML = '<p>No tasks in this project</p>';
            } else {
                projectTasksList.innerHTML = tasks.map(task => `
                    <div class="task-item">
                        <div class="task-content">
                            <div class="task-title">${task.title}</div>
                            <div class="task-meta">
                                <span class="status-badge status-${task.status}">${task.status}</span>
                                <span>⚡ ${task.priority}</span>
                            </div>
                        </div>
                        <div class="task-actions">
                            <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
                        </div>
                    </div>
                `).join('');
            }

            projectModal.classList.remove('hidden');
            projectModal.classList.add('active');
        }
    } catch (error) {
        console.error('Error loading project:', error);
        showNotification('Error loading project', 'error');
    }
}

function closeModal() {
    projectModal.classList.add('hidden');
    projectModal.classList.remove('active');
}

// Update Task Status
async function updateTaskStatus(taskId, status) {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        
        const data = await response.json();
        if (data.success) {
            loadTasks();
            showNotification('Task status updated');
        }
    } catch (error) {
        console.error('Error updating task:', error);
        showNotification('Error updating task', 'error');
    }
}

// Delete Project
async function deleteProject(projectId) {
    if (!confirm('Are you sure you want to delete this project and all its tasks?')) return;

    try {
        const response = await fetch(`${API_URL}/projects/${projectId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        if (data.success) {
            loadProjects();
            showNotification('Project deleted');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        showNotification('Error deleting project', 'error');
    }
}

// Delete Task
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        if (data.success) {
            loadTasks();
            showNotification('Task deleted');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        showNotification('Error deleting task', 'error');
    }
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'success') {
    // Create a simple notification (you can enhance this later)
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // Optional: Show alert for now
    if (type === 'error') {
        alert(`❌ ${message}`);
    }
}
