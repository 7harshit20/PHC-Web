/**
 * Imports
 */
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const compression = require("compression");

/**
 * Database
 */
const connectDB = require("./config/db");
connectDB();

/**
 * Set Port
 */
const port = process.env.PORT || 5000;

/**
 * Initialize Express
 */
const app = express();

/**
 * Middlewares
 */
app.use(express.json({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(compression({ level: 5 }));

/**
 * Routes
 */
app.use("/api/register", require("./routes/register"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/doctor", require("./routes/doctor"));
app.use("/api/compounder", require("./routes/compounder"));
app.use("/api/patient", require("./routes/patient"));
app.use("/api/schedule", require("./routes/schedule"));
/**
 * Serve static assets in production
 */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

/**
 * Listen to port
 */
app.listen(port, () => console.log(`Listening on port ${port}`));
