import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

import "./register-view.scss";

export function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://myflix-movietime.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("error registering the user");
      });
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="inactive underlineHover">
          <Link to={"/"}>Sign In </Link>
        </h2>
        <h2 className="active">
          <Link to={"/register"}>Sign Up</Link>
        </h2>
        <div className="fadeIn first"></div>
        <form>
          <input
            type="text"
            id="login"
            className="fadeIn second loginInput"
            name="login"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            id="password"
            className="fadeIn third loginInput"
            name="login"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            id="password"
            className="fadeIn third loginInput"
            name="login"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            className="fadeIn third loginInput"
            name="login"
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          <input
            type="submit"
            onClick={handleSubmit}
            className="fadeIn fourth"
            value="Sign Up"
          />
        </form>
      </div>
    </div>
  );
}

RegisterView.propTypes = {
  user: PropTypes.exact({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array,
  }),
  onRegister: PropTypes.func,
};
