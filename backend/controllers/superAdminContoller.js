import hospitalOwnerModel from "../models/SuperAdminModels/hospitalOwnerSchema.js";
import bcrypt from "bcrypt"; // Password security ke liye

export const registerHospital = async (request, response) => {
  try {
    const {
      hospitalName,
      address,
      contact,
      ownerName,
      ownerEmail,
      password,
      plane,
    } = request.body;

    // 1. Validation (Jo aapne ki hai, wo theek hai)
    if (!hospitalName || !address || !contact || !ownerName || !ownerEmail || !password || !plane) {
      return response.status(400).json({
        message: "Required Fields are missing",
        status: false,
      });
    }

    // 2. Duplicate Check (Check karo ke hospital pehle se register to nahi)
    const existingHospital = await hospitalOwnerModel.findOne({ ownerEmail });
    if (existingHospital) {
      return response.status(400).json({
        message: "Hospital with this email already exists!",
        status: false,
      });
    }

    // 3. Password Hashing (Security ke liye bohot zaroori hai)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. SAVE TO DATABASE (Ye step aapke code mein miss tha)
    const newHospital = new hospitalOwnerModel({
      hospitalName,
      address,
      contact,
      ownerName,
      ownerEmail,
      password: hashedPassword, // Hashed password save karein
      plane,
    });

    await newHospital.save();

    // 5. Success Response
    response.status(201).json({
      message: "Hospital created successfully!",
      data: newHospital, // Saved data bhejein
      status: true,
    });

  } catch (error) {
    console.log("Error:", error);
    response.status(500).json({
      message: error.message || "Internal server error!",
      status: false,
    });
  }
};