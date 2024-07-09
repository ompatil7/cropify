import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
const CreateStore = () => {
  const [formOpen, setFormOpen] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phonenumber: "",
    locations: {
      coordinates: ["", ""],
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "coordinates0" || name === "coordinates1") {
      const index = name === "coordinates0" ? 0 : 1;
      const newCoordinates = [...formData.locations.coordinates];
      newCoordinates[index] = value;
      setFormData({
        ...formData,
        locations: {
          ...formData.locations,
          coordinates: newCoordinates,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3000/api/v1/store", formData);
      alert("Store created successfully!");
      setFormOpen(false);
      // Optionally, reset the form after successful submission
      setFormData({
        name: "",
        address: "",
        phonenumber: "",
        locations: {
          coordinates: ["", ""],
        },
      });
    } catch (error) {
      console.error("Error creating store:", error);
      alert("Error creating store. Please try again.");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {formOpen && (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add an offline store
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Store Name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="Latitude"
                    name="coordinates0"
                    required
                    fullWidth
                    type="text"
                    id="coordinates0"
                    label="Latitude"
                    autoFocus
                    value={formData.locations.coordinates[0]}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="Longitude"
                    name="coordinates1"
                    type="text"
                    required
                    fullWidth
                    id="coordinates1"
                    label="Longitude"
                    autoFocus
                    value={formData.locations.coordinates[1]}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    id="phonenumber"
                    label="Phone Number"
                    name="phonenumber"
                    autoComplete="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Store
              </Button>
            </Box>
          </Box>
        )}

        {!formOpen && (
          <Typography component="h1" variant="h5">
            Store added successfully!
          </Typography>
        )}
      </Container>
    </>
  );
};

export default CreateStore;

//imp
{
  /* <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="text"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Latitude:
          <input
            type="text"
            name="coordinates0"
            value={formData.locations.coordinates[0]}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Longitude:
          <input
            type="text"
            name="coordinates1"
            value={formData.locations.coordinates[1]}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form> */
}

// import { useState } from "react";

// import * as React from "react";

// import axios from "axios";

// function CreateStore() {
//   const [formOpen, setFormOpen] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     phonenumber: "",
//     locations: {
//       coordinates: [],
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const longitude = formData.locations.coordinates[0];
//     const latitude = formData.locations.coordinates[1];

//     // Create new form data with updated coordinates array
//     const updatedFormData = {
//       ...formData,
//       locations: {
//         coordinates: [longitude, latitude],
//       },
//     };
//     const data = {
//       name: updatedFormData.name,
//       address: updatedFormData.address,
//       phonenumber: updatedFormData.phonenumber,
//       locations: {
//         coordinates: [
//           updatedFormData.locations.coordinates[0],
//           updatedFormData.locations.coordinates[1],
//         ],
//       },
//     };

//     console.log("Form data to submit:", data);

//     try {
//       // const response = await axios.post(
//       //   "http://127.0.0.1:3000/api/v1/store",
//       //   data
//       // );
//       // console.log(response);
//     } catch (error) {
//       console.log("error in creat post ", error);
//     }

//     // Here you can perform your submission logic, e.g., make an API call
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//       locations: {
//         ...prevFormData.locations.coordinates,
//         [name]: value,
//       },
//     }));
//   };

//   return (
//     <>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         {formOpen && (
//           <Box
//             sx={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Typography component="h1" variant="h5">
//               Add an offline store
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//               onSubmit={handleSubmit}
//               sx={{ mt: 3 }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="name"
//                     label="Store Name"
//                     name="name"
//                     autoComplete="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     autoComplete="longitude"
//                     name="locations.coordinates[0]"
//                     required
//                     fullWidth
//                     id="longitude"
//                     label="Longitude"
//                     autoFocus
//                     value={formData.locations.coordinates[0]}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     autoComplete="latitude"
//                     name="locations.coordinates[1]"
//                     required
//                     fullWidth
//                     id="latitude"
//                     label="Latitude"
//                     autoFocus
//                     value={formData.locations.coordinates[1]}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="address"
//                     label="Address"
//                     name="address"
//                     autoComplete="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     type="number"
//                     id="phonenumber"
//                     label="Phone Number"
//                     name="phonenumber"
//                     autoComplete="phonenumber"
//                     value={formData.phonenumber}
//                     onChange={handleChange}
//                   />
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Create Store
//               </Button>
//             </Box>
//           </Box>
//         )}

// {!formOpen && (
//   <Typography component="h1" variant="h5">
//     Store added successfully!
//   </Typography>
// )}
//       </Container>
//     </>
//   );
// }

// export default CreateStore;
