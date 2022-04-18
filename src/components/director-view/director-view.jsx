import React from "react";
import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director } = this.props;

    return (
      <div className="CardContainerDes">
        <div className="card">
          <h3 className="card-title">Director : {director.Name}</h3>
          <p className="card-content">Description : {director.Bio}</p>
          <button className="card-btn">READ MORE</button>
        </div>
      </div>
    );
  }
}
