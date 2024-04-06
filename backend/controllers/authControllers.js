const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

function signWebToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
}

exports.signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Sign Up Successful",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please fill all required fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user found with that email address",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid password",
      });
    }

    res.status(200).json({
        status: "success",
        message: "Login successful",
        data:{
            user
        }
    })
  } catch (err) {}
};
