# 🏠 Airbnb Clone - Microservices

> A microservices-based Airbnb clone built with Node.js, TypeScript, and Docker for scalable hospitality platform management.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Required-blue.svg)](https://www.docker.com/)
[![npm](https://img.shields.io/badge/npm-Package%20Manager-red.svg)](https://www.npmjs.com/)

## 📋 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [Services](#-services)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Development](#-development)

## 🌟 Overview

A production-ready, microservices-based Airbnb clone featuring hotel management through booking operations and notification services. Built with modern technologies and containerized for scalable deployment.

## 🏛️ System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        C[Client Application]
    end
    
    subgraph "API Gateway"
        GW[Gateway/Load Balancer]
    end
    
    subgraph "Microservices"
        BS[Booking Service<br/>Port: 3002<br/>Hotels & Bookings]
        NS[Notification Service<br/>Port: 3003]
    end
    
    subgraph "Databases"
        PostgreSQL[(PostgreSQL<br/>Hotels & Booking Data)]
        Redis[(Redis<br/>Queue & Cache)]
    end
    
    subgraph "Message Queue"
        BQ[Bull Queue<br/>Email Jobs]
    end
    
    C --> GW
    GW --> BS
    GW --> NS
    
    BS --> PostgreSQL
    BS --> BQ
    NS --> Redis
    NS --> BQ
    
    style BS fill:#f3e5f5
    style NS fill:#e8f5e8
```

### Service Communication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant BS as Booking Service
    participant NS as Notification Service
    participant Q as Bull Queue

    U->>BS: Search/Create Hotels
    BS->>U: Return Hotel Data
    
    U->>BS: Create Booking
    BS->>BS: Validate & Store Booking
    BS->>Q: Queue Notification Job
    BS->>U: Return Booking Confirmation
    
    Q->>NS: Process Email Job
    NS->>NS: Send Confirmation Email
    NS->>Q: Mark Job Complete
```

## 🚀 Services

### Booking Service (Port 3002)
- **Purpose**: Hotel management, booking operations and reservation management
- **Database**: PostgreSQL with Prisma ORM
- **Features**:
  - Hotel CRUD operations (create, read, update, delete)
  - Hotel search and filtering capabilities
  - Reservation creation and management
  - Booking status tracking
  - Cancellation handling
  - Room availability management

### Notification Service (Port 3003)
- **Purpose**: Email notifications and messaging
- **Database**: Redis for queue management
- **Features**:
  - Asynchronous email processing
  - Bull Queue for job management
  - Template-based notifications
  - Delivery status tracking

## 🛠️ Tech Stack

### Backend Core
```
🚀 Runtime          │ Node.js 18+ with Express.js
📘 Language         │ TypeScript for type safety
🐳 Containerization │ Docker & Docker Compose
📦 Package Manager  │ npm for efficient dependency management
```

### Databases & Storage
```
🗄️ Hotels & Bookings │ PostgreSQL with Prisma ORM
🔄 Queue & Cache     │ Redis with Bull Queue
```

### Development Tools
```
🔧 Code Quality     │ ESLint + Prettier
🪝 Git Hooks        │ Husky for pre-commit validation
🧪 Testing          │ Jest (configured)
📊 Monitoring       │ Docker health checks
```

## 🚀 Quick Start

### Prerequisites
- **Docker** & **Docker Compose** (latest)
- **Node.js** 18+ and **npm**
- **Git** for version control

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayushrajput8021/Airbnb.git
   cd Airbnb
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start all services:**
   ```bash
   # Start all services with Docker Compose
   docker compose up -d
   ```

4. **Verify services:**
   ```bash
   # Check service status
   docker compose ps
   
   # View service logs
   docker compose logs -f
   ```

### Service Endpoints

Once running, services will be available at:
- **Booking Service**: `http://localhost:3002` (Hotels & Bookings)
- **Notification Service**: `http://localhost:3003`

## 🔧 Development

### Available Scripts

```bash
# Code quality
npm run lint          # Lint codebase with ESLint
npm run format        # Format code with Prettier
npm run lint:fix      # Auto-fix linting issues

# Testing
npm test              # Run test suites
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage reports

# Development
npm run dev           # Start services in development mode
npm run build         # Build TypeScript to JavaScript
npm run clean         # Clean build artifacts
```

### Code Quality

The project enforces code quality through:

- **ESLint**: Identifies code issues and enforces consistent style
- **Prettier**: Automatic code formatting
- **Husky Git Hooks**: Pre-commit validation
- **TypeScript**: Compile-time type checking

### Pre-commit Process

```mermaid
flowchart LR
    A[git commit] --> B[Husky Hook Triggered]
    B --> C[Run ESLint]
    C --> D{Linting Passed?}
    D -->|No| E[Fix Issues & Retry]
    D -->|Yes| F[Run Prettier]
    F --> G[Format Code]
    G --> H[Commit Success]
    E --> A
```

### Development Workflow

1. **Make changes** to your code
2. **Husky automatically** runs linting and formatting on commit
3. **Fix any issues** if the commit fails
4. **Tests run** in CI/CD pipeline
5. **Docker services** can be restarted as needed

### Environment Setup

```bash
# Development environment
NODE_ENV=development
PORT=3000

# Database connections
POSTGRESQL_URL=postgresql://user:password@localhost:5432/airbnb
REDIS_URL=redis://localhost:6379

# Service URLs
BOOKING_SERVICE_URL=http://localhost:3002
NOTIFICATION_SERVICE_URL=http://localhost:3003
```

## 🤝 Contributing

We welcome contributions! The codebase is automatically linted and formatted on commit via Husky hooks.

### Contribution Process

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Ensure** code passes all hooks (automatic)
5. **Submit** a pull request

### Code Standards

- All code must pass ESLint validation
- Code is automatically formatted with Prettier
- TypeScript strict mode is enabled
- Comprehensive error handling required
- Docker services must include health checks

---

**Built with ❤️ using modern microservices architecture**

> ⭐ Star this repo if you find it helpful!
