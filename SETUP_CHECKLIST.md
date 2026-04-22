# ⚡ Quick Setup Checklist

Print this page and check off as you complete each step!

---

## 📋 PRE-SETUP (5 minutes)

### Prerequisites Check
- [ ] Node.js installed: `node --version` (v14+)
- [ ] npm installed: `npm --version` (v9+)
- [ ] MySQL installed: `mysql --version` (v5.7+)
- [ ] MySQL Server running
- [ ] Terminal/Command Prompt open

---

## 🗄️ PHASE 1: DATABASE (5 minutes)

### Setup Database
- [ ] Navigate to project folder
- [ ] Open MySQL: `mysql -u root -p`
- [ ] Create database: `CREATE DATABASE IF NOT EXISTS task_tracker;`
- [ ] Use database: `USE task_tracker;`
- [ ] Import schema: `SOURCE ./database/schema.sql;`
- [ ] Verify tables: `SHOW TABLES;` (should show 2 tables)
- [ ] Exit MySQL: `EXIT;`

---

## 🖥️ PHASE 2: BACKEND (10 minutes)

### Setup Backend
- [ ] Open Terminal 1
- [ ] Navigate to backend folder: `cd backend`
- [ ] Check .env file: `cat .env`
  - [ ] DB_HOST = localhost
  - [ ] DB_USER = root
  - [ ] DB_PASSWORD = (your password)
  - [ ] DB_NAME = task_tracker
  - [ ] PORT = 5000
- [ ] Install dependencies: `npm install` (wait for completion)
- [ ] Start backend: `npm start`
- [ ] Verify: See "running on http://localhost:5000" ✅

### Test Backend
- [ ] Open Terminal 2 (keep Terminal 1 running)
- [ ] Test health check: `curl http://localhost:5000/api/health`
- [ ] Should see: `{"status":"OK","message":"Task Tracker API is running"}`
- [ ] Close Terminal 2 (go back to monitoring Terminal 1)

---

## 🎨 PHASE 3: FRONTEND (5 minutes)

### Setup Frontend
- [ ] Open Terminal 3 (keep Terminals 1 & 2 running)
- [ ] Navigate to frontend folder: `cd frontend`
- [ ] Check API URL: `cat js/app.js | grep API_URL`
- [ ] Should show: `const API_URL = 'http://localhost:5000/api';`
- [ ] Start frontend (choose one):
  - [ ] Python: `python -m http.server 8000`
    - OR
  - [ ] Node: `npx serve`
    - OR
  - [ ] HTTP Server: `npx http-server`
- [ ] Verify: See "Serving HTTP on port 8000 (or 3000/8080)"

---

## 🌐 PHASE 4: BROWSER TEST (5 minutes)

### Access Application
- [ ] Open Browser (Chrome, Firefox, Safari, Edge)
- [ ] Go to: `http://localhost:8000`
  - (Or `http://localhost:3000` or `http://localhost:8080` if using different server)
- [ ] Should see: "📋 Task Tracker" header
- [ ] Should see: 3 sample projects listed

### Functional Tests
- [ ] Click "Projects" tab → See 3 projects ✅
- [ ] Click "All Tasks" tab → See 5 tasks ✅
- [ ] Click "+ New Project" button → Form appears ✅
- [ ] Fill in project name and click "Create" → Project appears ✅
- [ ] Click "+ New Task" button → Form appears ✅
- [ ] Select a project from dropdown ✅
- [ ] Fill in task details and click "Create" → Task appears ✅
- [ ] Click task status dropdown and change status ✅
- [ ] Click "View" on any project → Modal appears ✅

---

## ✅ FINAL STATUS

### Terminal Windows Status

**Terminal 1 (Backend):**
```
✅ RUNNING
Task Tracker API running on http://localhost:5000
```

**Terminal 2 (Frontend):**
```
✅ RUNNING
Serving HTTP on 0.0.0.0 port 8000
```

**Browser:**
```
✅ OPEN
http://localhost:8000
📋 Task Tracker App working!
```

---

## 🎉 SUCCESS INDICATORS

You're ready to develop when ALL are true:

- [ ] No red errors in browser console (F12)
- [ ] All 3 sample projects visible
- [ ] All 5 sample tasks visible
- [ ] Can create new projects
- [ ] Can create new tasks
- [ ] Task status dropdown works
- [ ] Project details modal opens
- [ ] Backend terminal shows no errors

---

## 🔧 QUICK TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| **MySQL won't start** | `sudo systemctl start mysql` |
| **Port 5000 in use** | Change PORT in backend/.env |
| **Dependencies error** | `npm install` again in backend folder |
| **Blank page** | Check browser console (F12), look for errors |
| **API not responding** | Verify backend terminal shows "running" |
| **Tasks not loading** | Check backend is running, MySQL is running |

---

## 📝 DAILY STARTUP SEQUENCE

After initial setup, every day:

```
1. Open Terminal 1
   cd backend && npm start
   ✅ Wait for "running on http://localhost:5000"

2. Open Terminal 2
   cd frontend && python -m http.server 8000
   ✅ Wait for "Serving HTTP on port 8000"

3. Open Browser
   http://localhost:8000
   ✅ Ready to develop!
```

---

## 🛑 STOPPING

```
Terminal 1: Press Ctrl+C (stops backend)
Terminal 2: Press Ctrl+C (stops frontend)
Browser: Close tab or window
MySQL: Optional (can stay running)
```

---

## 📚 NEED MORE HELP?

- **Full Guide**: See `LOCAL_DEVELOPMENT_GUIDE.md`
- **API Reference**: See `API_DOCS.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Quick Start**: See `QUICKSTART.md`

---

**Time to Setup: ~30 minutes**
**Difficulty: ⭐ Easy**
**Ready to Code: YES! ✅**

---

**Questions?** Check the troubleshooting section or review the full LOCAL_DEVELOPMENT_GUIDE.md
