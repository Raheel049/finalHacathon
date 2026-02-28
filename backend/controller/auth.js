import userModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import otpModel from "../models/otpSchema.js";
import jwt from "jsonwebtoken";

export const signUpHandler = async (request, response) => {
  try {
    const { name, phoneNumber, email, password } = request.body;

    if (!name || !phoneNumber || !email || !password) {
      return request.json({
        message: "Required fields are missing!",
        data: null,
        status: false,
      });
    }

    console.log("check required fields");

    const user = await userModel.findOne({ email });

    if (user) {
      return response.json({
        message: "Email already Exists",
        status: false,
      });
    }
    console.log("email verifaction");

    const hashPassword = await bcrypt.hash(password, 10);

    console.log("hashPass", hashPassword);

    const userObj = {
      ...request.body,
      password: hashPassword,
    };

    console.log(userObj);

    await userModel.create(userObj);

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smpt.gmail.com",
      port: "465",
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    const OTP = uuidv4().slice(0, 6);
    console.log("OTP", OTP);

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP is",
      html: `
    <div style="font-family: Arial; background:#f4f4f4; padding:20px;">
      <div style="max-width:400px; margin:auto; background:#fff; padding:20px; border-radius:8px; text-align:center;">
        <h2 style="color:#333;">Verify Your Email</h2>
        <p>Your OTP code is:</p>
        <a 
          style="
            display:inline-block;
            padding:12px 24px;
            background:#4CAF50;
            color:#fff;
            text-decoration:none;
            font-size:18px;
            border-radius:6px;
            margin:10px 0;
          "
        >
          ${OTP}
        </a>
        <p style="font-size:12px;color:#777;">This code will expire in 5 minutes.</p>
      </div>
    </div>
  `,
    });

    const otpObj = {
      email,
      otp: OTP,
    };

    await otpModel.create(otpObj);

    const reqData = {
      name,
      phoneNumber,
      email,
    };

    response.status(200).json({
      message: "Sign Up successfully",
      status: true,
      data: reqData,
    });
  } catch (error) {
    return response.json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

export const loginHandler = async (request, response) => {
  try {
    console.log(request.body);
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: "Required fields are missing",
        data: null,
        status: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return response.status(401).json({
        message: "Invalid email or password!",
        data: null,
        status: false,
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return response.status(401).json({
        message: "Invalid email or password!",
        data: null,
        status: false,
      });
    }

    console.log(comparePassword);

    const privateKey = process.env.PRIVATE_KEY;

    const token = jwt.sign({ id: user._id }, privateKey, {
      expiresIn: "24h",
    });

    console.log(token);

    response.status(200).json({
      message: "Successfully Login",
      token,
      data: email,
      status: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message,
      status: false,
      data: null,
    });
  }
};

export const verificationHandler = async (request, response) => {
  try {
    const { email, otp } = request.body;

    if (!email || !otp) {
      return response.status(400).json({
        message: "Required fields are missing",
        data: null,
        status: false,
      });
    }

    const isExists = await otpModel
      .findOne({ email, isUsed: false })
      .sort({ createdAt: -1 });
    console.log("otp", isExists);

    if (!isExists) {
      return response.status(401).json({
        message: "OTP not exists",
        data: null,
        status: true,
      });
    }

    if (isExists.otp !== otp) {
      return response.status(401).json({
        message: "You have entered wrong OTP",
        data: null,
        status: true,
      });
    }

    await otpModel.findByIdAndUpdate(isExists._id, { isUsed: true });
    await userModel.findOneAndUpdate({ email: email }, { isVerified: true });

    response.status(200).json({
      message: "Verified Successfully",
      data: email,
      status: true,
    });
  } catch (error) {
    return response.json({
      message: error.message || "Some thing went wrong!",
      data: null,
      status: false,
    });
  }
};

export const resetOtp = async (request, response) => {
  try {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({
        message: "Required fields are missing",
        data: null,
        status: false,
      });
    }

    const transporter = new nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS,
      },
    });

    const OTP = uuidv4().slice(0, 6);

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Your new OTP",
      html: `
            <div style="font-family: Arial; background:#f4f4f4; padding:20px;">
              <div style="max-width:400px; margin:auto; background:#fff; padding:20px; border-radius:8px; text-align:center;">
                <h2 style="color:#333;">Verify Your Email</h2>
                <p>Your OTP code is:</p>
                <a 
                  style="
                    display:inline-block;
                    padding:12px 24px;
                    background:#4CAF50;
                    color:#fff;
                    text-decoration:none;
                    font-size:18px;
                    border-radius:6px;
                    margin:10px 0;
                  "
                >
                  ${OTP}
                </a>
                <p style="font-size:12px;color:#777;">This code will expire in 5 minutes.</p>
              </div>
            </div>
          `,
    });

    const otpObj = {
      email,
      otp: OTP,
    };

    await otpModel.create(otpObj);

    response.status(200).json({
      message: "OTP reset successfully",
      data: email,
      status: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || "some thing went wrong",
      data: null,
      status: false,
    });
  }
};

export const forgotPassword = async (request, response) => {
  try {
    const { email } = request.body;

    if (!email) {
      return response.status(400).json({
        message: "Required fields are missing",
        status: false,
        data: null,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return response.status(401).json({
        message: "Email does not exists",
        status: false,
        data: null,
      });
    }

    const token = jwt.sign({id : user._id, email : email}, process.env.PRIVATE_KEY, { expiresIn : "15m"});
    console.log("token", token);

    const FE_URL = `http://${process.env.FE_BASE_URL}changePassword?q=${token}`

    const transporter = new nodemailer.createTransport({
        service : "Gmail",
        host : "smtp.gmail.com",
        port : 465,
        secure : true,
        auth : {
            user : process.env.EMAIL,
            pass : process.env.APP_PASS
        }
    })

    await transporter.sendMail({
        from : process.env.EMAIL,
        to : email,
        subject : "Link for Forgot Password",
        text : `Your Link is ${FE_URL}`
    });

    response.status(200).json({
        message : "Link send On your Email For change Password",
        status : true,
    });


  } catch (error) {
    return response.status(500).json({
        message: error.message || "some thing went wrong",
        status: false,
        data: null,
      });
  }
};

export const changePassword = async (request, response) => {
    try {
        const {password, token} = request.body

    if(!password || !token){
       return response.status(400).json({
            message : "Required fields are missing",
            data : null,
            status : false
            
        });
    }

    const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY);

        if(!verifyToken){
            return response.status(401).json({
                message : "Ivalid User",
                data : null,
                status : false
                
            });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await userModel.findByIdAndUpdate(verifyToken.id, {password : hashPassword});

        response.status(200).json({
            message : "Your password has changed",
            status : true

        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || "Some thing went wrong",
            data : null,
            status : false
            
        })
    }
}