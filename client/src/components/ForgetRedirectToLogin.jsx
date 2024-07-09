import { Empty, Button } from "keep-react";
import { Link } from "react-router-dom";
// import pagenotfound from "../assets/pagenotfound.svg";
import ForgetPassword from "../assets/forgetPassword.avif";

export const ForgetRedirectToLogin = () => {
  return (
    <Empty>
      <Empty.Image>
        <img src={ForgetPassword} height={234} width={350} alt="404" />
      </Empty.Image>
      <Empty.Title>Reset Your Password</Empty.Title>
      <Empty.Description>
        An email has been sent to your registered email address with
        instructions on how to reset your password. Please check your inbox and
        follow the link provided to set a new password.
      </Empty.Description>
      <Link to="/login">
        <Button color="success">Go to Login</Button>
      </Link>
    </Empty>
  );
};
