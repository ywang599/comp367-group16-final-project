import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="page-container">
      <h1>Authentication Demo</h1>

      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <p>Welcome back, {user.username || user.email}.</p>
          <p>You are logged in.</p>
          <Link to="/profile">Go to Profile</Link>
        </>
      ) : (
        <>
          <p>Welcome to the authentication demo app.</p>
          <p>Please login or register to continue.</p>
          <div className="home-actions">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </>
      )}
    </div>
  );
}