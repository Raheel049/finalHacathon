import Patient from '../models/patient.js';

export const addPatient = async (req, res) => {
    try {
        const { name, age, gender, phone, email, bloodGroup, address } = req.body;

        // 1. Basic Validation
        if (!name || !age || !gender || !phone) {
            return res.status(400).json({ 
                success: false, 
                message: "Please provide all required fields (Name, Age, Gender, Phone)." 
            });
        }

        // 2. Check if patient already exists by phone
        const existingPatient = await Patient.findOne({ phone });
        if (existingPatient) {
            return res.status(400).json({ 
                success: false, 
                message: "Patient with this phone number is already registered." 
            });
        }

        // 3. Create Patient
        const newPatient = new Patient({
            name,
            age,
            gender,
            phone,
            email,
            bloodGroup,
            address
        });

        await newPatient.save();

        res.status(201).json({
            success: true,
            message: "Patient registered successfully!",
            data: newPatient
        });

    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: err.message 
        });
    }
};