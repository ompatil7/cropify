// import Image from "next/image";
import { Empty, Button } from "keep-react";
import { Link } from "react-router-dom";
import pagenotfound from "../assets/pagenotfound.svg";
export const NotFound = () => {
  return (
    <Empty>
      <Empty.Image>
        {/* <Image src={pagenotfound} height={234} width={350} alt="404" /> */}
        <img src={pagenotfound} height={234} width={350} alt="404" />
      </Empty.Image>
      <Empty.Title>Oops! You seem to be lost</Empty.Title>
      <Empty.Description>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry.
      </Empty.Description>
      <Link to="/">
        <Button color="success">Go to home</Button>
      </Link>
    </Empty>
  );
};
