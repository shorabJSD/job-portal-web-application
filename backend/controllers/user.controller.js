import bcript from 'bcryptjs';
import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';


// Registration
export const Register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(405).json({
                success: false,
                message: "Please! Provide your info below inputs",
            })
        }

        //check if user already exist;
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User already exist",
                success: false
            })
        }

        // Generate hashed password;
        const hashedPassword = await bcript.hash(password, 10)
        //create new users;
        const newUser = new User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role
        });

        await newUser.save();
        console.log(newUser)

        // success message;
        if (newUser.success) {
            return res.status(201).json({
                message: "Account has been creating successfully",
                success: true,
            })
        }

    } catch (error) {
        return res.status(503).json({
            success: false,
            message: "Error occuring somewhere"
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
                message: "Email or Password invalid.",
                success: false
            })
        }
        //check if password incorrect;
        const isCorrectPassword = await bcript.compare(password, user.password);
        if (!isCorrectPassword) {
            return res.status(400).json({
                message: "Email or Password invalid.",
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
                message: `Welcome back ${fullname}`,
                success: true,
                data: user,
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
export const Logout = (req, res) =>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logout has successfully",
            success: true,
        })
    } catch (error) {
        console.error("Error occuring logout", error)
        return res.status(500).json({
            message:"Somewhere occuring error,please check!",
            success: false,
        })
    }
}

//upgrading profile;
export const udateProfile =async (req, res) =>{
     try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file =req.file;
        if (!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(405).json({
                success: false,
                message: "Oops! Missed filling out some fields.Please complete all required inputs.",
            })
        }
        
        const userId = req.id; // comes from middleware;
        const user = await User.findById(userId);
        const isSkillArry = skills.split(",")
        if(!user){
            return res.status(401).json({
                message: "Oops! User not found.",
                success: true,
                user
            });
        }
        //Upgrade user data;
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = isSkillArry;
        await user.save();

         user = {
            _id:user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
         }

        return res.status(200).json({
            message: "Your profile has been successfully updated",
            success: true,
            user
        });

     } catch (error) {
        console.log("Error occuring during upgrading your profile", error)
        return res.status(500).json({
            message:"Update failed. Please try again later or contact support if the issue persists",
            success: false,
        })
     }
}