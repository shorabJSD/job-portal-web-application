import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(402).json({
        message: "Oops!Job is is required.",
        success: false,
      });
    }

    //check user already applied to the job;
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(402).json({
        message: "Already applied to the job.Please try another job",
        success: false
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(402).json({
        message: "Oops! Job not found",
        success: false
      });
    }

    const newJobApplication = new Application({
      job: jobId,
      applicant: userId
    })

      job.applications.push(newJobApplication._id);
    await newJobApplication.save();

    return res.status(402).json({
      message: "Your application has been successfully submition",
      success: false,
      newJobApplication,
    });

  } catch (error) {
    console.log("Job Appling process has failed", error)
    return res.status(402).json({
      message: "Oops!appling Process has failed",
      success: false
    });
  }
}


//get applicants who applied job , that mean students;

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'company',
        options: { sort: { createdAt: -1 } },
      }
    });

    if (!application) {
      return res.status(400).json({
        message: "Oops! No found application",
        success: false
      });
    }
    return res.status(200).json({
      application,
      success: true
    });
  } catch (error) {
    console.log("Not found any applicants", error)
    return res.status(402).json({
      message: "Oops! No found any any applicats",
      success: false
    });
  }
}


//get applications who applied and adimn get all the applications

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1}},
      populate: {
        path: "applicant"
      }
    });

    
    if (!job) {
      return res.status(402).json({
        message: "Oops! Not found job",
        success: false
      });
    }

    return res.status(200).json({
      job,
      success: true
    });

  } catch (error) {
    console.log("Not found any applicants", error)
    return res.status(402).json({
      message: "Oops! Not found any applicants",
      success: false
    });
  }
}

// update status ;

export const updateStatus = async(req, res) =>{
  try {
    const {status} = req.body;
    const applicationId = req.params.id;
    if(!status){
      return res.status(400).json({
        message: "Status is required",
        success: false
      });
    }

    const application = await Application.findOneAndUpdate({_id: applicationId});
    if(!application){
      return res.status(400).json({
        message: "Application not found",
        success: false
      }); 
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
       application,
       message:"Status updated successfully",
      success: true
    });

  } catch (error) {
    console.log("Status update failed", error)
    return res.status(402).json({
      message: "Oops!Update failed",
      success: false
    });
  }
}


