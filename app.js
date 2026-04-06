require("dotenv").config();
const express = require("express");


const app = express();
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});