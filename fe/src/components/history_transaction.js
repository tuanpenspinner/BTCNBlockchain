import React, { Component } from "react";

export default class history_transaction extends Component {
  componentDidMount() {
    const { showHistory } = this.props;
    showHistory();
  }
  render() {
    const transactionPool = this.props.transactionPool;
    var arr;
    if (transactionPool !== null) {
      arr = transactionPool.map((a, i) => {
        return (
          <tr key={i}>
            <th scope="row">{a.txOuts[0].address} </th>
            <td colSpan="2">{a.txOuts[0].amount}</td>
          </tr>
        );
      });

    }

    return (
      <div>
        <div className="title">History transaction</div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" >Address</th>
              <th scope="col">Mount</th>
            </tr>
          </thead>
          <tbody>{arr}</tbody>
        </table>
      </div>
    );
  }
}
