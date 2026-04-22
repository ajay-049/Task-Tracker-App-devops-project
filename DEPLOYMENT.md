# Deployment & Configuration Guide

## Environment Configuration

### Backend Environment Variables (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=task_tracker
DB_PORT=3306

# CORS (optional)
CORS_ORIGIN=*

# API
API_VERSION=1.0
```

### Production Environment Variables

For production deployment, update `.env` accordingly:

```env
# Server
PORT=5000
NODE_ENV=production

# Database
DB_HOST=prod-db.example.com
DB_USER=prod_user
DB_PASSWORD=strong_password_here
DB_NAME=task_tracker_prod
DB_PORT=3306

# CORS
CORS_ORIGIN=https://yourdomain.com

# Logging
LOG_LEVEL=error
```

---

## Database Configuration

### MySQL Best Practices

```sql
-- Create production user
CREATE USER 'taskuser'@'%' IDENTIFIED BY 'strong_password';
GRANT ALL PRIVILEGES ON task_tracker.* TO 'taskuser'@'%';
FLUSH PRIVILEGES;

-- Enable backups
-- Use mysqldump for regular backups
```

### Backup Strategy

```bash
# Daily backup script
#!/bin/bash
BACKUP_DIR="/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)

mysqldump -u root -p task_tracker > $BACKUP_DIR/task_tracker_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "task_tracker_*.sql" -mtime +7 -delete
```

---

## Docker Deployment

### Building Images

```bash
# Build backend image
docker build -t task-tracker-backend:latest ./backend

# Build with specific tag
docker build -t task-tracker-backend:v1.0 ./backend
```

### Docker Compose Production

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
    volumes:
      - mysql_data:/var/lib/mysql
    restart: always
    healthcheck:
      test: ["CMD", "mysqladmin", "ping"]

  backend:
    image: task-tracker-backend:latest
    environment:
      NODE_ENV: production
      PORT: 5000
      DB_HOST: mysql
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
    depends_on:
      mysql:
        condition: service_healthy
    restart: always

  frontend:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./frontend:/usr/share/nginx/html
      - ./ssl:/etc/nginx/ssl
    restart: always

volumes:
  mysql_data:
    driver: local
```

---

## Nginx Configuration for Production

```nginx
upstream backend {
    server backend:5000;
}

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    # SSL best practices
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
    gzip_min_length 1000;

    root /usr/share/nginx/html;
    index index.html;

    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";

    # Frontend
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api/ {
        proxy_pass http://backend/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## AWS Deployment

### Using EC2 and RDS

1. **Create RDS MySQL Instance**
   - Engine: MySQL 8.0
   - DB instance class: db.t3.micro (for testing)
   - Storage: 20GB
   - Multi-AZ: Yes (for production)

2. **Create EC2 Instance**
   - AMI: Ubuntu 20.04 LTS
   - Instance type: t3.small
   - Security group: Allow ports 80, 443, 5000

3. **Deploy Application**
   ```bash
   # SSH into EC2
   ssh -i your-key.pem ubuntu@your-instance-ip

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Clone repository
   git clone your-repo
   cd task-tracker-app

   # Install and start
   cd backend && npm install
   npm start
   ```

---

## Kubernetes Deployment

### Create ConfigMap

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DB_HOST: mysql
  DB_NAME: task_tracker
  NODE_ENV: production
```

### Create Secret

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  DB_USER: cHJvZF91c2Vy  # base64 encoded
  DB_PASSWORD: c3Ryb25nX3Bhc3N3b3Jk  # base64 encoded
```

### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: task-tracker-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: task-tracker-backend
  template:
    metadata:
      labels:
        app: task-tracker-backend
    spec:
      containers:
      - name: backend
        image: task-tracker-backend:latest
        ports:
        - containerPort: 5000
        envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

---

## Monitoring & Logging

### Using PM2 (for Node.js)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server.js --name "task-tracker"

# Create startup script
pm2 startup
pm2 save

# Monitor
pm2 monit
pm2 logs
```

### Log Rotation

```bash
# Install logrotate
sudo apt-get install logrotate

# Create /etc/logrotate.d/task-tracker
/var/log/task-tracker/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
    sharedscripts
}
```

---

## Performance Optimization

### Database Optimization

```sql
-- Add indexes
CREATE INDEX idx_project_id ON tasks(project_id);
CREATE INDEX idx_status ON tasks(status);
CREATE INDEX idx_due_date ON tasks(due_date);
CREATE INDEX idx_created_at ON projects(created_at);

-- Analyze tables
ANALYZE TABLE tasks;
ANALYZE TABLE projects;
```

### API Response Caching

```javascript
// Add caching middleware
const redis = require('redis');
const client = redis.createClient();

app.get('/api/projects', (req, res) => {
    const cacheKey = 'projects_list';
    
    client.get(cacheKey, (err, data) => {
        if (data) {
            return res.json(JSON.parse(data));
        }
        
        // Fetch from DB and cache for 5 minutes
        // ... fetch logic ...
        client.setex(cacheKey, 300, JSON.stringify(data));
    });
});
```

---

## Security Checklist

- [ ] Use HTTPS/SSL certificates
- [ ] Implement JWT authentication
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly (not *)
- [ ] Add security headers
- [ ] Keep dependencies updated
- [ ] Use strong database passwords
- [ ] Implement logging and monitoring
- [ ] Regular backups
- [ ] Update server OS regularly

---

## Scaling Strategy

1. **Vertical Scaling**
   - Increase server resources
   - Upgrade database tier

2. **Horizontal Scaling**
   - Load balancer (Nginx/HAProxy)
   - Multiple backend instances
   - Database replication

3. **Caching**
   - Redis for session storage
   - Redis for query caching
   - CDN for static assets

---

## Health Checks & Alerts

```bash
# Simple health check script
#!/bin/bash
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health)

if [ $RESPONSE != "200" ]; then
    # Send alert
    echo "API is down!" | mail -s "Alert" admin@example.com
fi
```

---

## Rollback Strategy

```bash
# Keep Docker images for quick rollback
docker tag task-tracker-backend:latest task-tracker-backend:v1.0
docker tag task-tracker-backend:latest task-tracker-backend:v1.1

# Rollback
docker run -d task-tracker-backend:v1.0
```
