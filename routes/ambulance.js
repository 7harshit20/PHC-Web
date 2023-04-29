const express = require("express");
const router = express.Router();
const { Location, validateLocation } = require("../models/Location");

router.get("/location", async (req, res) => {
  try {
    const location = await Location.find();
    console.log("location from db");
    console.log(location[0]);
    return res.status(200).send({
      latitude: location[0].latitude,
      longitude: location[0].longitude,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong");
  }
});

router.post("/location", async (req, res) => {
  const { latitude, longitude, id } = req.body;
  if (!id) return res.status(401).send("No id provided");
  const form = {
    latitude,
    longitude,
  };
  const { error } = validateLocation(form);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const location = await Location.findById(id);
    if (!location) res.status(401).send("You cannot update location");
    location.latitude = latitude;
    location.longitude = longitude;
    await location.save();
    return res.status(200).send("Location updated successfully");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
