import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "./navbar.scss";
import { useCallback } from "react";

export function NavbarCustom(props) {
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };
  const onLoggedOut = useCallback(() => {
    localStorage.clear();
    window.open("/", "_self");
  }, []);
  return (
    <div className="HeaderContainer">
      <div className="buttonsContainer">
        {isAuth() && <Nav.Link href="/">Movies</Nav.Link>}
        {isAuth() && <Nav.Link href="/profile">Profile</Nav.Link>}
        {isAuth() && <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>}
      </div>
    </div>
  );
}
