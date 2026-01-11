💬 Real-Time Chat Web Application

A full-stack real-time chat application that enables users to communicate instantly through a secure, responsive, and modern web interface. The system supports authentication, live messaging, and real-time updates using WebSocket technology.

🚀 Features

User registration and login with secure authentication

Real-time one-to-one messaging

Live message delivery using WebSockets

Responsive UI for desktop and mobile devices

Online/offline user status

Secure password encryption and session handling

Cloud-based image storage for profile pictures

🛠 Tech Stack
Frontend

HTML5

CSS3

JavaScript

React.js

Axios

Socket.io Client

React Hot Toast

Backend

Node.js

Express.js

Socket.io

JSON Web Tokens (JWT)

Bcrypt.js

CORS

Dotenv

Database & Cloud

MongoDB

Mongoose

Cloudinary

🔐 Authentication & Security

Passwords are encrypted using bcrypt.js

Authentication is handled via JWT (JSON Web Tokens)

Environment variables are protected using dotenv

Secure cross-origin communication enabled with CORS

🔄 Real-Time Communication

The application uses Socket.io to enable:

Instant message delivery

Real-time user status updates

Live event broadcasting

The Socket.io Client on the frontend maintains a persistent connection with the server to ensure seamless communication.

📁 Project Architecture

The application follows a modular and scalable architecture:

React handles the frontend UI and component-based structure

Express.js manages RESTful APIs and authentication

MongoDB + Mongoose store users, messages, and chat data

Socket.io manages real-time events

Cloudinary handles media storage



▶️ How to Run the Project
1. Clone the repository
git clone https://github.com/Arpittrivedi77/real-time-chat-app.git

2. Install backend dependencies
cd server
npm install

3. Install frontend dependencies
cd client
npm install

4. Start the application
# Backend
npm run server

# Frontend
npm run dev

🎯 Purpose of the Project

This project was developed to demonstrate:

Full-stack web development

Real-time communication using WebSockets

Secure authentication and API design

Scalable architecture using React, Node.js, and MongoDB


👨‍💻 Author

Arpit Trivedi
MCA Student | Software Developer
[LinkedIn](https://www.linkedin.com/in/arpit-trivedi-4a3b85225/)
