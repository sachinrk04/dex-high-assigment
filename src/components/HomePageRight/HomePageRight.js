import axios from "axios";
import React, { Component } from "react";
import RightTopBTC from "../RightTopBTC/RightTopBTC";
import TableTimeAmount from "../TableTimeAmount/TableTimeAmount";
import "./HomePageRight.css";

class HomePageRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      tableHeader: ["Time", "Price", "Amount"],
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://api.exnomy.com/markets/0xab93daa6753f799a6e4249ae99f4226e0132ef82-KLAY-TUSD/tradeslimit"
      )
      .then((response) => {
        this.setState({
          allData: response.data.data.trades,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="right-home-page">
        <div className="right-home-page-top">
          <RightTopBTC />
        </div>
        <div className="right-home-page-bottom">
          <TableTimeAmount
            tableHeader={this.state.tableHeader}
            rowData={this.state.allData}
          />
        </div>
      </div>
    );
  }
}

export default HomePageRight;
