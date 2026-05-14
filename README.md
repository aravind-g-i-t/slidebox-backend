# SlideBox Backend

Backend service for SlideBox image gallery application.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- Redux Toolkit compatible API
- Clean Architecture

---

# Features

- User authentication
- JWT access & refresh token flow
- Image upload
- Image reordering
- Infinite scrolling support
- Image title editing
- Image file replacement
- Secure cookie authentication

---

# Prerequisites

Make sure you have installed:

- Node.js (v18 or later)
- MongoDB
- npm

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the backend root.

Example:

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/slidebox

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

CLIENT_URL=http://localhost:5173
```

---

# Run Development Server

```bash
npm run dev
```

---

# Build Project

```bash
npm run build
```

---

# Run Production Build

```bash
npm start
```

---

# API Endpoints

## Authentication

### Signup

```http
POST /api/auth/signup
```

### Login

```http
POST /api/auth/signin
```

### Logout

```http
POST /api/auth/logout
```

### Refresh Token

```http
POST /api/auth/refresh-token
```

---

## Images

### Upload Images

```http
POST /api/images/upload
```

Multipart form-data:

```txt
images -> files
metadatas -> JSON string
```

---

### Get Images

```http
GET /api/images?limit=20&skip=0
```

---

### Reorder Images

```http
PATCH /api/images/reorder
```

Body:

```json
{
  "draggedId": "image-id",
  "targetOrder": 5
}
```

---

### Update Image Title

```http
PATCH /api/images/:id/title
```

Body:

```json
{
  "title": "New image title"
}
```

---

### Replace Image File

```http
PATCH /api/images/:id/file
```

Multipart form-data:

```txt
image -> file
```

---

# Folder Structure

```txt
src/
│
├── application/
├── domain/
├── infrastructure/
├── presentation/
├── setup/
└── shared/
```

---

# Architecture

This project follows Clean Architecture principles:

- Domain Layer
- Application Layer
- Infrastructure Layer
- Presentation Layer

---

# Scripts

```bash
npm run dev
npm run build
npm start
```