const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

function signWebToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
}

exports.signup = async (req, res) => {
  try {
    const checkUser = await User.findOne({email: req.body.email})
    if(checkUser){
      return res.status(400).json({
        status:"fail",
        message:"Email already taken"
      })
    }
    if(req.body.password.length < 8){
      return res.status(400).json({
        status:'fail',
        message:"Password should be longer than 8 characters"
      })
    }
    const user = await User.create(req.body);
    res.status(200).json({
      status: "success",
      message: "Sign Up Successful",
      data:{
        user
      }
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

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "No user found with that email address",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
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
