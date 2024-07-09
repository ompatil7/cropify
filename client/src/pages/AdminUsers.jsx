import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./CropsContent.css";
import MapWithStoreLocations from "./MapWithStoreLocations";
import AutoPlay from "../components/Animation/AutoPlay";
import "./AdminUsers.css";
export default function AdminUsers() {
  const mapContainer = useRef(null);
  const [storeLocations, setStoreLocations] = useState([]);

  useEffect(() => {
    maptilersdk.config.apiKey = "DrLHBz4sGQJTXNNCWdc3";

    const fetchStoreLocations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/store/");
        if (!response.ok) {
          throw new Error("Failed to fetch store locations");
        }
        const data = await response.json();
        return data.data.data;
      } catch (error) {
        console.error("Error fetching store locations:", error);
        return [];
      }
    };

    const renderMarkers = async () => {
      const locations = await fetchStoreLocations();
      console.log(locations);
      setStoreLocations(locations);
    };

    renderMarkers();
  }, []);

  return (
    <>
      <div className="map-wrap map-wrap flex justify-center items-center bg-slate-100">
        <div className="w-1/4 ml-10">
          <div className="flex flex-col  items-center">
            <img
              src="https://res.cloudinary.com/pruthvij/image/upload/v1714304883/g1umtv3zlem7mlk1tbvl.webp
"
              alt="logo"
              className="h-28 w-28 mb-2"
            />
            <h1 className="text-3xl font-bold text-center text-gray-900 ">
              OUR STORES
            </h1>
            <p className="text-lg text-center text-gray-700 m-2">
              Explore our offline stores located across various neighborhoods.
              {/*  Visit
          any of our stores to experience our products firsthand and interact
          with our friendly staff. */}{" "}
              Find the nearest store to you on the map below.
            </p>
          </div>
        </div>

        <br />
        <div className="w-full">
          <MapWithStoreLocations storeLocations={storeLocations} />
        </div>
      </div>
      <div className="bg-slate-100">
        <AutoPlay locations={storeLocations} />
      </div>
    </>
  );
}
