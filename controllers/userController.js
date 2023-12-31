
require('dotenv').config();
const User = require('../models/userModel')

const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    const token = jwt.sign({ _id }, `${process.env.SECRET}`, { expiresIn: '3d' });
    return token;
};
// get all users
const GetUsers = async (req, res) => {
  try {
      const users = await User.find({});
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {FirstName, SecondName, email, password} = req.body

  try {
    const user = await User.signup(FirstName , SecondName, email, password)
    // create a token
     const token=createToken(user._id)
    res.status(200).json({email,token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser,GetUsers }