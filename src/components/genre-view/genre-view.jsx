import React from "react";
import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre } = this.props;

    return (
      <div className="CardContainerDes">
        <div className="card">
          <h3 className="card-title">Genre: {genre.Name}</h3>
          <p className="card-content"> {genre.Description}</p>
        </div>
      </div>
    );
  }
}
