# Collaborative Task Tracking System

## Description

The **Collaborative Task Tracking System** is a backend service built with Node.js and MongoDB, designed to manage tasks with features such as task creation, status updates, and user-specific task management. The system integrates with an external AI service to dynamically generate short descriptions for tasks based on the task titles. This project is aimed at streamlining task management, assigning tasks to users, and tracking their progress effectively.

## Features

- **User Authentication**: Register, login, and manage user profiles.
- **Task Management**:
  - Create tasks with auto-generated descriptions.
  - Filter and search tasks by status, title, and due date.
  - Update task statuses (e.g., `pending`, `in-progress`, `completed`).
  - Assign tasks to specific users.
- **Task Description Generation**: Dynamic description generation using an AI service.
- **Task Commenting & Attachments**: Add comments and attach files to tasks.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT-based
- **AI Integration**: External AI API for generating task descriptions

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ShubhangiRaghuvanshi/collaborative_task_tracking_system.git
   cd collaborative_task_tracking_system

   Install dependencies:

npm install


Set up environment variables:
Create a .env file in the root directory and add the following:
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
AI_API_KEY=<Your AI API Key>
npm start
API Endpoints
Auth
POST /api/user/register
Register a new user
POST /api/user/login
Login an existing user
GET /api/user/profile
Get the logged-in user's profile
Headers: Authorization: Bearer <token>

Tasks
POST /api/task
Create a new task
GET /api/task
Fetch tasks (with filtering and pagination)
Query Parameters:

status = pending | in-progress | completed

search = text

page = number

limit = number

GET /api/task/:id
Get task details

PUT /api/task/:id
Update task (e.g. change status)
POST /api/task/:id/comment
Add comment to a task
POST /api/task/:id/attachment
Upload a file as an attachment (form-data)
Contributing
Fork this repo

Create a new branch: git checkout -b feature-name

Make your changes

Commit: git commit -am 'Add feature'

Push: git push origin feature-name

Submit a pull request

License
This project is licensed under the MIT License.



