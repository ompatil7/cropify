/* eslint-disable react/prop-types */
// import React from "react";
// eslint-disable-next-line react/prop-types
import StarRating from "./StarRating";

const Card = ({ course }) => {
  return (
    <div className="z-10 bg-white drop-shadow-md overflow-hidden rounded-2xl mr-2  my-4">
      <img src={course.linkImg} className="h-40 w-full object-cover" />
      <div className="p-5 border border-b">
        <h1 className="py-2 truncate">{course.title}</h1>
        <StarRating rating={course.rating} />
        <h3 className="p-5 text-xl">{course.price}</h3>
        <button className=" bg-[#228B22] text-white px-5 py-2 rounded-md hover:bg-green-600">
          Buy This
        </button>
      </div>

      <div className="absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold">
        {course.category}
      </div>
    </div>
  );
};

export default Card;
