import React, { useState } from "react";
import axios from "axios";
import Card from "./components/Card/Card";
import "./App.css";

const URI = (() => {
  if (process.env.NODE_ENV === "production") {
    return "";
  } else {
    return "http://localhost:5050";
  }
})();

function App() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    console.log(URI);
    setIsLoading(true);
    const users = await axios.get(`${URI}/users`);
    setUsers(users.data);
    console.log(users);
    setIsLoading(false);
  };

  const renderUsersCards = () => {
    return users.map((user, index) => (
      <Card
        key={index}
        name={user.name}
        passportID={user.passportID}
        cash={user.cash}
        credit={user.credit}
        isActive={user.isActive}
      />
    ));
  };

  return (
    <div className="App">
      {isLoading ? (
        <h1>Loading Data</h1>
      ) : (
        <div>
          <h1>Bank API Admin Dashboard</h1>
          <button onClick={getUsers}>Display All Users</button>
          {users && renderUsersCards()}
        </div>
      )}
    </div>
  );
}

export default App;
