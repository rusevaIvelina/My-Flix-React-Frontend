import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import "./movie-card.scss";

const heartIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-heart-fill"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
    />
  </svg>
);

export class MovieCard extends React.Component {
  addFavorite(_id) {
    console.log("Clicking On Favourite Button : ", _id);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .post(
        `https://myflix-movietime.herokuapp.com/users/${username}/movies/${_id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        var FavouriteData = JSON.parse(localStorage.getItem("favouriteMovies"));
        FavouriteData.push(_id);
        localStorage.setItem("favouriteMovies", JSON.stringify(FavouriteData));

        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { movie, isFavourite, addFavorite } = this.props;
    var favouriteButton;
    if (isFavourite === true) {
      favouriteButton = <i className="material-icons selectedFav">favorite</i>;
    } else {
      favouriteButton = (
        <i
          className="material-icons"
          onClick={() => {
            this.addFavorite(movie._id);
          }}
        >
          favorite
        </i>
      );
    }
    console.log(movie);
    return (
      <div className="movie_card" id="bright">
        <div className="info_section">
          <div className="movie_header">
            <img className="locandina" src={movie.ImagePath} />
            <h1>{movie.Title}</h1>
            <h4>Directed By : {movie.Director.Name}</h4>
            <span className="minutes">134 min</span>
            <p className="type">Genre : {movie.Genre.Name}</p>
          </div>
          <div className="movie_desc">
            <p className="text">{movie.Description}</p>
          </div>
          <div className="movie_social">
            <ul>
              <li>{favouriteButton}</li>
              <li>
                <i className="material-icons">
                  <Link to={`/directors/${movie.Director.Name}`}>
                    description
                  </Link>
                </i>
              </li>
              <li>
                <i className="material-icons">
                  <Link to={`/genres/${movie.Genre.Name}`}>loyalty</Link>
                </i>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="blur_back"
          style={{ backgroundImage: `url(${movie.ImagePath})` }}
        ></div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  Featured: PropTypes.bool,
};
