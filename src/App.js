import React from "react";
import "./App.scss";
import UserList from "./components/UserList";
import { DataContextProvider } from "./context/data-context";

function App() {
  return (
    <div>
      <DataContextProvider>
        <UserList />
      </DataContextProvider>
    </div>
  );
}

export default App;
