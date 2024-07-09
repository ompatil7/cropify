import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import Typography from "@mui/joy/Typography";

export default function MostPopular() {
  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5173/api/v1/reviews/`);
        const data = await response.json();
        setProductReviews(data.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

  useEffect(() => {
    if (productReviews.length === 0) return;

    const cropData = {};

    productReviews.forEach((review) => {
      const cropName = review.crop.name;
      const rating = review.rating;

      if (!cropData[cropName]) {
        cropData[cropName] = { numRatings: 1, totalRating: rating };
      } else {
        cropData[cropName].numRatings++;
        cropData[cropName].totalRating += rating;
      }
    });

    const cropNames = Object.keys(cropData);
    const avgRatings = cropNames.map((cropName) => {
      const { numRatings, totalRating } = cropData[cropName];
      return totalRating / numRatings;
    });

    const ctx = document
      .getElementById("product-rating-chart")
      .getContext("2d");

    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: cropNames,
        datasets: [
          {
            label: "Number of Ratings",
            data: cropNames.map((cropName) => cropData[cropName].numRatings),
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Average Rating",
            data: avgRatings,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
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

    return () => newChartInstance.destroy();
  }, [productReviews]);

  return (
    <>
      <div className="mt-3 mb-4">
        <Typography level="h3">Product Rating Graph</Typography>
      </div>
      <div className="bg-gray-100 dark:bg-gray-200 relative shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform">
        <canvas id="product-rating-chart" width="400" height="400"></canvas>
      </div>
      <button onClick={handleDownloadExcel}>Download Excel</button>
    </>
  );
}
