/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function UpdateCrop() {
  const [bookingStats, setBookingStats] = useState([]);
  const [selectedYear, setSelectedYear] = useState(""); // State to store the selected year
  const [chartInstance, setChartInstance] = useState(null); // State to store the chart instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5173/api/v1/bookings/bookingstat`
        );
        const data = await response.json();
        setBookingStats(data.data.doc);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  useEffect(() => {
    if (bookingStats.length === 0) return;

    const combinedStats = {
      tourNames: [],
      numOfUsers: [],
      totalRevenue: [],
      avgPrice: [],
    };

    bookingStats.forEach((stat) => {
      combinedStats.tourNames.push(stat._id);
      combinedStats.numOfUsers.push(stat.numofusers);
      combinedStats.totalRevenue.push(stat.totalRevenue);
      combinedStats.avgPrice.push(stat.avgPrice);
    });

    // Destroy the existing chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = document.getElementById("combined-chart").getContext("2d");

    const newChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: combinedStats.tourNames,
        datasets: [
          {
            label: "Number of Users",
            data: combinedStats.numOfUsers,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Total Revenue",
            data: combinedStats.totalRevenue,
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Average Price",
            data: combinedStats.avgPrice,
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    setChartInstance(newChartInstance); // Save the new chart instance
  }, [bookingStats]);

  return (
    <>
      <div>
        <h1> Product Statistics</h1>
      </div>
      <div className="bg-gray-100 dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
        <canvas id="combined-chart" width="400" height="400"></canvas>
      </div>
    </>
  );
}
