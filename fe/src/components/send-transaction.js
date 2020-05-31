import React, { Component } from "react";
import "./send.css";

export default class Send extends Component {
  sendCoin = () => {
    const { sendCoin } = this.props;
    sendCoin();
  };
  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const { onChange } = this.props;
    onChange(name, value);
  };

  render() {
    return (
      <div className="send ">
        <div className="title">Send coins</div>
        <div className="content">
          <div className="receiverAddress ">
            Receiver address
            <input
              type="text"
              name="receiverAddress"
              placeholder="Địa chỉ ví người nhận"
              onChange={this.onChange}
              value={this.props.receiverAddress}
            ></input>
          </div>
          <div className="amount ">
            Amount
            <input
              type="number"
              name="receiverAmount"
              onChange={this.onChange}
              value={this.props.receiverAmount}
            ></input>
          </div>
        </div>
        <button className="btnSend" onClick={this.sendCoin}>
          Send
        </button>
      </div>
    );
  }
}
