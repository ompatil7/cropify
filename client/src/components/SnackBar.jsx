import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackBar({ isOpen, message, type }) {
  return (
    <Snackbar open={open} autoHideDuration={2000} key={"top" + "right"}>
      <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
