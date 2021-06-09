import React, { useState } from "react";
import axios from "axios";

/*
Context API created for fetching data from the server. 
Reusable in any component.
Returns the data from API call, function for fetching data and error message.
*/

const DataContext = React.createContext({
  data: null,
  fetchData: () => {},
});

const DataContextProvider = (props) => {
  const [data, setData] = useState(null);
  const [errorValue, setErrorValue] = useState(false);
  const fetchData = () => {
    axios
      .get(`http://jsonplaceholder.typicode.com/users`)
      .then((res) => setData(res.data))
      .catch((error) => {
        setErrorValue(error.message);
        return error;
      });
  };

  return (
    <DataContext.Provider value={{ data, fetchData, errorValue }}>
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContextProvider, DataContext };
