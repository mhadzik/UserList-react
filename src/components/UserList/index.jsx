import React, { useContext, useEffect } from "react";
import "./UserList.scss";
import Spinner from "../../UI/Spinner";
import Row from "./Row";
import useSearch from "../../hooks/useSearch";
import Search from "./Search";
import { DataContext } from "../../context/data-context";

export default function UserList() {
  const data = useContext(DataContext).data;
  const fetchData = useContext(DataContext).fetchData;
  const { searchResults, onSearch } = useSearch(data);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data !== null) {
      onSearch();
    }
  }, [data]);

  let content = <Spinner />;

  if (data !== null) {
    const rowsToDisplay = searchResults?.map((item, i) => (
      <Row key={i} id={i + 1} name={item.name} username={item.username} />
    ));

    content = (
      <div className="UserList">
        <h1>Users list</h1>
        <Search onSearch={onSearch} searchKeys={"name"} />
        <table>
          <tbody>{rowsToDisplay}</tbody>
        </table>
      </div>
    );
  }

  return content;
}
