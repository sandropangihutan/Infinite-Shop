import User from "../models/UserModel.js";
import argon2 from "argon2";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Update Profile Endpoint
export const updateProfile = async (req, res) => {
  const { name, email, phone, currentPassword, newPassword } = req.body;
  const userId = req.session.userId;

  try {
    if (!userId) {
      return res.status(401).json({ msg: "Please log in to your account!" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.phone = phone;

    if (currentPassword && newPassword) {
      const isPasswordMatch = await argon2.verify(
        user.password,
        currentPassword
      );
      if (!isPasswordMatch) {
        return res.status(400).json({ msg: "Current password is incorrect" });
      }
      user.password = await argon2.hash(newPassword);
    }

    if (req.files && req.files.image) {
      const file = req.files.image;
      const ext = path.extname(file.name).toLowerCase();
      const allowedTypes = [".png", ".jpg", ".jpeg"];

      if (!allowedTypes.includes(ext)) {
        return res.status(422).json({ msg: "Invalid image format" });
      }

      if (file.size > 5000000) {
        return res.status(422).json({ msg: "File is too large" });
      }

      const fileName = `${uuidv4()}${ext}`;
      const filePath = `./public/images/profile/${fileName}`;

      // Move new profile image
      file.mv(filePath, async (err) => {
        if (err) {
          console.error("Error uploading new profile image:", err);
          return res.status(500).json({ msg: "Failed to upload image" });
        }

        // Update user details with new image information
        user.image = fileName;
        user.url = `${req.protocol}://${req.get(
          "host"
        )}/images/profile/${fileName}`;

        try {
          await user.save();
          res.status(200).json({ msg: "Profile updated successfully", user });
        } catch (error) {
          console.error("Error saving user after image upload:", error);
          res.status(500).json({ msg: "Server error" });
        }
      });
    } else {
      try {
        await user.save();
        res.status(200).json({ msg: "Profile updated successfully", user });
      } catch (error) {
        console.error("Error saving user without image upload:", error);
        res.status(500).json({ msg: "Server error" });
      }
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login Endpoint
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    req.session.userId = user.id;
    res
      .status(200)
      .json({ name: user.name, email: user.email, role: user.role });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get Current User Endpoint
export const Me = async (req, res) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ msg: "Please log in to your account!" });
    }

    const user = await User.findByPk(userId, {
      attributes: ["id", "name", "email", "phone", "role", "image", "url"],
    });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Logout Endpoint
export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).json({ msg: "Server error" });
    }
    res.status(200).json({ msg: "Logged out successfully" });
  });
};
