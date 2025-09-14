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

A production-ready, microservices-based Airbnb clone featuring hotel management through booking operations and notification services. Built with modern technologies for  scalable deployment.

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
        PostgreSQL[(MySQL<br/>Hotels & Booking Data)]
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
link: https://github.com/Jyotishmoy12/Notification-service-airbnb
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
📦 Package Manager  │ npm for efficient dependency management
```

### Databases & Storage
```
🗄️ Hotels & Bookings │ PostgreSQL with Prisma ORM
🔄 Queue & Cache     │ Redis with Bull Queue
```

## 🚀 Quick Start

### Prerequisites
- **Docker** & **Docker Compose** (latest)
- **Node.js** 18+ and **npm**
- **Git** for version control

**Built with ❤️ using modern microservices architecture**

> ⭐ Star this repo if you find it helpful!
