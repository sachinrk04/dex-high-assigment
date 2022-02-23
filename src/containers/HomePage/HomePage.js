import React, { Component } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BuyPrice from "../../components/BuyPrice/BuyPrice";

import "./HomePage.css";
import HomePageRight from "../../components/HomePageRight/HomePageRight";
import HomePageMedium from "../../components/HomePageMedium/HomePageMedium";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container py={1} px={2} spacing={1} className="home-page">
            <Grid item xs={6} md={3} className="home-page-box">
              <BuyPrice />
            </Grid>
            <Grid item xs={6} md={6} className="home-page-box">
              <HomePageMedium />
            </Grid>
            <Grid item xs={6} md={3} className="home-page-box">
              <HomePageRight />
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default HomePage;
