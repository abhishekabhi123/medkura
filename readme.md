 Report Management & Status Tracking System

A full-stack application that allows users to upload medical reports, track processing status, and view generated summaries.

> This project was developed as part of a technical assessment for a Full-Stack Engineer role.

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Java Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven

---

## Features

- User authentication via login API
- Upload medical reports with metadata
- Report workflow management: `UPLOADED → PROCESSING → COMPLETED`
- Reports listing dashboard
- Report detail view with metadata
- Auto-generated summary on completion
- File preview and download
- Status workflow validation
- Input validation and error handling
- Clean layered backend architecture

---

## Backend Setup

### Requirements

- Java 17+
- Maven
- PostgreSQL

### Steps

1. **Create the database:**

```sql
CREATE DATABASE report_system;
```

2. **Configure database credentials** in:

```
backend/src/main/resources/application.properties
```

```
Copy application-example.properties to application.properties and update credentials
```

3. **Start the backend:**

```bash
mvn spring-boot:run
```

Backend runs at: `http://localhost:8080`

---

## Frontend Setup

Inside the `frontend` folder:

```bash
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## Database Schema

### `users`

| Column   | Description    |
|----------|----------------|
| id       | Primary key    |
| email    | User email     |
| password | User password  |

### `reports`

| Column     | Description         |
|------------|---------------------|
| id         | Primary key         |
| user_id    | Owner user          |
| name       | Report name         |
| type       | Report type         |
| file_path  | Uploaded file path  |
| status     | Workflow status     |
| summary    | Generated summary   |
| created_at | Creation time       |
| updated_at | Last update time    |

---

## Workflow

1. User logs in.
2. User uploads a report.
3. Report appears in the dashboard.
4. Status moves through: **Uploaded → Processing → Completed**
5. Summary is generated on completion.
6. File can be previewed or downloaded.

---

## Architecture Overview

The system follows a layered architecture using **Controller → Service → Repository** separation. Spring Boot REST APIs handle authentication, report upload, status updates, and retrieval. Report metadata is stored in PostgreSQL, while uploaded files are stored locally and served through APIs. The React frontend consumes these APIs to provide report listing, upload, and detail views. Validation and global exception handling ensure clean API responses and consistent workflow behavior.

---

## Possible Future Improvements

- JWT authentication
- Role-based access
- Background processing jobs
- Cloud file storage
- Pagination & filtering
- Report analytics

---

## Screenshots

Screenshots demonstrating login, dashboard, upload, and report detail flows are included in the `screenshots/` folder.

---

## Author

**Abhishek P S**