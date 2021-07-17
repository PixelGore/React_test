import { NavLink } from "react-router-dom";
import "./Header.scss";
import logo from "../../assets/common/logo.svg";
import { useState } from "react";
import { Menu } from "./menu/Menu";
import { useDispatch, useSelector } from "react-redux";
import { getAuthMe } from "../../Redux/Selectors/authSelector";
import { logout } from "../../Redux/Reducers/authReducer";

export const Header: React.FC = () => {
  const dispatch = useDispatch()
  const [isOpenBrg, setisOpenBrg] = useState(false);
  const Me = useSelector(getAuthMe)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="header_wrapper">
      <header className="header">
        <div className="container">
          <div className="header__body">
            <NavLink to="/" className="header__logo">
              <img src={logo} alt="Header__logo" />
            </NavLink>
            {/* Burger */}
            <div
              className={
                isOpenBrg ? "header__burger active" : "header__burger"
              }
              onClick={() => { setisOpenBrg(!isOpenBrg) }}
            >
              <span className="burger_middle"></span>
            </div>
            {/* End Burger */}
            {/* Menu Start */}
            <nav className="header__menu">
              <ul className="header__list">
                <li>
                  <NavLink
                    to="/home"
                    className="header__link"
                    activeClassName="isActive"
                  >
                    <span className="header__link-text">Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className="header__link"
                    activeClassName="isActive"
                  >
                    <span className="header__link-text">About us</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/menu"
                    className="header__link"
                    activeClassName="isActive"
                  >
                    <span className="header__link-text">Menu</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contacts"
                    className="header__link"
                    activeClassName="isActive"
                  >
                    <span className="header__link-text">Contacts</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
            {/* End Menu */}
            <div className="header__end">
              <div className="header__login">
                <NavLink to={Me.length > 0 ? "/profile" : "/login"} className="header__login-link">
                  <span className="login-text">
                    <span className="material-icons">{Me.length > 0 ? "account_circle" : "login"}</span>
                  </span>
                </NavLink>
              </div>
              <div className="header__cart">
                <span style={{ color: "white", cursor: "pointer" }} onClick={handleLogout} className="material-icons">
                {Me.length < 0 ? "logout" : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Menu isActive={isOpenBrg} setIsActive={setisOpenBrg} />
    </div>
  );
};
