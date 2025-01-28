const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // Check if the request header has authorization
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: "Token not found" });

    // Extract the JWT token
    const token = authorization.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;
        next();
    } catch (err) {  // ✅ Fixed missing error parameter
        console.error(err);
        return res.status(401).json({ error: "Invalid token" });
    }
};

// Function to generate JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30000' }); // ✅ Improved format
};

module.exports = { jwtAuthMiddleware, generateToken };
