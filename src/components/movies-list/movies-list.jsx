import React from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";

import "./movies-list.scss";

import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter, addFavorite } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      <div className="cardContainer">
        {filteredMovies.map((m) => {
          var favouriteData = JSON.parse(
            localStorage.getItem("favouriteMovies")
          );
          var checkIfFavourite = favouriteData.filter((x) => x == m._id);
          checkIfFavourite = checkIfFavourite.length > 0 ? true : false;
          console.log("Check Variable : ", checkIfFavourite);
          return (
            <MovieCard movie={m} key={m._id} isFavourite={checkIfFavourite} />
          );
        })}
      </div>
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
