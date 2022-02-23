import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./TableTimeAmount.css";

function TableTimeAmount(props) {
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
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table stickyHeader size="small" aria-label="sticky table">
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
                            {`${row.updatedAt.split("T")[0].split("-")[1]}.${
                              row.updatedAt
                                .split("T")[0]
                                .split("-")[0]
                                .split("")[2]
                            }${
                              row.updatedAt
                                .split("T")[0]
                                .split("-")[0]
                                .split("")[3]
                            } ${row.updatedAt.split("T")[1].split(":")[0]}:${
                              row.updatedAt.split("T")[1].split(":")[1]
                            }`}
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
                            {parseFloat(row.amount).toFixed(2)}
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

export default TableTimeAmount;
