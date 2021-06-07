import React, { useState } from "react";
import axios from "axios";

export const DataContext = React.createContext({
  data: null,
  fetchData: () => {},
});

export default (props) => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    setData(res.data);
  };

  return (
    <DataContext.Provider value={{ data, fetchData }}>
      {props.children}
    </DataContext.Provider>
  );
};
