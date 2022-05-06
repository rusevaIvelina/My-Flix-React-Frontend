import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        localStorage.setItem("password", password);
        localStorage.setItem(
          "favouriteMovies",
          JSON.stringify(response.data.user.FavoriteMovies)
        );
        props.onLoggedIn(data);
      })
      .catch((e) => {
        alert("Login Failed !");
        console.log("no such user");
      });
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="active">
          <Link to={"/"}>Sign In </Link>
        </h2>
        <h2 className="inactive underlineHover">
          <Link to={"/register"}>Sign Up</Link>
        </h2>
        <div className="fadeIn first"></div>
        <form>
          <input
            type="text"
            id="login"
            className="fadeIn second loginInput"
            name="login"
            placeholder="login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            id="password"
            className="fadeIn third loginInput"
            name="login"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="submit"
            onClick={handleSubmit}
            className="fadeIn fourth"
            value="Log In"
          />
        </form>
        <div id="formFooter">
          <a className="underlineHover">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.exact({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array,
  }),
};
