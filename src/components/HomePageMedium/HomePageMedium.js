import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import Charts from "../Charts/Charts";
import { TypeChooser } from "react-stockcharts/lib/helper";
import "./HomePageMedium.css";
import ContentOption from "../ContentOption/ContentOption";
import axios from "axios";

class HomePageMedium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
    };
  }
  componentDidMount() {
    this.apiCall();
    setInterval(this.apiCall, 3000);
  }

  apiCall = () => {
    axios
      .get(
        "https://api.exnomy.com/markets/0xab93daa6753f799a6e4249ae99f4226e0132ef82-BTC-TUSD/candles?from=1189800&to=1646072999&granularity=84600"
      )
      .then((response) => {
        this.setState({
          chartData: response.data.data.candles,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    let data = [];
    if (this.state.chartData && this.state.chartData.length > 0) {
      this.state.chartData.filter((d) =>
        data.push({
          date: new Date(d.time),
          open: d.open,
          high: d.high,
          low: d.low,
          close: d.close,
          volume: d.volume,
        })
      );
    }

    return (
      <div className="home-page-medium">
        <div className="home-page-medium-header-chart">
          <div className="home-page-medium-header">Top</div>
          <div className="home-page-medium-chart">
            {this.state.chartData.length > 0 ? (
              <TypeChooser>
                {(type) => <Charts type={type} data={data} />}
              </TypeChooser>
            ) : null}
          </div>
        </div>
        <div className="home-page-medium-content">
          <div className="medium-content-left">
            <ContentOption headerText="Buy" />
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="medium-content-right">
            <ContentOption headerText="Sell" />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePageMedium;
