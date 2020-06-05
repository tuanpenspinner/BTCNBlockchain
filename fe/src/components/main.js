import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./dashboard";
import Send from "./send-transaction";
import HistoryTransaction from "./history_transaction";

import "./main.css";
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      balance: null,
      historyTransaction: [],
      receiverAddress: "",
      receiverAmount: "",
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:3001/address")
      .then((data) => {
        this.setState({
          address: data.data.address,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get("http://localhost:3001/balance")
      .then((data) => {
        this.setState({
          balance: data.data.balance,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  showHistory = () => {
    axios.get("http://localhost:3001/blocks").then((data) => {
      data.data.map((a, i) => {
         axios.get("http://localhost:3001/block/" + a.hash).then((data) => {
          let history=this.state.historyTransaction;
          history.push(data.data.data);
          this.setState({
            historyTransaction:history
          })
        });
      });
    });
  };

  onMine = () => {
    console.log("onMine");
    axios.post("http://localhost:3001/mineBlock").then((data) => {});
    axios
      .get("http://localhost:3001/balance")
      .then((data) => {
        this.setState({
          balance: data.data.balance,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  sendCoin = () => {
    console.log(this.state.receiverAmount);
    console.log(this.state.receiverAddress);
    axios
      .post("http://localhost:3001/sendTransaction", {
        amount: parseInt(this.state.receiverAmount),

        address: this.state.receiverAddress,
      })
      .then(() => {
        this.setState = {
          receiverAddress: "",
          receiverAmount: "",
        };
      })
      .catch((e) => {
        console.log(e);
      });
  };
  onChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  render() {
    const {
      address,
      balance,
      historyTransaction,
      receiverAddress,
      receiverAmount,
    } = this.state;
    return (
      <Router>
        <div className="container">
          <div className=" menu">
            <Link className="navbar-brand" to="/">
              My coin
            </Link>
            <Link to="/send">
              <button type="button" className="btn btn-secondary">
                Send
              </button>
            </Link>
            <Link to="/history_transaction">
              <button type="button" className="btn btn-secondary">
                History transaction
              </button>
            </Link>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.onMine}
            >
              Mine block
            </button>
          </div>

          <Dashboard address={address} balance={balance}></Dashboard>
          <Switch>
            <Route path="/history_transaction">
              <HistoryTransaction
                showHistory={this.showHistory}
                historyTransaction={historyTransaction}
              ></HistoryTransaction>
            </Route>
            <Route path="/send">
              <Send
                sendCoin={this.sendCoin}
                onChange={this.onChange}
                receiverAddress={receiverAddress}
                receiverAmount={receiverAmount}
              ></Send>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
