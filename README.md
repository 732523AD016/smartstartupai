Smart Startup Builder – Hema AI 🚀

An AI-powered full-stack web application that helps users transform startup ideas into structured business plans with AI-generated insights.

✨ Features

- 🤖 **AI Startup Idea Generator** – Generate startup ideas using Google Gemini AI.
- 📊 **Business Plan Generation** – Create structured plans with problem, solution, market, revenue, and growth details.
- 🔐 **User Authentication** – Register and log in securely.
- 💾 **Save Startup Ideas** – Store and manage startup plans using MongoDB.
- 🛠️ **Full-Stack Architecture** – React frontend with Node.js and Express backend.

 🧰 Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML5 and CSS3

**Backend**
- Node.js
- Express.js
- MongoDB and Mongoose
- JWT Authentication

**AI Integration**
- Google Gemini API (`@google/genai`)

## 📁 Project Structure


smartstartupai-mern/
├── public/
├── src/
│   ├── App.js
│   └── components/
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── startups.js
│   │   └── ai.js
│   ├── server.js
│   └── .env.example
├── package.json
└── README.md


## ⚙️ Prerequisites

- Node.js and npm
- MongoDB local instance or MongoDB Atlas
- Google Gemini API key

## 🚀 Getting Started

### 1. Clone the repository


git clone https://github.com/732523AD016/smartstartupai.git
cd smartstartupai

### 2. Install frontend dependencies


npm install


### 3. Configure the backend


cd backend
npm install


Create a `.env` file inside the `backend` directory:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/smartstartupai
JWT_SECRET=AQ.Ab8RN6JlbQXTV3tCnI0AMprW3EQ2IFJvkXaylfCjxIT9p6Ow0A
GEMINI_API_KEY=AQ.Ab8RN6JlbQXTV3tCnI0AMprW3EQ2IFJvkXaylfCjxIT9p6Ow0A
```

Replace the example values with your own configuration. Keep `.env` private and never upload API keys or secrets to GitHub.

### 4. Start the backend

From the `backend` directory, run:

```bash
node server.js
```

The backend runs at `http://localhost:5000`.

Health check: `http://localhost:5000/api/health`

### 5. Start the frontend

Open a separate terminal in the project root:

```bash
npm start
```

Open `http://localhost:3000` in your browser.

## 🏗️ Production Build

To create an optimized frontend build:

```bash
npm run build
```

The production files will be generated in the `build` directory.

## 🔒 Security Notes

- Store API keys and secrets in environment variables.
- Do not commit `.env` files.
- Keep authentication secrets private.
- Validate and handle API requests on the backend.

## 🎯 Project Objective

The objective of Smart Startup Builder is to make early-stage startup planning easier by combining AI-assisted idea generation with secure user authentication and database-backed plan management.

## 👩‍💻 Developer

**Hema Periyasamy**

Full Stack Developer | AI Application Development

## API Testing

Postman
