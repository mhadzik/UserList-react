import React from "react";
import "./Row.scss";
import PropTypes from "prop-types";

/*
Component displaying the row based on the data provided.
Requires name, username and id of the user. 
*/

const Row = React.memo(({ name, username, id }) => {
  return (
    <tr>
      <td>
        <span>{id}.</span>
        <span>{name}</span>
        <span>@{username}</span>
      </td>
    </tr>
  );
});

Row.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
};

export default Row;
