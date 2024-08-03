import { Job } from "../models/job.model.js";

// for admin 
export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body; // Corrected companyId
    const userId = req.id;

    if (!title || !description || !requirements || !salary || !experience || !location || !jobType || !position || !companyId) {
      return res.status(506).json({
        message: "Missing something.",
        success: false,
      });
    }

    const newPost = new Job({
      title,
      description,
      requirements: requirements.split(',').map(req => req.trim()), // Split and trim the requirements
      salary: parseFloat(salary), // Convert salary to a number
      experienceLevel: experience,
      location,
      jobType,
      position,
      company: companyId,
      created_by: userId,  // Add the created_by field
    });

    await newPost.save();
    return res.status(200).json({
      message: "Job created successfully!",
      success: true,
      newPost
    });

  } catch (error) {
    console.log("Job post failed.", error);
    return res.status(502).json({
      message: "Oops! Failed job post",
      success: false
    });
  }
}

// get all jobs for students;
export const getAllJobs = async(req, res) =>{
     try {
      const keyword = req.query.keyword || "";
      const query = {
        $or:[
          {title: {$regex:keyword, $options:'i'}},
          {description: {$regex:keyword, $options:'i'}},
        ]
      }
    
    const jobs = await Job.find(query).populate({
      path:'company'
    })
    if(jobs.length === 0){
      return res.status(402).json({
        message: "Oops! Not found any jobs",
        success: false
      });
    }

    return res.status(200).json({
      success: true,
      jobs
    });


     } catch (error) {
      console.log("Not match any jobs", error)
      return res.status(402).json({
        message: "Oops! Not found jobs",
        success: false
      });
     }
}


//get all created jobs by admin;
export const getAdminJobsPost = async(req, res) =>{
     try {

       const adminId = req.id;
       const jobs = await Job.find({created_by: adminId})
       if(!jobs){
        return res.status(402).json({
          message: "Oops! Not found jobs",
          success: false
        });
       }

       return res.status(202).json({
        jobs,
        success: true
      });


     } catch (error) {
      console.log("Error ocuring :", error);
      return res.status(402).json({
        message: "Oops! failed",
        success: false
      });
     }
}


//get job by id for students
export const getJobById = async(req, res) =>{
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if(!job){
      return res.status(402).json({
        message: "Oops! failed update",
        success: true
      });
    }
    return res.status(200).json({
      job,
      success: true
    });

  } catch (error) {
    console.log("Error ocuring during update  :", error);
      return res.status(402).json({
        message: "Oops! failed update",
        success: false
      });
  }
}