import React from "react";
import "./Search.scss";
export default function Search({ onSearch }) {
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
}
