import axios from "axios";
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import ApiLoading from "../components/ApiLoading";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import discount from "../assets/discount.png";
import shipped from "../assets/shipped.png";
import india from "../assets/india.png";
import secure from "../assets/secure.png";
import { crop } from "./bookinfunction"; //pruthvij bookings
import SnackBar from "../components/SnackBar";
import MapWithStoreLocations from "./MapWithStoreLocations";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { Transition } from "react-transition-group";
import React, { useRef } from "react";

import ReviewCard from "../components/ReviewCard";
const CropDetails = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [postReviewData, setPostReviewData] = useState("");
  const [cropDetails, setcropDetails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviewError, setReviewError] = useState(false);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showSuccessAlert2, setShowSuccessAlert2] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  useEffect(
    function () {
      async function getSingleCrop() {
        try {
          setIsLoading(true);
          setError("");
          const response = await axios.get(`/api/v1/crops/${params.id}`);
          // //console.log("response data ", response.data.data.data); // Handle the response as needed
          //console.log("locations", response.data.data.data.storelocation);

          //console.log("reviews ", response.data.data.data.ratings);
          setReviews(response.data.data.data.ratings);

          if (response.status !== 200)
            throw new Error("Something went wrong with fetching crops");

          const cropData = response.data.data.data;
          if (cropData.length === 0) {
            throw new Error("No crops found");
          }
          setcropDetails(cropData);

          setIsLoading(false);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getSingleCrop();
    },
    [params.id]
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  //get user
  const [userData, setUserData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  let userHasReviewed;
  if (userData) {
    userHasReviewed = reviews?.some(
      (review) => review.user._id === userData._id
    );
  } else {
    userHasReviewed = false;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5173/api/v1/users/user"
        );
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again.");
      }
    };
    fetchData();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      setError("");
      //console.log("sending review, ", postReviewData, starValue, params.id);

      const response = await axios.post("/api/v1/reviews/", {
        review: postReviewData,
        rating: starValue,
        crop: params.id,
        user: userData._id || "", // Add the user ID here
      });
      // Handle the response as needed
      const updatedResponse = await axios.get(`/api/v1/crops/${params.id}`);
      setReviews(updatedResponse.data.data.data.ratings);
      // setSuccessMessage(response.data);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 2000);
      setOpen(false); // Close the modal after successful submission
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to the login page
        navigate("/login");
      } else {
        setError("Failed to submit review. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
      // setOpen(false); // Close the modal after successful submission
    }
  };

  const handleBookEvent = async () => {
    try {
      await crop(cropDetails._id); // Call the bookevent function with the event ID
    } catch (error) {
      console.error("Error booking event:", error);
    }
  };

  // const [amount, setAmount] = useState(1);
  const [loginError, setLoginError] = useState(false);

  const handleBookButtonClick = () => {
    handleBookEvent(); // Call handleBookEvent when the button is clicked
  };

  const data = [
    {
      label: "Description",
      value: "html",
      desc: cropDetails.description,
    },
    {
      label: "Usage",
      value: "react",
      desc: cropDetails.usage,
    },
  ];

  //add to cart
  // const addToCart = () => {
  //   setCart([...cart, cropDetails]);
  // };

  //modal
  const [open, setOpen] = useState(false);
  const [starValue, setstarValue] = useState(1);

  //add to cart
  const getCart = async () => {
    try {
      const response = await axios.get("/api/v1/cart/mycart");
      //console.log(response);
      setCart(response.data.data.data.items);

      //console.log("cart ", cart);
    } catch (error) {
      //console.log(error);
    }
  };

  const addToCart = async () => {
    try {
      const response = await axios.post(`/api/v1/cart/addToCart/${params.id}`);
      //console.log(response);
      if (response.data.status === "success") {
        setShowSuccessAlert2(true);
        setTimeout(() => setShowSuccessAlert2(false), 2000);
      }
      getCart();
    } catch (error) {
      //console.log(error);
    }
  };

  return (
    <>
      {isLoading && <ApiLoading />}
      {!isLoading && error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <div className="mt-10 flex flex-col justify-center lg:flex-row gap-16  px-3 py-2 mx-auto ">
            <div className="flex flex-col lg:w-1/5 bg-white justify-center border border-gray-300 rounded-xl">
              <img
                src={cropDetails.image}
                alt=""
                className="w-full h-3/5 aspect-square object-contain  border-gray-solid"
              />
            </div>
            {/* ABOUT */}
            <div className="flex flex-col gap-5 lg:w-2/6 py-2">
              <div>
                <h1 className="text-3xl font-bold py-2">{cropDetails.name}</h1>
                <span className=" font-semibold text-red-400 ">
                  {cropDetails.type}
                </span>
                <hr />
              </div>
              <div>
                <h3 className="text-2xl font-bold ">Details</h3>
                <ul className="list-disc list-inside ml-5">
                  <li>
                    <span className="font-semibold"> Type:</span>{" "}
                    {cropDetails.type}
                  </li>
                  <li>
                    <span className="font-semibold">Subtype:</span>{" "}
                    {cropDetails.subtype}
                  </li>
                </ul>
                <hr />
              </div>

              <h6 className="text-2xl font-semibold">
                Price : ₹ <span className="">{cropDetails.price}</span>{" "}
              </h6>
              {/* <div className="flex items-center">
                <img src={discount} alt="checkgreen" className="w-7 h-7 mr-2" />
                <h4 className="text-[1.3rem] text-red-500">you save 10%</h4>
              </div> */}
              <div className="flex items-center">
                <img src={shipped} alt="checkgreen" className="w-7 h-7 mr-2" />
                <h4 className="text-[1rem] text-black">
                  In stock, Ready to Ship
                </h4>
              </div>
              <div className="flex items-center">
                <img src={india} alt="checkgreen" className="w-7 h-7 mr-2" />
                <h4 className="text-[1rem] text-black">
                  Country of Origin India
                </h4>
              </div>
              <div className="flex items-center">
                <img src={secure} alt="checkgreen" className="w-7 h-7 mr-2" />
                <h4 className="text-[1rem] text-black ">Secure Payments</h4>
                {/* star */}

                <div className="px-4 flex flex-col justify-center items-center lg:flex-row sm:flex-row min-[400px]:flex-row">
                  <Rating
                    name="read-only"
                    value={cropDetails.avgrating}
                    readOnly
                    size="large"
                  />
                  {/* from api */}
                  <h6 className="text-gray-600 ml-2 text-sm md:text-base mt-1">
                    {cropDetails.reviewCount} reviews
                  </h6>
                </div>
              </div>

              <div className="flex flex-row items-center gap-12">
                {/* <div className="flex flex-row items-center">
                  <button
                    className="bg-gray-200 py-2 px-5 rounded-lg text-green-500  text-3xl"
                    onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}
                  >
                    -
                  </button>
                  <span className="py-4 px-6 rounded-lg">{amount}</span>
                  <button
                    className="bg-gray-200 py-2 px-4 rounded-lg text-green-500  text-3xl"
                    onClick={() => setAmount((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div> */}
                <button
                  className="bg-green-700 hover:bg-green-600  text-white font-semibold py-3 px-16 rounded-xl h-full"
                  onClick={handleBookButtonClick}
                >
                  Buy Now
                </button>
                {cart.find((p) => p.crop.name === cropDetails.name) ? (
                  <span className="bg-blue-700  text-white font-semibold py-3 px-16 rounded-xl h-full">
                    Added
                  </span>
                ) : (
                  <button
                    className="bg-green-700 hover:bg-green-600  text-white font-semibold py-3 px-16 rounded-xl h-full"
                    onClick={addToCart}
                  >
                    Add to cart
                  </button>
                )}
                {loginError && (
                  <SnackBar
                    isOpen={true}
                    message="Adding failed. Please try again."
                    type="error"
                  />
                )}
                {showSuccessAlert2 && (
                  <SnackBar
                    isOpen={true}
                    message="Added to cart!"
                    type="success"
                  />
                )}
              </div>
              {/* description */}
            </div>
          </div>

          {/* dsaa */}
          <div className="w-full xl:w-[1100px] mx-auto py-2 px-2">
            <Tabs id="custom-animation" value="html">
              <TabsHeader
                className="bg-transparent w-1/4 px-3"
                indicatorProps={{
                  className: "bg-amber-600 shadow-none !text-black-900",
                }}
              >
                {data.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>

            {/* Reviews and Ratings */}
            <hr />
            <div className="m-3 mt-7">
              <div className="flex items-center gap-4">
                <Typography level="h3">Ratings and Reviews</Typography>
                <div>
                  <Button
                    variant="outlined"
                    color="neutral"
                    startDecorator={<Add />}
                    onClick={() => {
                      if (!userData) {
                        history.push("/login");
                      } else {
                        setOpen(true);
                        setstarValue(1);
                      }
                    }}
                    style={{ display: userHasReviewed ? "none" : "" }}
                  >
                    Rate this product?
                  </Button>
                  <Transition in={open} timeout={400}>
                    {(state) => (
                      <Modal
                        keepMounted
                        open={!["exited", "exiting"].includes(state)}
                        onClose={() => setOpen(false)}
                        slotProps={{
                          backdrop: {
                            sx: {
                              opacity: 0,
                              backdropFilter: "none",
                              transition: `opacity 400ms, backdrop-filter 400ms`,
                              ...{
                                entering: {
                                  opacity: 1,
                                  backdropFilter: "blur(8px)",
                                },
                                entered: {
                                  opacity: 1,
                                  backdropFilter: "blur(8px)",
                                },
                              }[state],
                            },
                          },
                        }}
                        sx={{
                          visibility: state === "exited" ? "hidden" : "visible",
                        }}
                      >
                        <ModalDialog
                          className=" w-1/4"
                          layout="center"
                          size="lg"
                          sx={{
                            opacity: 0,
                            transition: `opacity 300ms`,
                            ...{
                              entering: { opacity: 1 },
                              entered: { opacity: 1 },
                            }[state],
                          }}
                        >
                          <DialogTitle>Review this product</DialogTitle>
                          <DialogContent>Rating</DialogContent>

                          <form onSubmit={handleReviewSubmit}>
                            <Rating
                              name="simple-controlled"
                              value={starValue}
                              size="large"
                              onChange={(event, newValue) => {
                                setstarValue(newValue);
                                // onChange = { handleChange };
                              }}
                              // onChange={handleStarChange}
                            />
                            <Stack spacing={2}>
                              <FormControl>
                                <FormLabel>Review</FormLabel>
                                <Textarea
                                  autoFocus
                                  required
                                  placeholder="Looks like I'm focused "
                                  value={postReviewData}
                                  sx={{
                                    "--Textarea-focused": 1,
                                  }}
                                  onChange={(e) => {
                                    setPostReviewData(e.target.value);
                                  }}
                                />
                                {/* <Input autoFocus required /> */}
                              </FormControl>

                              <Button type="submit">Submit</Button>
                            </Stack>
                          </form>
                        </ModalDialog>
                      </Modal>
                    )}
                  </Transition>
                </div>
              </div>
              <div>
                {reviews?.map((d) => (
                  <>
                    <ReviewCard
                      review={d.review}
                      key={d._id}
                      rating={d.rating}
                      date={d.createdAt}
                      userName={d.user.name}
                      photo={d.user.photo}
                    />
                    <hr />
                  </>
                ))}

                {/* <ReviewCard review={reviews.review} />
                <ReviewCard />
                <ReviewCard /> */}
              </div>
            </div>
            <Typography level="h4">
              The above Product is available at the stores below.
            </Typography>
            <div>
              <MapWithStoreLocations
                storeLocations={cropDetails.storelocation}
              />
            </div>
          </div>
          {reviewError && (
            <SnackBar
              isOpen={true}
              message="Could not post review."
              type="error"
            />
          )}
          {showSuccessAlert && (
            <SnackBar isOpen={true} message="Review Posted !" type="success" />
          )}
        </>
      )}
    </>
  );
};

export default CropDetails;
