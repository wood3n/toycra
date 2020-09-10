import React, { Component } from "react";
import style from "./styles.css";

export class Button1 extends Component {
  handleClick = () => {
    throw new Error();
  };

  render() {
    return (
      <button className={style.btn2} onClick={this.handleClick}>
        测试1
      </button>
    );
  }
}
