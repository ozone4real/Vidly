import React from "react";
import { Link } from "react-router-dom";

const MovieForm = ({ match: { params }, history }) => {
  const { id } = params;
  return (
    <div>
      <h1>Movie Form {id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
