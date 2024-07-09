import * as React from "react";

import fertilizer from "../../assets/fertilizerModel.png";
import { Divider, Typography } from "@mui/joy";
import cropModel from "../../assets/cropModel.png"; // import the other image

export default function ModelComparison() {
  return (
    <div>
      <div className="flex flex-row gap-3">
        <div>
          <Typography textAlign={"center"}>
            Fertilizer Prediction Models
          </Typography>
          <img src={fertilizer} />
        </div>

        <Divider orientation="vertical" />

        <div>
          <Typography textAlign={"center"}>Crop Prediction Models</Typography>
          <img src={cropModel} />
        </div>
      </div>
    </div>
  );
}
