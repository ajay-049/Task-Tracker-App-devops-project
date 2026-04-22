# 🚀 Quick Start Guide

## Option 1: Local Setup (Recommended for Development)

### Step 1: Setup MySQL Database

```bash
# Open MySQL
mysql -u root -p

# Create database and run schema
source ./database/schema.sql
exit
```

### Step 2: Start Backend

```bash
cd backend
npm install
npm start
```

Backend runs on: `http://localhost:5000`

### Step 3: Start Frontend

```bash
cd frontend
# Option A: Using Python
python -m http.server 8000

# Option B: Using npx http-server
npx http-server

# Option C: Using Node.js
npx serve
```

Frontend runs on: `http://localhost:8000` (or as displayed)

---

## Option 2: Docker Setup (Recommended for DevOps/Production)

### Prerequisites
- Docker installed
- Docker Compose installed

### Setup

```bash
# From project root directory
docker-compose up -d
```

This will start:
- MySQL: `localhost:3306`
- Backend: `localhost:5000`
- Frontend: `localhost:80` (http://localhost)

### Verify services
```bash
docker-compose ps
docker-compose logs -f
```

### Stop services
```bash
docker-compose down
```

### Rebuild after code changes
```bash
docker-compose up -d --build
```

---

## Option 3: Kubernetes Deployment (Advanced)

See `k8s/` directory for Kubernetes manifests (optional).

---

## Testing the API

### Using curl

```bash
# Get all projects
curl http://localhost:5000/api/projects

# Create project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test project"}'

# Get all tasks
curl http://localhost:5000/api/tasks

# Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": 1,
    "title": "Test Task",
    "priority": "high"
  }'
```

### Using Postman

1. Import the API endpoints from the README
2. Set base URL: `http://localhost:5000`
3. Start testing!

---

## Troubleshooting

### Port already in use
```bash
# Kill process on port
lsof -ti:5000 | xargs kill -9  # Backend
lsof -ti:3306 | xargs kill -9  # MySQL
lsof -ti:8000 | xargs kill -9  # Frontend
```

### MySQL connection error
- Ensure MySQL is running
- Check credentials in `backend/.env`
- Verify database exists

### API CORS errors
- Check that backend is running
- Verify API_URL in `frontend/js/app.js` is correct

### Docker issues
```bash
# View logs
docker-compose logs backend
docker-compose logs mysql

# Rebuild everything
docker-compose down -v
docker-compose up -d --build
```

---

## Next Steps

1. ✅ Test the application
2. 📝 Create projects and tasks
3. 🎨 Customize styling if needed
4. 🚀 Deploy to your server

Happy tracking! 🎉
