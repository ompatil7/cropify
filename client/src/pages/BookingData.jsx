import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import Typography from "@mui/joy/Typography";
import UsersContent from "./UsersContent";
import PieChart from "../components/PieChart";
import { Button } from "@mui/joy";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BookingData() {
  const [bookingData, setBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [revenue, setRevenue] = useState("");
  const [totalProd, setTotalProd] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  const [pieChart, setPieChart] = useState(false);

  useEffect(function () {
    async function getallbooking() {
      try {
        setIsLoading(true);
        setError("");
        const response = await axios.get(`/api/v1/bookings/getallbooking`);
        console.log("response bok dat", response); // Handle the response as needed

        if (response.status !== 200)
          throw new Error("Something went wrong with fetchintg crops");

        //console.log("all rev", response.data);
        setRevenue(response.data.totalRevenue);
        setTotalProd(response.data.total);

        const bookingData = response.data.data.data;
        //console.log("all book", bookingData);
        if (bookingData.length === 0) {
          throw new Error("No crops found");
        }
        setBookingData(bookingData);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getallbooking();
  }, []);
  const handleDownloadExcel = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/bookings/report"
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "bookingsdata.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel:", error);
    }
  };

  return (
    <>
      <div className="h-screen overflow-y-auto">
        <div className="flex flex-row gap-2">
          <Button
            size="md"
            variant="solid"
            color="primary"
            onClick={() => setPieChart(!pieChart)}
          >
            {pieChart ? "Show Bar Graph" : "Show Pie Chart"}
          </Button>

          <Button
            size="md"
            variant="solid"
            color="success"
            onClick={handleDownloadExcel}
          >
            Download Excel
          </Button>
        </div>

        {pieChart ? <PieChart /> : <UsersContent />}
        <div className="mt-8 mb-6 ">
          {/* <h1>Recent transactions in the app</h1> */}
          <div className="flex flex-row gap-4">
            <Typography level="h3">Recent transactions in the app</Typography>
            <div className="p-2 bg-black rounded-2xl">
              <span className="text-1xl font-light tracking-tight text-white">
                Total Revenue ₹ {revenue}
              </span>
            </div>

            <div className="p-2 bg-black rounded-2xl">
              <span className="text-1xl font-light tracking-tight text-white">
                Total transactions {totalProd}
              </span>
            </div>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Users</StyledTableCell>
                <StyledTableCell>Crop Bought</StyledTableCell>
                <StyledTableCell>Sold by</StyledTableCell>
                <StyledTableCell>Price (₹)</StyledTableCell>
                <StyledTableCell>Date bought</StyledTableCell>
              </TableRow>
            </TableHead>
            {
              <TableBody>
                {bookingData.map((data) => (
                  <StyledTableRow key={data.user.name}>
                    <StyledTableCell component="th" scope="row">
                      <div className="flex items-center">
                        <Avatar alt="Remy Sharp" src={data.user.photo} />
                        <span className="ml-3">{data.user.name}</span>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <div className="flex items-center">
                        <Avatar alt="Remy Sharp" src={data.crop.image} />
                        <span className="ml-3">{data.crop.name}</span>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell>{data.crop.soldby.name}</StyledTableCell>
                    <StyledTableCell>₹ {data.price}</StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {new Date(data.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            }
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
