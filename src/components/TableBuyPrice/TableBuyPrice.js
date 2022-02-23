import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./TableBuyPrice.css";

function TableBuyPrice(props) {
  return (
    <React.Fragment>
      {props.tableHeader &&
      props.tableHeader.length > 0 &&
      props.rowData &&
      props.rowData.length > 0 ? (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: 0,
            boxShadow: 0,
          }}
        >
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {props.tableHeader && props.tableHeader.length > 0
                    ? props.tableHeader.map((rowh, i) => {
                        return (
                          <TableCell align="center" key={i}>
                            <b>{rowh}</b>
                          </TableCell>
                        );
                      })
                    : null}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.rowData.length > 0
                  ? props.rowData.map((row, i) => {
                      return (
                        <TableRow
                          className="buy-price-table-row"
                          sx={{
                            td: {
                              border: 0,
                              borderColor: "#FFFFFF",
                              background: `${
                                i % 2 === 0 ? "rgb(242, 244, 253)" : "#FFF"
                              }`,
                            },
                          }}
                          key={row.id}
                        >
                          <TableCell
                            className="buy-price-table-cell set-box"
                            align="center"
                          >
                            {props.progressBar ? (
                              <div className="progress-box">
                                <div
                                  className={`progress-box-bar ${
                                    row.takerSide === "buy"
                                      ? "progress-box-bar-green"
                                      : "progress-box-bar-red"
                                  }`}
                                  style={{
                                    width: `${row.amount * row.price}%`,
                                  }}
                                ></div>
                                <div className="progress-box-value">
                                  {parseFloat(row.amount).toFixed(2)}
                                </div>
                              </div>
                            ) : (
                              parseFloat(row.amount).toFixed(2)
                            )}
                          </TableCell>
                          <TableCell
                            className={`buy-price-table-cell ${
                              row.takerSide === "buy"
                                ? "buy-price-table-cell-buy"
                                : "buy-price-table-cell-sell"
                            }`}
                            align="center"
                          >
                            {parseFloat(row.price).toFixed(3)}
                          </TableCell>
                          <TableCell
                            className="buy-price-table-cell"
                            align="center"
                          >
                            {parseFloat(row.amount * row.price).toFixed(3)}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : null}
    </React.Fragment>
  );
}

export default TableBuyPrice;
