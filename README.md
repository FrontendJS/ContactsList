# Web App Documentation

## Overview
MVP ContactsList as a contact management interface. Consisting of a React client and Express.js server parts. The application uses a JSON file as database.

## Technologies Used

### Client (Frontend)
- React
- TypeScript
- TanStack Router
- TanStack Query
- Vite (for development and bundling)

### Server (Backend)
- Node.js
- Express
- JSON file as a database

## Setup Instructions

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (latest LTS version recommended)
- npm

### Installation

#### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   node server
   ```
   The backend should now be running on `http://localhost:8000`.

Warning: don't expect a full backend. Server.js is just to show the frontend application in action.

#### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm run dev
   ```
   The frontend should now be accessible at `http://localhost:5173`.

## Project Structure
```
/web-app
│── client (React frontend)
│   ├── src
│   │   ├── components
│   │   │   ├── core
│   │   ├── hooks
│   │   ├── routes
│   │   │   ├── contacts
│   │   ├── types
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env
│   ├── .gitignore
│   ├── .prettierrc
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.cjs
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│ 
│
│── server (Node.js backend)
│   ├── data.json
│   ├── server.js
│   ├── package.json
│   └── .gitignore
```

## API Endpoints
| Method | Endpoint                  | Description                                  |
|--------|---------------------------|----------------------------------------------|
| GET    | `/api/items`              | Fetch all contacts all search by full name   |
| POST   | `/api/items`              | Add a new contact                            |
| PUT    | `/api/items/:id`          | Edit an contact                              |
| DELETE | `/api/items/:id`          | Delete an contact                            |
| GET    | `/api/contact/:username`  | Fetch full data of contact                   |

## Notes
- The backend serves data from a JSON file, so changes are not persistent unless explicitly handled.
- TanStack Query is used for efficient data fetching and caching in the frontend.
- TanStack Router is used for routing within the React app.

## License
This project is licensed under the MIT License.

