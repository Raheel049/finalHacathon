import { response } from "express";
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

export const fetchAllOwners = async (request, response) => {
  try {
    const allUsers = await hospitalOwnerModel.find()
    console.log("users", allUsers);
    
    response.status(200).json({
      message : "All Data found",
      data : allUsers,
      status : true
    })
  } catch (error) {
    response.status(500).json({
      message : error.message || "internal server error",
      status : false,
      data : null
    })
  }
}

export const getOwnerStats = async(request, response) => {
  try {
    const [totalOwners, active, inactive, blocked] = await Promise.all([
      hospitalOwnerModel.countDocuments(),
      hospitalOwnerModel.countDocuments({status : "Active"}),
      hospitalOwnerModel.countDocuments({status : "Inactive"}),
      hospitalOwnerModel.countDocuments({status : "Blocked"})
    ]) 

    const ownerStates = {
      totalOwners,
      active,
      inactive,
      blocked
    }

    console.log(totalOwners)
    response.status(200).json({
      message : "Total Owners Found Successfully!",
      status : true,
      data : ownerStates
    })
  } catch (error) {
    response.status(500).json({
      message : error.message || "Internal server error!",
      status : false,
      data : null
    })
  }
}

export const getOwnerData = async (request, response) => {
  try {

    const {id} = request.params

    const ownerData = await hospitalOwnerModel.findById(id)
    console.log(id,"id");
    response.status(200).json({
      message : "data fetch successfully!",
      status : true,
      data : ownerData
    })
  } catch (error) {
    response.status(500).json({
      message : "internal server error" || error.message,
      status : false,
    
    })
  }
}

  export const updateOwnerData = async (request, response) => {
    try {
      const {id} = request.params;
      const {ownerName, hospitalName, status, plane} = request.body

      if(!ownerName || !hospitalName || !status || !plane){
        response.status(400).json({
          message : "Required fields are missing!",
          status : false
        })
      }
      await hospitalOwnerModel.findByIdAndUpdate(id,{ownerName : ownerName, hospitalName: hospitalName, status: status, plane:plane})
      

      response.status(200).json({
        message : "Hospital owner data Updated successfully",
        status : true
      })
    } catch (error) {
      response.status(500).json({
        message : error.message || "Internal server error",
        status : false
      })
    }
  }

  export const deleteOwner = async(request, response) => {
    try {
      const {id} = request.params
      const getOwner = await hospitalOwnerModel.findByIdAndDelete(id)

      

      response.status(200).json({
        message : "User delete successfully!",
        status : true
      })
    } catch (error) {
      response.status(500).json({
        message : error.message || "Internal server error",
        status : false
      })
    }
  }