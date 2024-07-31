import jwt from "jsonwebtoken";

const isAuthentication = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated.",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SCRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.log("Middleware failed to authenticate user", error);
        return res.status(401).json({
            message: "Oops! User not found",
            success: false,
        });
    }
};

export default isAuthentication;
