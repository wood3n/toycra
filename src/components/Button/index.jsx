import React, { Component } from "react";
import View from "@/assets/icons/view.svg";
import styles from "./styles.css";

export default class extends Component {
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
        <View />
        <button className={styles.btn} onClick={this.handleClick}>
          计算我的工资：
        </button>
        <p>{this.state.value}</p>
      </>
    );
  }
}
