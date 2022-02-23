import React, { Component } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";

import "./RightTopBTC.css";
import TableBtcTusd from "../TableBtcTusd/TableBtcTusd";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

class RightTopBTC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      allData: [],
      btcData: [],
      tusdData: [],
      tableHeader: ["Amount", "Price", "Total"],
    };
  }

  componentDidMount() {
    axios
      .get("https://api.exnomy.com/markets")
      .then((response) => {
        this.setState(
          {
            allData: response.data.data.markets,
          },
          () => {
            var filterBtcData = this.state.allData.filter((el) => {
              return el.quoteToken === "BTC";
            });
            this.setState({
              btcData: filterBtcData,
            });
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange = (event, newValue) => {
    if (newValue === 0) {
      var filterBtcData = this.state.allData.filter((el) => {
        return el.quoteToken === "BTC";
      });
      this.setState({
        btcData: filterBtcData,
      });
    } else if (newValue === 1) {
      var filterTusdData = this.state.allData.filter((el) => {
        return el.quoteToken === "TUSD";
      });
      this.setState({
        tusdData: filterTusdData,
      });
    }
    this.setState({ value: newValue });
  };

  render() {
    const { value, btcData, tusdData } = this.state;

    return (
      <div className="btc-box">
        <Box sx={{ width: "100%" }}>
          <Box
            className="btc-box-tab-search"
            sx={{ borderBottom: 1, borderColor: "divider" }}
            px={2}
          >
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="BTC" {...a11yProps(0)} />
              <Tab label="TUSD" {...a11yProps(1)} />
            </Tabs>
            <Box>SEARCH</Box>
          </Box>
          <TabPanel value={value} index={0}>
            <TableBtcTusd tableData={btcData} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableBtcTusd tableData={tusdData} />
          </TabPanel>
        </Box>
      </div>
    );
  }
}

export default RightTopBTC;
