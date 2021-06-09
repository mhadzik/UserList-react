import React from "react";
import "./Search.scss";
import PropTypes from "prop-types";

/*
Component used for searching purposes.
Requires the function for searching.
*/

const Search = React.memo(({ onSearch }) => {
  return (
    <div>
      <input
        type="search"
        className="search"
        placeholder="Search by user name..."
        onChange={onSearch}
      />
    </div>
  );
});

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
