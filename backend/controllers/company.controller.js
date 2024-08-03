import { Company } from "../models/company.model.js";


//create company
export const registerCompany = async (req, res) => {
    try {
        const { CompanyName } = req.body;
        if (!CompanyName) {
            return res.status(500).json({
                message: "Company name is required",
                success: false,
            })
        }
        let company = await Company.findOne({ name: CompanyName });
        if (company) {
            return res.status(404).json({
                message: "Already exist.You can't register same company.",
                success: false,
            })
        }

        company = new Company({
            name: CompanyName,
            userId: req.id,
        });

        await company.save();
        return res.status(201).json({
            message: "Company created successfully",
            success: true,
            data: company
        })

    } catch (error) {
        console.error("Company registered failed.", error)
        return res.status(400).json({
            message: "Oops failed.Try again later",
            success: false,
        })
    }
}

//get all compnaies name by userId.
export const getAllCompany = async (req, res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(400).json({
                message: "Oops failed.Not found any company",
                success: false,
            })
        }

        return res.status(200).json({
            message: "Successfully get the compnay",
            success: true,
            companies
        })

    } catch (error) {
        console.error("Error ocuring while getting all company.", error)
        return res.status(500).json({
            message: "Oops failed.Try again later",
            success: false,
        })
    }
}

//get compnay name through userId;
export const getCompanyById = async (req, res) => {
    try {
        const compnayId = req.params.id;
        const compnay = await Company.findById(compnayId);
        if (!compnay) {
            return res.status(500).json({
                message: "Not found any company",
                success: false,
            })
        }
        return res.status(200).json({
            compnay,
            success: true,
            message: "successful !"
        })
    } catch (error) {
        console.error("Error ocuring while getting Company by id.", error)
        return res.status(500).json({
            message: "Oops failed.Try again later",
            success: false,
        })
    }
}


//update company;
export const updateCompany = async(req, res) =>{
     try {
        const {name, description, website, location} = req.body;
        const file = req.file; //cloudinary here;
        const updateDate ={name, description, website, location};
        const company = await Company.findByIdAndUpdate(req.params.id, updateDate, {new:true});
        if(!company){
            return res.status(500).json({
                message: "Company not found",
                success: false,
            })
        }

        return res.status(200).json({
            message: "Company information has been successfully updated",
            success: true,
            company
        });

     } catch (error) {
        console.error("Error ocuring while upgrading company", error)
        return res.status(500).json({
            message: "Oops failed to update company",
            success: false,
        })
     }
}