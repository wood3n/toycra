import React, { Component } from "react";
import styles from "./styles.css";
import "../../assets/icons/view.svg";
import "../../assets/icons/view_off.svg";

export default class extends Component {
  render() {
    return (
      <div>
        <svg>
          <use href="#view" />
        </svg>
        <svg>
          <use href="#view_off" />
        </svg>
      </div>
    );
  }
}
