import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import ApiLoading from "./ApiLoading";

function Chart() {
  const [loading, setLoading] = useState(true);
  const [graph2, setGraph2] = useState(null);
  const [reviewGraph, setReviewGraph] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get("/api/v1/crops/popular");
        setGraph2(res1.data.graphs.pie_chart);

        const res2 = await axios.get("/api/v1/reviews/getratings");
        setReviewGraph(res2.data.graphs.plot_data);
      } catch (error) {
        console.error("Error fetching charts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="h-screen overflow-y-auto">
        {loading ? (
          <ApiLoading />
        ) : (
          <div>
            {graph2 && (
              <img src={`data:image/png;base64,${graph2}`} alt="graph" />
            )}
          </div>
        )}

        {loading ? (
          <ApiLoading />
        ) : (
          <div>
            {reviewGraph && (
              <img
                src={`data:image/png;base64,${reviewGraph}`}
                alt="reviewGraph"
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Chart;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@mui/material";
// import ApiLoading from "./ApiLoading";

// function Chart() {
//   const [loading, setLoading] = useState(true);
//   const [graph2, setGraph2] = useState(null);
//   const [reviewGraph, setReviewGraph] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res1 = await axios.get("/api/v1/crops/popular");
//         setGraph2(res1.data.graphs.pie_chart);

//         const res2 = await axios.get("/api/v1/reviews/getratings");
//         setReviewGraph(res2.data.graphs.plot_data);
//       } catch (error) {
//         console.error("Error fetching charts:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <ApiLoading />
//       ) : (
//         <div>
//           {graph2 && (
//             <img src={`data:image/png;base64,${graph2}`} alt="graph" />
//           )}
//         </div>
//       )}

//       {loading ? (
//         <ApiLoading />
//       ) : (
//         <div>
//           {reviewGraph && (
//             <img
//               src={`data:image/png;base64,${reviewGraph}`}
//               alt="reviewGraph"
//             />
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default Chart;
// import React, { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";

// const Chart = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://127.0.0.1:3000/api/v1/bookings/bookingstat"
//         );
//         const jsonData = await response.json();
//         setData(jsonData.data.doc);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const renderPieChart = () => {
//     if (!data) return null;

//     const totalRevenue = data.reduce(
//       (acc, entry) => acc + entry.totalRevenue,
//       0
//     );

//     const chartData = {
//       labels: data.map((entry) => entry._id[0]),
//       datasets: [
//         {
//           data: data.map((entry) => (entry.totalRevenue / totalRevenue) * 100),
//           backgroundColor: [
//             "rgba(255, 99, 132, 0.6)",
//             "rgba(54, 162, 235, 0.6)",
//             "rgba(255, 206, 86, 0.6)",
//             "rgba(75, 192, 192, 0.6)",
//             "rgba(153, 102, 255, 0.6)",
//             "rgba(255, 159, 64, 0.6)",
//             // Add more colors if needed
//           ],
//         },
//       ],
//     };

//     const options = {
//       tooltips: {
//         callbacks: {
//           label: (tooltipItem, data) => {
//             const label = data.labels[tooltipItem.index];
//             const value =
//               data.datasets[tooltipItem.datasetIndex].data[
//                 tooltipItem.index
//               ].toFixed(2);
//             return `${label}: ${value}%`;
//           },
//         },
//       },
//     };

//     return <Pie data={chartData} options={options} />;
//   };

//   return (
//     <div>
//       <h2>Price Distribution of Products</h2>
//       {renderPieChart()}
//     </div>
//   );
// };

// export default Chart;
