#!/bin/bash

# Task Tracker App - Setup Script
# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Task Tracker App - Setup Script       ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Function to print status
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    print_status "Node.js installed: $NODE_VERSION"
else
    print_error "Node.js not found. Please install Node.js v14 or higher"
    exit 1
fi

# Check MySQL
if command -v mysql &> /dev/null; then
    print_status "MySQL installed"
else
    print_info "MySQL not found. Please ensure MySQL server is running separately"
fi

echo ""
echo -e "${YELLOW}Setting up backend...${NC}"

# Setup backend
cd backend

if [ -d "node_modules" ]; then
    print_info "Dependencies already installed"
else
    print_info "Installing dependencies..."
    npm install
    if [ $? -eq 0 ]; then
        print_status "Backend dependencies installed"
    else
        print_error "Failed to install backend dependencies"
        exit 1
    fi
fi

# Check .env file
if [ -f ".env" ]; then
    print_status ".env file exists"
else
    print_error ".env file not found"
    exit 1
fi

cd ..

echo ""
echo -e "${YELLOW}Checking frontend files...${NC}"

# Check frontend files
if [ -f "frontend/index.html" ]; then
    print_status "Frontend files found"
else
    print_error "Frontend files not found"
    exit 1
fi

echo ""
echo -e "${YELLOW}Checking database...${NC}"

# Check database schema
if [ -f "database/schema.sql" ]; then
    print_status "Database schema found"
    print_info "Next: Import the schema into MySQL:"
    print_info "  mysql -u root -p < database/schema.sql"
else
    print_error "Database schema not found"
    exit 1
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  Setup completed successfully!         ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""

print_info "Next steps:"
echo "1. Setup database:"
echo "   mysql -u root -p < database/schema.sql"
echo ""
echo "2. Start backend:"
echo "   cd backend && npm start"
echo ""
echo "3. Start frontend (in another terminal):"
echo "   cd frontend && python -m http.server 8000"
echo ""
echo "4. Open browser:"
echo "   http://localhost:8000"
echo ""
echo "Or use Docker:"
echo "   docker-compose up -d"
echo ""
print_status "All done! Happy tracking! 🎉"
