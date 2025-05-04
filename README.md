# Collaborative Task Tracking System

## Description

The **Collaborative Task Tracking System** is a backend service built with **Node.js** and **MongoDB**, designed for task and project collaboration within teams. It supports secure user authentication, AI-generated task descriptions, and features like comments, attachments, and task assignments.

This system enables users to manage tasks, collaborate in teams, and stay organized through intuitive REST APIs. It's ideal for both individual productivity and team-based project management.

---

## Features

- **User Authentication**
  - Register and login securely
  - JWT-based token authentication
  - View and update user profile

- **Task Management**
  - Create, update, and delete tasks
  - Auto-generate short descriptions via AI
  - Filter tasks by `status`, `due date`, and `title`
  - Assign tasks to users
  - Comment on tasks
  - Upload attachments (e.g., screenshots, files)

- **Collaboration**
  - Assign tasks to team members
  - Comment-based communication
  - Optional real-time updates (future scope)

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **AI Integration**: External AI API (for description generation)

---

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShubhangiRaghuvanshi/collaborative_task_tracking_system.git
   cd collaborative_task_tracking_system
Install dependencies
npm install

Environment variables

Create a .env file in the root with:
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
AI_API_KEY=<your-ai-key>
Start the server
npm start

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/user/register` | Register new user        |
| POST   | `/api/user/login`    | Login existing user      |
| GET    | `/api/user/profile`  | View user profile (Auth) |
| Method | Endpoint                   | Description                        |
| ------ | -------------------------- | ---------------------------------- |
| POST   | `/api/task`                | Create a new task                  |
| GET    | `/api/task`                | Get all tasks (supports filtering) |
| GET    | `/api/task/:id`            | Get task details by ID             |
| PUT    | `/api/task/:id`            | Update task status/details         |
| POST   | `/api/task/:id`    | Add comment to task                |
    
| POST   | `/api/task/:id/assign`     | Assign task to user                |
