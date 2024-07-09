import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import ApiLoading from "../../components/ApiLoading";

function NpkChart() {
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Make a request to the Flask backend to get the chart
    setLoading(true);
    axios
      .get("http://localhost:5000/get_chart")
      .then((response) => {
        setChart(response.data.image);
        setLoading(false);
      })

      .catch((error) => {
        console.error("Error fetching chart:", error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div>
        {loading ? (
          <ApiLoading />
        ) : (
          <img src={`data:image/png;base64,${chart}`} alt="Chart" />
        )}
      </div>
    </>
  );
}

export default NpkChart;
