# Event Registration System

A full-stack Event Registration System built as part of a technical assignment.  
The application allows users to view events and register, while admins can securely manage events and registrations.

---

## 🔧 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication

---

## ✨ Features

### User Features
- View list of events
- View event details (date, time, location)
- Register for an event
- Form validation (name, email, phone)

### Admin Features
- Secure admin login (JWT)
- Add new events (date & time support)
- View all events
- Delete events
- View registrations per event
- Delete registrations
- Export registrations as CSV

---

## 📁 Project Structure
event-registration-system/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── index.html
│
└── README.md 


---

## 🚀 Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/event-registration-system.git
cd event-registration-system


2️⃣ Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend: npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on: http://localhost:5173

Backend runs on:http://localhost:5000

🔐 Admin Access

Admin authentication uses JWT.

Admin users are stored in MongoDB

Token is stored in browser localStorage

Admin routes are protected using middleware

📌 Notes

No business logic was altered for UI enhancements

Tailwind CSS used strictly for styling

Designed to reflect real-world internal admin tools

🧑‍💻 Author

Nikhil Gowda S
