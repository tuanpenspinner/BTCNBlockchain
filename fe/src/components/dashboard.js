import React, { Component } from "react";
import "./dashboard.css";

export default class dashboard extends Component {
  render() {
    return (
      <div className="dashboard ">
        <div className="address col-5">
          <h2 className="colorWhite">Address:</h2>
          <p className="colorWhite ">{this.props.address}</p>
        </div>
        <div className="balance col-5">
          <h2 className="colorWhite">Balance: </h2>
          <p className="colorWhite">{this.props.balance}</p>
        </div>
      </div>
    );
  }
}
