import React from "react";
import "./Row.scss"

export default function Row({ name, username, id }) {
  return (
    <tr>
      <td>
        <span>{id}.</span>
        <span>{name}</span>
        <span>@{username}</span>
      </td>
    </tr>
  );
}
