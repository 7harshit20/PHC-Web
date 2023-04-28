const mongoose = require("mongoose");
const Joi = require("joi");

const locationSchema = mongoose.Schema({
    latitude: {
        type: String,
        required: true,
    }, 
    longitude: {
        type: String,
        required: true,
    }
});

const validateLocation = (location) => {
    const schema = Joi.object({
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
    });
    return schema.validate(location);
};

module.exports = {
    Location: mongoose.model("location", locationSchema),
    validateLocation,
};