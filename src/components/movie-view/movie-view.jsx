import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';


import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <Card className="text-white movieview-card">
          <Card.Img src={movie.MovieStill} crossOrigin="anonymous" />
          <div className="card-img-overlay d-flex flex-column justify-content-between">
            <span className="movie-info">
              <Card.Title><h2>{movie.Title}</h2></Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <span className="d-block">
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="secondary">Director: {movie.Director.Name}</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="secondary">Genre: {movie.Genre.Name}</Button>
                </Link>
              </span>
            </span>

            <Button variant="outline-light" className="back-btn" onClick={() => { onBackClick(null); }}>Back</Button>
          </div>
        </Card>
      </div>
    );
  }
}