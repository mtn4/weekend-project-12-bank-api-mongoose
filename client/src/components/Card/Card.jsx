import React from "react";
import "./Card.css";

export default function Card(props) {
  return (
    <div className="card">
      <div>Name: {props.name}</div>
      <div>Passport ID: {props.passportID}</div>
      <div>Cash: {props.cash}</div>
      <div>Credit: {props.credit}</div>
      <div>Status: {props.isActive ? "Active" : "Disabled"}</div>
    </div>
  );
}
