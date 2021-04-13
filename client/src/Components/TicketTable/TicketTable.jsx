import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const ticketTableStyles = makeStyles(() => ({
  table: {
    minWidth: "350px",
    backgroundColor: "#585858",
    borderBottom: "none"
  },

  container: {
    marginTop: "50px",
    borderBottom: "none"
  },

  head: {
    fontSize: "20px",
    fontWeight: "bold",
    borderColor: "grey",
    color: "#ffb347"
  },

  cells: {
    borderColor: "grey",
    color: "#fff"

  }
}));

export const TicketTable = () => {
  const classes = ticketTableStyles();

  

  const { searchTicketList, error, } = useSelector((state) => state.tickets);


  if (error) return <h3>{error}</h3>;

  return (
    <div>
      <TableContainer className={classes.container} component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.head} align="right">
                Ticket ID #
              </TableCell>
              <TableCell className={classes.head} align="right">
                Subject
              </TableCell>
              <TableCell className={classes.head} align="right">
                Status
              </TableCell>
              <TableCell className={classes.head} align="right">
                Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchTicketList.length ? (
              searchTicketList.map((row) => (
                <TableRow key={row._id}>
                  <TableCell className={classes.cells} align="right">{row._id}</TableCell>
                  <TableCell  className={classes.cells}align="right">
                    <Link style = {{color: "#cde7f0"}} className={classes.cells} to={`/ticket/${row._id}`}>{row.subject}</Link>
                  </TableCell>
                  <TableCell className={classes.cells} align="right">{row.status}</TableCell>
                  <TableCell className={classes.cells} align="right">
                    {row.openAt &&
                      new Date(row.openAt).toLocaleString("en-us", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
