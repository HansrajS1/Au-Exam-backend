# AU Exam Papers Backend

This is the backend service for the for both the [AU Exam App](https://github.com/HansrajS1/Au-Exam-App)  &  [Web](https://github.com/HansrajS1/Au-Exam-Web) — a platform for uploading, searching, and downloading academic papers. Built with **Node.js, Express, PostgreSQL, and Cloudinary**, it supports file uploads, metadata storage, and secure access to resources.

---


[![Build Status](https://github.com/HansrajS1/Au-Exam-backend/actions/workflows/keep-alive.yml/badge.svg)](https://github.com/HansrajS1/Au-Exam-backend/actions/workflows/keep-alive.yml)




## Tech Stack
- **Node.js + Express** – RESTful API server  
- **PostgreSQL + Knex.js** – Relational database and query builder  
- **Cloudinary** – File and image hosting  
- **Multer** – File upload middleware  
- **Supabase** – Optional DB hosting layer  
- **Dotenv** – Environment variable management  

---

##  Installation

```bash
git clone https://github.com/your-username/au-exam-backend.git
cd au-exam-backend
npm install
```

Create a **.env** file in the root directory:

```env
PORT=10000
POSTGRES_URI=your_postgres_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🧪 Running Locally

```bash
npm run dev
```

Server will start on **http://localhost:10000**

---

##  API Endpoints

#### GET `/api/papers`
Fetch all papers.

#### GET `/api/papers/:id`
Fetch a paper by ID.

#### GET `/api/papers/search?subject=...`
Search papers by subject.

#### POST `/api/papers/upload`
Upload a new paper.  

**FormData fields:**
- `file` → PDF file  
- `preview` → Image file  
- `data` → JSON string with metadata:  

```json
{
  "college": "AU",
  "course": "BSc",
  "semester": 5,
  "subject": "Mathematics",
  "description": "Linear Algebra and Calculus",
  "userEmail": "hansrajvvs@gmail.com"
}
```

#### PUT `/api/papers/:id`
Update an existing paper.

#### DELETE `/api/papers/:id`
Delete a paper.

---

## Features
- Upload PDF and preview image  
- Store metadata in PostgreSQL  
- Cloudinary-hosted file access  
- Search by subject  
- Auto-mapping between snake_case and camelCase  
- Frontend-ready JSON responses  

---

## Author
Built by **Hans Raj** — pragmatic, outcome-driven engineer focused on reproducibility, clarity, and speed.

---


