import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Create from "./components/create";
import FlatList from "./components/flatList";

const App = () => {
  return (
    <div>
      <Navbar />
      <Route exact path="/">
        <FlatList />
      </Route>
      <Route path="/create">
        <Create />
      </Route>
    </div>
  );
};

export default App;
