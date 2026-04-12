// need to enhance
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
      </div>

      <div className="navbar-right">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}