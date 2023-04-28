const express = require("express");
const router = express.Router();
const { Location, validateLocation } = require("../models/Location");

router.post("/", (req, res) => {
    const {latitude, longitude, id} = req.body;
    if(!id) return res.status(401).send("No id provided");
    const form = {
        latitude,
        longitude,
    };
    const { error } = validateLocation(form);
    if (error) return res.status(400).send(error.details[0].message);
    const location = Location.findById(id);
    if(!location) res.status(401).send("You cannot update location");
    res.status(200).send("Location updated successfully")
    // location.latitude = latitude;
    // location.longitude = longitude;
    // location.save();
})

module.exports = router;
