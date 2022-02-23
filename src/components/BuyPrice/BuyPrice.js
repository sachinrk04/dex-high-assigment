import React, { Component } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TableBuyPrice from "../TableBuyPrice/TableBuyPrice";
import "./BuyPrice.css";
import axios from "axios";

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

class BuyPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      allData: [],
      buyData: [],
      sellData: [],
      tableHeader: ["Amount", "Price", "Total"],
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

  handleChange = (event, newValue) => {
    if (newValue === 1) {
      var filterBuyData = this.state.allData.filter((el) => {
        return el.takerSide === "buy";
      });
      this.setState({
        buyData: filterBuyData,
      });
    } else if (newValue === 2) {
      var filterSellData = this.state.allData.filter((el) => {
        return el.takerSide === "sell";
      });
      this.setState({
        sellData: filterSellData,
      });
    }
    this.setState({ value: newValue });
  };

  render() {
    const { value } = this.state;
    return (
      <div className="buy-price-box">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }} px={2}>
            <Tabs value={value} onChange={this.handleChange}>
              <Tab label="ALL" {...a11yProps(0)} />
              <Tab label="BUY" {...a11yProps(1)} />
              <Tab label="SELL" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <TableBuyPrice
              progressBar={true}
              tableHeader={this.state.tableHeader}
              rowData={this.state.allData}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableBuyPrice
              progressBar={true}
              tableHeader={this.state.tableHeader}
              rowData={this.state.buyData}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TableBuyPrice
              progressBar={true}
              tableHeader={this.state.tableHeader}
              rowData={this.state.sellData}
            />
          </TabPanel>
        </Box>
      </div>
    );
  }
}

export default BuyPrice;
