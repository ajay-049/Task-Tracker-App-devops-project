# 📋 Task Tracker App
## End-to-End Enterprise Cloud Deployment Pipeline

A **production-grade** Project Management / Task Tracker application showcasing advanced **DevOps**, **SRE**, and **Infrastructure as Code** practices. This project demonstrates enterprise-level containerization, cloud infrastructure provisioning, CI/CD automation, and real-time observability.

---

## 🏗️ Enterprise Architecture Overview

This project implements a **complete cloud-native deployment pipeline** with the following architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Repository                         │
│                   (Code + Terraform IaC)                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ├─────────────────────┐
                     │                     │
         ┌───────────▼────────┐   ┌───────▼─────────┐
         │  CI/CD Pipeline    │   │  Local Dev      │
         │  (GitHub Actions)  │   │  (Docker Compose)
         │                    │   └────────────────┘
         ├─ Build Images      │
         ├─ Push to DockerHub │
         └────────┬───────────┘
                  │
         ┌────────▼──────────────────┐
         │  AWS Cloud Deployment     │
         │  (Terraform + EC2)        │
         ├─ Provision Infrastructure │
         ├─ Deploy Containers       │
         ├─ Configure Security      │
         └────────┬──────────────────┘
                  │
         ┌────────▼────────────────────┐
         │  Observability & Monitoring │
         │  (Prometheus + Grafana)    │
         ├─ Metrics Collection        │
         ├─ Real-time Dashboards      │
         └────────────────────────────┘
```

### Architecture Components

| Component | Technology | Purpose | Port |
|-----------|-----------|---------|------|
| **Frontend** | Nginx + HTML/CSS/JS | Web UI | 80 |
| **Backend** | Node.js + Express | REST API | 5000 |
| **Database** | MySQL 8.0 | Data Persistence | 3306 |
| **Containerization** | Docker | Container Runtime | - |
| **Orchestration** | Docker Compose | Multi-container Orchestration | - |
| **Infrastructure** | Terraform | IaC for AWS EC2 | - |
| **CI/CD** | GitHub Actions | Automated Builds & Deployments | - |
| **Metrics** | Prometheus | Time-series Metrics Collection | 9090 |
| **Visualization** | Grafana | Real-time Dashboards | 3000 |
| **Node Monitoring** | Node Exporter | Server Health Metrics | 9100 |

---

## ⚙️ Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript + Nginx
- **Database**: MySQL 8.0
- **API**: RESTful API with JSON responses
- **Containerization**: Docker & Docker Compose
- **Infrastructure**: Terraform (AWS EC2, Security Groups)
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana + Node Exporter
- **Cloud**: AWS (t3.micro instances, EC2)

---

## 📁 Project Structure


```
task-tracker-app/
├── backend/                      # Node.js + Express API
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── controllers/
│   │   ├── projectController.js  # Project business logic
│   │   └── taskController.js     # Task business logic
│   ├── routes/
│   │   ├── projects.js           # Project endpoints
│   │   └── tasks.js              # Task endpoints
│   ├── Dockerfile                # Backend container image
│   ├── .env                      # Environment variables
│   ├── server.js                 # Main server file
│   └── package.json              # Dependencies
├── frontend/                     # Nginx + HTML/CSS/JS UI
│   ├── css/
│   │   └── style.css             # Styling
│   ├── js/
│   │   └── app.js                # JavaScript logic
│   ├── Dockerfile                # Frontend container image
│   ├── nginx.conf                # Nginx configuration
│   └── index.html                # Main HTML file
├── database/
│   └── schema.sql                # Database schema
├── terraform/                    # Infrastructure as Code
│   ├── main.tf                   # AWS EC2 + Security Groups
│   ├── terraform.tfstate         # Terraform state file
│   └── terraform.tfstate.backup  # Backup state
├── docker-compose.yml            # Multi-container orchestration
├── prometheus.yml                # Prometheus scrape config
├── .github/
│   └── workflows/
│       └── ci-cd.yml             # GitHub Actions pipeline
└── README.md                     # This file
```

---

## 🚀 Quick Start

### Local Development Setup (Docker Compose)

The fastest way to get started locally with all services running in containers:

#### Prerequisites

- Docker ([Install](https://docs.docker.com/get-docker/))
- Docker Compose ([Install](https://docs.docker.com/compose/install/))
- Git

#### Step 1: Clone & Navigate

```bash
git clone https://github.com/yourusername/task-tracker-app.git
cd task-tracker-app
```

#### Step 2: Build & Start Services

```bash
# Build all images
docker-compose build

# Start all services (MySQL, Backend, Frontend, Prometheus, Grafana)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Step 3: Access Services

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost |
| **Backend API** | http://localhost:5000 |
| **Prometheus Metrics** | http://localhost:9090 |
| **Grafana Dashboards** | http://localhost:3000 |
| **MySQL Database** | localhost:3306 |

#### Useful Docker Commands

```bash
# View running containers
docker-compose ps

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Execute commands in container
docker-compose exec backend npm run dev
docker-compose exec db mysql -u root -proot task_tracker < database/schema.sql

# Rebuild specific service
docker-compose build --no-cache frontend
```

---

## ☁️ Production Cloud Deployment (AWS + Terraform)

Deploy to AWS EC2 with full infrastructure provisioning via Terraform:

#### Prerequisites

- AWS Account with credentials configured
- Terraform ([Install](https://www.terraform.io/downloads))
- Docker Hub Account (for image registry)

#### Step 1: Configure Terraform

Update `terraform/main.tf` with your AWS credentials and region:

```hcl
provider "aws" {
  region = "us-east-1"
  # Or use AWS_PROFILE environment variable
}
```

#### Step 2: Prepare Docker Images

```bash
# Build images
docker-compose build

# Tag images for Docker Hub
docker tag task-tracker-app:backend yourusername/task-tracker-backend:latest
docker tag task-tracker-app:frontend yourusername/task-tracker-frontend:latest

# Push to Docker Hub
docker push yourusername/task-tracker-backend:latest
docker push yourusername/task-tracker-frontend:latest
```

#### Step 3: Provision Infrastructure

```bash
cd terraform

# Initialize Terraform
terraform init

# Plan deployment
terraform plan

# Apply configuration (provisions EC2, Security Groups, RDS)
terraform apply

# Get outputs (Instance IP, Security Group ID, etc.)
terraform output
```

#### Step 4: Deploy Containers to EC2

```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@<instance-ip>

# Install Docker & Docker Compose on EC2
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ec2-user

# Clone repository and start services
git clone https://github.com/yourusername/task-tracker-app.git
cd task-tracker-app
docker-compose pull
docker-compose up -d
```

#### Step 5: Clean Up (Destroy Infrastructure)

```bash
# Destroy all AWS resources (EC2, Security Groups, etc.)
terraform destroy

# Confirm when prompted
# Type: yes
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Automated build, test, and deployment on every push to `main`:

### Workflow Steps

1. **Trigger**: Code pushed to `main` branch
2. **Build**: Docker images built for backend and frontend
3. **Push**: Images pushed to Docker Hub with `latest` tag and commit SHA
4. **Test**: Optional: Run test suite
5. **Status**: Workflow status visible in GitHub PR/Commit

### GitHub Actions Configuration

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_HUB_USERNAME }}
          password: ${{ secrets.DOCKER_HUB_TOKEN }}
      
      - name: Build & Push Backend
        run: |
          docker build -t yourusername/task-tracker-backend:latest ./backend
          docker push yourusername/task-tracker-backend:latest
      
      - name: Build & Push Frontend
        run: |
          docker build -t yourusername/task-tracker-frontend:latest ./frontend
          docker push yourusername/task-tracker-frontend:latest
```

### Setup CI/CD

1. Add secrets to GitHub repository:
   - `DOCKER_HUB_USERNAME`
   - `DOCKER_HUB_TOKEN`

2. Create `.github/workflows/ci-cd.yml` file

3. Push code - workflow runs automatically!

---

## 📊 Monitoring & Observability

### Prometheus + Grafana Setup

Real-time monitoring of application performance, infrastructure health, and business metrics.

#### Architecture

```
┌──────────────────┐
│   Application    │
│   (Node.js)      │ ─────┐
└──────────────────┘      │
                          ├─► Prometheus (9090)
┌──────────────────┐      │       ↓
│  Node Exporter   │ ─────┘   Grafana (3000)
│  (Server Metrics)│           Dashboards
└──────────────────┘
```

#### Services

**Prometheus (Port 9090)**
- Scrapes metrics from application and Node Exporter
- Stores time-series data
- Configuration: `prometheus.yml`

**Grafana (Port 3000)**
- Visualizes Prometheus metrics
- Pre-configured dashboards
- Default login: `admin` / `admin`

**Node Exporter (Port 9100)**
- Collects system metrics (CPU, Memory, Disk, Network)
- Runs as Docker service in compose file
- Internal Docker DNS: `http://node-exporter:9100/metrics`

#### Pre-configured Dashboards

| Dashboard | Metrics | Use Case |
|-----------|---------|----------|
| **System Health** | CPU, Memory, Disk | Server resource usage |
| **Application Performance** | Request rate, Latency, Errors | API performance |
| **Database** | Connections, Queries | Database health |
| **Network** | Traffic in/out, Errors | Network performance |

#### Access Dashboards

```bash
# After docker-compose up
# Open browser
open http://localhost:3000

# Login with default credentials
# Username: admin
# Password: admin

# Add Prometheus data source:
# URL: http://prometheus:9090
```

#### Application Metrics Endpoints

```bash
# View application metrics
curl http://localhost:5000/metrics

# Prometheus scrape endpoint
curl http://localhost:9090/api/v1/targets
```

#### Custom Metrics Example

```javascript
// backend/server.js - Expose custom metrics
const client = require('prom-client');

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});
```

---

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

## 🔧 Troubleshooting & Operations

### Docker & Docker Compose Issues

#### Container won't start

```bash
# Check logs
docker-compose logs backend

# Validate compose file
docker-compose config

# Rebuild images from scratch
docker-compose build --no-cache

# Remove orphaned containers
docker-compose down --remove-orphans
docker-compose up -d
```

#### Port conflicts

```bash
# Find process using port
lsof -i :5000    # Backend
lsof -i :80      # Frontend
lsof -i :9090    # Prometheus
lsof -i :3000    # Grafana

# Kill process
kill -9 <PID>

# Or modify docker-compose.yml ports:
# ports: ["8080:5000"]  # Redirect to 8080
```

#### Container networking issues

```bash
# Inspect network
docker network ls
docker network inspect task-tracker-app_default

# Test DNS resolution between containers
docker-compose exec backend ping frontend
docker-compose exec backend ping db

# Container internal DNS (use this in connection strings):
# MySQL: mysql://db:3306/task_tracker
# Prometheus: http://prometheus:9090
```

### Terraform & AWS Issues

#### Infrastructure won't provision

```bash
# Validate Terraform syntax
cd terraform
terraform validate

# Format HCL files
terraform fmt

# View detailed logs
TF_LOG=DEBUG terraform plan
```

#### Destroy infrastructure safely

```bash
# Plan destruction first
terraform plan -destroy

# Destroy all resources
terraform destroy

# Destroy specific resource
terraform destroy -target aws_instance.app_server
```

#### State file issues

```bash
# List resources in state
terraform state list

# View specific resource state
terraform state show aws_instance.app_server

# Remove resource from state (without destroying it)
terraform state rm aws_instance.old_server

# Backup before major changes
cp terraform.tfstate terraform.tfstate.backup
```

### Monitoring & Observability Issues

#### Prometheus not scraping metrics

```bash
# Check targets
curl http://localhost:9090/api/v1/targets

# Verify scrape config
curl http://localhost:9090/api/v1/config

# Check container logs
docker-compose logs prometheus
```

#### Grafana dashboards not showing data

```bash
# Verify Prometheus data source
# In Grafana: Configuration → Data Sources → Prometheus

# Test Prometheus query
curl 'http://localhost:9090/api/v1/query?query=up'

# Check if metrics are being collected
docker-compose exec prometheus promtool query instant 'up'
```

#### Application metrics not exposing

```bash
# Verify metrics endpoint
curl http://localhost:5000/metrics

# Check if prometheus-client is installed
docker-compose exec backend npm list prom-client

# Restart backend service
docker-compose restart backend
```

### Application Issues

#### Backend won't connect to database

```bash
# Check database is running
docker-compose ps db

# Test database connection from backend container
docker-compose exec backend mysql -h db -u root -proot task_tracker -e "SELECT 1;"

# Verify environment variables
docker-compose exec backend env | grep DB_

# Check connection logs
docker-compose logs db
```

#### CORS errors in frontend

```bash
# Verify backend is running
curl -I http://localhost:5000

# Check backend CORS configuration
curl -H "Origin: http://localhost" http://localhost:5000/api/projects

# Backend CORS middleware should include:
# app.use(cors());
# or specific origin: app.use(cors({ origin: 'http://localhost' }));
```

#### Database schema not initialized

```bash
# Manually run schema
docker-compose exec db mysql -u root -proot task_tracker < database/schema.sql

# Verify tables exist
docker-compose exec db mysql -u root -proot task_tracker -e "SHOW TABLES;"

# Check schema file
cat database/schema.sql | head -20
```

### CI/CD Pipeline Issues

#### GitHub Actions not running

```bash
# Check workflow syntax
# Validate YAML: .github/workflows/ci-cd.yml

# Verify secrets are set
# GitHub → Settings → Secrets & Variables → Actions

# Required secrets:
# - DOCKER_HUB_USERNAME
# - DOCKER_HUB_TOKEN
```

#### Docker Hub push fails

```bash
# Verify Docker Hub credentials
docker login

# Check image name format
docker images | grep task-tracker

# Tag image correctly
docker tag task-tracker-app:backend yourusername/task-tracker-backend:latest

# Push manually
docker push yourusername/task-tracker-backend:latest
```

### Useful DevOps Commands

```bash
# View all resources
docker-compose ps -a

# Full system cleanup
docker-compose down -v --remove-orphans
docker system prune -a

# Health check
curl http://localhost:5000/api/health
curl http://localhost:9090/-/healthy

# Backup data
docker-compose exec db mysqldump -u root -proot task_tracker > backup.sql

# Restore data
docker-compose exec -T db mysql -u root -proot task_tracker < backup.sql

# View resource usage
docker stats

# Get inside container shell
docker-compose exec backend /bin/bash
docker-compose exec db /bin/bash
```

---

## � Environment Variables & Configuration

### Backend (.env)

```env
# Database Configuration
DB_HOST=db
DB_USER=root
DB_PASSWORD=root
DB_NAME=task_tracker
DB_PORT=3306

# Server Configuration
PORT=5000
NODE_ENV=production

# Prometheus Metrics
METRICS_ENABLED=true
```

### Terraform Variables (terraform/terraform.tfvars)

```hcl
aws_region           = "us-east-1"
instance_type        = "t3.micro"
key_pair_name        = "your-aws-key-pair"
allowed_ssh_cidr     = ["0.0.0.0/0"]  # Restrict in production!
```

### Docker Environment (docker-compose.yml)

```yaml
environment:
  - DB_HOST=db
  - DB_USER=root
  - DB_PASSWORD=${DB_PASSWORD:-root}
  - ENVIRONMENT=development
```

---

## 🛡️ Security & Best Practices

### Infrastructure Security (Terraform)

- ✅ **Security Groups**: Configured to allow only necessary ports
- ✅ **IAM Roles**: Apply principle of least privilege
- ✅ **Encryption**: Enable EBS encryption for data at rest
- ✅ **VPC**: Use private subnets for databases

```hcl
# Example: Restrict backend access
ingress {
  from_port   = 5000
  to_port     = 5000
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]  # Change to specific IPs in production
}
```

### Container Security (Docker)

- ✅ **Non-root Users**: Run containers as non-root
- ✅ **Read-only Filesystems**: Use read-only root filesystem where possible
- ✅ **Resource Limits**: Set CPU and memory limits

```dockerfile
# Example: Run as non-root user
FROM node:18-alpine
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs
```

### Application Security

- ✅ **CORS Configuration**: Whitelist allowed origins
- ✅ **Input Validation**: Validate all API inputs
- ✅ **SQL Injection Prevention**: Use parameterized queries
- ✅ **Rate Limiting**: Implement API rate limiting
- ✅ **Secrets Management**: Use environment variables for sensitive data

```javascript
// Parameterized query example
const query = 'SELECT * FROM projects WHERE id = ?';
db.query(query, [projectId], (err, result) => {
  // ...
});
```

### Monitoring Security

- ✅ **Prometheus Authentication**: Add reverse proxy with authentication
- ✅ **Grafana RBAC**: Configure user roles and permissions
- ✅ **Audit Logs**: Enable all services to log authentication events

---

## 📈 Performance Optimization

### Application Performance

```javascript
// Implement caching
const cache = require('memory-cache');

app.get('/api/projects', (req, res) => {
  const cached = cache.get('projects');
  if (cached) {
    return res.json(cached);
  }
  
  // Fetch from database
  db.query('SELECT * FROM projects', (err, data) => {
    cache.put('projects', data, 5 * 60 * 1000); // 5 min TTL
    res.json(data);
  });
});
```

### Database Optimization

- ✅ **Indexing**: Create indexes on frequently queried columns
- ✅ **Query Optimization**: Use EXPLAIN to analyze slow queries
- ✅ **Connection Pooling**: Use connection pools (e.g., mysql2/promise)

```sql
-- Add indexes
CREATE INDEX idx_project_id ON tasks(project_id);
CREATE INDEX idx_task_status ON tasks(status);
```

### Container & Infrastructure Optimization

- ✅ **Multi-stage builds**: Reduce image sizes
- ✅ **Caching layers**: Optimize Docker build cache
- ✅ **Resource limits**: Set appropriate CPU/memory limits
- ✅ **Auto-scaling**: Configure Auto Scaling Groups in AWS

```yaml
# Docker Compose resource limits
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

---

## 🚀 Advanced Deployment Scenarios

### Blue-Green Deployment

```bash
# Deploy to green environment
terraform workspace new green
terraform apply

# Switch traffic to green
aws elbv2 modify-target-group-attributes \
  --target-group-arn <green-tg-arn> \
  --attributes Key=stickiness.enabled,Value=true

# Destroy blue environment
terraform workspace select blue
terraform destroy
```

### Canary Deployment

Use Prometheus metrics to gradually shift traffic to new version:

```yaml
# Grafana alert for canary health
alert: CanaryErrorRateHigh
expr: rate(http_requests_total{job="canary",status="5xx"}[5m]) > 0.05
for: 5m
```

### Disaster Recovery

```bash
# Automated backup
0 2 * * * mysqldump -u root -proot task_tracker | gzip > /backups/$(date +\%Y\%m\%d).sql.gz

# Restore from backup
gunzip < /backups/20260507.sql.gz | mysql -u root -proot task_tracker
```

---

## 📊 Sample API Requests

### Create a Project

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Q2 Roadmap",
    "description": "Platform improvements for Q2 2026"
  }'
```

### Create a Task

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "project_id": 1,
    "title": "Implement caching",
    "description": "Add Redis caching layer",
    "priority": "high",
    "due_date": "2026-06-15"
  }'
```

### Update Task Status

```bash
curl -X PATCH http://localhost:5000/api/tasks/5/status \
  -H "Content-Type: application/json" \
  -d '{"status": "in_progress"}'
```

### Get Metrics

```bash
# Prometheus metrics
curl http://localhost:5000/metrics

# Prometheus API query
curl 'http://localhost:9090/api/v1/query?query=container_memory_usage_bytes'
```

---

## 🎨 Customization & Extensibility

### Frontend Customization

- **Colors**: Edit CSS variables in [frontend/css/style.css](frontend/css/style.css)
- **API URL**: Configure in [frontend/js/app.js](frontend/js/app.js)
- **UI Components**: Add responsive Bootstrap/Tailwind

### Backend Customization

- **Database**: Change connection settings in [backend/config/db.js](backend/config/db.js)
- **Routes**: Add new API endpoints in [backend/routes/](backend/routes/)
- **Middleware**: Implement authentication, logging, etc.

### Infrastructure Customization

- **AWS Resources**: Modify [terraform/main.tf](terraform/main.tf)
- **Container Config**: Update [docker-compose.yml](docker-compose.yml)
- **Monitoring**: Customize [prometheus.yml](prometheus.yml)

---

## 🤖 Future Enhancements

- 🔄 **Kubernetes Migration**: Move from Docker Compose to EKS
- 🔐 **RBAC & Authentication**: Implement JWT/OAuth2
- 📱 **Mobile App**: React Native cross-platform app
- 🤖 **AI Integration**: Task prioritization using ML
- 📞 **Notifications**: Email/Slack alerts for task changes
- 🔍 **Full-text Search**: Elasticsearch integration
- 📈 **Advanced Analytics**: BI dashboards with data aggregation
- 🌍 **Multi-region**: Active-active deployment

---

## 📚 Learning Resources

### DevOps & SRE
- [Linux Academy DevOps](https://www.pluralsight.com/paths/devops-engineer)
- [Docker Mastery](https://www.udemy.com/course/docker-mastery/)
- [Terraform Associate](https://www.hashicorp.com/certification/terraform-associate)
- [Prometheus & Grafana](https://prometheus.io/docs/tutorials/getting_started/)

### Cloud & Infrastructure
- [AWS Solutions Architect](https://aws.amazon.com/certification/)
- [Kubernetes (K8s)](https://kubernetes.io/docs/tutorials/)
- [Infrastructure as Code](https://www.terraform.io/language)

### Best Practices
- [12 Factor App](https://12factor.net/)
- [Cloud Native Computing](https://www.cncf.io/)
- [SRE Books](https://sre.google/books/)

---

## 📄 License

MIT License - Feel free to use this project for learning, commercial use, or as a template for your DevOps portfolio!

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 💬 Support & Questions

- **Issues**: Open a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact for consulting/support inquiries
- **LinkedIn**: Connect for networking opportunities

---

## 📌 Key DevOps Metrics Tracked

| Metric | Target | Tool |
|--------|--------|------|
| **Deployment Frequency** | 1+ per day | GitHub Actions |
| **Mean Lead Time** | < 1 hour | CI/CD Pipeline |
| **Mean Time to Recovery** | < 30 min | Monitoring Alerts |
| **Change Failure Rate** | < 15% | Automated Testing |
| **System Uptime** | 99.9% | Prometheus/Grafana |

---

## 🏆 DevOps Highlights

This project demonstrates mastery of:

✨ **Infrastructure as Code** - Terraform provisioning of cloud infrastructure
✨ **Containerization** - Multi-container orchestration with Docker Compose  
✨ **CI/CD Automation** - GitHub Actions for automated builds & deployments
✨ **Observability** - Prometheus metrics + Grafana dashboards
✨ **Cloud Architecture** - AWS EC2 deployment with security best practices
✨ **DevOps Tooling** - Docker, Terraform, Docker Hub, GitHub Actions
✨ **SRE Practices** - Health checks, monitoring, logging, and troubleshooting
✨ **Production-Ready** - Security, performance optimization, disaster recovery

---

## 🎯 Quick Navigation

| Resource | Link |
|----------|------|
| [API Documentation](API_DOCS.md) | Complete API reference |
| [Local Development](LOCAL_DEVELOPMENT_GUIDE.md) | Step-by-step local setup |
| [Production Deployment](DEPLOYMENT.md) | AWS & Terraform guide |
| [Project Overview](PROJECT_OVERVIEW.md) | Full project details |
| [Setup Checklist](SETUP_CHECKLIST.md) | Installation checklist |

---

**Built with ❤️ by DevOps Engineers • Enterprise-Grade • Production-Ready**

🚀 **Ready to deploy? Start with: `docker-compose up`**
