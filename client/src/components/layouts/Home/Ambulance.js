import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "../../../CSSFiles/Ambulance.css";

const firebaseConfig = {
  apiKey: "AIzaSyB-VUgp_g0k6Vo1WAgpJfF_tz74HL0J9QI",
  authDomain: "gps-data-demo.firebaseapp.com",
  databaseURL:
    "https://gps-data-demo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gps-data-demo",
  storageBucket: "gps-data-demo.appspot.com",
  messagingSenderId: "778424700278",
  appId: "1:778424700278:web:ac8c0537f5b41863b97e57",
  // Your Firebase config goes here
};
firebase.initializeApp(firebaseConfig);

const Ambulance = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const databaseRef = firebase.database().ref();
    const locationRef = databaseRef.child(
      "UsersData/rPyQOFDu9zVLGdWiA7tJZ7cs6wX2/readings"
    );
    //console.log('Database ref:', databaseRef.toString());
    //console.log('Location ref:', locationRef.toString());
    locationRef.once("value", (snapshot) => {
      const locationsData = snapshot.val();
      const locationsArray = Object.entries(locationsData).map(
        ([timestamp, location]) => ({
          latitude: location.latitude,
          longitude: location.longitude,
        })
      );
      setLocations(locationsArray);
    });
  }, []);

  useEffect(() => {
    const lastLocation =
      locations.length > 0 ? locations[locations.length - 1] : null; // get the last element of the array
    const latitude = lastLocation?.latitude;
    const longitude = lastLocation?.longitude;
    console.log(latitude, longitude);
    if (!latitude || !longitude) return;
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
  }, [locations]);

  // const t = new Date();
  // //console.log(t);
  const lastLocation =
    locations.length > 0 ? locations[locations.length - 1] : null; // get the last element of the array
  const lati = lastLocation?.latitude;
  const longi = lastLocation?.longitude;
  const url =
    "http://maps.google.com/maps?&z=15&mrt=yp&t=k&q=" + lati + "+" + longi;
  //console.log(url);
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     border: "",
    //     justifyContent: "center",
    //     margin: "auto",
    //     flexDirection: "column",
    //     alignItems: "center",
    //   }}
    // >
    //   {lastLocation ? ( // display the last location if it exists
    //     <p style={{ fontSize: "32px", fontWeight: "900" }}>
    //       Last location: Latitude: {lastLocation.latitude}, Longitude:{" "}
    //       {lastLocation.longitude}
    //     </p>
    //   ) : (
    //     <p>Loading please wait...</p>
    //   )}
    //   <p>{t.toString()}</p>
    //   {/* <Link to={url}>See on Google Maps</Link> */}
    // <a target='_blank' href={url}>
    //   See on Google Maps
    // </a>
    // </div>
    <>
      <nav class='navbar' style={{backgroundColor:'#E0EEEF'}}>
        <div class='container-fluid'>
          <a target='_blank' href={url}>
          <i class="fa-solid fa-location-dot fa-beat fa-lg mx-3"></i>
            See on Google Maps
          </a>
          <div style={{alignContent:'end'}}>
            9425805538
            <i class="fa-solid fa-phone fa-fade fa-lg mx-2"></i>
          </div>
        </div>
      </nav>
      <div id='map' style={{ width: "100%", height: "100vh" }}></div>
    </>
  );
};

export default Ambulance;
