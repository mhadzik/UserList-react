import React from "react";
import "./App.scss";
import UserList from "./components/UserList";
import DataContext from "./context/data-context";

function App() {
  return (
    <div>
      <DataContext>
        <UserList />
      </DataContext>
    </div>
  );
}

export default App;
