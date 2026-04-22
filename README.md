# 📋 Task Tracker App

A simple and efficient Project Management / Task Tracker application built with Node.js, Express, HTML/JavaScript, and MySQL.

## ⚙️ Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Database**: MySQL
- **API**: RESTful API with JSON responses

## 📁 Project Structure

```
task-tracker-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── projectController.js  # Project business logic
│   │   └── taskController.js     # Task business logic
│   ├── routes/
│   │   ├── projects.js           # Project endpoints
│   │   └── tasks.js              # Task endpoints
│   ├── .env                      # Environment variables
│   ├── server.js                 # Main server file
│   └── package.json              # Dependencies
├── frontend/
│   ├── css/
│   │   └── style.css             # Styling
│   ├── js/
│   │   └── app.js                # JavaScript logic
│   └── index.html                # Main HTML file
├── database/
│   └── schema.sql                # Database schema
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm (comes with Node.js)

### Installation & Setup

#### 1. Setup Database

```bash
# Open MySQL
mysql -u root -p

# Run the schema file
source /path/to/database/schema.sql

# Or copy-paste the contents of schema.sql into MySQL
```

#### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Update .env file with your database credentials if needed
# Default credentials (update if different):
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=root
# DB_NAME=task_tracker
# PORT=5000

# Start the server
npm start
# Or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

#### 3. Setup Frontend

```bash
# Navigate to frontend directory
cd frontend

# Open index.html in your browser or use a local server
# Option 1: Using Python
python -m http.server 8000

# Option 2: Using Node.js (http-server)
npx http-server

# Option 3: Just open index.html directly in browser
```

Access the frontend at `http://localhost:8000` (or whichever port your server uses)

## 🔌 API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project with tasks
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks?project_id=1` - Get tasks by project
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task details
- `PATCH /api/tasks/:id/status` - Update task status
- `DELETE /api/tasks/:id` - Delete task

### Health Check

- `GET /api/health` - Check API status

## 📊 Database Schema

### Projects Table

```sql
- id (INT, Primary Key)
- name (VARCHAR)
- description (TEXT)
- status (ENUM: active, completed, archived)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tasks Table

```sql
- id (INT, Primary Key)
- project_id (INT, Foreign Key)
- title (VARCHAR)
- description (TEXT)
- status (ENUM: todo, in_progress, done)
- priority (ENUM: low, medium, high)
- due_date (DATE)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## ✨ Features

✅ Create, Read, Update, Delete Projects
✅ Create, Read, Update, Delete Tasks
✅ Organize tasks by project
✅ Set task priority (Low, Medium, High)
✅ Track task status (To Do, In Progress, Done)
✅ Set due dates for tasks
✅ Responsive design
✅ Clean and intuitive UI
✅ Real-time updates

## 🎯 Usage

1. **Create a Project**: Click "New Project" and fill in the details
2. **View Project**: Click "View" on any project card to see details and tasks
3. **Create a Task**: Click "New Task", select a project, and fill in task details
4. **Update Task Status**: Select status from dropdown to change task status
5. **Delete Items**: Click "Delete" to remove projects or tasks (confirm first)

## 🔧 Troubleshooting

### Backend won't connect to database

- Verify MySQL is running
- Check database credentials in `.env`
- Ensure `task_tracker` database exists
- Run the schema.sql file to create tables

### CORS errors in browser

- Ensure backend is running on port 5000
- Check that frontend is accessing `http://localhost:5000` API

### Port already in use

- Change PORT in `.env` file (backend)
- Kill the process using the port:
  ```bash
  # Linux/Mac
  lsof -ti:5000 | xargs kill -9
  
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

## 📝 Sample API Request

### Create a Project

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Project",
    "description": "Project description"
  }'
```

### Create a Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": 1,
    "title": "Task Title",
    "description": "Task description",
    "priority": "high",
    "due_date": "2026-05-20"
  }'
```

## 🎨 Customization

- **Colors**: Edit CSS variables in `frontend/css/style.css`
- **API URL**: Change `API_URL` in `frontend/js/app.js`
- **Database**: Modify connection settings in `backend/.env`

## 📄 License

MIT License - Feel free to use this project as you like!

## 🤝 Support

If you encounter any issues, check the troubleshooting section or ensure all prerequisites are installed correctly.

Happy tracking! 🎉
