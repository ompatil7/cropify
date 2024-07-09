/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import axios from "axios";

export default function CropsContent() {
  const [bookingStats, setBookingStats] = useState([]);
  const [chartInstance, setChartInstance] = useState(null);
  const [open, setOpen] = useState(false);
  const [graph, setGraph] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5173/api/v1/bookings/bookingstat`
        );
        const data = await response.json();
        //console.log("data rev", data);
        setBookingStats(data.data.doc);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getGraph = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/crops/getratings");
      // //console.log(res.data.graphs.pie_chart);
      setGraph(res.data.graphs.pie_chart);
    } catch (error) {
      console.error("Error fetching chart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    getGraph();
    setOpen(!open);
  };

  useEffect(() => {
    if (bookingStats.length === 0) return;

    const combinedStats = {
      cropNames: [],
      numOfUsers: [],
      totalRevenue: [],
    };

    bookingStats.forEach((stat) => {
      combinedStats.cropNames.push(stat._id);
      combinedStats.numOfUsers.push(stat.numofusers);
      combinedStats.totalRevenue.push(stat.totalRevenue);
    });

    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = document.getElementById("combined-chart").getContext("2d");

    const newChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: combinedStats.cropNames,
        datasets: [
          {
            label: "Number of Users",
            data: combinedStats.numOfUsers,
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderWidth: 1,
            yAxisID: "numOfUsers", // Associate with the 'numOfUsers' y-axis
          },
          {
            label: "Total Revenue",
            data: combinedStats.totalRevenue,
            borderColor: "rgba(255, 140, 0, 1)",
            backgroundColor: "rgba(255, 140, 0, 0.2)",
            borderWidth: 1,
            yAxisID: "totalRevenue", // Associate with the 'totalRevenue' y-axis
          },
        ],
      },
      options: {
        scales: {
          numOfUsers: {
            position: "left", // Position of 'Number of Users' y-axis
            beginAtZero: true,
            grid: {
              color: "rgba(153, 102, 255, 0.1)", // Color of the grid lines
            },
            ticks: {
              color: "rgba(153, 102, 255, 1)", // Color of the ticks and labels
            },
          },
          totalRevenue: {
            position: "right", // Position of 'Total Revenue' y-axis
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    setChartInstance(newChartInstance);
  }, [bookingStats]);

  return (
    <>
      <div className="mt-3 mb-4">
        <div className="flex gap-6">
          <Typography level="h3">
            Product Total Revenue and Number of Users Graph
          </Typography>
          <>
            <Button variant="outlined" color="neutral" onClick={handleClick}>
              Get Pie Chart
            </Button>
            <Modal
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              open={open}
              onClose={() => setOpen(false)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Sheet
                variant="outlined"
                sx={{
                  maxWidth: "80vw", // Adjust the width as needed
                  maxHeight: "80vh", // Adjust the height as needed
                  borderRadius: "md",
                  p: 3,
                  boxShadow: "lg",
                  overflow: "auto",
                }}
              >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                {graph && <img src={`data:image/png;base64,${graph}`} />}
              </Sheet>
            </Modal>
          </>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-gray-200 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
        <canvas id="combined-chart" width="400" height="400"></canvas>
      </div>
    </>
  );
}
