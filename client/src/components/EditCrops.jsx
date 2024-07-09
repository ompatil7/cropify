import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import Typography from "@mui/joy/Typography";

export default function EditCrops() {
  const columns = [
    {
      field: "index",
      headerName: "N.O",
      width: 100,
    },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name} // You can set the alt text to the crop name or any other appropriate value
          style={{ width: 50, height: 50 }} // Adjust the width and height as needed
        />
      ),
    },
    { field: "name", headerName: "Item Name", width: 250 },

    { field: "price", headerName: "Price", type: "number", width: 90 },

    { field: "quantity", headerName: "Quatity", width: 90 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "subtype", headerName: "Subtype", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <Link to={`/profile/editcrops/${params.row._id}`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
          {/* Edit Icon */}
          {/* <IconButton onClick={() => handleEdit(params.row._id)}>
            <EditIcon />
          </IconButton> */}

          {/* Delete Icon */}
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },

    /*  { field: "description", headerName: "Description", width: 300 }, */
  ];

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (!confirmed) {
        return;
      }

      const res = await axios.delete(`/api/v1/crops/${id}`);
      setCrops((prevCrops) => prevCrops.filter((crop) => crop._id !== id));
      // Handle successful deletion
    } catch (error) {
      console.log("error in handleDelete", error);
      // Handle error
    }
  };
  const [crops, setCrops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await axios.get(`/api/v1/users/getdetail`);
        //console.log("edit crop response ", response); // Handle the response as needed
        //console.log("edit crop real ", response.data.user.products); // Handle the response as needed

        if (response.status !== 200)
          throw new Error("Something went wrong with fetchintg crops");

        const cropsData = response.data.user.products;
        if (cropsData.length === 0) {
          throw new Error("No crops found");
        }

        setCrops(cropsData);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Render the confirmation dialog if showConfirmation is true

  /* const rows = crops.map((crop, index) => crop.name); */

  const selectedFields = crops.map((crop, index) => ({
    index: index + 1,
    _id: crop._id,
    name: crop.name,
    image: crop.image,
    price: crop.price,
    quantity: crop.quantity,
    type: crop.type,
    subtype: crop.subtype,
    description: crop.description,
  }));
  return (
    <div style={{ height: 600, width: 1200 }}>
      <div className="mt-3 mb-5">
        <Typography level="h3">My Products</Typography>
      </div>

      <DataGrid
        rows={selectedFields}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20]}

        /*  checkboxSelection */
      />
    </div>
  );
}
