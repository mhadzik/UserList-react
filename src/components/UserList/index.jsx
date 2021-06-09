import React, { useContext, useEffect } from "react";
import "./UserList.scss";
import Spinner from "../../UI/Spinner";
import Row from "./Row";
import useSearch from "../../hooks/useSearch";
import Search from "./Search";
import { DataContext } from "../../context/data-context";
import PropTypes from "prop-types";

/*
Component for rendering userlist from dataset provided from context API and searching through that data.
*/

const UserList = React.memo(() => {
  const data = useContext(DataContext).data;
  const errorValue = useContext(DataContext).errorValue;
  const fetchData = useContext(DataContext).fetchData;
  const searchKeys = ["name"];
  const { searchResults, onSearch } = useSearch(data, searchKeys);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && !errorValue) {
      onSearch();
    }
  }, [data]);

  let content = <Spinner />;

  if (data && !errorValue) {
    const rowsToDisplay = searchResults?.map((item, i) => (
      <Row key={i} id={i + 1} name={item.name} username={item.username} />
    ));

    content = (
      <div className="UserList">
        <h1>Users list</h1>
        <Search onSearch={onSearch} />
        <table>
          <tbody>{rowsToDisplay}</tbody>
        </table>
      </div>
    );
  } else if (errorValue) {
    content = (
      <div className="UserList">
        <h1>Users list</h1>
        <p className={"error"}>Data not found...</p>
      </div>
    );
  }

  return content;
});

UserList.propTypes = {
  errorValue: PropTypes.string,
  data: PropTypes.array || null || undefined,
  fetchData: PropTypes.func.isRequired,
};

export default UserList;
