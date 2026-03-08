import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Token verify karein
            const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

            // terminal mein check karo kya print ho raha hai
            console.log("Decoded Token:", decoded); 

            // YAHAN MASLA HAI: req.user ko poora object assign karein
            // Agar login mein '_id' use kiya tha to yahan '_id' likhen
            req.user = { id: decoded.id || decoded._id }; 

            next(); 
        } catch (error) {
            console.error("Token Error:", error.message);
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }
};