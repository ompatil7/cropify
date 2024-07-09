import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function CustomAlert({ severity, message }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={severity}>
        <AlertTitle>
          {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </AlertTitle>
        {message}
      </Alert>
    </Stack>
  );
}
