const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.createUser(email, hashedPassword);
    res.send("User Registered");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);

    if (!user) return res.status(401).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid password");

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};