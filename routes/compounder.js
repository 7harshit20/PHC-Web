const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Compounder } = require("../models/Compounder");
const config = require("config");
const middleware = require("../middleware/auth");
const bcrypt = require("bcryptjs");

router.post("/updateProfile", middleware, async (req, res) => {
  const validatecompounder = (compounder) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      new_password: Joi.string().min(6).max(30),
      cnfNew_password: Joi.string(),
      phone: Joi.string().length(10),
      degree: Joi.string(),
      birth: Joi.date(),
      gender: Joi.string(),
    });
    return schema.validate(compounder);
  };

  const {
    name,
    email,
    old_password,
    new_password,
    phone,
    degree,
    gender,
    birth,
    cnfNew_password,
  } = req.body;
  const { error } = validatecompounder(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (
    (old_password != undefined &&
      (new_password === undefined || cnfNew_password === undefined)) ||
    (new_password != undefined && cnfNew_password === undefined) ||
    (new_password === undefined && cnfNew_password != undefined)
  )
    return res.status(400).send("Password fields are not filled properly");
  if (new_password != undefined && old_password === new_password)
    return res.status(400).send("New password and old password are same");
  if (cnfNew_password != undefined && new_password != cnfNew_password)
    return res
      .status(400)
      .send("New password and confirm password are not same");
  try {
    // create an api to upadte the profile of the compounder
    // the api should take the compounder id from the token
    // the api should take the updated details from the body
    // the api should update the details in the database
    // the api should return the updated details
    // the api should return the error if any
    // the api should return the error if the compounder is not found
    // the api should return the error if the compounder is not authorized

    const compounder = await Compounder.findById(req.user.id);
    if (!compounder) return res.status(404).send("Compounder not found");
    if (compounder.email !== email) {
      return res.status(400).send("Email cannot be changed");
    }
    if (new_password) {
      const validPassword = await bcrypt.compare(
        old_password,
        compounder.password
      );
      if (!validPassword) return res.status(400).send("Invalid password");
      const hashedPass = await bcrypt.hash(new_password, 10);
      compounder.password = hashedPass;
    }
    compounder.name = name;
    compounder.phone = phone;
    compounder.degree = degree;
    compounder.gender = gender;
    compounder.birth = birth;
    await compounder.save();
    res.status(200).send(compounder);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;