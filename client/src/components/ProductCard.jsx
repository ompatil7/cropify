// /* eslint-disable react/prop-types */
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
// import fertilizer from "../assets/fertilizer.jpeg";

// export default function ProductCard(props) {
//   return (
//     <Card className="w-50 h-50 flex flex-col justify-between">
//       <CardHeader
//         shadow={false}
//         floated={false}
//         className="h-52 flex justify-center items-center"
//       >
//         <img
//           src={fertilizer}
//           alt="card-image"
//           className="h-38 w-38 object-fill"
//         />
//       </CardHeader>
//       <CardBody>
//         <div className="mb-2 flex items-center justify-between">
//           <Typography color="blue-gray" className="font-medium">
//             {props.name}
//           </Typography>
//           <Typography color="blue-gray" className="font-medium">
//             ${props.price}
//           </Typography>
//         </div>
//         <Chip variant="ghost" value={props.type} className="rounded-full" />
//       </CardBody>

//       <CardFooter className="pt-0">
//         <Button
//           ripple={false}
//           fullWidth={true}
//           className="bg-light-green-400 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
//         >
//           Shop now
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }

import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
// import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export default function ProductCard(props) {
  return (
    // <Card sx={{ width: 320, maxWidth: "100%", boxShadow: "lg" }}>
    //   <AspectRatio
    //     sx={{
    //       minWidth: 200,
    //       minHeight: 250,
    //       margin: 0,
    //       padding: 0,
    //       width: "full",
    //       height: "full",
    //     }}
    //   >
    //     <img
    //       src={props.image}
    //       srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
    //       loading="lazy"
    //       alt=""
    //     />
    //   </AspectRatio>

    //   <CardContent>
    //     <Typography level="body-xs">{props.type}</Typography>
    //     <Link
    //       href="#product-card"
    //       fontWeight="md"
    //       color="neutral"
    //       textColor="text.primary"
    //       overlay
    //       endDecorator={<ArrowOutwardIcon />}
    //     >
    //       {props.name}
    //     </Link>

    //     <Typography
    //       level="title-lg"
    //       sx={{ mt: 1, fontWeight: "xl" }}
    //       endDecorator={
    //         <Chip component="span" size="sm" variant="soft" color="success">
    //           Lowest price
    //         </Chip>
    //       }
    //     >
    //       2,900 THB
    //     </Typography>
    //     <Typography level="body-sm">
    //       (Only <b>7</b> left in stock!)
    //     </Typography>
    //   </CardContent>
    //   <CardOverflow>
    //     <Button variant="solid" color="danger" size="lg">
    //       Add to cart
    //     </Button>
    //   </CardOverflow>
    // </Card>
    <Card className="w-50 h-45 flex flex-col justify-between gap-6">
      <CardHeader
        shadow={false}
        floated={false}
        className="h-52 flex justify-center items-center"
      >
        <img
          src={props.image}
          alt="card-image"
          className="object-contain w-full h-full"
        />
      </CardHeader>
      <div className=" pl-5">
        <CardContent>
          <Typography level="title-md" color="primary">
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
            {props.price}₹
          </Typography>
        </CardContent>
      </div>
      {/* <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {props.name}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ${props.price}
          </Typography>
        </div>
        <Chip variant="ghost" value={props.type} className="rounded-full" />
      </CardBody> */}

      <CardFooter className="pt-0">
        <Button variant="solid" color="success" className="w-full">
          Shop now
        </Button>
      </CardFooter>
    </Card>
  );
}
