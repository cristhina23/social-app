import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";

// register new user
export const registerUser = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    username,
    password: hashedPassword,
    firstname,
    lastname,
  })

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

// login user

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({username});
    if(user) {
      const validity = await bcrypt.compare(password, user.password);

      validity? res.status(200).json(user) : res.status(40).json({message: "Invalid Password"});
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

