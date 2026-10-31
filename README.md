# AttendX – QR-Based Smart Attendance Management System

**AttendX** is a web-based attendance management system designed to simplify and digitize the traditional attendance process using QR codes. The project aims to make attendance recording faster, more organized, reliable, and accessible through a centralized application.

The application uses a frontend interface, a Node.js and Express.js backend, and a MySQL database to manage lectures, student attendance, and notes. The next development phase focuses on integrating AWS cloud services to make AttendX scalable, secure, and accessible over the internet.

---

## 1. Project Overview

Traditional attendance systems often involve manual registers, spreadsheets, and time-consuming record management.

AttendX aims to solve these challenges by introducing a digital attendance platform where:

- Teachers can manage lectures and attendance.
- Students can register their attendance through a QR-based workflow.
- Attendance records are stored in a centralized database.
- Teachers can view attendance information through a dashboard.
- Notes and other academic information can be managed digitally.

**Project Name:** AttendX  
**Project Type:** Web Application / Cloud-Based Attendance Management System  
**Domain:** Web Development, Database Management, Cloud Computing

## 2. Technology Stack

| Component | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js |
| Backend Framework | Express.js |
| Database | MySQL |
| Database Management | MySQL Workbench |
| API Communication | REST APIs, Fetch API |
| Version Control | Git and GitHub |
| Containerization (deployment work) | Docker |
| Web Server | Nginx |
| Cloud Platform (planned) | Amazon Web Services (AWS) |

## 3. Application Architecture

The current application follows a three-layer architecture.

```text
             USER / TEACHER
                    |
                    v
          FRONTEND APPLICATION
             HTML / CSS / JS
                    |
                    v
             REST API REQUEST
                    |
                    v
          NODE.JS + EXPRESS.JS
                    |
                    v
              MYSQL DATABASE
                    |
        +-----------+-----------+
        |           |           |
        v           v           v
     Lectures    Attendance    Notes
```

### Frontend

The frontend provides the user interface for interacting with AttendX.

Responsibilities:
- Display the attendance dashboard.
- Provide lecture and attendance management interfaces.
- Collect student information.
- Communicate with backend APIs using JavaScript Fetch API.

### Backend

The backend is developed using Node.js and Express.js.

Responsibilities:
- Handle HTTP requests and responses.
- Process lecture information.
- Record and retrieve attendance.
- Manage notes.
- Communicate with the MySQL database.
- Provide REST API endpoints to the frontend.

### Database

MySQL is used for persistent data storage.

The application uses the following main database tables:

| Table | Purpose |
|---|---|
| `lectures` | Stores lecture information |
| `attendance` | Stores student attendance records |
| `notes` | Stores teacher notes |

A unique constraint on the lecture and student combination helps prevent duplicate attendance entries for the same lecture.

## 4. Key Features

### Attendance Management
- Digital attendance record management.
- Student information collection.
- Attendance associated with individual lectures.
- Duplicate attendance prevention.

### QR-Based Attendance Workflow
- QR-based attendance is the central feature of AttendX.
- Students can access the attendance registration interface through a QR code.
- Student details such as name, PRN, and lecture information are collected.
- Attendance information is submitted to the backend for database storage.

### Lecture Management
- Create and manage lecture information.
- Retrieve lecture records.
- Organize attendance by lecture.

### Dashboard
- Display attendance-related information.
- Show dashboard statistics.
- Access lecture and attendance records.

### Notes Management
- Store and retrieve teacher notes.
- Keep important academic information organized.

## 5. Backend API Endpoints

The Express.js backend provides the following API routes:

| HTTP Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/lectures` | Retrieve lectures |
| POST | `/api/lectures` | Create a lecture |
| GET | `/api/attendance` | Retrieve attendance |
| POST | `/api/attendance` | Record attendance |
| GET | `/api/notes` | Retrieve notes |
| POST | `/api/notes` | Add notes |
| GET | `/api/dashboard` | Retrieve dashboard statistics |
| GET | `/api/test-db` | Test database connectivity |

These routes represent the backend API functionality; the exact request fields and additional routes should be checked against the current source code.

## 6. Project Directory Structure

The project is organized into frontend and backend components.

```text
AttendX/
│
├── frontend/
│   └── demo.html
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   └── .env
│
├── .gitignore
├── README.md
└── package.json (if present)
```

*Note: Update this structure to match the actual files in the repository.*

## 7. Installation and Setup

Follow these instructions to run the application locally.

### Prerequisites

Install the following software:

- Node.js and npm
- MySQL Server
- MySQL Workbench (optional, for database management)
- Git
- Visual Studio Code (recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Bhavana-Ghule/AttendX-QR-.git
```

Navigate into the project directory:

```bash
cd AttendX-QR-
```

### Step 2: Install Backend Dependencies

Navigate to the backend directory:

```bash
cd backend
```

Install the dependencies:

```bash
npm install
```

### Step 3: Configure MySQL

Create a MySQL database:

```sql
CREATE DATABASE attendx;
```

Create the required tables (`lectures`, `attendance`, and `notes`) using the project's database schema.

### Step 4: Configure Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=attendx
```

Replace the example values with your local MySQL configuration.

**Security:** Never commit your actual `.env` file, database passwords, or credentials to GitHub.

### Step 5: Start the Backend Server

```bash
node server.js
```

Or, if the project defines a start script:

```bash
npm start
```

The backend will run on the configured port.

### Step 6: Open the Frontend

Open the frontend page through a local development server or an appropriate web server configuration.

Ensure that the frontend API URL points to the running backend server.

---

# 8. Future Scope: AWS Cloud Integration

An important next phase of AttendX is integrating Amazon Web Services (AWS) to transform the locally running application into a cloud-hosted and scalable solution.

The objective is to move beyond local development and build a cloud-based application that can be accessed securely over the internet.

## Proposed AWS Architecture

```text
                 USERS
                   |
                   v
             ROUTE 53
             DNS SERVICE
                   |
                   v
             CLOUDFRONT
              CDN / HTTPS
                   |
                   v
              AMAZON S3
           FRONTEND HOSTING
                   |
                   v
             API GATEWAY
            API MANAGEMENT
                   |
                   v
          NODE.JS BACKEND
          EC2 / EKS DEPLOYMENT
                   |
           +-------+--------+
           |                |
           v                v
       AMAZON RDS       AMAZON SNS
       MYSQL DATABASE   NOTIFICATIONS
           |
           v
       CLOUDWATCH
       MONITORING
```

*This is a proposed architecture. The exact service connections and deployment approach will be finalized during cloud implementation.*

## Planned AWS Services and Their Responsibilities

### 1. Amazon EC2 – Backend Hosting

- Host the Node.js and Express.js backend.
- Run the application on a cloud-based virtual machine.
- Configure security groups and networking.
- Allow frontend-to-backend communication through secure API endpoints.

### 2. Amazon S3 – Frontend and File Storage

- Host static frontend assets such as HTML, CSS, and JavaScript.
- Store application-related documents and files.
- Provide durable cloud object storage.

### 3. Amazon RDS – Managed MySQL Database

- Migrate the local MySQL database to Amazon RDS.
- Store student attendance, lecture details, and teacher notes.
- Provide managed database infrastructure.
- Configure secure database connectivity from the backend.

### 4. Amazon API Gateway – API Management

- Provide a centralized entry point for application APIs.
- Manage API requests between the frontend and backend.
- Configure access controls and CORS where required.

### 5. Amazon CloudFront – Content Delivery

- Deliver frontend content through a global content delivery network.
- Improve application loading performance.
- Integrate HTTPS delivery with an appropriate SSL/TLS certificate.

### 6. Amazon Route 53 – Domain Management

- Configure domain name resolution.
- Connect the application domain to the cloud-hosted frontend.
- Support a user-friendly application URL.

### 7. AWS Certificate Manager – SSL/TLS

- Provision and manage SSL/TLS certificates.
- Enable HTTPS for secure application access.

### 8. Amazon SNS – Notification Service

- Send attendance-related notifications.
- Support email or SMS notification workflows.
- Notify relevant users when configured application events occur.

### 9. Amazon CloudWatch – Monitoring

- Monitor backend application logs.
- Track infrastructure metrics.
- Configure alarms for important application and server events.

### 10. AWS IAM and VPC – Security and Networking

- Use IAM roles and policies to manage permissions.
- Keep database resources inside private network subnets.
- Control access through security groups and network configurations.
- Avoid exposing sensitive backend and database resources publicly.

## 9. Containerization and DevOps Roadmap

AttendX can also be extended with containerization and DevOps practices.

**Docker**
- Create separate Docker images for the frontend and backend.
- Use Nginx to serve the frontend.
- Package the Node.js backend into a separate container.
- Publish versioned images to Docker Hub or Amazon ECR.

**Kubernetes / Amazon EKS**
- Deploy the frontend and backend as separate Kubernetes workloads.
- Use Kubernetes Services for application communication.
- Configure scaling and resource management.
- Use Ingress or an AWS load balancer for external access.

**Jenkins CI/CD**
- Automate application build and deployment workflows.
- Build Docker images after code changes.
- Push images to a container registry.
- Automate deployments to the Kubernetes environment.

**Monitoring**
- Integrate Prometheus and Grafana for infrastructure and application monitoring where appropriate.

## 10. Security Considerations

Security is an important part of the planned cloud architecture.

- Protect database credentials using environment variables and secure secret storage.
- Use IAM roles instead of hardcoding AWS access keys.
- Restrict database access to authorized application resources.
- Enable HTTPS for application communication.
- Validate incoming API requests.
- Prevent duplicate attendance submissions.
- Follow least-privilege access policies.

## 11. Future Enhancements

The following improvements can be considered as AttendX evolves:

- Complete QR-based attendance automation.
- Time-limited QR codes to reduce unauthorized attendance submissions.
- Improved student and teacher authentication.
- Attendance reports and analytics.
- Cloud-hosted MySQL database using Amazon RDS.
- Automated email and SMS notifications.
- Secure document and file storage using Amazon S3.
- Containerized deployment using Docker.
- Kubernetes orchestration using Amazon EKS.
- Automated CI/CD using Jenkins.
- Application monitoring and logging.

## 12. Project Objectives

The main objectives of AttendX are:

1. Digitize the traditional attendance management process.
2. Reduce manual attendance recording.
3. Maintain centralized and structured attendance records.
4. Provide an easy-to-use interface for teachers and students.
5. Develop practical knowledge of frontend and backend integration.
6. Implement database connectivity and REST API development.
7. Gain hands-on experience with AWS cloud infrastructure.
8. Explore containerization, Kubernetes, and DevOps automation.

## 13. Learning Outcomes

Through AttendX, the project explores:

- Full-stack web application development.
- Node.js and Express.js backend development.
- REST API implementation.
- MySQL database management.
- Git and GitHub version control.
- Docker containerization.
- AWS cloud architecture and deployment.
- Kubernetes orchestration and CI/CD concepts.

## 14. Conclusion

AttendX is designed to provide a smarter and more organized approach to attendance management through QR-based digital workflows.

The current development focuses on frontend and backend integration with a MySQL database. The planned AWS cloud integration will extend the application with cloud hosting, managed database services, storage, notifications, security, and monitoring.

By combining web technologies, cloud computing, and DevOps practices, AttendX aims to evolve into a scalable, secure, and reliable attendance management platform.

---

**Developed by:** Bhavana Ghule

**GitHub Repository:** https://github.com/Bhavana-Ghule/AttendX-QR-

**Project:** AttendX – QR-Based Smart Attendance Management System
