import { Dispatch, FC, SetStateAction } from "react";
import "./Menu.scss";
import { NavLink } from "react-router-dom";

export const Menu: FC<PropsType> = ({ isActive, setIsActive }) => {
  return (
    <nav className={isActive ? "mobile-menu active" : "mobile-menu"}>
      <div className="blur" />
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink
            to="/home"
            className="nav-link"
            activeClassName="isActive"
            onClick={() => setIsActive(!isActive)}>
            <span className="material-icons">home</span>
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/about"
            className="nav-link"
            activeClassName="isActive"
            onClick={() => setIsActive(!isActive)}
          >
            <span className="material-icons">groups</span>
            About us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/menu"
            className="nav-link"
            activeClassName="isActive"
            onClick={() => setIsActive(!isActive)}
          >
            <span className="material-icons">local_dining</span>
            Menu
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contacts"
            className="nav-link"
            activeClassName="isActive"
            onClick={() => setIsActive(!isActive)}
          >
            <span className="material-icons">contacts</span>
            Contacts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/login"
            className="nav-link"
            activeClassName="isActive"
            onClick={() => setIsActive(!isActive)}
          >
            <span className="material-icons">login</span>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
type PropsType = {
  isActive: boolean,
  setIsActive: Dispatch<SetStateAction<boolean>>
}