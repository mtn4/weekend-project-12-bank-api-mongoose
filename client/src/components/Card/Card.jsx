import React, { useState } from "react";
import "./Card.css";

export default function Card(props) {
  const [name, setName] = useState(props.name);
  const [cash, setCash] = useState(props.cash);
  const [credit, setCredit] = useState(props.credit);
  const [isActive, setIsActive] = useState(props.isActive);
  const [width, setWidth] = useState("0");
  const handleEdit = () => {
    if (width === "0") setWidth("100%");
    else setWidth("0");
  };
  const handleSubmitUpdate = () => {
    setWidth("0");
    props.handleUpdateUser(name, props.passportID, cash, credit, isActive);
  };
  return (
    <div className="card">
      <div>Name: {props.name}</div>
      <div>Passport ID: {props.passportID}</div>
      <div>Cash: {props.cash}</div>
      <div>Credit: {props.credit}</div>
      <div>Status: {props.isActive ? "Active" : "Disabled"}</div>
      <div className="btns">
        {props.isActive ? <button onClick={handleEdit}>Edit</button> : ""}
        <button onClick={(e) => props.handleDeleteUser(e, props.passportID)}>
          Delete
        </button>
      </div>
      <div className="overlay" style={{ width: `${width}` }}>
        <div className="closebtn" onClick={handleEdit}>
          &times;
        </div>
        <div className="overlay-content">
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Cash: </label>
            <input
              type="text"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
            />
          </div>
          <div>
            <label>Credit: </label>
            <input
              type="text"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
            />
          </div>
          <div>
            <label>Status: </label>
            <input
              type="text"
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
            />
          </div>
          <button onClick={handleSubmitUpdate}>Submit Update</button>
        </div>
      </div>
    </div>
  );
}
