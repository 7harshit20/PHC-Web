const express = require("express");
const router = express.Router();
const authAdmin = require("../middleware/authAdmin");
const bcrypt = require("bcryptjs");
const { Doctor, validatedoctor } = require("../models/Doctor");
const { Compounder, validatecompounder } = require("../models/Compounder");
const { Admin, validateadmin } = require("../models/Admin");
const { Stock, validateStock } = require("../models/Stock");
const { Medicine, validateMedicine } = require("../models/Medicine");
// function to check if stock is expired
const isExpired = (stock) => {
  if (new Date(stock.expiry) <= new Date()) return true;
  return false;
};
// @route   POST api/admin/addActor/:role
// @desc    Add Actor
// @access  Private
router.post("/addActor/:role", authAdmin, async (req, res) => {
  const { name, email, password, phone } = req.body;
  const role = req.params.role;

  const { error } = validateadmin(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let User;
    if (role === "doctor") User = Doctor;
    else if (role === "compounder") User = Compounder;
    else if (role === "admin") User = Admin;
    if ((await User.findOne({ email })) !== null)
      return res.status(401).send("Email already exist");

    const hashedPass = await bcrypt.hash(password, 10);
    let user = new User({
      name,
      email,
      phone,
      password: hashedPass,
    });
    await user.save();
    res.status(200).send(`${role} added`);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});
// @route   POST api/admin/getActors
// @desc    Get Actors
// @access  Private
router.get("/getActors", authAdmin, async (req, res) => {
  try {
    const doctors = await Doctor.find().select(
      "name email phone degree availability -_id"
    );
    const compounders = await Compounder.find().select("name email phone -_id");
    const admins = await Admin.find().select("name email phone -_id");
    res.status(200).send({ doctors, compounders, admins });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});
// @route   POST api/admin/addMedicine
// @desc    Add Medicine
// @access  Private
router.post("/addMedicine", authAdmin, async (req, res) => {
  const { name, type, category, description, composition, company } = req.body;
  const { error } = validateMedicine(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const medicine = new Medicine({
      name,
      type,
      category,
      description,
      composition,
      company,
    });
    await medicine.save();
    res.status(200).send("Medicine Added");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// @route GET api/admin/getMedicine
// @desc Get Medicine
// @access Private
router.get("/getMedicine", authAdmin, async (req, res) => {
  try {
    // check if any stock expired and substract quantity from medicine
    const stocks = await Stock.find();
    for (let i = 0; i < stocks.length; i++) {
      let stock = stocks[i];
      if (!stock.expired && isExpired(stock)) {
        stock.expired = true;

        // substract quantity from medicine
        const medicine = await Medicine.findById(stock.medicine_id);
        medicine.quantity -= stock.quantity;
        await medicine.save();

        await stock.save();
      }
    }

    const medicines = await Medicine.find();
    res.status(200).send(medicines.reverse());
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// @route   POST api/admin/addStock
// @desc    Add Stock
// @access  Private
router.post("/addStock", authAdmin, async (req, res) => {
  const { medicine_id, name, price, expiry, initialQuantity, seller } = req.body;
  const quantity = initialQuantity;

  const { error } = validateStock({
    medicine_id,
    name,
    price,
    expiry,
    initialQuantity,
    quantity,
    seller,
  });
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let medicine = await Medicine.findById(medicine_id);
    if (!medicine) return res.status(400).send("Medicine not found");
    if (medicine.name !== name)
      return res.status(400).send("Medicine name does not match");
    let stock = new Stock({
      medicine_id,
      name,
      price,
      expiry,
      initialQuantity,
      quantity,
      seller,
    });
    medicine.quantity += Number(initialQuantity);
    await stock.save();
    await medicine.save();
    res.status(200).send("Stock Added");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// @route   POST api/admin/getStock
// @desc    Get Stock
// @access  Private
router.get("/getStock", authAdmin, async (req, res) => {
  try {
    const stock = await Stock.find();

    res.status(200).send(stock.reverse());
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// @route   POST api/admin/updateStock
// @desc    Update Stock
// @access  Private
router.post("/updateStock", authAdmin, async (req, res) => {
  const { _id, name, price, expiry, quantity, seller } = req.body;
  try {
    const stock = await Stock.findById(_id);
    if (!stock) return res.status(404).send("Stock not found");
    if (name !== stock.name) {
      return res.status(400).send("Name cannot be changed");
    }
    if (String(new Date(expiry)) !== String(new Date(stock.expiry))) {
      return res.status(400).send("Expiry cannot be changed");
    }
    if (quantity > stock.initialQuantity) {
      return res
        .status(400)
        .send("Quantity cannot be greater than initial quantity");
    }
    stock.price = price;
    stock.seller = seller;

    if (quantity != stock.quantity) {
      const medicine = await Medicine.findById(stock.medicine_id);
      medicine.quantity = medicine.quantity - stock.quantity + Number(quantity);
      stock.quantity = Number(quantity);
      await medicine.save();
    }

    await stock.save();
    res.status(200).send("Stock Updated");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// @route   POST api/admin/deleteStock
// @desc    Delete Stock
// @access  Private
router.delete("/deleteStock", authAdmin, async (req, res) => {
  const { id } = req.query;
  try {
    const stock = await Stock.findById(id);
    if (!stock) return res.status(404).send("Stock not found");
    const medicine = await Medicine.findById(stock.medicine_id);
    medicine.quantity -= stock.quantity;
    await medicine.save();
    await stock.remove();
    res.status(200).send("Stock Deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

//get medinine with initial quantity expended quantity and remaining quantity form stock within 2 dates
// @route   POST api/admin/getMedicineWithQuantity
// @desc    Get Medicine with quantity
// @access  Private
router.post("/getAllMedicineDetails", authAdmin, async (req, res) => {
  const { from, to } = req.body;
  if(from===undefined || to===undefined || from==="" || to===""){
    return res.status(400).send("Please select dates");
  }
  if(from>to){
    return res.status(400).send("From date cannot be greater than to date");
  }
  console.log('reached get all med details');
  console.log(from,to);
  const fromDate = new Date(from);
  const toDate = new Date(to);
  try {
    const medicines = await Medicine.find();
    let allMedicineDetails = [];
    for (let i = 0; i < medicines.length; i++) {
      let medicine = medicines[i];
      const stocks = await Stock.find({ 
        medicine_id: medicine._id,
        date: { $gte: new Date(fromDate.getTime() - 19800000), $lte: new Date(toDate.getTime() + 66600000) },
       });
      console.log("geting all stocks",stocks);
      let totalQuantity = 0;
      let totalInitialQuantity = 0;
      let totalExpendQuantity = 0;
      for (let j = 0; j < stocks.length; j++) {
        let stock = stocks[j];
          totalInitialQuantity += Number(stock.initialQuantity);
          totalExpendQuantity += Number(stock.initialQuantity - stock.quantity);
          totalQuantity += Number(stock.quantity);
      }
      if(stocks.length===0) continue;

      allMedicineDetails.push({
        name: medicine.name,
        type: medicine.type,
        category:medicine.category,
        NumberOfStocks: stocks.length,
        totalInitialQuantity,
        totalExpendQuantity,
        totalQuantity,
      });
    }
    res.status(200).send(allMedicineDetails);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// not required
router.get("/allMedicinesWithQuantity", authAdmin, async (req, res) => {
  try {
    const medicines = await Medicine.find();

    let allMedicinesWithQuantity = [];
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
      allMedicinesWithQuantity.push({ name: medicine.name, totalQuantity });
    }
    res.status(200).send(allMedicinesWithQuantity);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// not used
router.get("/getMedicineStock/:name", authAdmin, async (req, res) => {
  try {
    console.log(req.query);
    const stock = await Stock.find({ name: req.params.name });
    res.status(200).send(stock);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Something went wrong");
  }
});

// not used
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

module.exports = router;
