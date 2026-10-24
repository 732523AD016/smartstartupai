# 🚀 Smart Startup Builder – Hema AI

### An AI-Powered MERN Stack Web Application

**Smart Startup Builder – Hema AI** is an AI-powered full-stack web application designed to help aspiring entrepreneurs transform their business ideas into structured startup plans. By combining the MERN stack with Google Gemini AI, the platform aims to simplify startup ideation and business planning through an interactive web interface.

---

## 🌟 Project Overview

Starting a business requires research, planning, and a clear understanding of the market. Smart Startup Builder helps users get started by using AI to generate startup-related ideas and business planning content from user-provided prompts.

The application combines a React-based frontend, a Node.js and Express.js backend, MongoDB data storage, and Google Gemini AI integration to deliver an end-to-end full-stack experience.

## ✨ Key Features

- 🤖 **AI-Powered Idea Generation** – Generate startup-related ideas using Google Gemini AI.
- 📊 **Business Planning Assistance** – Create AI-generated planning content based on user prompts.
- 🔐 **User Authentication** – Backend authentication using JWT and password hashing with bcryptjs.
- 💾 **MongoDB Integration** – Store and manage startup plans using MongoDB and Mongoose.
- 🔄 **RESTful API Architecture** – Connect the frontend and backend through API endpoints.
- ⚡ **Interactive User Interface** – Build a dynamic experience using React.js.
- 🧩 **Modular Backend** – Organize API routes and application logic for maintainability.

## 🛠️ Tech Stack & Technologies

### 💻 MERN Full Stack Development

| Technology | Purpose |
|---|---|
| **MongoDB** | NoSQL database for application data |
| **Express.js** | Backend framework and REST API development |
| **React.js** | Interactive frontend user interface |
| **Node.js** | Server-side JavaScript runtime |
| **Mongoose** | MongoDB object modeling |

### 🤖 AI Integration

- **Google Gemini API** – AI-powered startup idea generation and business planning assistance.
- **@google/genai** – Google GenAI SDK for connecting the backend with Gemini models.

### 🔐 Authentication & Security

- **JSON Web Token (JWT)** – Token-based authentication.
- **bcryptjs** – Password hashing.
- **CORS** – Configured cross-origin access between frontend and backend.
- **Environment Variables** – Keep API keys, database configuration, and secrets outside source code.

### 🧰 Development Tools

- **Visual Studio Code** – Development environment.
- **Git & GitHub** – Version control and source code management.
- **Postman** – REST API testing.
- **npm** – Package management.

## 🏗️ System Architecture

```text
                 USER
                   |
                   v
          React.js Frontend
             localhost:3000
                   |
                   v
       Node.js + Express.js Backend
             localhost:5000
                   |
          +--------+--------+
          |                 |
          v                 v
      MongoDB          Google Gemini AI
   Data Persistence     AI Generation
          |                 |
          +--------+--------+
                   |
                   v
          Response to Frontend
```

## 📂 Project Structure

```text
smartstartupai/
│
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── startups.js
│   │   └── ai.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── public/
├── src/
│   ├── App.js
│   └── ...
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB running locally or a MongoDB Atlas connection
- Google Gemini API key
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/732523AD016/smartstartupai.git
cd smartstartupai
```

### 2. Install Frontend Dependencies

Run this command from the project root:

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/smartstartupai
JWT_SECRET=AQ.Ab8RN6JlbQXTV3tCnI0AMprW3EQ2IFJvkXaylfCjxIT9p6Ow0A
GEMINI_API_KEY=AQ.Ab8RN6JlbQXTV3tCnI0AMprW3EQ2IFJvkXaylfCjxIT9p6Ow0A
```

**Important:** Replace the placeholder Gemini key with your own API key. Never upload your `.env` file or expose API keys in a public repository.

### 5. Start the Backend Server

From the `backend` folder, run:

```bash
node server.js
```

The backend runs at:

`http://localhost:5000`

Health check endpoint:

`http://localhost:5000/api/health`

### 6. Start the Frontend

Open a **new terminal** in the project root:

```bash
npm start
```

The React application runs at:

`http://localhost:3000`

Keep the backend and frontend terminals running while testing the application.

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend server status |
| POST | `/api/ai/generate` | Generate AI content using Gemini |
| Auth routes | `/api/auth` | Authentication operations |
| Startup routes | `/api/startups` | Startup plan operations |

The exact authentication and startup sub-routes depend on the implementation in the backend route files.

## 🔒 Security Practices

- Store API keys and database credentials in environment variables.
- Never commit `.env` files to GitHub.
- Use password hashing instead of storing plain-text passwords.
- Validate request data on the backend.
- Protect private startup data using appropriate authentication and authorization.
- Keep dependencies updated and review security warnings.

## 🎯 Learning Outcomes

Through this project, the following full-stack development concepts can be demonstrated:

- Building a full-stack application using the MERN stack.
- Connecting a React frontend to a REST API.
- Developing backend routes using Node.js and Express.js.
- Integrating MongoDB using Mongoose.
- Connecting an AI model through the Google Gemini API.
- Implementing authentication-related functionality.
- Managing environment variables and application configuration.
- Testing APIs and debugging application errors.

## 🚀 Future Enhancements

- 📈 AI-powered market research and competitor analysis.
- 💰 Revenue model and business growth recommendations.
- 📄 Export generated business plans as PDF.
- 📊 Startup dashboard with saved plans and progress tracking.
- ☁️ Cloud deployment with production-ready configuration.

*Future enhancements are planned ideas and may not be available in the current version.*

## 👩‍💻 Developer

**Hema Periyasamy**

B.Tech – Artificial Intelligence and Data Science

**Project:** Smart Startup Builder – Hema AI

*Building intelligent web applications by combining full-stack development with AI.*

---

⭐ If you find this project interesting, feel free to explore the repository and share feedback.
