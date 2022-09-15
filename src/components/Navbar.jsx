import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__left-side">
        <span className="logo">AlpineMD</span>
      </div>
      <div className="navbar__right-side">
        <ul className="navbar__list">
          <li className="navbar__item"><LoginButton /></li>
          <li className="navbar__item"><LogoutButton /></li>
        </ul>
      </div>
    </nav>
  );
}
