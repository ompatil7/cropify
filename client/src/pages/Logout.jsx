import { useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
function Logout() {
  //const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const res = await axios.get("api/v1/users/logout");
        //console.log("log out response", res.data.status);
        window.location.assign("/"); // Redirect to homepage
        //window.location.reload();
        /* if (res.data.status === "success") {
         
          //console.log("Logout Successfully ");

          window.location.assign("/"); // Redirect to homepage
          window.location.reload(); // Reload the page
        } */
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    handleLogout();
  });

  return <div></div>;
}

export default Logout;
