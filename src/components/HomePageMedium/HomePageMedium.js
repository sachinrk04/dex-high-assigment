import React, { Component } from "react";
import Divider from "@mui/material/Divider";
import { chartData } from "./chartData";
import Charts from "../Charts/Charts";
import { TypeChooser } from "react-stockcharts/lib/helper";
import "./HomePageMedium.css";
import ContentOption from "../ContentOption/ContentOption";

class HomePageMedium extends Component {
  render() {
    return (
      <div className="home-page-medium">
        <div className="home-page-medium-header-chart">
          <div className="home-page-medium-header">Top</div>
          <div className="home-page-medium-chart">
            <TypeChooser>
              {(type) => <Charts type={type} data={chartData} />}
            </TypeChooser>
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
