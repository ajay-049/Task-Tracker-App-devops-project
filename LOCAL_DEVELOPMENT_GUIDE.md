# 🛠️ Local Development Setup - Detailed Micro Steps

## Prerequisites Checklist

Before starting, ensure you have these installed:

### Step 0.1: Check Node.js Installation
```bash
node --version
npm --version
```

**Expected Output:**
```
v14.0.0 or higher (e.g., v18.x)
9.x or higher
```

**If Not Installed:**
- Download from: https://nodejs.org/
- Install the LTS (Long Term Support) version
- Verify again with commands above

### Step 0.2: Check MySQL Installation
```bash
mysql --version
```

**Expected Output:**
```
mysql Ver 8.0.x or 5.7.x
```

**If Not Installed:**
- Download from: https://dev.mysql.com/downloads/mysql/
- Follow installation guide for your OS
- On Linux: `sudo apt-get install mysql-server`
- Verify again with command above

### Step 0.3: Check MySQL Server Status
```bash
# Linux/Mac
sudo systemctl status mysql

# Or try connecting
mysql -u root -p
# Then type 'exit' to quit
```

**If MySQL is not running:**
```bash
# Linux
sudo systemctl start mysql

# Mac
brew services start mysql

# Windows
# Start MySQL from Services or Command Line
net start MySQL80
```

---

## ✅ Phase 1: Database Setup

### Step 1.1: Open Terminal/Command Prompt
- **Windows**: Win + R → cmd
- **Mac**: Cmd + Space → Terminal
- **Linux**: Ctrl + Alt + T

### Step 1.2: Navigate to Project Directory
```bash
cd "/home/ajay/my folder/Task Tracker App (devops project)"
```

### Step 1.3: Verify You're in Correct Directory
```bash
# List files - should see database folder, backend, frontend, etc.
ls
```

**Expected Output:**
```
README.md
QUICKSTART.md
API_DOCS.md
backend
frontend
database
docker-compose.yml
nginx.conf
package.json
...
```

### Step 1.4: Start MySQL Command Line
```bash
mysql -u root -p
```

**What to expect:**
- It will ask for password
- Default password is usually: `root` (or just press Enter if no password)
- You'll see `mysql>` prompt

**If password doesn't work:**
```bash
# Try without password
mysql -u root

# Or with empty password
mysql -u root -p
# Press Enter when asked for password
```

### Step 1.5: Create Database and Import Schema
At the `mysql>` prompt, run these commands one by one:

```sql
-- Create the database
CREATE DATABASE IF NOT EXISTS task_tracker;

-- Select the database
USE task_tracker;

-- Show tables (should be empty for now)
SHOW TABLES;
```

**Expected Output:**
```
Database changed
Empty set (0.00 sec)
```

### Step 1.6: Import the Schema File
Still at `mysql>` prompt:

```sql
SOURCE ./database/schema.sql;
```

**Or if that doesn't work, use full path:**

```sql
SOURCE /home/ajay/my\ folder/Task\ Tracker\ App\ \(devops\ project\)/database/schema.sql;
```

### Step 1.7: Verify Tables Were Created
```sql
SHOW TABLES;
```

**Expected Output:**
```
+------------------------+
| Tables_in_task_tracker |
+------------------------+
| projects               |
| tasks                  |
+------------------------+
```

### Step 1.8: Verify Sample Data
```sql
SELECT * FROM projects;
SELECT * FROM tasks;
```

**Expected Output:**
```
Projects: 3 rows (Website Redesign, Mobile App, Database Migration)
Tasks: 5 rows (various tasks)
```

### Step 1.9: Exit MySQL
```sql
EXIT;
```

Or press `Ctrl + D`

**Verification**: You should be back to your terminal prompt

---

## ✅ Phase 2: Backend Setup & Start

### Step 2.1: Open a New Terminal Window
Keep the first terminal available (you might need it later)

**Windows**: Open new Command Prompt
**Mac/Linux**: Open new Terminal tab or window

### Step 2.2: Navigate to Backend Directory
```bash
cd "/home/ajay/my folder/Task Tracker App (devops project)/backend"
```

### Step 2.3: Verify You're in Backend Folder
```bash
ls
# Or on Windows:
dir
```

**Expected Output:**
```
.env
Dockerfile
config/
controllers/
package.json
routes/
server.js
```

### Step 2.4: Check the .env File
```bash
cat .env
```

**Expected Content:**
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=task_tracker
```

### Step 2.5: Verify Environment Variables Match Your MySQL Setup
- If your MySQL password is different from "root", update .env file:

```bash
# Edit the .env file with your preferred editor
# Windows Notepad
notepad .env

# Or Mac/Linux nano
nano .env
```

**Update these if needed:**
```
DB_USER=your_username      # Usually 'root'
DB_PASSWORD=your_password  # Your MySQL password
```

**Save and exit:**
- Notepad: Ctrl + S, then close
- Nano: Ctrl + X, then Y, then Enter

### Step 2.6: Install Backend Dependencies
```bash
npm install
```

**What happens:**
- Creates `node_modules` folder (may take 1-2 minutes)
- Downloads all required packages
- You should see: `added X packages`

**Expected Output Example:**
```
added 78 packages, and audited 79 packages in 45s
...
```

### Step 2.7: Verify Installation
```bash
# Check if packages installed correctly
ls node_modules
```

**Should show many folders with package names**

### Step 2.8: Start the Backend Server
```bash
npm start
```

**Expected Output:**
```
Task Tracker API running on http://localhost:5000
```

**If you see an error:**
- "Port 5000 already in use" → Change PORT in .env file
- "Cannot find module" → Run `npm install` again
- "ECONNREFUSED" → MySQL is not running

### Step 2.9: Test Backend is Running
**In another terminal (keep backend running):**

```bash
curl http://localhost:5000/api/health
```

**Expected Output:**
```json
{"status":"OK","message":"Task Tracker API is running"}
```

**Alternative (if curl not available):**
```bash
npm install -g http-server
# Or just open in browser: http://localhost:5000/api/health
```

### Step 2.10: Keep Backend Running
✅ **Keep this terminal window open and running**
- You'll know it's working if you see the "running" message
- Don't close this window while developing

---

## ✅ Phase 3: Frontend Setup & Start

### Step 3.1: Open Another New Terminal Window
**Keep both previous terminals running**

### Step 3.2: Navigate to Frontend Directory
```bash
cd "/home/ajay/my folder/Task Tracker App (devops project)/frontend"
```

### Step 3.3: Verify You're in Frontend Folder
```bash
ls
# or
dir
```

**Expected Output:**
```
css/
index.html
js/
```

### Step 3.4: Check index.html File
```bash
cat index.html
# or just verify it exists
ls -la index.html
```

### Step 3.5: Verify API URL in JavaScript
```bash
# Check if API URL points to backend
cat js/app.js | grep "API_URL"
```

**Expected Output:**
```
const API_URL = 'http://localhost:5000/api';
```

**If it's different, edit it:**
```bash
nano js/app.js
# Find the line with API_URL
# Make sure it says: http://localhost:5000/api
```

### Step 3.6: Start Frontend Server (Option A: Using Python)
```bash
python -m http.server 8000
```

**Expected Output:**
```
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

**Python not available?** Go to Step 3.7

### Step 3.7: Start Frontend Server (Option B: Using Node.js)
If Python didn't work:

```bash
npx serve
```

**Expected Output:**
```
   ┌─────────────────────────────┐
   │   Accepting connections at:  │
   │      http://localhost:3000   │
   └─────────────────────────────┘
```

**Note the port number (usually 3000 or 5000)**

### Step 3.8: Start Frontend Server (Option C: Using NPX HTTP-Server)
```bash
npx http-server
```

**Expected Output:**
```
Starting up http-server, serving ./
Hit CTRL-C to stop the server
http://0.0.0.0:8080
```

### Step 3.9: Keep Frontend Running
✅ **Keep this terminal window open**

---

## ✅ Phase 4: Access the Application

### Step 4.1: Open Your Browser
- **Chrome**, **Firefox**, **Safari**, or **Edge**

### Step 4.2: Navigate to Frontend URL
Based on what you used in Step 3:

```
http://localhost:8000
```

Or if different:
```
http://localhost:3000   (if using 'serve')
http://localhost:8080   (if using 'http-server')
```

### Step 4.3: Verify Application Loads
✅ You should see:
- "📋 Task Tracker" header
- "Projects" and "All Tasks" tabs
- A list of 3 sample projects

### Step 4.4: Test Creating a Project
1. Click "Projects" tab
2. Click "+ New Project" button
3. Fill in:
   - Project Name: "Test Project"
   - Description: "My first test"
4. Click "Create" button
5. New project should appear in the list

### Step 4.5: Test Creating a Task
1. Click "All Tasks" tab
2. Click "+ New Task" button
3. Fill in:
   - Select Project: Choose one from dropdown
   - Task Title: "Test Task"
   - Description: "My first task"
   - Priority: Medium
   - Due Date: Any future date
4. Click "Create" button
5. Task should appear in the list

### Step 4.6: Test Task Status Update
1. Find a task in the list
2. Click the status dropdown (shows "To Do", "In Progress", "Done")
3. Select different status
4. Status should update immediately

### Step 4.7: Test View Project Details
1. Click on any project card
2. Click "View" button
3. A modal should pop up showing project details and tasks

---

## ✅ Phase 5: Verification Checklist

- [ ] MySQL is running and accessible
- [ ] `task_tracker` database created with 2 tables
- [ ] Sample data inserted (3 projects, 5 tasks)
- [ ] Backend server running on port 5000
- [ ] Backend health check works (`/api/health`)
- [ ] Frontend server running (port 8000/3000/8080)
- [ ] Application loads in browser
- [ ] Can create new projects
- [ ] Can create new tasks
- [ ] Can update task status
- [ ] Can view project details
- [ ] No error messages in browser console

---

## 📊 Terminal Windows Status

### After Complete Setup, You Should Have:

**Terminal 1 (MySQL):**
- ✅ Closed (used only for setup)

**Terminal 2 (Backend):**
```
✅ RUNNING
Task Tracker API running on http://localhost:5000
```

**Terminal 3 (Frontend):**
```
✅ RUNNING
Serving HTTP on 0.0.0.0 port 8000
```

**Browser:**
```
✅ OPEN
http://localhost:8000
📋 Task Tracker App visible and working
```

---

## 🔧 Troubleshooting - Common Issues

### Issue: MySQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**Solution:**
```bash
# Start MySQL
sudo systemctl start mysql        # Linux
brew services start mysql        # Mac
net start MySQL80               # Windows

# Verify
mysql -u root -p
# Type password and press Enter
```

### Issue: Port 5000 Already in Use
```
Error: listen EADDRINUSE :::5000
```

**Solution:**
```bash
# Find what's using port 5000
lsof -i :5000              # Mac/Linux
netstat -ano | findstr :5000   # Windows

# Kill the process
kill -9 <PID>              # Mac/Linux
taskkill /PID <PID> /F    # Windows

# Or change port in backend/.env
PORT=5001
```

### Issue: npm install Takes Forever
```bash
# Clear cache and try again
npm cache clean --force
npm install
```

### Issue: Dependencies Not Installing
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Python not found" for Frontend
```bash
# Use Node.js instead
npx serve
# or
npx http-server
```

### Issue: API Calls Showing CORS Error
**Check:**
1. Backend is running on port 5000
2. Frontend API_URL in js/app.js points to `http://localhost:5000/api`
3. Check browser console for exact error

### Issue: "Cannot GET /api/projects"
```bash
# Backend is not running or API is down
# Check Terminal 2 (Backend terminal)
# Restart backend:
# 1. Press Ctrl+C to stop
# 2. Run: npm start
```

### Issue: Blank Page or "Loading" Forever
```bash
# Check browser console (F12)
# Look for red error messages
# Common causes:
# - Backend not running
# - Wrong API_URL in js/app.js
# - MySQL not running
```

---

## 🔄 Daily Development Workflow

After initial setup, each day:

### Step 1: Start MySQL (if not auto-start)
```bash
sudo systemctl start mysql    # Linux
brew services start mysql    # Mac
```

### Step 2: Open Terminal 1 - Start Backend
```bash
cd "/home/ajay/my folder/Task Tracker App (devops project)/backend"
npm start
```

### Step 3: Open Terminal 2 - Start Frontend
```bash
cd "/home/ajay/my folder/Task Tracker App (devops project)/frontend"
python -m http.server 8000
```

### Step 4: Open Browser
```
http://localhost:8000
```

### Step 5: Start Developing!

---

## 📝 Making Changes

### Editing Backend Code
1. Edit files in `backend/` folder
2. Restart backend (Ctrl+C, then `npm start`)
3. Test API with browser or curl

### Editing Frontend Code
1. Edit files in `frontend/` folder
2. Refresh browser (F5 or Ctrl+R)
3. Changes show immediately

### Editing Database Schema
1. Edit `database/schema.sql`
2. Delete database: `DROP DATABASE task_tracker;`
3. Re-import: `SOURCE ./database/schema.sql;`

---

## 🛑 Stopping Everything

### Stop Backend
In Backend Terminal: Press `Ctrl + C`

### Stop Frontend
In Frontend Terminal: Press `Ctrl + C`

### Stop MySQL
```bash
sudo systemctl stop mysql      # Linux
brew services stop mysql      # Mac
```

---

## 🎯 Summary

**3 Terminals Running:**
1. ✅ MySQL (setup phase only)
2. ✅ Backend on port 5000 (`npm start`)
3. ✅ Frontend on port 8000 (`python -m http.server 8000`)

**Result:**
- 📋 Task Tracker App at `http://localhost:8000`
- ⚡ Full development environment ready
- 🔄 Hot-reload for frontend (just refresh)
- 🔧 Backend requires restart for code changes

**Happy Developing!** 🚀
