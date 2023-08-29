import UserModel from "../Models/userModel.js";

// get a User 

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(user);
    } else {
      res.status(404).json({message: "User not found"});
      
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}