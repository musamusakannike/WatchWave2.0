import { ThemeContext } from "../ThemeContext.jsx";
import { useContext } from "react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faListAlt,faHeart,faStar,faBell,faHeadset,faBars,faTimes, faTv } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import { Link } from "react-router-dom";
import navlinks from "../data/navlinks.js";

const icons = { faHome, faListAlt, faHeart, faStar, faBell, faHeadset, faTv };

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navLinks = navlinks

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={`bg-${theme}`}>
      {/* Medium to Large Screen Sidebar */}
      <div
        className={`d-none d-lg-flex flex-column flex-shrink-0 p-3 vh-100 bg-${theme}`}
        style={{ width: "250px" }}
      >
        <div className="position-fixed">
          <a
            href="/"
            className={`d-flex align-items-center mb-3 mb-md-0 me-md-auto link-${theme} text-decoration-none`}
          >
            <img
              src="/assets/images/logo.png"
              alt="WatchWave logo"
              style={{ width: "30px", height: "30px" }}
            />
            <span
              className={`fs-4 text-${theme === "light" ? "dark" : "light"}`}
            >
              WatchWave
            </span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            {navLinks.map((link) => (
              <li className="nav-item my-3" key={link.id}>
                <Link
                  to={link.href}
                  className={`nav-link text-${
                    theme === "light" ? "dark" : "light"
                  }`}
                  aria-current={link.id === "home" ? "page" : undefined}
                >
                  <FontAwesomeIcon
                    icon={icons[link.icon]}
                    className={`bi me-2 text-danger`}
                  />
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <hr />
          <button className="btn btn-secondary" onClick={toggleTheme}>
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </div>

      {/* Mobile/Small Screen Sidebar */}
      <div
        className={`d-lg-none animate__animated animate__fast ${
          isSidebarVisible ? "animate__slideInLeft" : "animate__slideOutLeft"
        } flex-column flex-shrink-0 bg-${theme} vh-100`}
        style={{
          width: "4.5rem",
          position: "fixed",
          left: 0,
          top: 0,
          height: "100%",
          zIndex: 100,
        }}
      >
        <a
          href="/"
          className={`d-block p-3 link-${theme} text-decoration-none`}
          title="Icon-only"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
        >
          <img
            src="/assets/images/logo.png"
            alt="WatchWave logo"
            style={{ width: "30px", height: "30px" }}
          />
          <span className="visually-hidden">Icon-only</span>
        </a>
        <ul
          className={`nav nav-pills nav-flush flex-column mb-auto text-center text-${
            theme === "light" ? "dark" : "light"
          }`}
        >
          {navLinks.map((link) => (
            <li className="nav-item" key={link.id}>
              <Link
                to={link.href}
                className={`nav-link py-3 text-danger`}
                title={link.title}
                data-bs-toggle="tooltip"
                data-bs-placement="right"
              >
                <FontAwesomeIcon
                  icon={icons[link.icon]}
                  size="lg"
                  role="img"
                  aria-label={link.title}
                />
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <div
              className="form-check form-switch text-center d-flex justify-content-center"
              onClick={toggleTheme}
            >
              <input
                className="form-check-input bg-danger"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckDefault"
              ></label>
            </div>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="btn btn-danger d-md-none"
        onClick={toggleSidebar}
        style={{ position: "fixed", top: 5, right: 5, zIndex: 99 }}
      >
        {isSidebarVisible ? (
          <FontAwesomeIcon icon={faTimes} size="lg" />
        ) : (
          <FontAwesomeIcon icon={faBars} size="lg" />
        )}
      </button>
    </div>
  );
};

export default Navbar;
