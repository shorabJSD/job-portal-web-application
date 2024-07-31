import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


// Registration
export const Register = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(405).json({
                success: false,
                message: "Please! Provide your info below inputs",
            })
        }

        //check if user already exist;
        const user = await User.findOne({ email }).session(session);
        if (user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "User already exist",
                success: false
            })
        }

        // Generate hashed password;
        const hashedPassword = await bcrypt.hash(password, 10)
        //create new users;
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role
        });

        await newUser.save({ session });
        await session.commitTransaction();
        session.endSession();

        // success message;
        return res.status(201).json({
            message: "Account has created successfully",
            success: true,
        })

    } catch (error) {
        // Abort the transaction in case of an error
        await session.abortTransaction();
        session.endSession();
        return res.status(503).json({
            success: false,
            message: "Oops! User registration failed."
        })
    }
}

//login
export const Login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(405).json({
                success: false,
                message: "Please! Provide your info below inputs",
            })
        }
        // find user;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Credentials are invalid",
                success: false
            })
        }
        //check if password incorrect;
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({
                message: "Credentials are invalid",
                success: false
            })
        }

        //check if role incorrect;
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        }

        // generate jwt token and store in cookie if login success;
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SCRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }



        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome ${user.fullname}`,
            success: true,
            user,
        })


    } catch (error) {
        console.log("login failed", error)
        return res.status(400).json({
            message: "Failed login",
            success: false,
        })
    }
}

//logout;
export const Logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout has successfully",
            success: true,
        })
    } catch (error) {
        console.error("Error occuring logout", error)
        return res.status(500).json({
            message: "Somewhere occuring error,please check!",
            success: false,
        })
    }
}

//upgrading profile;
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file; // Assuming you handle file uploads elsewhere

        const userId = req.id; // Comes from middleware
        let user = await User.findById(userId);
        
        if (!user) {
            return res.status(401).json({
                message: "Oops! User not found.",
                success: false, // Should be false in case of error
            });
        }

        // Convert skills string to array if provided
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",").map(skill => skill.trim());
        }

        // Update user data
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // If there's a file, handle the file upload (assuming multer middleware or similar)
        if (file) {
            user.profile.avatar = file.path; // Save file path to user's profile
        }

        await user.save();

        // Construct the updated user response
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "Profile has been successfully updated",
            success: true,
            user: updatedUser,
        });

    } catch (error) {
        console.log("Error occurring during updating your profile", error);
        return res.status(500).json({
            message: "Update failed. Please try again later or contact support if the issue persists",
            success: false,
        });
    }
};
