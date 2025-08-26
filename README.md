
# 📝 TodoApp

A simple and responsive **Todo App** built with **React (Vite)** for the frontend and **FastAPI + PostgreSQL** for the backend.  
This app allows you to add, mark, delete, and clear todos with a clean UI and a fast API.

---

## 🚀 Features
- Add, update, delete todos.
- Mark tasks as **done** or **undo**.
- Persistent storage using **PostgreSQL**.
- Responsive and clean UI.
- REST API built with **FastAPI**.

---

## 🛠️ Tech Stack
**Frontend** → React (Vite), Axios, CSS  
**Backend** → FastAPI, SQLAlchemy, Pydantic  
**Database** → PostgreSQL  
**Tools** → Node.js, Uvicorn

---


## ⚡ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/TodoApp.git
cd TodoApp
```

### 2️⃣ Setup Backend
```bash
cd TodoApp-Backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Backend runs at **http://127.0.0.1:8000**

### 3️⃣ Setup Frontend
```bash
cd ../TodoApp-Frontend
npm install
npm run dev
```
Frontend runs at **http://localhost:5173**

---

## 🔗 API Endpoints

| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| GET    | `/todos`         | Fetch all todos      |
| POST   | `/todos`         | Create a new todo    |
| PUT    | `/todos/{id}`    | Toggle completed     |
| DELETE | `/todos/{id}`    | Delete a todo        |

