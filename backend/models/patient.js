import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Patient name is required"], 
        trim: true 
    },
    age: { 
        type: Number, 
        required: [true, "Age is required"] 
    },
    gender: { 
        type: String, 
        required: true, 
        enum: ['Male', 'Female', 'Other'] 
    },
    phone: { 
        type: String, 
        required: [true, "Contact number is required"] 
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
    },
    bloodGroup: { 
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    address: { type: String },
    registeredBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' // Receptionist ID jis ne register kiya
    },
    createdAt: { type: Date, default: Date.now }
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;