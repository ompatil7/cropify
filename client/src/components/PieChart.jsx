import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3000/api/v1/bookings/bookingstat"
        );
        const jsonData = await response.json();
        setData(jsonData.data.doc);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderPieChart = () => {
    if (!data) return null;

    const totalRevenue = data.reduce(
      (acc, entry) => acc + entry.totalRevenue,
      0
    );

    const chartData = {
      labels: data.map((entry) => entry._id[0]),
      datasets: [
        {
          data: data.map((entry) => (entry.totalRevenue / totalRevenue) * 100),
          backgroundColor: getRandomColors(data.length),
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const label = data.labels[tooltipItem.index];
            const value =
              data.datasets[tooltipItem.datasetIndex].data[
                tooltipItem.index
              ].toFixed(2);
            return `${label}: ${value}%`;
          },
        },
      },
    };

    return <Pie data={chartData} options={options} />;
  };

  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const randomColor = `rgba(${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, 0.6)`;
      colors.push(randomColor);
    }
    return colors;
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        height: "600px",
        // overflow: "hidden",
      }}
    >
      <h2>Price Distribution of Products</h2>
      {renderPieChart()}
    </div>
  );
};

export default PieChart;
