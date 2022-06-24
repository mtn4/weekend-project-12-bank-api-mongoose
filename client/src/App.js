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
  const [width, setWidth] = useState("0");

  const getUsers = async () => {
    setIsLoading(true);
    const users = await axios.get(`${URI}/users`);
    setUsers(users.data);
    setIsLoading(false);
  };
  const handleDeleteUser = async (e, passportID) => {
    setIsLoading(true);
    await axios.delete(`${URI}/users/delete/${passportID}`);
    setUsers(null);
    getUsers();
    setIsLoading(false);
  };
  const handleUpdateUser = async (name, passportID, cash, credit, isActive) => {
    setIsLoading(true);
    const obj = {
      name,
      passportID,
      cash,
      credit,
      isActive,
    };
    await axios.put(`${URI}/users/update`, obj);
    setUsers(null);
    getUsers();
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
        handleDeleteUser={handleDeleteUser}
        handleUpdateUser={handleUpdateUser}
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
          <div className="btns">
            <button onClick={getUsers}>Display All Users</button>
            <button onClick={getUsers}>Add User</button>
            <button onClick={getUsers}>Deposit</button>
            <button onClick={getUsers}>Credit</button>
            <button onClick={getUsers}>Withdraw</button>
            <button onClick={getUsers}>Transfer</button>
          </div>
          {users && <div className="grid">{renderUsersCards()}</div>}
          <div className="overlay" style={{ width: `${width}` }}>
            <div className="closebtn">&times;</div>
            <div className="overlay-content"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
