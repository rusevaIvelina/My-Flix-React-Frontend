import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../../actions/actions";
import "./visibility-filter.scss";

function VisibilityFilterInput(props) {
  return (
    <div className="search-box">
      <input
        className="search-input"
        type="text"
        onChange={(e) => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Search by title"
      />
      <a className="search-btn">
        <i className="fas fa-search"></i>
      </a>
    </div>
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
