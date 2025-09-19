const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // feilds required
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All feilds are required" });
    }

    // exist email
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "user all ready exist" });
    }

    // hashed password
    const hashed = await bcrypt.hash(password, 10);

    // save
    const user = new User({
      name,
      email,
      password: hashed,
    });

    await user.save();

    res.status(201).json({
      message: "user registeres successfully",
      user: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  } catch (err) {
    console.error("register error", err.message);
    res.status(404).json({ message: "server error" });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // required feilds
    if (!email || !password) {
      return res.status(400).json({ message: "all feilds are required" });
    }

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // jwt token
    const token = jwt.sign(
      { id: user._id,  email: user.email, name: user.name },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "login successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(404).json({ message: "server error", err });
  }
};
