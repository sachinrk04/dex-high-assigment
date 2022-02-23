import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import "./ContentOption.css";

class ContentOption extends Component {
  render() {
    return (
      <div className="content-option">
        <div className="content-option-header">{this.props.headerText}</div>
        <Divider />
        <div className="content-option-avbl">
          <span className="avbl">Avbl BTC:</span>
          <span>0.0000087</span>
        </div>
        <div className="content-option-input-lebal">
          <div className="input-lebal">
            <label>Price</label>
          </div>
          <div className="input-box">
            <input />
            <span>TUSD</span>
            <div>^</div>
          </div>
        </div>
        <div className="content-option-input-lebal">
          <div className="input-lebal">
            <label>Amount</label>
          </div>
          <div className="input-box">
            <input />
            <span>BTC</span>
            <div>^</div>
          </div>
        </div>
        <div className="min-max-perc">
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>Max</span>
        </div>
        <div className="min-max-order">
          <span>Min. Order Amount</span>
          <span>0.0001 BTC</span>
        </div>
        <div className="min-max-order">
          <span>Min. Order Price</span>
          <span>1 TUSD</span>
        </div>
        <div className="min-max-order">
          <span>Total</span>
          <span>0.000 TUSD</span>
        </div>
        <div className="maker-traker">
          <span>Fees: Maker:0% / Taker:0.05%</span>
        </div>
        <div className="co-button">
          <button
            className={`${
              this.props.headerText === "Buy"
                ? "button-danger"
                : "button-actuve"
            }`}
          >
            {this.props.headerText} BTC
          </button>
        </div>
      </div>
    );
  }
}

export default ContentOption;
