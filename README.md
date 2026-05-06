# Task Manager App

A full-stack MERN Task Manager application for managing tasks, notes, and todos with authentication and dashboard features.

---

## 🚀 Live Demo

### Frontend
https://task-manager-app-h32w.vercel.app

### Backend API
https://taskmanagerapp-production-91fc.up.railway.app

---

## ✨ Features

- User Authentication
- JWT Authentication
- Google OAuth
- Facebook OAuth
- Task Management
- Notes Management
- Todo Management
- Dashboard Analytics
- Calendar View
- Dark Mode
- Responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Material UI
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Passport.js

### Deployment
- Vercel
- Railway
- MongoDB Atlas

---

## 📂 Project Structure

```txt
Task-Manager-App/
│
├── FrontEnd/
├── BackEnd/
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/vishusingla24/Task_Manager_app.git
```

---

# 🔧 Backend Setup

```bash
cd BackEnd
npm install
npm start
```

## Backend `.env`

```env
PORT=8080

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

SESSION_SECRET=your_session_secret

FRONTEND_DOMAIN=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
```

---

# 🎨 Frontend Setup

```bash
cd FrontEnd
npm install
npm start
```

## Frontend `.env`

```env
REACT_APP_API_URL=http://localhost:8080
```

---

# 🌐 API Endpoints

## Authentication

- POST `/api/register`
- POST `/api/login`

## Tasks

- GET `/api/task/getTask`
- POST `/api/task/addTask`
- DELETE `/api/task/deleteTask`

## Notes

- GET `/api/note/getNote`
- POST `/api/note/addNote`
- DELETE `/api/note/deleteNote`

## Todos

- GET `/api/todo/getTodo`
- POST `/api/todo/addTodo`
- DELETE `/api/todo/deleteTodo`

---

# ☁️ Deployment

- Frontend → Vercel
- Backend → Railway
- Database → MongoDB Atlas

---

# 👨‍💻 Author

## Vishu Singla

GitHub:
https://github.com/vishusingla24
