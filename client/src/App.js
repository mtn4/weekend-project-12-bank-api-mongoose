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
  const [addUser, setAddUser] = useState(false);
  const [deposit, setDeposit] = useState(false);
  const [credit, setCredit] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [transfer, setTransfer] = useState(false);

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
  const handleSubmitUser = async (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target[0].value,
      passportID: e.target[1].value,
      cash: e.target[2].value,
      credit: e.target[3].value,
      isActive: e.target[4].value,
    };
    await axios.post(`${URI}/users`, newUser);
    setUsers(null);
    getUsers();
    setWidth(0);
    setAddUser(false);
    setIsLoading(false);
  };
  const handleSubmitDeposit = async (e) => {
    e.preventDefault();
    const obj = {
      amount: e.target[1].value,
    };
    await axios.put(`${URI}/users/deposit/${e.target[0].value}`, obj);
    setUsers(null);
    getUsers();
    setWidth(0);
    setDeposit(false);
    setIsLoading(false);
  };
  const handleSubmitCredit = async (e) => {
    e.preventDefault();
    const obj = {
      amount: e.target[1].value,
    };
    await axios.put(`${URI}/users/credit/${e.target[0].value}`, obj);
    setUsers(null);
    getUsers();
    setWidth(0);
    setCredit(false);
    setIsLoading(false);
  };
  const handleSubmitWithdraw = async (e) => {
    e.preventDefault();
    const obj = {
      amount: e.target[1].value,
    };
    await axios.put(`${URI}/users/withdraw/${e.target[0].value}`, obj);
    setUsers(null);
    getUsers();
    setWidth(0);
    setWithdraw(false);
    setIsLoading(false);
  };
  const handleSubmitTransfer = async (e) => {
    e.preventDefault();
    const obj = {
      recipientID: e.target[1].value,
      amount: e.target[2].value,
    };
    await axios.put(`${URI}/users/transfer/${e.target[0].value}`, obj);
    setUsers(null);
    getUsers();
    setWidth(0);
    setTransfer(false);
    setIsLoading(false);
  };
  const closeOverlay = () => {
    setWidth("0");
    setAddUser(false);
    setDeposit(false);
    setCredit(false);
    setWithdraw(false);
    setTransfer(false);
  };
  const showAddUserOverlay = () => {
    setWidth("100%");
    setAddUser(true);
  };
  const showDepositOverlay = () => {
    setWidth("100%");
    setDeposit(true);
  };
  const showCreditOverlay = () => {
    setWidth("100%");
    setCredit(true);
  };
  const showWithdrawOverlay = () => {
    setWidth("100%");
    setWithdraw(true);
  };
  const showTransferOverlay = () => {
    setWidth("100%");
    setTransfer(true);
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
            <button onClick={showAddUserOverlay}>Add User</button>
            <button onClick={showDepositOverlay}>Deposit</button>
            <button onClick={showCreditOverlay}>Credit</button>
            <button onClick={showWithdrawOverlay}>Withdraw</button>
            <button onClick={showTransferOverlay}>Transfer</button>
          </div>
          {users && <div className="grid">{renderUsersCards()}</div>}
          <div className="overlay" style={{ width: `${width}` }}>
            <div className="closebtn" onClick={closeOverlay}>
              &times;
            </div>
            <div className="overlay-content">
              {addUser ? (
                <form onSubmit={handleSubmitUser}>
                  <div>
                    <label>Name: </label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Passport ID: </label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Cash: </label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Credit: </label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Status: </label>
                    <input type="text" />
                  </div>
                  <button>Submit</button>
                </form>
              ) : (
                ""
              )}
              {deposit ? (
                <form onSubmit={handleSubmitDeposit}>
                  <div>
                    <label>Passport ID: </label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Amount: </label>
                    <input type="text" />
                  </div>
                  <button>Submit</button>
                </form>
              ) : (
                ""
              )}
              {credit ? (
                <form onSubmit={handleSubmitCredit}>
                  <div>
                    <label>Passport ID: </label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Amount: </label>
                    <input type="text" />
                  </div>
                  <button>Submit</button>
                </form>
              ) : (
                ""
              )}
              {withdraw ? (
                <form onSubmit={handleSubmitWithdraw}>
                  <div>
                    <label>Passport ID: </label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Amount: </label>
                    <input type="text" />
                  </div>
                  <button>Submit</button>
                </form>
              ) : (
                ""
              )}
              {transfer ? (
                <form onSubmit={handleSubmitTransfer}>
                  <div>
                    <label>Sender Passport ID: </label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Recipient Passport ID: </label>
                    <input type="text" />
                  </div>
                  <div>
                    <label>Amount: </label>
                    <input type="text" />
                  </div>
                  <button>Submit</button>
                </form>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
