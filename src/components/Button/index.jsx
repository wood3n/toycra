import React, { Component } from "react";

export class Button1 extends Component {
  state = {
    value: 0,
  };

  handleClick = () => {
    import(/* webpackChunkName: "math" */ "./math").then(({ add }) => {
      this.setState({
        value: add(1, 2),
      });
    });
  };

  render() {
    return (
      <>
        <button onClick={this.handleClick}>计算工资</button>
        <p>{this.state.value}</p>
      </>
    );
  }
}
