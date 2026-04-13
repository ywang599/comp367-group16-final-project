import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, loading } = useAuth();

  // add loading and no-user fallback
  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return <p>No user information available.</p>;
  }

  return (
    <div className="page-container">
      <div className="profile-card">
        <h1>Profile</h1>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role || "user"}</p>
        <p><strong>Auth Provider:</strong> {user.authProvider || "local"}</p>
      </div>
    </div>
  );
}