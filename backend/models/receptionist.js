import mongoose from 'mongoose';

const receptionistSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        lowercase: true 
    },
    password: { type: String, required: [true, "Password is required"] },
    phone: { type: String, required: true },
    shift: { type: String, enum: ['Morning', 'Evening', 'Night'], default: 'Morning' },
    role: { type: String, default: 'receptionist' }, // Role identification
    createdAt: { type: Date, default: Date.now }
});

const Receptionist = mongoose.model('Receptionist', receptionistSchema);
export default Receptionist;