import React, { Component } from "react";

export default class history_transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: null,
    };
  }

  componentDidMount() {
    const { showHistory } = this.props;
    showHistory();
  }
  render() {
    const historyTransaction = this.props.historyTransaction;

    var arr;
    if (historyTransaction !== null) {
      arr = historyTransaction.map((a, i) => {
        return a.map((t, i) => {
          if (t.txOuts.length === 1) {
            console.log(t.txOuts);
            return (
              <div className="row" key={i}>
                <p className="col-5 rowHistory">Wallet</p>
                <p className="col-5 rowHistory">{t.txOuts[0].address}</p>
                <p className="col-2">{t.txOuts[0].amount}</p>
              </div>
            );
          } else {
            console.log(t.txOuts);
            return (
              <div className="row" key={i}>
                <p className="col-5 rowHistory">{t.txOuts[0].address}</p>
                <p className="col-5 rowHistory">{t.txOuts[1].address}</p>
                <p className="col-2 ">{t.txOuts[0].amount}</p>
              </div>
            );
          }
        });
      });
    }

    return (
      <div>
        <div className="title">History transaction</div>
        <table className="table table-hover">
          <div className="row">
            <th className="col-5 rowHistory">From</th>
            <th className="col-5 rowHistory">To</th>
            <td className="col-2 ">Amount</td>
          </div>
          <tbody>{arr}</tbody>
        </table>
      </div>
    );
  }
}
