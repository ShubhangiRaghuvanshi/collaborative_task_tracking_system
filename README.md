# Collaborative Task Tracking System

## Description

The **Collaborative Task Tracking System** is a backend service built with **Node.js** and **MongoDB**, designed to streamline task creation, assignment, tracking, and collaboration within teams or projects. It integrates with an external AI service to auto-generate task descriptions based on task titles, making task creation faster and more intuitive.

---

## Features

- **User Authentication**
  - Secure registration and login
  - JWT-based session handling
  - Profile viewing and editing

- **Task Management**
  - Create tasks with optional AI-generated descriptions
  - View, update, assign, and mark tasks as completed
  - Filter/search tasks by status, title, or due date
  - Add comments and attachments

- **Team Collaboration**
  - Create and manage teams
  - Add members to a team
  - Assign tasks within teams

- **AI Integration**
  - Generate dynamic descriptions using an external AI API

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **AI Service**: External AI API for description generation

---

## Installation

```bash
git clone https://github.com/ShubhangiRaghuvanshi/collaborative_task_tracking_system.git
cd collaborative_task_tracking_system
npm install
Set environment variables
Create a .env file:

env
Copy
Edit
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
AI_API_KEY=<your-ai-api-key>
Start the server

npm start
API Endpoints
🔐 Authentication
Method	Endpoint	Description
POST	/api/user/register	Register a new user
POST	/api/user/login	Login and receive a token
GET	/api/user/profile	View user profile

📋 Task Management
Method	Endpoint	Description
POST	/api/task	Create a new task
GET	/api/task	Get all tasks (with filters)
GET	/api/task/:id	Get task details by ID
PUT	/api/task/:id	Update task details/status
POST	/api/task/:id/assign	Assign a task to a user
POST	/api/task/:id/comment	Add a comment to the task
POST	/api/task/:id/attachment	Upload a file as an attachment
PUT	/api/task/:id (with "status": "completed")	Mark task as completed

Example to mark task as completed:


PUT http://localhost:5000/api/task/6817d3e770275757e6b81f3b
Body: { "status": "completed" }
Filtering Example:


GET /api/task?status=pending&search=report&page=1&limit=10

Method	Endpoint	Description
POST	/api/team/	Create a new team
POST	/api/team/:teamId/members	Add members to a team

Example to add members:


POST http://localhost:5000/api/team/6817988f77375dd2c0c977ca/members
Body: {
  "userIds": ["<userId1>", "<userId2>"]
}
User Stories
✅ Register and login securely

✅ View and update your profile

✅ Create tasks with AI-generated descriptions

✅ Assign tasks to other users

✅ Mark tasks as completed

✅ Filter/search tasks by title or status

✅ Upload attachments and add comments

✅ Create and manage teams

✅ Add members to a team

✅ Assign tasks within a team

Optional (future): Real-time notifications

Contribution Guide
Fork the repository

Create a feature branch

git checkout -b feature-name
Commit your changes


git commit -am "Add feature"
Push and open a pull request

License
This project is licensed under the MIT License.
