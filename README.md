# 🛒 ChaosCart Microservices Architecture

<div align="center">

### A Production-Style Cloud-Native E-Commerce Platform

[![CI Pipeline](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](#)
[![CD Pipeline](https://img.shields.io/badge/CD-GHCR-2ea44f?logo=docker&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-Multi--Container-2496ED?logo=docker&logoColor=white)](#)
[![Terraform](https://img.shields.io/badge/Terraform-AWS-7B42BC?logo=terraform&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](#)

</div>

---

# 📖 Project Overview

ChaosCart is a cloud-native microservices-based e-commerce platform built to demonstrate modern DevOps, backend engineering, observability, and infrastructure automation practices.

Instead of using a monolithic architecture, ChaosCart separates core business domains into independent services:

- User Service
- Product Service
- Order Service

Each service owns its own PostgreSQL database and communicates internally over a private Docker network.

The project focuses heavily on:

- Dockerized microservices
- Reverse proxy architecture
- CI/CD automation
- Infrastructure as Code
- Monitoring & observability
- Cloud deployment workflows
- Production-style networking
- Structured logging

The goal of the project is not only to build application functionality, but also to simulate a realistic cloud deployment and DevOps workflow.

---

# 🚀 Key Engineering Highlights

- Built a multi-service e-commerce platform using Node.js, Express, React, PostgreSQL, and Docker
- Implemented a reverse proxy architecture using Nginx to expose a single public entry point
- Added CI/CD pipelines using GitHub Actions and GitHub Container Registry (GHCR)
- Integrated Prometheus, Grafana, and cAdvisor for live infrastructure monitoring
- Added structured JSON logging using Pino and pino-http
- Wrote resilient integration tests using Jest and Supertest
- Provisioned AWS infrastructure using Terraform
- Deployed the full stack on AWS EC2 using Docker Compose
- Configured private inter-service communication using Docker networking
- Implemented health checks and restart policies for improved container resiliency

---

# 🖥️ Application Preview

## Main Application

![ChaosCart UI](./screenshots/app-ui1.png)
![ChaosCart UI](./screenshots/app-ui2.png)
![ChaosCart UI](./screenshots/app-ui3.png)

---

# 🏗️ Architecture

## High-Level System Flow

```text
                                  ┌────────────────────────┐
                                  │   AWS EC2 Instance     │
                                  │                        │
       [ Internet ] ─────HTTP 80──┼─► [ Nginx Reverse Proxy ]
                                  │            │           │
                        ┌─────────┼────────────┼───────────┼────────┐
                        │         ▼            ▼           │        │
                     [Frontend]  /api/users  /api/orders  /api/products
                    (React/Vite)      │           │              │
                                      ▼           ▼              ▼
                               [User Service] [Order Service] [Product Service]
                                      │           │              │
                                      ▼           ▼              ▼
                               [(Postgres)] [(Postgres)] [(Postgres)]
```

---

## Architecture Decisions

### Microservices Architecture

Each service is independently containerized and responsible for a single business domain.

| Service | Responsibility |
|---|---|
| User Service | User management |
| Product Service | Product catalog |
| Order Service | Order processing & aggregation |

Benefits:

- Clear separation of concerns
- Independent scaling potential
- Better fault isolation
- Cleaner service ownership

---

### Database per Service Pattern

Each microservice owns its own PostgreSQL database.

This prevents:

- tightly coupled schemas
- shared database bottlenecks
- accidental cross-domain modifications

---

### Reverse Proxy Architecture

Nginx acts as a single public entry point.

Instead of exposing backend service ports publicly:

- Nginx receives all external traffic
- Routes requests internally
- Backend services remain private inside Docker network

Routing examples:

| Route | Destination |
|---|---|
| `/` | Frontend |
| `/api/users` | User Service |
| `/api/products` | Product Service |
| `/api/orders` | Order Service |

---

### Internal Service Communication

Services communicate internally using Docker DNS.

Example:

```bash
http://user-service:4001
```

The Order Service performs internal Axios calls to:

- User Service
- Product Service

for validating users/products before order creation.

---

# 📸 Infrastructure & Architecture Screenshots

## AWS Deployment

![AWS EC2](./screenshots/aws-ec2.png)

## Docker Containers

![Docker Containers](./screenshots/docker-containers.png)

---

# ✨ Features

## Application Features

- User management
- Product catalog management
- Order creation workflow
- Cross-service API communication

---

## DevOps & Infrastructure Features

- Dockerized microservices architecture
- Multi-container orchestration using Docker Compose
- PostgreSQL database isolation per service
- Reverse proxy architecture using Nginx
- GitHub Actions CI/CD pipelines
- GHCR container image publishing
- Infrastructure as Code using Terraform
- AWS EC2 deployment
- Structured logging using Pino
- Health checks and restart policies
- Observability stack with Prometheus + Grafana + cAdvisor
- Integration testing using Jest + Supertest

---

# 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Frontend | React, Vite |
| Database | PostgreSQL |
| ORM | Prisma ORM |
| Containerization | Docker, Docker Compose |
| Reverse Proxy | Nginx |
| CI/CD | GitHub Actions |
| Container Registry | GitHub Container Registry (GHCR) |
| Monitoring | Prometheus, Grafana, cAdvisor |
| Logging | Pino, pino-http |
| Infrastructure | Terraform |
| Cloud | AWS EC2 |
| Testing | Jest, Supertest |

---

# 📦 Architecture Highlights

| Capability | Implementation |
|---|---|
| Microservices | Express.js services |
| Reverse Proxy | Nginx |
| Containerization | Docker Compose |
| Infrastructure as Code | Terraform |
| Monitoring | Prometheus + Grafana |
| Container Metrics | cAdvisor |
| Logging | Pino |
| CI/CD | GitHub Actions |
| Registry | GHCR |
| Cloud Deployment | AWS EC2 |

---

# 📂 Project Structure

```text
chaoscart/
├── .github/workflows/
│   ├── ci.yml
│   └── docker-publish.yml
├── frontend/
├── monitoring/
│   └── prometheus.yml
├── nginx/
│   └── default.conf
├── screenshots/
├── services/
│   ├── user-service/
│   ├── product-service/
│   └── order-service/
├── terraform/
│   ├── main.tf
│   └── outputs.tf
└── docker-compose.yml
```

---

## Important Directories

| Directory | Purpose |
|---|---|
| `frontend/` | React frontend application |
| `services/` | Backend microservices |
| `nginx/` | Reverse proxy configuration |
| `monitoring/` | Prometheus configuration |
| `terraform/` | AWS infrastructure provisioning |
| `.github/workflows/` | CI/CD pipelines |
| `screenshots/` | README assets |

---

# 🐳 Docker & Containerization

The project runs using Docker Compose and currently consists of:

| Container Type | Count |
|---|---|
| Frontend | 1 |
| Backend Services | 3 |
| PostgreSQL Databases | 3 |
| Reverse Proxy | 1 |
| Monitoring Stack | 3 |
| Total Containers | 11 |

---

## Docker Features

### Health Checks

Each backend service includes Docker health checks.

Example:

- `/health` endpoints
- automatic restart handling
- container health monitoring

---

### Restart Policies

Containers use:

```yaml
restart: unless-stopped
```

for resiliency and automatic recovery.

---

### Wait-for-Database Startup Logic

Backend services include custom startup orchestration scripts to ensure PostgreSQL is accepting connections before Prisma migrations execute.

This avoids:

- crash loops
- migration race conditions
- startup failures

---

# 🌐 Networking & Reverse Proxy

## Internal Networking

All services communicate over an isolated Docker network.

Backend services are intentionally NOT exposed publicly.

Only these ports are publicly accessible:

| Port | Purpose |
|---|---|
| 80 | Main Application |
| 3001 | Grafana |
| 9090 | Prometheus |
| 8080 | cAdvisor |
| 22 | SSH |

---

## Reverse Proxy Benefits

Using Nginx provides:

- Single public entry point
- Cleaner API routing
- Better security posture
- Reduced public port exposure
- Production-style architecture

---

# ⚙️ CI/CD Pipelines

The project uses GitHub Actions for automation.

---

## Continuous Integration (`ci.yml`)

Pipeline responsibilities:

- Install dependencies
- Start PostgreSQL services
- Run Prisma migrations
- Execute Jest integration tests
- Validate all backend services

The CI workflow prevents broken code from reaching deployment stages.

---

## Continuous Delivery (`docker-publish.yml`)

Triggered after successful CI completion.

Pipeline responsibilities:

- Build Docker images
- Tag images
- Authenticate with GHCR
- Push images to registry

Published images:

- Frontend
- User Service
- Product Service
- Order Service

---

# 📸 CI/CD Screenshots

## GitHub Actions Pipelines

![GitHub Actions](./screenshots/github-actions.png)

---

# 🧪 Testing

The project includes integration testing using:

- Jest
- Supertest

---

## Testing Improvements

### Express App Decoupling

The Express application logic was separated from the HTTP listener:

| File | Purpose |
|---|---|
| `app.js` | Express app export |
| `index.js` | HTTP server startup |

This allows Supertest to test routes in-memory without binding ports.

---

### Randomized Test Payloads

Tests use:

```js
crypto.randomUUID()
```

to avoid duplicate-key database conflicts.

---

### Axios Mocking

The Order Service mocks cross-service Axios requests during testing to ensure:

- fast test execution
- isolated testing
- no dependency on running containers

---

# 📝 Structured Logging & Tracing

The project uses:

- Pino
- pino-http

for structured JSON logging.

---

## Logging Features

### Structured JSON Logs

Logs are machine-readable and suitable for future centralized logging systems.

---

### Request IDs

Each request receives a unique request ID for improved request tracing.

---

### Sensitive Data Redaction

Sensitive headers are automatically redacted:

- authorization
- cookies
- API keys

---

### Cleaner Test Output

Pino logging is silenced during test execution to prevent noisy CI logs.

---

# 📈 Monitoring & Observability

The project includes a complete monitoring stack:

| Component | Purpose |
|---|---|
| cAdvisor | Container metrics collection |
| Prometheus | Metrics scraping & storage |
| Grafana | Visualization dashboards |

---

## Metrics Collected

- Container CPU usage
- Memory usage
- Network traffic
- Running containers
- Resource utilization trends

---

## Monitoring Flow

```text
Docker Containers
        ↓
    cAdvisor
        ↓
   Prometheus
        ↓
    Grafana
```

---

# 📸 Monitoring Dashboard

## Grafana Dashboard

![Grafana Dashboard](./screenshots/grafana-dashboard1.png)
![Grafana Dashboard](./screenshots/grafana-dashboard2.png)
![Grafana Dashboard](./screenshots/grafana-dashboard3.png)
![Grafana Dashboard](./screenshots/grafana-dashboard4.png)
![Grafana Dashboard](./screenshots/grafana-dashboard5.png)
![Grafana Dashboard](./screenshots/grafana-dashboard6.png)

---

# 🔐 Security Considerations

The project includes several security-focused architectural decisions:

- Backend services remain private inside Docker network
- Reverse proxy exposes only required public routes
- Security Groups restrict inbound traffic
- Sensitive log fields are redacted
- Service communication occurs over internal networking

---

# ☁️ Terraform Infrastructure (AWS)

Infrastructure provisioning is handled using Terraform.

---

## Provisioned Resources

Terraform provisions:

- EC2 instance
- Security Group
- Networking rules
- Public IP output

---

## Infrastructure Benefits

Using Terraform enables:

- reproducible infrastructure
- version-controlled cloud setup
- automated provisioning
- easier environment recreation

---

## Security Group Rules

| Port | Purpose |
|---|---|
| 22 | SSH |
| 80 | Application |
| 3001 | Grafana |
| 9090 | Prometheus |
| 8080 | cAdvisor |

---

# 📸 Terraform Provisioning

## Terraform Apply

![Terraform Apply](./screenshots/terraform-apply1.png)
![Terraform Apply](./screenshots/terraform-apply2.png)
![Terraform Apply](./screenshots/terraform-apply3.png)

---

# 🚀 Deployment

## Local Development

### Prerequisites

- Docker
- Docker Compose
- Node.js
- Git

---

### Steps

```bash
git clone <repo-url>
cd chaoscart
```

Add environment variables for all backend services.

Run:

```bash
docker compose up --build -d
```

Access:

```text
http://localhost
```

---

## AWS Deployment Flow

### Infrastructure Provisioning

```bash
cd terraform
terraform init
terraform apply
```

---

### EC2 Setup

SSH into instance:

```bash
ssh -i <your-key>.pem ubuntu@<PUBLIC_IP>
```

---

### Application Deployment

```bash
git clone <repo-url>
cd chaoscart

docker compose up -d
```

---

# 📊 Monitoring Access

| Service | URL |
|---|---|
| Application | `http://<EC2-IP>` |
| Grafana | `http://<EC2-IP>:3001` |
| Prometheus | `http://<EC2-IP>:9090` |
| cAdvisor | `http://<EC2-IP>:8080` |

---





# 🔮 Future Improvements

Potential future enhancements:

- Kubernetes deployment (EKS)
- HTTPS with custom domain
- Centralized logging stack (ELK/Loki)
- Alerting system integration
- Terraform modules & remote state
- Auto-scaling infrastructure
- ECS/EKS deployment pipeline
- Distributed tracing
- Message queues (Kafka/RabbitMQ)

---

# 🎯 Resume / Portfolio Highlights

This project demonstrates:

- cloud-native application architecture
- Docker containerization
- CI/CD automation
- Infrastructure as Code
- production-style deployment patterns
- observability and monitoring
- backend service orchestration
- reverse proxy networking
- AWS cloud deployment
- infrastructure lifecycle management

The project was designed to simulate realistic DevOps and platform engineering workflows beyond simple application development.

---

# ⭐ Key Takeaways

ChaosCart evolved from a basic microservices application into a production-style cloud infrastructure project featuring:

- microservices architecture
- container orchestration
- observability stack
- cloud deployment
- Infrastructure as Code
- CI/CD automation
- reverse proxy networking
- structured logging
- resilient startup orchestration

It serves as a strong end-to-end DevOps and cloud engineering portfolio project.

