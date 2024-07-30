import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      requirements: {
        type: String,
      },
      salary: {
        type: Number,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      jobType:{
        type: String,
        required: true
      },
      position:{
        type: String,
        required: true
      },
      comapny:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required:true,
      },
      created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
      },
      applications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
      }]
});

export const Job = mongoose.model("Job", JobSchema);