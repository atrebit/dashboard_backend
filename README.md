# Dashboard Backend

This repository contains the backend service of the **ServiceNow Dashboard Integration Project**, designed to collect, process, and expose ITSM data through RESTful APIs for integration into ServiceNow dashboards.  
The application is containerized via Docker and uses **PostgreSQL** as its primary data store.

---

## Local Development Environment

### Prerequisites

| Requirement | Version |
| ----------- | :-----: |
| Node.js     | 22 LTS  |
| Docker      | 28.4.0  |
| PostgreSQL  |   17    |
| npm         |  10.x   |

Ensure that all required components are installed and accessible via your system’s PATH before initializing the stack.

---

### Initialization

The project uses **npm** as its local package manager.  
To install all dependencies, navigate to the `/app` directory and run:

```bash
> npm install
```

---

### Environment Configuration

All configuration parameters are stored in a `.env` file located at the project root.  
A template file named `.env.example` is provided and must be copied before the first startup.

```bash
> cp .env.example .env
```

| Variable              | Description                                 |
| --------------------- | ------------------------------------------- |
| `DATABASE_URL`        | PostgreSQL connection string                |
| `SHADOW_DATABASE_URL` | Used by Prisma for schema migrations        |
| `PORT`                | Port on which the backend server listens    |
| `CRON_INTERVAL`       | Interval for scheduled data synchronization |

Do not commit the `.env` file to version control.  
Sensitive credentials such as database URLs must remain private.

---

### Running the Application

The backend runs as part of the **Docker Compose** stack.  
The source code is mounted as a **volume** for live synchronization during development.

```bash
> docker compose up
> docker logs -f dashboard_backend
```

---

### Building the Application

The backend is distributed as a **Docker container image**.  
Docker Compose automatically triggers a build when starting the stack, but manual builds are also possible.

```bash
> docker build .
```

---

## Database

The backend uses **PostgreSQL 17** together with **Prisma ORM** for schema management and database access.  
The schema is defined in `prisma/schema.prisma`, and migrations are executed automatically during container startup.

```bash
> npx prisma migrate deploy #Apply pending migrations to the database in production/staging
> npx prisma studio #Start Studio on the default port
```

---

## Architecture

The diagram below illustrates the overall system architecture, showing how the scheduler, database, and API layer interact within the application.

![Bild der Systemarchitektur](./img/01_systemarchitekturdiagramm.drawio.png "System architecture")

---

## Key Components

| Component                   | Description                                                           |
| --------------------------- | --------------------------------------------------------------------- |
| **Scheduler**               | Periodically fetches and stores data from the upstream API            |
| **API Layer (Next.js)**     | Exposes REST endpoints for ITSM data retrieval                        |
| **Database Layer (Prisma)** | Defines models and migration logic for `ServerOutage` and `UpdateSet` |
| **Logger**                  | Captures errors and process logs                                      |
| **Docker Setup**            | Provides isolated and reproducible runtime environment                |
| **CI/CD Pipeline**          | Automates builds and deployments via GitHub Actions                   |

---

## Development Scripts

```bash
> npm run dev             # Start local development server
> npx prisma migrate deploy   # Apply latest database migrations
> npx prisma studio       # Open Prisma web interface
> npx typedoc src/lib/middleware/* src/lib/scheduler/* # Generate documentation
```

---

## Continuous Integration

A **GitHub Actions** pipeline ensures consistent build and deployment processes.  
It includes the following steps:

1. Install dependencies
2. Run build and lint checks
3. Build the Docker image
4. Push the image to the container registry
5. Deploy to the target environment

The workflow is defined in `.github/workflows/ci.yml`.  
The pipeline also runs automated code style checks to maintain quality across all TypeScript sources.

---

## Logging and Error Handling

All logs, including scheduler executions, API requests, and database operations, are written to the container’s stdout and can be viewed using:

```bash
> docker compose logs
```
