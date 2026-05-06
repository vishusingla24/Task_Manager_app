ask Manager App

A full-stack MERN Task Manager application that helps users manage tasks, notes, and todos with authentication support and a responsive dashboard UI.

🚀 Live Demo
Frontend
https://task-manager-app-h32w.vercel.app
Backend API
https://taskmanagerapp-production-91fc.up.railway.app
📌 Features
User Authentication
Login / Signup
JWT Authentication
Google OAuth
Facebook OAuth
Task Management
Create Tasks
Update Tasks
Delete Tasks
Track Progress
Notes Management
Add Notes
Edit Notes
Delete Notes
Todo Management
Create Todos
Mark Completed
Dashboard
Analytics Charts
Calendar View
Notifications
Dark Mode
Responsive UI
🛠️ Tech Stack
Frontend
React.js
Material UI
Axios
CSS
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
Passport.js
Deployment
Frontend: Vercel
Backend: Railway
Database: MongoDB Atlas
📂 Project Structure
Task-Manager-App/
│
├── FrontEnd/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
│
├── BackEnd/
│   ├── Models/
│   ├── Routes/
│   ├── passport.js
│   ├── index.js
│   └── package.json
│
└── README.md
⚙️ Installation Guide
1️⃣ Clone Repository
git clone https://github.com/vishusingla24/Task_Manager_app.git
🔧 Backend Setup
Go to backend folder
cd BackEnd
Install dependencies
npm install
Create .env file
PORT=8080

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

SESSION_SECRET=your_session_secret

FRONTEND_DOMAIN=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
Run Backend
npm start
🎨 Frontend Setup
Go to frontend folder
cd FrontEnd
Install dependencies
npm install
Create .env file
REACT_APP_API_URL=http://localhost:8080
Run Frontend
npm start
🌐 API Endpoints
Authentication
Method	Endpoint
POST	/api/register
POST	/api/login
GET	/auth/google
GET	/auth/facebook
Tasks
Method	Endpoint
GET	/api/task/getTask
POST	/api/task/addTask
DELETE	/api/task/deleteTask
Notes
Method	Endpoint
GET	/api/note/getNote
POST	/api/note/addNote
DELETE	/api/note/deleteNote
Todos
Method	Endpoint
GET	/api/todo/getTodo
POST	/api/todo/addTodo
DELETE	/api/todo/deleteTodo
🔐 Authentication

This project uses:

JWT Authentication
Passport.js
Google OAuth 2.0
Facebook OAuth
☁️ Deployment
Frontend Deployment
Vercel
Backend Deployment
Railway
Database
MongoDB Atlas
📸 Screenshots
Login Page
User authentication page with social login support.
Dashboard
Displays tasks, notes, analytics, and calendar.
Task Management
Add and manage daily tasks efficiently.
🧠 Challenges Faced
Fixing deployment issues on Railway and Vercel
Handling CORS errors
MongoDB Atlas connection issues
Authentication token handling
Production environment configuration
📈 Future Improvements
Real-time notifications
Drag-and-drop task management
Team collaboration
File upload support
Better analytics dashboard
👨‍💻 Author
Vishu Singla

GitHub:

https://github.com/vishusingla24
📄 License

This project is licensed under the MIT License.

⭐ Acknowledgements
React.js
Node.js
MongoDB Atlas
Railway
Vercel
Material UI
