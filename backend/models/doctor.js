import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Name is mandatory"], 
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, "Email is mandatory"], 
        unique: true, 
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phoneNumber: { 
        type: String, 
        required: [true, "Phone number is mandatory"] 
    },
    specialization: { 
        type: String, 
        required: [true, "Specialty is mandatory"] 
    },
    gender: { 
        type: String, 
        required: true, 
        enum: ['Male', 'Female', 'Other'] 
    },
    experience: { 
        type: Number, 
        default: 0 
    },
    status: { 
        type: String, 
        enum: ['On Duty', 'On Leave'], 
        default: 'On Duty' 
    },
    image: { 
        type: String, 
        default: 'https://via.placeholder.com/150' 
    },
    createdAt: { type: Date, default: Date.now }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;