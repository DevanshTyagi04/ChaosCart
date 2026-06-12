# 🛒 ChaosCart Microservices Architecture

<div align="center">

### A Production-Style Cloud-Native E-Commerce Platform

[![CI Pipeline](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](#)
[![CD Pipeline](https://img.shields.io/badge/Image%20Registry-GHCR-2ea44f?logo=docker&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-Multi--Container-2496ED?logo=docker&logoColor=white)](#)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Kind-326CE5?logo=kubernetes&logoColor=white)](#)
[![Helm](https://img.shields.io/badge/Helm-V3-0F1626?logo=helm&logoColor=white)](#)
[![Prometheus Operator](https://img.shields.io/badge/Prometheus-Operator-E6522C?logo=prometheus&logoColor=white)](#)
[![Terraform](https://img.shields.io/badge/Terraform-AWS-7B42BC?logo=terraform&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)](#)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](#)

</div>

---

# 📖 Project Overview

ChaosCart is a cloud-native, Kubernetes-native microservices-based e-commerce platform built to demonstrate modern DevOps, backend engineering, Kubernetes orchestration, GitOps-ready Helm packaging, production observability, and infrastructure automation practices.

Instead of using a monolithic architecture, ChaosCart separates core business domains into independent services:

- **User Service**: Handles user authentication, profiles, and management.
- **Product Service**: Manages the product catalog, pricing, and inventory.
- **Order Service**: Coordinates order creation and aggregation across services.

Each service owns its own PostgreSQL database and communicates internally over private, isolated virtual networks. The deployment ecosystem is designed to replicate high-availability, multi-node cloud environments utilizing:

- Multi-node Kubernetes clusters (Kind)
- Helm packaging and templates
- Prometheus Operator observability (kube-prometheus-stack)
- Terraform Infrastructure as Code (AWS)
- Docker Compose local development
- Continuous Integration & Container Publishing (GitHub Actions & GHCR)

---

# 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js, Express |
| Databases | PostgreSQL |
| Containerization | Docker |
| Orchestration | Kubernetes (Kind) |
| Package Management | Helm |
| Monitoring | Prometheus, Grafana |
| Metrics | Prometheus Operator, ServiceMonitors |
| CI/CD | GitHub Actions |
| Registry | GitHub Container Registry (GHCR) |
| IaC | Terraform |
| Cloud | AWS EC2 |

---

# 🚀 Key Engineering Highlights

- **Production-Style Kubernetes Architecture**: Containerized services orchestrated in a multi-node Kubernetes cluster.
- **Stateful Workloads & Persistent Storage**: Structured database-per-service pattern using PostgreSQL StatefulSets, headless services, and PVCs.
- **Modular Helm Packaging**: Structured Helm Chart with reusable templates, flexible `values.yaml` configuration, and validation.
- **Infrastructure Observability**: Automated Prometheus scraping using Kubernetes ServiceMonitors, Grafana Dashboards, and Node Exporter.
- **Custom Application Instrumentation**: End-to-end telemetry via custom `/metrics` using `prom-client` exposing HTTP request counters.
- **CI/CD Automation**: GitHub Actions pipelines compiling, testing, and building docker containers pushed to GitHub Container Registry.
- **Infrastructure as Code (IaC)**: AWS deployment automated with Terraform, featuring auto-bootstrapping and self-healing.
- **Reverse Proxy Routing**: Nginx-based API routing for private inter-service isolation.

---

## ☁️ Cloud Native Features

- **Kubernetes Deployments**: Replicated microservice pods (Frontend, User, Product, Order services) with automated rollouts, readiness, and liveness probes.
- **StatefulSets**: Stable identity PostgreSQL nodes (`postgres-user`, `postgres-product`, `postgres-order`) ensuring predictable network IDs.
- **PersistentVolumeClaims (PVCs)**: Dynamic persistent volumes binding to host storage for database persistence.
- **NGINX Ingress**: Ingress Controller exposing a single entry point mapping path-based routes to internal Services.
- **Helm Packaging**: Reusable Helm chart with templated manifests and dynamic value injection.
- **Prometheus Operator**: Declarative monitoring stack via `kube-prometheus-stack` managing scrapers and dashboards.
- **ServiceMonitors**: Custom CRDs for automated discovery of microservices' endpoint metrics.
- **Custom Metrics**: Application-level telemetry exposing runtime metrics (`http_requests_total`) to Prometheus via `/metrics`.
- **Grafana Dashboards**: Real-time visual monitoring dashboards for cluster workloads (nodes, CPU, memory) and application performance (latency, HTTP requests).
- **GitHub Actions**: Integrated pipelines executing Prisma migrations, Jest integration tests, and pushing Docker builds to GHCR.
- **Terraform Infrastructure**: Declared AWS components (EC2, VPC, Security Groups) for declarative deployment.

---

# 🖥️ Application Preview

## Main Application

![ChaosCart UI](./screenshots/app-ui1.png)
![ChaosCart UI](./screenshots/app-ui2.png)
![ChaosCart UI](./screenshots/app-ui3.png)

---

# 🏗️ Architecture

## High-Level System Flow

![Architecture Flow](./screenshots/architecture.png)

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

# ☸️ Kubernetes Native Architecture

ChaosCart is engineered to run in a production-style, multi-node Kubernetes cluster. The cluster architecture transitions from standard Docker Compose to dynamic container orchestration, ensuring high availability, load balancing, self-healing, and decoupled state management.

### Kubernetes Resource Summary

| Resource Type | Count |
|---|---|
| Deployments | 4 |
| StatefulSets | 3 |
| Services | 7 |
| Ingresses | 1 |
| PVCs | 3 |
| ServiceMonitors | 3 |
| Namespaces | 2+ |

---

## Cluster Topology & Design

The environment runs on a **Kind (Kubernetes in Docker)** cluster configured with a multi-node topology:
- **1 Control Plane Node**: Manages the api-server, etcd, controller-manager, and scheduler.
- **3 Worker Nodes**: Hosts the application pods and monitoring daemons, simulating a true production-style cluster spread.

![Kubernetes Architecture](./screenshots/k8s-architecture.png)

![Kubernetes Nodes](./screenshots/k8s-nodes.png)

---

## Kubernetes Native Workloads

- **Microservice Deployments**: The `frontend`, `user-service`, `product-service`, and `order-service` run as deployments with multiple replicas. They utilize readiness and liveness probes targeting `/health` to ensure traffic is only routed to active, healthy pods.
- **Stateful Workloads**: To prevent database split-brain and ensure predictable networking, databases (`postgres-user`, `postgres-product`, `postgres-order`) are deployed as **StatefulSets** rather than standard deployments.
- **Headless Services**: Databases utilize headless ClusterIP services (`ClusterIP: None`) to allow stable DNS hostname resolution (e.g., `postgres-user-0.postgres-user`) mapping directly to the individual Pod IP address.
- **Persistent Volume Claims (PVCs)**: Each database StatefulSet mounts a `PersistentVolumeClaim` (PVC) binding 1Gi of persistent storage, protecting state across pod restarts or rescheduling.
- **Schema Migration Jobs**: Database migrations are handled using Kubernetes **Jobs** (`user-db-migration`, `product-db-migration`, `order-db-migration`) that execute Prisma migrations sequentially.
- **Init Containers**: Backend service deployments use init containers to poll database availability using network checks before spinning up the primary Express app container. This eliminates race conditions during startup.

![Kubernetes Resources](./screenshots/k8s-resources.png)

![StatefulSets](./screenshots/k8s-statefulsets.png)

![Persistent Volume Claims](./screenshots/k8s-pvc.png)

---

## Ingress Traffic Routing

Traffic entering the cluster is handled by an **NGINX Ingress Controller** (`chaoscart-ingress`). The Ingress resource maps path-based rules to routing rules, mirroring the behavior of the standalone reverse proxy Nginx container:
- External traffic to `/` is routed to the `frontend` service.
- External traffic to `/api/users` is routed to the `user-service`.
- External traffic to `/api/products` is routed to the `product-service`.
- External traffic to `/api/orders` is routed to the `order-service`.

![Ingress](./screenshots/k8s-ingress.png)

---

# ⛵ Helm Packaging & Deployment

To simplify deployment and environment management, the entire Kubernetes configuration is packaged into a cohesive **Helm Chart** located in `helm/chaoscart`.

## Helm Chart Structure

```text
helm/
└── chaoscart/
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
```

![Helm Chart Structure](./screenshots/helm-chart-structure.png)

### Helm Resource Summary

| Component | Helm Managed |
|---|---|
| Frontend | ✅ |
| User Service | ✅ |
| Product Service | ✅ |
| Order Service | ✅ |
| PostgreSQL StatefulSets | ✅ |
| Ingress | ✅ |
| ServiceMonitors | ✅ |
| Migration Jobs | ✅ |

---

## Templating & Configuration Management

- **Reusable Templates**: Deployment and Service configurations are written using Go template syntax. Values like replica counts, container images, resource limits, and environment variables are injected dynamically.
- **Dynamic Configuration (`values.yaml`)**: An environment-specific configuration file exposes variables for overriding database settings, replica counts, ingress hosts, and feature toggles without editing raw manifests.
- **Database Migration Jobs**: DB migrations run via Helm-templated Kubernetes Jobs, parameterized to run cleanly across different releases.
- **ServiceMonitors**: Integrated directly as a template, allowing monitoring to deploy out-of-the-box when the Prometheus Operator is present.

## Validation & Verification

The Helm chart is validated using automated linting and templating:
- **`helm lint`**: Verifies that the chart conforms to standards, has correct formatting, and passes syntax validation.
- **`helm template`**: Renders chart templates locally with default values to verify manifest output and check YAML structure before deployment.

![Helm Lint](./screenshots/helm-lint.png)

---

# 🐳 Docker & Containerization

While Kubernetes is the primary orchestrator, ChaosCart supports Docker Compose for local development baseline. The multi-container compose file maps the baseline architecture:

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

# 📸 Infrastructure & Architecture Screenshots

## AWS Deployment

![AWS EC2](./screenshots/aws-ec2.png)

## Docker Containers

![Docker Containers](./screenshots/docker-containers.png)

---

# ⚙️ CI/CD Pipelines

The project implements automated CI/CD workflows using GitHub Actions for code validation and container asset building, keeping the execution pipeline separate from manual deployment triggers.

---

## GitHub Actions CI Pipeline (`ci.yml`)

A continuous integration pipeline validates code changes before publication.

Pipeline responsibilities:
- Install dependencies
- Start PostgreSQL services
- Run Prisma migrations
- Execute Jest integration tests
- Validate all backend services

The CI workflow acts as a validation gate for testing code stability.

---

## Container Publishing Workflow (`docker-publish.yml`)

A container publishing workflow pushes versioned images to the registry upon successful validation. It does not automate Kubernetes deployment, maintaining a clean boundary between artifact building and cluster application.

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

## GitHub Container Registry

![GHCR Images](./screenshots/ghcr-images.png)

---

# 📸 CI/CD Screenshots

## GitHub Actions Pipelines

![GitHub Actions](./screenshots/github-actions.png)

---

# 🧪 Testing

The project includes integration testing using Jest and Supertest.

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

The project uses Pino and pino-http for structured JSON logging.

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

Observability in ChaosCart has evolved from a basic container-level monitoring stack to an advanced, Kubernetes-native operator-based setup. This allows engineers to monitor infrastructure status and custom application metrics simultaneously.

---

## The Observability Evolution

### Docker Compose Monitoring

For container-level monitoring under Docker Compose, the architecture uses:
- **cAdvisor**: Collects CPU, memory, network, and disk metrics directly from container runtimes.
- **Prometheus**: Scrapes cAdvisor container metrics at regular intervals.
- **Grafana**: Visualizes raw resource utilization and Docker container status.

### Kubernetes Monitoring Stack

For the Kubernetes deployment, ChaosCart integrates with the **Prometheus Operator** via the standard `kube-prometheus-stack`. This stack includes:
- **Prometheus Operator**: Simplifies Prometheus configuration and lifecycle management using Kubernetes Custom Resource Definitions (CRDs).
- **Prometheus**: Core scraping engine, dynamically configured by the Operator.
- **Grafana**: Loaded with cluster and application dashboards.
- **Node Exporter**: Collects system metrics from every node in the Kind cluster.
- **kube-state-metrics**: Monitors health, replicas, and pod status of Kubernetes api-server resources.
- **ServiceMonitors**: Automates endpoint discovery and metric scraping configurations.

---

## ServiceMonitor-Driven Metric Scraping

Under the Prometheus Operator, manual scrape configs are replaced by **ServiceMonitors** (`user-service-monitor`, `product-service-monitor`, `order-service-monitor`).

- **Automatic Service Discovery**: The Prometheus Operator queries the cluster for `ServiceMonitor` resources matching label selectors.
- **Target Extraction**: Prometheus automatically configures endpoints to scrape the `/metrics` ports of backend services.
- **Self-Healing Scrapes**: If backend service pods scale out (e.g., from 2 to 5 replicas), the Operator dynamically discovers new endpoints and updates Prometheus targets without manual configuration changes.

![ServiceMonitors](./screenshots/servicemonitors.png)

![Prometheus Targets](./screenshots/prometheus-targets.png)

---

### Custom Application Metrics

To achieve application-level observability, the Express-based microservices are instrumented with **`prom-client`**. This exposes telemetry on a dedicated `/metrics` endpoint:

- **Custom Counter (`http_requests_total`)**: Tracks the total number of incoming HTTP requests. Label dimensions include `method`, `route`, and response `status` (e.g., `200`, `400`, `500`).
- **Telemetry Scraping**: Prometheus pulls metrics from the backend `/metrics` endpoints via the ServiceMonitors.
- **Dashboards**: Grafana displays these custom counters in the ChaosCart Dashboard, showing real-time HTTP requests, error rate trends, and service health metrics alongside container statuses.

![Application Metrics](./screenshots/prometheus-http-requests.png)

---

## Monitoring Flow

```text
[Kubernetes Workloads / prom-client] ──> Expose /metrics
                                             │
   [ServiceMonitors (Discovery CRDs)] ───────┼──> Scrapes targets
                                             ▼
                                     [Prometheus Operator]
                                             │
                                             ▼
                                     [Prometheus Server]
                                             │
                                             ▼
                                      [Grafana Dashboard]
```

---

# 📸 Monitoring Dashboard

## Grafana Dashboards

### Kubernetes Cluster Dashboard

Shows Kind cluster node resource usage (CPU/Memory) and Kubernetes workload health.

![Kubernetes Cluster Dashboard](./screenshots/grafana-k8s-dashboard1.png)
![Kubernetes Cluster Dashboard](./screenshots/grafana-k8s-dashboard2.png)
![Kubernetes Cluster Dashboard](./screenshots/grafana-k8s-dashboard3.png)
![Kubernetes Cluster Dashboard](./screenshots/grafana-k8s-dashboard4.png)
![Kubernetes Cluster Dashboard](./screenshots/grafana-k8s-dashboard5.png)
![Kubernetes Cluster Dashboard](./screenshots/grafana-k8s-dashboard6.png)
![Kubernetes Cluster Dashboard](./screenshots/grafana-k8s-dashboard7.png)
![Kubernetes Cluster Dashboard](./screenshots/grafana-k8s-dashboard8.png)

### ChaosCart Application Dashboard

Visualizes custom application metrics like HTTP request count, success rate, and route latency.

![ChaosCart Application Dashboard](./screenshots/grafana-chaoscart-dashboard1.png)
![ChaosCart Application Dashboard](./screenshots/grafana-chaoscart-dashboard2.png)

### Docker Compose Metrics (Docker Dashboards)

Below are the legacy Grafana monitoring screens collected via cAdvisor for the Docker Compose stack.

![Grafana Dashboard](./screenshots/grafana-dashboard1.png)
![Grafana Dashboard](./screenshots/grafana-dashboard2.png)
![Grafana Dashboard](./screenshots/grafana-dashboard3.png)
![Grafana Dashboard](./screenshots/grafana-dashboard4.png)
![Grafana Dashboard](./screenshots/grafana-dashboard5.png)
![Grafana Dashboard](./screenshots/grafana-dashboard6.png)

---

# 🔐 Security Considerations

The project includes several security-focused architectural decisions:

- Backend services remain private inside Docker/Kubernetes networks.
- Reverse proxy (Nginx / Ingress) exposes only required public routes.
- Security Groups restrict inbound traffic.
- Sensitive log fields are redacted.
- Service communication occurs over isolated internal networking.

---

# ☁️ Terraform Infrastructure (AWS)

Infrastructure provisioning is handled using Terraform.

---

## Provisioned Resources & Automation

Terraform provisions and bootstraps:
 
- AWS EC2 infrastructure
- Security Groups
- Dynamic Amazon Linux AMI selection
- Automated Docker installation
- Automated Docker Compose installation
- Automated repository cloning
- Automated environment variable generation
- Automated container deployment
- Public infrastructure outputs

---

## Infrastructure Automation Flow

```
terraform apply
      ↓
AWS EC2 Provisioned
      ↓
Docker Installed Automatically
      ↓
Docker Compose Installed
      ↓
Repository Cloned
      ↓
Environment Files Generated
      ↓
GHCR Images Pulled
      ↓
Containers Started Automatically
```

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
![Terraform Apply](./screenshots/terraform-apply4.png)

---

# 🚀 Deployment

## Option A: Local Development (Docker Compose)

### Prerequisites
- Docker
- Docker Compose
- Node.js
- Git

### Steps
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd chaoscart
   ```
2. Add environment variables for all backend services.
3. Run:
   ```bash
   docker compose up --build -d
   ```
4. Access:
   ```text
   http://localhost
   ```

---

## Option B: Local Production-Style (Kubernetes & Helm)

Deploy the entire production-grade stack locally using a Kind cluster and Helm.

### Prerequisites
- Docker
- Kind (Kubernetes in Docker)
- Helm (V3)
- kubectl

### Steps
1. Create the Kind cluster using the multi-node configuration:
   ```bash
   kind create cluster --config k8s/kind-config.yaml --name chaoscart
   ```
2. Verify nodes are online (1 control plane, 3 worker nodes):
   ```bash
   kubectl get nodes
   ```
3. Set up the NGINX Ingress Controller in the cluster:
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
   ```
4. Install the Prometheus Operator monitoring stack (kube-prometheus-stack):
   ```bash
   helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
   helm repo update
   helm install monitoring prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
   ```
5. Validate the ChaosCart Helm chart:
   ```bash
   helm lint helm/chaoscart
   helm template helm/chaoscart
   ```
6. Install the Helm chart:
   ```bash
   helm install chaoscart ./helm/chaoscart
   ```
7. Verify all resources (StatefulSets, PVCs, Deployments, Jobs) are healthy:
   ```bash
   kubectl get all
   kubectl get pvc
   ```

---

## Option C: AWS Cloud Deployment (Docker Compose + Terraform)

### Infrastructure Provisioning

```bash
cd terraform
terraform init
terraform apply
```
Terraform automatically provisions EC2 infrastructure, installs Docker & Docker Compose, clones the repository, generates environment configuration, pulls GHCR container images, and starts the complete application stack.

---

### EC2 Setup

SSH into instance:

```bash
ssh -i <your-key>.pem ec2-user@<PUBLIC_IP>
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

Depending on your deployment method, access URLs differ:

### Docker Compose
| Service | URL |
|---|---|
| Application | `http://<EC2-IP>` or `http://localhost` |
| Grafana | `http://<EC2-IP>:3001` or `http://localhost:3001` |
| Prometheus | `http://<EC2-IP>:9090` or `http://localhost:9090` |
| cAdvisor | `http://<EC2-IP>:8080` or `http://localhost:8080` |

### Kubernetes (Kind / Local)
Access services via the Ingress rules or by forwarding ports:

| Service | Access Command / URL |
|---|---|
| Application | `http://localhost` (Ingress host mapping) |
| Grafana | `kubectl port-forward svc/monitoring-grafana 3000:80 -n monitoring` (Access via `http://localhost:3000`) |
| Prometheus | `kubectl port-forward svc/monitoring-kube-prometheus-prometheus 9090:9090 -n monitoring` (Access via `http://localhost:9090`) |

---

# 🧠 Challenges & Debugging

During development and deployment, several real-world infrastructure and orchestration challenges were encountered and resolved:
 
- **Wait-for-Database Startup Logic**: Prevented Express app container crashes by using custom wait scripts (and init containers in K8s) that poll PostgreSQL port status before executing Prisma migrations.
- **ServiceMonitor Target Discovery**: Configured accurate label selectors and port descriptions in both Helm templates and service manifests, resolving scraping issues with Prometheus Operator.
- **Kind Ingress Port Binding**: Configured correct port maps in the Kind configuration manifest to expose host ports 80/443 to the local Nginx ingress controller.
- **Docker startup race conditions during EC2 bootstrapping**: Managed and resolved Docker initialization timing issues in `cloud-init` user data scripts.
- **EC2 storage exhaustion while pulling large container images**: Optimized image size and layered caching strategies.
- **Container startup dependency sequencing**: Designed robust service readiness checks and health check scripts.

---

# 🔮 Future Improvements

- **Production Deployment on Amazon EKS**: Deploy the Helm chart to a production AWS EKS cluster integrated with AWS load balancers.
- **GitOps Continuous Delivery with ArgoCD**: Declaratively manage Kubernetes resources using GitOps reconciliation patterns.
- **Horizontal Pod Autoscaling (HPA)**: Configure autoscalers based on custom CPU/Memory utilization and HTTP request rates.
- **Loki-based Centralized Logging**: Implement a PLG stack (Promtail, Loki, Grafana) to centralize and visualize Pino JSON logs.
- **Istio Service Mesh**: Add service mesh for traffic management, mTLS security, and microservice tracing.
- **Vault-based Secret Management**: Secure database passwords and credentials using HashiCorp Vault.

---

# 🎯 Resume / Portfolio Highlights

This project demonstrates:
 
- **Production-style Kubernetes Architecture**: Designing and managing pods, replicas, service mappings, and ingress routes.
- **Stateful Workloads**: Implementing PostgreSQL databases as StatefulSets utilizing PVC persistent storage and headless services.
- **Helm Package Management**: Creating dynamic, linted Helm charts with reusable templates and flexible configurations.
- **Infrastructure Observability**: Deploying the Prometheus Operator stack to monitor cluster hardware, daemon health, and pod load.
- **Custom Instrumentation**: Instrumenting Node.js applications with custom counters and timers scraped by Prometheus.
- **Infrastructure as Code**: Provisioning AWS components dynamically with Terraform.
- **CI/CD Automation**: Building multi-stage pipelines with GitHub Actions to test code, build containers, and publish to GHCR.

---

# ⭐ Key Takeaways

ChaosCart evolved from a basic microservices application into a production-style cloud infrastructure project featuring:

- Kubernetes-native architecture
- Helm package management
- Advanced observability stack with Prometheus Operator
- Custom metric instrumentation
- Container orchestration
- Cloud deployment with IaC (Terraform)
- CI/CD automation
- Structured logging & test workflows

It serves as a strong end-to-end DevOps and cloud engineering portfolio project.
