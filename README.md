# This is one of an assingment from COMP308 course. We enhanced the frontend part for COMP367 group project.

## Authentication Approach

This project uses JWT-based authentication with a React frontend, Node.js/Express backend, Apollo Server GraphQL API, and MongoDB Atlas.

Authentication flow:
1. A user registers with username, email, and password.
2. The password is hashed before being stored in MongoDB.
3. A JWT token is generated after successful registration or login.
4. The frontend stores the token in local storage.
5. Apollo Client sends the token in the Authorization header for protected requests.
6. The backend verifies the token and identifies the current user.
7. Protected pages, such as the profile page, require authentication.

Supported operations:
- register
- login
- logout
- currentUser

## Setup Instructions

### Backend Setup
1. Clone the repository
2. Open the `backend` folder.
3. Install dependencies using `npm install`.
4. Create a local `.env` file in the `backend` folder based on `backend/.env.example`.
5. Add these variables to `backend/.env`:
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLIENT_URL`

Example backend `.env`:
- `PORT=5000`
- `MONGO_URI=your_mongodb_atlas_connection_string`
- `JWT_SECRET=your_jwt_secret_here`
- `CLIENT_URL=http://localhost:3000`

6. Start the backend server using `npm run dev`.

### Frontend Setup
1. Open the `frontend` folder.
2. Install dependencies using `npm install`.
3. Create a local `.env` file in the `frontend` folder based on `frontend/.env.example`.
4. Add this variable to `frontend/.env`:
   - `REACT_APP_GRAPHQL_URL=http://localhost:5000/graphql`
5. Start the frontend using `npm start`.

## Required Environment Variables

### Backend
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL`

### Frontend
- `REACT_APP_GRAPHQL_URL`

## Notes
- Do not commit real `.env` files to GitHub.
- `.env.example` files are templates only and are safe to share.
- Each team member must create their own local `.env` file.
- `.env` files are local only and will not be included when cloning the repository.
- Remove all `node_modules` folders before zipping and submitting the project.