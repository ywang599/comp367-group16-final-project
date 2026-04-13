import { useAuth } from "../context/AuthContext";

export default function AuthStatus() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!user) {
    return <p>Not logged in</p>;
  }

  return <p>Logged in as: {user.username || user.email}</p>;
}