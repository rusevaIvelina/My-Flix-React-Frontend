import axios from "axios";
import React from "react";
import "./main-view.scss";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { setMovies } from "../../actions/actions";
import { setUser } from "../../actions/actions";
// Components
import { LoginView } from "../login-view/login-view";
import { RegisterView } from "../register-view/register-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarCustom } from "../navbar/navbar";
import MoviesList from "../movies-list/movies-list";

const API_ADDRESS = "https://myflix-movietime.herokuapp.com";

// Styles

// Bootstrap components

class MainView extends React.Component {
  constructor() {
    super(); // keep this part
    this.state = {
      user: null, // replace when implementing redux user
    };
  }
  // keep same \/
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }
  // Login
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }
  // Get all movies in DB
  getMovies(token) {
    axios
      .get(`${API_ADDRESS}/movies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let { movies } = this.props;
    const { user } = this.state;

    return (
      <Container fluid>
        <NavbarCustom />
        <Container>
          <Router>
            <Row className="main-view justify-content-md-center d-flex main-route">
              <Route
                exact
                path="/"
                render={() => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );

                  if (movies.length === 0) return <div className="main-view" />;

                  return <MoviesList movies={movies} />;
                }}
              />

              <Route
                path="/register"
                render={() => {
                  if (user) return <Redirect to="/" />;
                  return (
                    <Col>
                      <RegisterView />
                    </Col>
                  );
                }}
              />

              <Route
                exact
                path="/profile"
                render={({ history }) => {
                  if (!user)
                    return (
                      <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
                    );
                  // if (movies.length === 0) return;

                  return (
                    <Col md={8}>
                      <ProfileView
                        history={history}
                        movies={movies}
                        user={user}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              <Route
                exact
                path="/directors/:name"
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <DirectorView
                        director={
                          movies.find(
                            (m) => m.Director.Name === match.params.name
                          ).Director
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
              <Route
                path="/genres/:name"
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <GenreView
                        genre={
                          movies.find((m) => m.Genre.Name === match.params.name)
                            .Genre
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />
            </Row>
          </Router>
        </Container>
      </Container>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
