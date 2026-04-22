# 🎯 Quick Reference Card

**Print this page and keep it handy while setting up!**

---

## 📍 PROJECT LOCATION
```
/home/ajay/my folder/Task Tracker App (devops project)
```

---

## 🗂️ KEY FILES & FOLDERS

```
backend/                    → Backend code (Node.js + Express)
  ├─ server.js             → Main server file
  ├─ .env                  → Database credentials
  ├─ package.json          → Dependencies
  └─ npm start             → Start backend

frontend/                   → Frontend code (HTML + CSS + JS)
  ├─ index.html            → Main page
  ├─ css/style.css         → Styling
  ├─ js/app.js             → Client code
  └─ python -m http...     → Start frontend

database/
  └─ schema.sql            → Create tables & sample data
```

---

## ⚙️ SETUP COMMANDS (Copy & Paste)

### Step 1: Database
```bash
mysql -u root -p < database/schema.sql
```
**Password:** `root` (or your MySQL password)

### Step 2: Backend (Terminal 1)
```bash
cd backend && npm install && npm start
```
**Wait for:** "running on http://localhost:5000"

### Step 3: Frontend (Terminal 2)
```bash
cd frontend && python -m http.server 8000
```
**Wait for:** "Serving HTTP on port 8000"

### Step 4: Browser
```
http://localhost:8000
```

---

## 🚀 DAILY STARTUP

Each day, run these 2 commands in 2 terminals:

**Terminal 1:**
```bash
cd backend && npm start
```

**Terminal 2:**
```bash
cd frontend && python -m http.server 8000
```

**Browser:**
```
http://localhost:8000
```

---

## 🧪 QUICK TESTS

### Test Backend is Working
```bash
curl http://localhost:5000/api/health
```

### Test API - Get All Projects
```bash
curl http://localhost:5000/api/projects
```

### Test API - Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test project"}'
```

---

## 📊 DEFAULT CREDENTIALS

| Service | Host | Port | User | Password |
|---------|------|------|------|----------|
| MySQL | localhost | 3306 | root | root |
| Backend | localhost | 5000 | - | - |
| Frontend | localhost | 8000 | - | - |

---

## 🛑 STOPPING EVERYTHING

**Terminal 1 (Backend):**
```
Ctrl + C
```

**Terminal 2 (Frontend):**
```
Ctrl + C
```

---

## ⚡ COMMON COMMANDS

| Task | Command |
|------|---------|
| Install dependencies | `cd backend && npm install` |
| Start backend | `cd backend && npm start` |
| Start frontend | `cd frontend && python -m http.server 8000` |
| Check Node version | `node --version` |
| Check MySQL version | `mysql --version` |
| Open MySQL CLI | `mysql -u root -p` |
| Kill port 5000 | `lsof -ti:5000 \| xargs kill -9` |
| Kill port 8000 | `lsof -ti:8000 \| xargs kill -9` |

---

## 🔧 ENVIRONMENT VARIABLES

**File:** `backend/.env`

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=task_tracker
```

---

## 📡 API ENDPOINTS

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get one project |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create task |
| PATCH | `/api/tasks/:id/status` | Update task status |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/health` | Check API status |

---

## 🗄️ DATABASE INFO

**Database:** `task_tracker`

**Tables:**
- `projects` (3 sample projects)
- `tasks` (5 sample tasks)

**Project Status:** `active`, `completed`, `archived`
**Task Status:** `todo`, `in_progress`, `done`
**Task Priority:** `low`, `medium`, `high`

---

## 📁 FILE STRUCTURE

```
Task Tracker App/
├── SETUP_GUIDES_INDEX.md      ← Start here for guides
├── QUICKSTART.md               ← Quick commands
├── LOCAL_DEVELOPMENT_GUIDE.md  ← Detailed steps
├── VISUAL_SETUP_GUIDE.md       ← ASCII diagrams
├── SETUP_CHECKLIST.md          ← Printable checklist
├── README.md                   ← Main docs
├── API_DOCS.md                 ← API reference
├── DEPLOYMENT.md               ← Production guide
├── backend/                    ← Backend code
├── frontend/                   ← Frontend code
├── database/schema.sql         ← Database setup
├── docker-compose.yml          ← Docker config
└── setup.sh / setup.bat        ← Auto setup
```

---

## ❌ COMMON ERRORS & FIXES

| Error | Fix |
|-------|-----|
| `Cannot connect to MySQL` | Start MySQL: `sudo systemctl start mysql` |
| `Port 5000 in use` | Change PORT in .env or kill process |
| `npm install fails` | Clear cache: `npm cache clean --force` |
| `Blank page in browser` | Check backend is running on port 5000 |
| `API returns 404` | Verify backend is running |
| `CORS error` | Check API_URL in js/app.js |
| `Module not found` | Run `npm install` in backend folder |

---

## 🌐 URLS

| Service | URL |
|---------|-----|
| Frontend | http://localhost:8000 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/api/health |
| MySQL | localhost:3306 |

---

## 📚 DOCUMENTATION

| Document | Purpose |
|----------|---------|
| SETUP_GUIDES_INDEX.md | Choose your setup guide |
| QUICKSTART.md | 5-minute quick start |
| LOCAL_DEVELOPMENT_GUIDE.md | Detailed micro-steps |
| VISUAL_SETUP_GUIDE.md | Visual walkthrough |
| SETUP_CHECKLIST.md | Printable checklist |
| README.md | Full documentation |
| API_DOCS.md | Complete API reference |
| DEPLOYMENT.md | Production deployment |

---

## 💡 QUICK TIPS

✅ Keep both terminal windows open while developing
✅ Refresh browser (F5) to test frontend changes
✅ Restart backend (Ctrl+C, npm start) for backend changes
✅ Check browser console (F12) for errors
✅ Use DevTools to debug JavaScript
✅ Use Postman to test API endpoints
✅ Keep database running in background
✅ Close all apps before system restart

---

## 🎯 QUICK CHECKLIST

After setup, verify:
- [ ] MySQL database `task_tracker` exists
- [ ] 2 tables: `projects` and `tasks`
- [ ] Backend running on port 5000
- [ ] Frontend running on port 8000
- [ ] Application loads at http://localhost:8000
- [ ] 3 sample projects visible
- [ ] 5 sample tasks visible
- [ ] Can create new projects
- [ ] Can create new tasks
- [ ] Can change task status

**All checked?** You're ready! ✅

---

## 🔗 USEFUL LINKS

- Node.js: https://nodejs.org/
- MySQL: https://dev.mysql.com/downloads/mysql/
- Express: https://expressjs.com/
- Postman: https://www.postman.com/

---

## 📞 NEED HELP?

1. **Read:** SETUP_GUIDES_INDEX.md (choose your learning style)
2. **Follow:** LOCAL_DEVELOPMENT_GUIDE.md (step-by-step)
3. **Check:** Troubleshooting sections in guides
4. **Review:** Console errors (F12 in browser)

---

## ⏱️ TIME ESTIMATES

| Task | Time |
|------|------|
| Prerequisites check | 5 min |
| Database setup | 5 min |
| Backend setup | 10 min |
| Frontend setup | 5 min |
| Browser testing | 5 min |
| **Total** | **~30 min** |

---

## 🎉 SUCCESS INDICATORS

✅ No red errors in console (F12)
✅ Projects page shows 3 sample projects
✅ Tasks page shows 5 sample tasks
✅ Can create new items
✅ Status updates work instantly
✅ Modal popup works
✅ API responds with data

---

**Keep this card handy!**

Print and pin it to your desk or save as PDF for reference during setup.

**Happy Coding!** 🚀

---

*Last Updated: April 2026*
*Task Tracker App v1.0*
