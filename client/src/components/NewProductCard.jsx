import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
export default function NewProductCard(props) {
  return (
    <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
      <CardOverflow>
        {/* <AspectRatio sx={{ minWidth: 320 }}> */}
        <img
          src={props.image}
          alt="card-image"
          className="object-contain w-full h-full"
        />
        {/* </AspectRatio> */}
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs" color="primary">
          {props.type}
        </Typography>
        <Link
          href="#product-card"
          fontWeight="md"
          color="neutral"
          textColor="text.primary"
          overlay
          endDecorator={<ArrowOutwardIcon />}
        >
          {props.name}
        </Link>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: "xl" }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="danger">
              Lowest price
            </Chip>
          }
        >
          ₹ {props.price}
        </Typography>
        <Typography level="body-sm">
          (Only <b>{props.quantity}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="success" size="lg">
          Shop now
        </Button>
      </CardOverflow>
    </Card>
  );
}
