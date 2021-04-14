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
import { useContext } from "react";
import DarkModeContext from "../../DarkModeContext/DarkModeContext";

const ticketTableStyles = makeStyles(() => ({
  table: {
    transition: " all 0.30s ease-in-out",
    minWidth: "350px",
    backgroundColor: "#FAF9F6",
    borderBottom: "none"
  },

  tableDark: {
    transition: " all 0.30s ease-in-out",
    minWidth: "350px",
    backgroundColor: "#585858",
    borderBottom: "none"
  },

  container: {
    marginTop: "50px",
    borderBottom: "none"
  },

  head: {
    transition: " all 0.30s ease-in-out",
    fontSize: "20px",
    fontWeight: "bold",
    borderColor: "grey",
    color: "#FF926B"
  },
  headDark: {
    transition: " all 0.30s ease-in-out",
    fontSize: "20px",
    fontWeight: "bold",
    borderColor: "grey",
    color: "#ffb347"
  },

  cells: {
    transition: " all 0.30s ease-in-out",
    borderColor: "grey",
    color: "black"

  },

  cellsDark: {
    transition: " all 0.30s ease-in-out",
    borderColor: "grey",
    color: "#fff"

  }
}));

export const TicketTableDashboard = () => {
  const classes = ticketTableStyles();

  const { searchTicketList, error } = useSelector((state) => state.tickets);

  const { darkMode} = useContext(DarkModeContext)

  if (error) return <h3>{error}</h3>;
  return (
    <div>
      <div>
        <TableContainer className={classes.container} component={Paper}>
          <Table
            className={!darkMode ? classes.table : classes.tableDark}
            size="small"
            aria-label="Table for tickets"
          >
            <TableHead>
              <TableRow>
                <TableCell className={!darkMode ? classes.head : classes.headDark} align="right">
                  Ticket ID #{" "}
                </TableCell>
                <TableCell className={!darkMode ? classes.head : classes.headDark} align="right">
                  Subject
                </TableCell>
                <TableCell className={!darkMode ? classes.head : classes.headDark}align="right">
                  Status
                </TableCell>
                <TableCell className={!darkMode ? classes.head : classes.headDark} align="right">
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchTicketList.length ? (
                searchTicketList.slice(-10).map((row) => (
                  <TableRow key={row._id}>
                    <TableCell className={!darkMode ? classes.cells : classes.cellsDark} align="right">{row._id}</TableCell>
                    <TableCell className={!darkMode ? classes.cells : classes.cellsDark} align="right">
                      <Link style = {!darkMode ? {color: "blue"} : {color: "#cde7f0"}}to={`/ticket/${row._id}`}>{row.subject}</Link>
                    </TableCell>
                    <TableCell className={!darkMode ? classes.cells : classes.cellsDark} align="right">{row.status}</TableCell>
                    <TableCell  className={!darkMode ? classes.cells : classes.cellsDark}align="right">
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
    </div>
  );
};
