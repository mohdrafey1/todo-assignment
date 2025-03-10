# React To-Do App with Redux & Firebase styled by Tailwind

## Project Overview

This is a **fully responsive To-Do application** built with **Tailwind**, **ReactJS**, **Redux Toolkit**, and **Firebase Firestore**. It allows users to **add, edit, delete task**. User authentication is handled via **Firebase Authentication (Google Sign-In)**.

## Features

-   **User Authentication** (Google Sign-In via Firebase)
-   **Task Management** (Add, Edit, Delete, Complete/Incomplete toggle)
-   **Real-time Sync** (Tasks are stored in Firestore & updated live)
-   **State Management** using **Redux Toolkit**
-   **Dark Mode Support**
-   **React Hot Toast** for toast notifications
-   **Responsive UI** using **Tailwind CSS**

---

## Tech Stack

### **Frontend**

-   **ReactJS** (Functional Components & Hooks)
-   **Redux Toolkit** (State Management)
-   **Tailwind CSS** (Styling & Responsiveness)
-   **Firebase Authentication** (Google Sign-In)
-   **Firestore Firebase** (Database)
-   **react-hot-toast** (Notifications)

---

## 🚀 Getting Started

### 1️⃣ **Clone the Repository**

```bash
 git clone https://github.com/mohdrafey1/todo-assignment.git
 cd react-todo-app
```

### 2️⃣ **Install Dependencies**

```bash
npm install
```

### 3️⃣ **Set Up Firebase**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication → Google Sign-In**
4. Create a **Firestore Database** and Add Rule give below
5. Copy your Firebase config and create a `.env` file:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ **Start the App**

```bash
npm run dev
```

🚀 The app will run on `http://localhost:5173`

---

## 🔧 Firestore Security Rules

Set the following **Firestore rules** to secure user data:

```json
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 🔹 Rules for "users" collection (Allow users to read & write their own data)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 🔹 Rules for "todos" collection
    match /todos/{document} {
      allow read: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create, update: if request.auth != null && request.auth.uid == request.resource.data.uid;
      allow delete: if request.auth != null && request.auth.uid == resource.data.uid;
    }
  }
}
```

---

## 📂 Project Structure

```
todo-assignment
├── 📁 public
├── 📁 src
│   ├── 📁 components
│   │   ├── 📄 Auth.jsx
│   │   ├── 📄 Header.jsx
│   │   ├── 📄 TodoList.jsx
│   │   ├── 📄 TaskCard.jsx
│   │   ├── 📄 TaskTable.jsx
│   │   ├── 📄 AddTaskModal.jsx
│   │   ├── 📄 EditTaskModal.jsx
│   ├── 📁 redux
│   │   ├── 📁 slices
│   │   │   ├── 📄 authSlice.js
│   │   │   ├── 📄 todoSlice.js
│   │   ├── 📄 store.js
│   ├── 📄 App.jsx
│   ├── 📄 main.js
│   ├── 📄 index.css
├── 📄 .env
├── 📄 firebase.js
├── 📄 index.html
├── 📄 package.json
├── 📄 README.md
├── 📄 vite.config.js
```

---

## Usage

### 🔹 **Authentication**

-   Click **"Sign in with Google"** to authenticate.
-   The app will **store user details in Firestore**.
-   Only authenticated users can **manage their tasks**.

### 🔹 **Adding a Task**

1. Click **"Add Task"**
2. Enter the **Title, Description (optional), and Due Date (optional)**
3. Click **Save** → Task will appear in the list

### 🔹 **Editing a Task**

-   Click **"Edit"** to modify a task.

### 🔹 **Mark as Completed**

-   Click "✅" to toggle task status.

### 🔹 **Delete a Task**

-   Click **"Delete"** to remove a task.

## Contributing

Feel free to contribute! Fork the repo, make changes, and submit a PR.

```bash
git checkout -b feature-branch
git commit -m "Added new feature"
git push origin feature-branch
```

---

💻 Developed with ❤️ by Mohd Rafey
