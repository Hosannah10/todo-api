# Task Manager REST API

A simple REST API built with **Node.js**, **Express**, and **PostgreSQL** for managing tasks (mini To-Do app).

---

##  Features

-  Create, read, update, and delete tasks  
-  Toggle task completion status  
-  PostgreSQL for persistent storage  
-  Environment variable support via `.env`  
-  Input validation and error handling middleware  

---

##  Tech Stack

- **Backend:** Node.js, Express  
- **Database:** PostgreSQL  
- **Environment Management:** dotenv  
- **HTTP Client (for testing):** Postman / cURL  

---

##  Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

2. Install Dependencies
npm install

3. Setup Environment Variables

Create a .env file in the project root:

PORT=5000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/todo_db

Or refer to .env.example for the required structure.

4. Setup PostgreSQL

In your PostgreSQL shell or pgAdmin:

CREATE DATABASE todo_db;

\c todo_db;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

5. Start the Server
node server.js


Server runs at:
 http://localhost:5000

 API Endpoints
Method	Endpoint	Description
GET	/tasks	Get all tasks
POST	/tasks	Create a new task
PUT	/tasks/:id	Update a task by ID
PATCH	/tasks/:id/completed	Toggle completion status
DELETE	/tasks/:id	Delete a task
Example Request (POST)
POST http://localhost:5000/tasks
Content-Type: application/json

{
  "title": "Buy groceries"
}

 Error Handling
Status	Meaning	Example
400	Bad Request	Missing required title
404	Not Found	Task with ID not found
500	Internal Server Error	Database connection issue

 Testing
Use Postman, Insomnia, or curl to test API endpoints.

Example:

curl -X GET http://localhost:5000/tasks

 Security & Git

Make sure to include .env and node_modules in .gitignore:

node_modules/
.env

Example .env.example
# Example environment file
PORT=5000
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/todo_db

 Author

Hosannah Patrick
💼 GitHub: @Hosannah10

📧 Email: hosannahpatrick@gmail.com
