# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, the API doesn't require authentication. For production, consider adding JWT authentication.

---

## Health Check

### Check API Status
**GET** `/health`

**Response:**
```json
{
  "status": "OK",
  "message": "Task Tracker API is running"
}
```

---

## Projects

### Get All Projects
**GET** `/projects`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Website Redesign",
      "description": "Redesign company website",
      "status": "active",
      "created_at": "2026-04-22T10:00:00.000Z",
      "updated_at": "2026-04-22T10:00:00.000Z"
    }
  ]
}
```

---

### Get Single Project with Tasks
**GET** `/projects/:id`

**Parameters:**
- `id` (URL param, required): Project ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Website Redesign",
    "description": "Redesign company website",
    "status": "active",
    "created_at": "2026-04-22T10:00:00.000Z",
    "updated_at": "2026-04-22T10:00:00.000Z",
    "tasks": [
      {
        "id": 1,
        "project_id": 1,
        "title": "Design mockups",
        "description": "Create UI mockups",
        "status": "done",
        "priority": "high",
        "due_date": "2026-04-30",
        "created_at": "2026-04-22T10:00:00.000Z",
        "updated_at": "2026-04-22T10:00:00.000Z"
      }
    ]
  }
}
```

---

### Create Project
**POST** `/projects`

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Project description (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project created",
  "id": 4
}
```

---

### Update Project
**PUT** `/projects/:id`

**Parameters:**
- `id` (URL param, required): Project ID

**Request Body:**
```json
{
  "name": "Updated Project Name",
  "description": "Updated description",
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Project updated"
}
```

**Status Options:** `active`, `completed`, `archived`

---

### Delete Project
**DELETE** `/projects/:id`

**Parameters:**
- `id` (URL param, required): Project ID

**Response:**
```json
{
  "success": true,
  "message": "Project deleted"
}
```

**Note:** Deleting a project also deletes all associated tasks.

---

## Tasks

### Get All Tasks
**GET** `/tasks`

**Query Parameters (optional):**
- `project_id`: Filter tasks by project ID

**Examples:**
```
GET /tasks
GET /tasks?project_id=1
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "project_id": 1,
      "title": "Design mockups",
      "description": "Create UI mockups",
      "status": "done",
      "priority": "high",
      "due_date": "2026-04-30",
      "created_at": "2026-04-22T10:00:00.000Z",
      "updated_at": "2026-04-22T10:00:00.000Z",
      "project_name": "Website Redesign"
    }
  ]
}
```

---

### Get Single Task
**GET** `/tasks/:id`

**Parameters:**
- `id` (URL param, required): Task ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "project_id": 1,
    "title": "Design mockups",
    "description": "Create UI mockups",
    "status": "done",
    "priority": "high",
    "due_date": "2026-04-30",
    "created_at": "2026-04-22T10:00:00.000Z",
    "updated_at": "2026-04-22T10:00:00.000Z"
  }
}
```

---

### Create Task
**POST** `/tasks`

**Request Body:**
```json
{
  "project_id": 1,
  "title": "Task Title",
  "description": "Task description (optional)",
  "priority": "medium",
  "due_date": "2026-05-20"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created",
  "id": 5
}
```

**Priority Options:** `low`, `medium`, `high`
**Date Format:** `YYYY-MM-DD`

---

### Update Task
**PUT** `/tasks/:id`

**Parameters:**
- `id` (URL param, required): Task ID

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "in_progress",
  "priority": "high",
  "due_date": "2026-05-25"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task updated"
}
```

**Status Options:** `todo`, `in_progress`, `done`

---

### Update Task Status (Quick Update)
**PATCH** `/tasks/:id/status`

**Parameters:**
- `id` (URL param, required): Task ID

**Request Body:**
```json
{
  "status": "done"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task status updated"
}
```

---

### Delete Task
**DELETE** `/tasks/:id`

**Parameters:**
- `id` (URL param, required): Task ID

**Response:**
```json
{
  "success": true,
  "message": "Task deleted"
}
```

---

## Error Responses

### Bad Request (400)
```json
{
  "success": false,
  "message": "Project name is required"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Project not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Example Usage with cURL

### Create a Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mobile App",
    "description": "Build iOS and Android app"
  }'
```

### Create a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": 1,
    "title": "Setup backend",
    "description": "Set up Node.js backend",
    "priority": "high",
    "due_date": "2026-05-01"
  }'
```

### Get All Tasks for a Project
```bash
curl http://localhost:5000/api/tasks?project_id=1
```

### Update Task Status
```bash
curl -X PATCH http://localhost:5000/api/tasks/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "done"
  }'
```

### Delete a Project
```bash
curl -X DELETE http://localhost:5000/api/projects/1
```

---

## Rate Limiting
Currently not implemented. Consider adding in production.

## CORS
CORS is enabled for all origins. For production, restrict to specific domains.

## Pagination
Not implemented. Consider adding for large datasets.
