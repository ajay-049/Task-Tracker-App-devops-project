# 🎯 Visual Step-by-Step Setup Guide

## Setup Architecture Diagram

```
YOUR COMPUTER
├─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐ │
│  │  BROWSER     │      │  TERMINAL 2  │      │  TERMINAL 3  │ │
│  │              │      │  (Backend)   │      │  (Frontend)  │ │
│  │  Port 8000   │◄────►│  Port 5000   │◄────►│  Port 8000   │ │
│  │              │      │              │      │              │ │
│  │ http://      │      │ npm start    │      │ python -m    │ │
│  │ localhost:   │      │              │      │ http.server  │ │
│  │ 8000         │      │ Node.js      │      │   8000       │ │
│  │              │      │ Express      │      │              │ │
│  └──────────────┘      └──────┬───────┘      └──────────────┘ │
│         ▲                      │                                │
│         │                      ▼                                │
│         │                  ┌──────────────┐                    │
│         └─────────────────►│  MySQL DB    │                    │
│                            │  Port 3306   │                    │
│                            │              │                    │
│                            │ task_tracker │                    │
│                            │ database     │                    │
│                            └──────────────┘                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Visual Walkthrough

### ⏱️ Total Time: ~30 minutes

---

## STEP 1: Open Terminal 1 (Database Setup)
*Time: 5 minutes*

```
┌──────────────────────────────────────────────┐
│  TERMINAL 1 - DATABASE SETUP                │
├──────────────────────────────────────────────┤
│                                              │
│ $ cd "/home/ajay/my folder/Task Tracker App"│
│ $ mysql -u root -p                          │
│ Password: root                              │
│                                              │
│ mysql> CREATE DATABASE task_tracker;        │
│ mysql> USE task_tracker;                    │
│ mysql> SOURCE ./database/schema.sql;        │
│ mysql> SHOW TABLES;                         │
│ +-----------+                                │
│ | projects  |                                │
│ | tasks     |                                │
│ +-----------+                                │
│ mysql> EXIT;                                │
│                                              │
│ Status: ✅ Database Ready                   │
└──────────────────────────────────────────────┘
```

**What Happens:**
1. Open MySQL command line
2. Create `task_tracker` database
3. Run schema to create 2 tables: `projects` and `tasks`
4. Insert 3 sample projects and 5 sample tasks
5. Exit MySQL (this terminal is closed now)

**Expected Result:** 2 tables with sample data ✅

---

## STEP 2: Open Terminal 2 (Backend Server)
*Time: 10 minutes*

```
┌──────────────────────────────────────────────┐
│  TERMINAL 2 - BACKEND SERVER (KEEP OPEN)   │
├──────────────────────────────────────────────┤
│                                              │
│ $ cd backend                                 │
│ $ npm install                                │
│ added 78 packages in 45s                     │
│                                              │
│ $ npm start                                  │
│                                              │
│ Task Tracker API running on                 │
│ http://localhost:5000                       │
│                                              │
│ Status: ✅ Backend Running on Port 5000    │
│                                              │
│ (Leave this terminal open - do NOT close)   │
│                                              │
└──────────────────────────────────────────────┘
```

**What Happens:**
1. Navigate to backend folder
2. Install dependencies (first time only, takes ~45 seconds)
3. Start Express server
4. Server listens on port 5000
5. Ready to receive API requests

**Expected Result:** "Task Tracker API running on http://localhost:5000" ✅

**Test It (in another terminal):**
```bash
curl http://localhost:5000/api/health
# Response: {"status":"OK","message":"Task Tracker API is running"}
```

---

## STEP 3: Open Terminal 3 (Frontend Server)
*Time: 5 minutes*

```
┌──────────────────────────────────────────────┐
│  TERMINAL 3 - FRONTEND SERVER (KEEP OPEN)  │
├──────────────────────────────────────────────┤
│                                              │
│ $ cd frontend                                │
│ $ python -m http.server 8000                 │
│                                              │
│ Serving HTTP on 0.0.0.0 port 8000           │
│ http://0.0.0.0:8000/                        │
│                                              │
│ Status: ✅ Frontend Running on Port 8000   │
│                                              │
│ (Leave this terminal open - do NOT close)   │
│                                              │
└──────────────────────────────────────────────┘
```

**What Happens:**
1. Navigate to frontend folder
2. Start simple HTTP server on port 8000
3. Serves HTML, CSS, and JavaScript files
4. Frontend connects to backend API on port 5000

**Expected Result:** "Serving HTTP on port 8000" ✅

---

## STEP 4: Open Browser (Access Application)
*Time: 2 minutes*

```
┌────────────────────────────────────────────────────────┐
│  BROWSER - Open http://localhost:8000                 │
├────────────────────────────────────────────────────────┤
│                                                        │
│  📋 Task Tracker                                       │
│  Manage your projects and tasks efficiently           │
│                                                        │
│  [Projects] [All Tasks]  ← Click to switch tabs       │
│                                                        │
│  ┌─── Projects Tab ─────────────────────────────────┐ │
│  │ + New Project                                    │ │
│  │                                                  │ │
│  │ ┌──────────────────┐  ┌──────────────────┐     │ │
│  │ │ Website Redesign │  │  Mobile App      │     │ │
│  │ │ Redesign company │  │  Build iOS and   │     │ │
│  │ │ website          │  │  Android app     │     │ │
│  │ │                  │  │                  │     │ │
│  │ │ [View] [Delete]  │  │ [View] [Delete]  │     │ │
│  │ └──────────────────┘  └──────────────────┘     │ │
│  │                                                  │ │
│  │ ┌──────────────────┐                            │ │
│  │ │ Database Migr... │                            │ │
│  │ │ Migrate to new   │                            │ │
│  │ │ database         │                            │ │
│  │ │ [View] [Delete]  │                            │ │
│  │ └──────────────────┘                            │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Status: ✅ Frontend Loaded Successfully             │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**What You Should See:**
- ✅ Purple header with "📋 Task Tracker"
- ✅ Two tabs: "Projects" and "All Tasks"
- ✅ Three sample projects displayed
- ✅ "+ New Project" button in top right
- ✅ Each project card shows status and date

**If You See:**
- ❌ Blank page → Backend or MySQL not running
- ❌ Error in console (F12) → Check troubleshooting section
- ❌ "Cannot connect to localhost:5000" → Backend not running

---

## STEP 5: Test Features
*Time: 5 minutes*

### Test 5A: View All Tasks
```
┌────────────────────────────────────────────────────────┐
│  BROWSER - Click "All Tasks" Tab                       │
├────────────────────────────────────────────────────────┤
│  [Projects] [All Tasks] ← Click here                   │
│                                                        │
│  All Tasks Page:                                       │
│  + New Task                                            │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Design mockups                      ↓           │  │
│  │ 📁 Website Redesign | ⚡ High | 📅 Apr 30     │  │
│  │                    [Done]   [Delete]             │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Frontend development                ↓           │  │
│  │ 📁 Website Redesign | ⚡ High | 📅 May 15     │  │
│  │              [In Progress]   [Delete]            │  │
│  └─────────────────────────────────────────────────┘  │
│                                                        │
│  Status: ✅ 5 Sample Tasks Displayed                  │
└────────────────────────────────────────────────────────┘
```

**Expected Result:**
- See all 5 sample tasks from database
- Each task shows project name, priority, due date
- Status dropdown shows current status

---

### Test 5B: Create New Project
```
┌────────────────────────────────────────────────────────┐
│  BROWSER - Click "+ New Project" Button                │
├────────────────────────────────────────────────────────┤
│  [Projects] Tab (active)                               │
│                                                        │
│  Form appears:                                         │
│  Create New Project                                    │
│  ┌────────────────────────────────────────────────┐   │
│  │ Project Name                                   │   │
│  │ [My Test Project__________________________]    │   │
│  │                                                │   │
│  │ Description                                    │   │
│  │ [This is my first test project_____________]  │   │
│  │ [________________________]                      │   │
│  │                                                │   │
│  │                    [Create] [Cancel]           │   │
│  └────────────────────────────────────────────────┘   │
│                                                        │
│  After Click "Create":                                │
│  ┌──────────────────┐                                  │
│  │ My Test Project  │  ← New card appears!             │
│  │ This is my first │                                  │
│  │ test project     │                                  │
│  │                  │                                  │
│  │ [View] [Delete]  │                                  │
│  └──────────────────┘                                  │
│                                                        │
│  Status: ✅ Project Created Successfully              │
└────────────────────────────────────────────────────────┘
```

**Expected Result:**
- Form appears for new project
- After filling and clicking "Create"
- New project card appears in list immediately

---

### Test 5C: Create New Task
```
┌────────────────────────────────────────────────────────┐
│  BROWSER - Click "All Tasks" then "+ New Task"         │
├────────────────────────────────────────────────────────┤
│  Form appears:                                         │
│  Create New Task                                       │
│  ┌────────────────────────────────────────────────┐   │
│  │ Select Project ↓                               │   │
│  │ [My Test Project_________________]             │   │
│  │                                                │   │
│  │ Task Title                                     │   │
│  │ [My First Task_____________________]          │   │
│  │                                                │   │
│  │ Description                                    │   │
│  │ [Testing task creation_______________]        │   │
│  │ [________________________]                      │   │
│  │                                                │   │
│  │ Priority Level    Due Date                     │   │
│  │ [Medium      ↓]   [2026-05-20]                 │   │
│  │                                                │   │
│  │                    [Create] [Cancel]           │   │
│  └────────────────────────────────────────────────┘   │
│                                                        │
│  After Click "Create":                                │
│  ┌──────────────────────────────────────────────┐     │
│  │ My First Task                      ↓        │     │
│  │ 📁 My Test Project | ⚡ Medium | 📅 May 20 │     │
│  │              [To Do]   [Delete]               │     │
│  └──────────────────────────────────────────────┘     │
│                                                        │
│  Status: ✅ Task Created Successfully                 │
└────────────────────────────────────────────────────────┘
```

**Expected Result:**
- Form with project dropdown, title, description
- After clicking "Create"
- New task appears in task list with status dropdown

---

### Test 5D: Change Task Status
```
┌────────────────────────────────────────────────────────┐
│  BROWSER - Click Status Dropdown on Any Task           │
├────────────────────────────────────────────────────────┤
│  Before:                                               │
│  My First Task               [To Do ↓]                 │
│                                                        │
│  Click dropdown:                                       │
│  My First Task               [To Do ↓]                 │
│                              ┌─────────────┐           │
│                              │ To Do       │           │
│                              │ In Progress │           │
│                              │ Done        │           │
│                              └─────────────┘           │
│                                                        │
│  Select "Done":                                        │
│  My First Task               [Done ↓]  ✅ Updated    │
│                                                        │
│  Status: ✅ Task Status Changed Instantly             │
└────────────────────────────────────────────────────────┘
```

**Expected Result:**
- Click dropdown with task status options
- Select new status (To Do, In Progress, Done)
- Status updates immediately without page reload

---

### Test 5E: View Project Details
```
┌────────────────────────────────────────────────────────┐
│  BROWSER - Go to Projects Tab, Click "View" Button     │
├────────────────────────────────────────────────────────┤
│  Project Card:                                         │
│  ┌──────────────────┐                                  │
│  │ My Test Project  │                                  │
│  │ This is my first │                                  │
│  │ test project     │                                  │
│  │                  │                                  │
│  │ [View] [Delete]  ← Click "View"                    │
│  └──────────────────┘                                  │
│                                                        │
│  Modal Popup Opens:                    ✅ Modal      │
│  ┌──────────────────────────────────────────────────┐ │
│  │  My Test Project                              ✕  │ │
│  │                                                  │ │
│  │  Status: active                                │ │
│  │  Description: This is my first test project    │ │
│  │  Created: Apr 22, 2026                         │ │
│  │                                                  │ │
│  │  Project Tasks                                 │ │
│  │  + Add Task                                    │ │
│  │                                                  │ │
│  │  ┌────────────────────────────────────────────┐ │
│  │  │ My First Task        [Done]   [Delete]    │ │
│  │  └────────────────────────────────────────────┘ │
│  │                                                  │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  Status: ✅ Project Details Modal Displayed          │
└────────────────────────────────────────────────────────┘
```

**Expected Result:**
- Modal popup appears with project details
- Shows project status and description
- Shows all tasks in that project
- Click X or outside modal to close

---

## Final Status Board

```
┌──────────────────────────────────────────────────────────┐
│              ✅ SETUP COMPLETE & VERIFIED              │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  RUNNING SERVICES:                                       │
│  ✅ MySQL Database       (port 3306)                    │
│  ✅ Backend API          (port 5000)                    │
│  ✅ Frontend Server      (port 8000)                    │
│  ✅ Browser              (http://localhost:8000)        │
│                                                          │
│  FEATURES TESTED:                                        │
│  ✅ Database connected with 3 projects & 5 tasks       │
│  ✅ Projects page loads correctly                       │
│  ✅ All Tasks page loads correctly                      │
│  ✅ Can create new projects                             │
│  ✅ Can create new tasks                                │
│  ✅ Can update task status                              │
│  ✅ Can view project details                            │
│                                                          │
│  NEXT STEPS:                                             │
│  1. Keep all 3 terminals running                         │
│  2. Start developing!                                    │
│  3. Edit files in backend/ or frontend/ folders         │
│  4. Frontend changes: refresh browser (F5)              │
│  5. Backend changes: restart server (Ctrl+C, npm start) │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Quick Commands Reference

### Start Everything (After Initial Setup)

**Terminal 1:**
```bash
cd backend
npm start
# Wait for: "running on http://localhost:5000"
```

**Terminal 2:**
```bash
cd frontend
python -m http.server 8000
# Wait for: "Serving HTTP on port 8000"
```

**Browser:**
```
http://localhost:8000
```

### Stop Everything

**Terminal 1:** `Ctrl + C` (Backend stops)
**Terminal 2:** `Ctrl + C` (Frontend stops)
**Browser:** Close tab

---

## Troubleshooting Flow Chart

```
              Problem?
                 │
        ┌────────┴────────┐
        ▼                 ▼
   Blank Page      Error Message
        │                 │
        ▼                 ▼
   Check these:      Check these:
   1. Backend        1. Is it red?
      running?       2. What does
   2. MySQL             it say?
      running?       3. Look it up
   3. Port 8000         in
      correct?          troubleshooting
                        section
```

---

## Success! 🎉

You now have a fully functional Task Tracker App running locally!

- **Frontend:** http://localhost:8000
- **Backend API:** http://localhost:5000
- **Database:** MySQL on localhost:3306

Start building and enjoy coding! 🚀
