import React, { useEffect, useContext } from "react";
import GlobalContext from "../../../context/global/GlobalContext";

const Ambulance = () => {
  const globalContext = useContext(GlobalContext);
  const { latitude, longitude, fetchLocation } = globalContext;

  useEffect(() => {
    fetchLocation();
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://apis.mappls.com/advancedmaps/api/802271a9e6629027f398d0716bb07bc9/map_sdk?layer=vector&v=3.0&callback=initMap1";
    script.defer = true;
    script.async = true;

    window.initMap1 = () => {
      const map = new window.mappls.Map("map", {
        center: [latitude, longitude],
        zoomControl: true,
        location: true,
      });

      const Marker1 = new window.mappls.Marker({
        map: map,
        position: {
          lat: latitude,
          lng: longitude,
        },
        fitbounds: true,
        icon_url: "https://apis.mapmyindia.com/map_v3/1.png",
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  return <div id='map' style={{ width: "100%", height: "100vh" }}></div>;
};

export default Ambulance;
