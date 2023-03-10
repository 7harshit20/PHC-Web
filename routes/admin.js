const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { Doctor, validatedoctor } = require("../models/Doctor");
const { Compounder, validatecompounder } = require("../models/Compounder");
const { Admin, validateadmin } = require("../models/Admin");
const { Stock, validateStock } = require("../models/Stock");
const { Medicine, validateMedicine } = require("../models/Medicine");
const config = require("config");
const authAdmin = require("../middleware/authAdmin");
const bcrypt = require("bcryptjs");

// const actors = [null, Doctor, null, null, Patient];

router.post("/addDoctor", authAdmin, async (req, res) => {
  console.log("reached till addDoc");
  const {
    name,
    email,
    password,
    phone,
    degree,
    birth,
    gender,
    employment_details,
    timing,
  } = req.body;

  const { error } = validatedoctor(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    if ((await Doctor.findOne({ email })) !== null)
      return res.status(401).send("Email already exist");

    const hashedPass = await bcrypt.hash(password, 10);
    let doctor = new Doctor({
      name,
      email,
      phone,
      degree,
      birth,
      gender,
      employment_details,
      timing,
      password: hashedPass,
    });
    await doctor.save();
    res.status(200).send("Doctor Added");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.post("/addCompounder", authAdmin, async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    degree,
    birth,
    gender,
    employment_details,
    timing,
  } = req.body;

  const { error } = validatecompounder(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    if ((await Compounder.findOne({ email })) !== null)
      return res.status(401).send("Email already exist");

    const hashedPass = await bcrypt.hash(password, 10);
    let compounder = new Compounder({
      name,
      email,
      phone,
      degree,
      birth,
      gender,
      employment_details,
      timing,
      password: hashedPass,
    });
    await compounder.save();
    res.status(200).send("Compounder Added");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.post("/addAdmin", authAdmin, async (req, res) => {
  const { name, email, password, phone } = req.body;

  const { error } = validateadmin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    if ((await Admin.findOne({ email })) !== null)
      return res.status(401).send("Email already exist");

    const hashedPass = await bcrypt.hash(password, 10);
    let admin = new Admin({
      name,
      email,
      phone,
      password: hashedPass,
    });
    await admin.save();
    res.status(200).send("Admin Added");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.post("/addStock", authAdmin, async (req, res) => {
  const { name, price, expiry, quantity, seller } = req.body;
  const { error } = validateStock(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let medicine = await Medicine.findOne({ name });
    if (medicine === null) {
      medicine = new Medicine({ name });
      await medicine.save();
    }
    let stock = new Stock({
      name,
      price,
      expiry,
      quantity,
      seller,
      medicine_id: medicine._id,
    });
    await stock.save();
    medicine.availableStock.push(stock._id);
    await medicine.save();
    res.status(200).send("Stock Added");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.get("/getMedicine", authAdmin, async (req, res) => {
  try {
    const medicine = await Medicine.find();
    res.status(200).send(medicine);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.get("/getStock", authAdmin, async (req, res) => {
  try {
    const stock = await Stock.find();
    res.status(200).send(stock);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.get("/getMedicineStock/:name", authAdmin, async (req, res) => {
  try {
    console.log(req.query);
    const stock = await Stock.find({ name: req.params.name });
    // stock.sort((a, b) => {
    //   return a.expiry - b.expiry;
    // });
    res.status(200).send(stock);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.post("/updateStock", authAdmin, async (req, res) => {
  const { id, name, price, expiry, quantity, seller } = req.body;
  try {
    const stock = await Stock.findById(id);
    if (!stock) return res.status(404).send("Stock not found");
    if (name !== stock.name) {
      res.status(400).send("Name cannot be changed");
    }
    stock.price = price;
    stock.expiry = expiry;
    stock.quantity = quantity;
    stock.seller = seller;
    await stock.save();
    res.status(200).send("Stock Updated");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.delete("/deleteStock", authAdmin, async (req, res) => {
  const { id } = req.query;
  try {
    const stock = await Stock.findById(id);
    if (!stock) return res.status(404).send("Stock not found");
    const medicine = await Medicine.findOne({ name: stock.name });
    medicine.availableStock = medicine.availableStock.filter((stock_id) => {
      return stock_id != id;
    });
    console.log(medicine.availableStock);
    medicine.deadStock = medicine.deadStock.filter((stock_id) => {
      return stock_id !== id;
    });
    await medicine.save();
    await stock.remove();
    res.status(200).send("Stock Deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.get("/totalQuantity/:name", authAdmin, async (req, res) => {
  const { name } = req.params;
  try {
    const medicine = await Medicine.findOne({ name });
    if (!medicine) return res.status(404).send("Medicine not found");
    let totalQuantity = 0;
    for (let i = 0; i < medicine.availableStock.length; i++) {
      let stock_id = medicine.availableStock[i];
      let stock = await Stock.findById(stock_id);
      const isExpired = (stock) => {
        if (new Date(stock.expiry) <= new Date()) return true;
        return false;
      };

      if (stock.quantity === 0 || isExpired(stock)) {
        medicine.deadStock.push(stock_id);
        medicine.availableStock.splice(i, 1);
        await medicine.save();
        j--;
        continue;
      }
      totalQuantity += stock.quantity;
    }
    res.status(200).send({ totalQuantity });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

router.get("/allMedicines", authAdmin, async (req, res) => {
  try {
    const medicines = await Medicine.find();
    let allMedicines = [];
    for (let i = 0; i < medicines.length; i++) {
      let medicine = medicines[i];
      let totalQuantity = 0;
      for (let j = 0; j < medicine.availableStock.length; j++) {
        let stock_id = medicine.availableStock[j];
        let stock = await Stock.findById(stock_id);
        const isExpired = (stock) => {
          if (new Date(stock.expiry) <= new Date()) return true;
          return false;
        };
        if (stock.quantity === 0 || isExpired(stock)) {
          medicine.deadStock.push(stock_id);
          medicine.availableStock.splice(j, 1);
          await medicine.save();
          j--;
          continue;
        }
        totalQuantity += stock.quantity;
      }
      allMedicines.push({ name: medicine.name, totalQuantity });
    }
    res.status(200).send(allMedicines);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
