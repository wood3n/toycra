import React, { Component } from "react";
import { Button1 } from "Button";
import styles from "./styles.css";

export default class extends Component {
  render() {
    return (
      <div className={styles.parentgrid}>
        <div className={styles.childgrid}>1</div>
        <div className={styles.childgrid}>1</div>
        <div className={styles.childgrid}>1</div>
        <Button1 />
      </div>
    );
  }
}
