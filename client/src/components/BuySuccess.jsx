import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

import imagg from "../assets/confirm.webp";

function BuySuccess() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <img src={imagg} className="w-1/2" alt="Confirmation" />
        <Typography variant="h4" align="center" mt={2} color="green">
          Congratulations! Your order has been placed successfully.
        </Typography>
        <Typography variant="body1" align="center" mt={2}>
          We are thrilled to have you as our customer.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          endIcon={<ArrowForward />}
          sx={{ mt: 4 }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Container>
  );
}

export default BuySuccess;
