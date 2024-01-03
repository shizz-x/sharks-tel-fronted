import sharkLogo from "../../media/sharks-logo.svg";
import "./Header.css";
export default function Header() {
  return (
    <header>
      <div className="logo">
        <img src={sharkLogo} alt="logo" />
      </div>
      <div className="nav_bar">
        <div className="nav_bar-button selected">FEX</div>
        <div className="nav_bar-button">DEX</div>
        <div className="nav_bar-button">About</div>
      </div>
    </header>
  );
}
