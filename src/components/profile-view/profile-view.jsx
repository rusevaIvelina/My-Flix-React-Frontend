import React from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      birthday: "",
      favoriteMovies: [],
    };
    this.editUser = this.editUser.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`http://localhost:8080/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: localStorage.getItem("password"),
          email: response.data.Email,
          birthday: response.data.Birthday.slice(0, 10),
          favoriteMovies: this.props.movies.filter((item) =>
            response.data.FavoriteMovies.includes(item._id)
          ),
        });
        console.log(response);
        console.log(this.state.favoriteMovies);
        console.log(this.props);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editUser(e) {
    var _this = this;
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (_this.state.username.length < 6) {
      alert("Username Must Be Atleast 6 Character Long");
      return;
    }
    if (_this.state.password.length < 8) {
      alert("Password Must Be 8 Character Long");
    }

    axios
      .put(
        `http://localhost:8080/users/${username}`,
        {
          Username: _this.state.username,
          Password: _this.state.password,
          Email: _this.state.email,
          Birthday: _this.state.birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday.slice(0, 10),
        });
        localStorage.setItem("user", this.state.username);
        const data = response.data;
        console.log(data);
        console.log(this.state.username);
        alert(username + " has been updated!");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setUsername(value) {
    this.setState({
      username: value,
    });
  }

  setPassword(value) {
    this.setState({
      password: value,
    });
  }

  setEmail(value) {
    this.setState({
      email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      birthday: value,
    });
  }
  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };
  deleteAccount(e) {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:8080/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(username + " has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  removeFavorite(_id) {
    const { username } = this.state;
    const token = localStorage.getItem("token");
    console.log(_id, "_id");
    axios
      .delete(`http://localhost:8080/users/${username}/movies/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert("Favorite was removed");
        var FavouriteData = JSON.parse(localStorage.getItem("favouriteMovies"));
        FavouriteData = FavouriteData.filter((x) => x != _id);
        localStorage.setItem("favouriteMovies", JSON.stringify(FavouriteData));
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { favoriteMovies } = this.state;
    return (
      <div className="wrapper2 fadeInDown">
        <div id="formContent">
          <h2 className="active">
            <p>Profile Information</p>
          </h2>
          <div className="fadeIn first"></div>
          <form>
            <input
              type="text"
              id="login"
              className="fadeIn second loginInput"
              name="login"
              placeholder="Username"
              value={this.state.username}
              onChange={(e) => this.setUsername(e.target.value)}
            />
            {/* <input
              type="text"
              id="password"
              className="fadeIn third loginInput"
              name="login"
              placeholder="Password"
              onChange={(e) => this.setPassword(e.target.value)}
            /> */}
            <input
              id="password"
              className="fadeIn third loginInput"
              name="login"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.setPassword(e.target.value)}
            />
            <input
              id="email"
              className="fadeIn third loginInput"
              name="login"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setEmail(e.target.value)}
            />
            <input
              className="fadeIn third loginInput"
              type="date"
              value={this.state.birthday}
              onChange={(e) => this.setBirthday(e.target.value)}
            />
            <input
              type="submit"
              onClick={this.editUser}
              className="fadeIn fourth"
              value="Update Information"
            />
            <input
              type="button"
              onClick={this.deleteAccount}
              className="fadeIn fourth"
              value="Delete Profile"
            />
          </form>
        </div>
        <div id="formContent">
          <h2 className="active">
            <p>Favorite Movies</p>
          </h2>
          <div className="fadeIn first"></div>
          <form className="StyleAdjustment">
            {favoriteMovies.map((movie) => (
              <div
                className="fadeIn third loginInput"
                key={movie._id}
                onClick={() => {
                  this.removeFavorite(movie._id);
                }}
              >
                {movie.Title}
              </div>
            ))}
          </form>
        </div>
      </div>
    );
  }
}
