import {Application} from "../models/application.model.js"
import { Job } from "../models/job.model.js";

export const applyJob= async(req,res)=>{
    try {
        const userId=req._id;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(400).json({
                msg:"Job Id is required.",
                success:false
            })
        }
        //check if the user has already applied for the same job previously
        const existingApplication=await Application.findOne({job:jobId,applicant:userId})
        if(existingApplication){
            return res.status(400).json({
                msg:"You had already applied for this job.",
                success:false
            })
        }
        //check if the jobs exists
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                msg:"Job not found.",
                success:false
            })
        }

        //create a new application

        const newApplication=await Application.create({
            job:jobId,
            applicant:userId,
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(200).json({
            msg:"Job applied successfully",
            success:true
        })
        } catch (error) {
        console.log(error);
    }
}

export const getAppliedJobs=async (req,res)=>{
    try {
        const userId=req._id;
        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        })
        if(!application){
            return res.status(404).json({
                msg:"Application not found.",
                success:false
            })
        }
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//Admin will see how many applications are submited by the students
export const getApplicants=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job =await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                msg:"Job not found.",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const applicantId=req.params.id;
        if(!status){
            return res.status(400).json({
                msg:"Status is required",
                success:false
            })
        }
        
        //find the application by application id
        const application=await Application.findOne({_id:applicantId});
        if(!application){
            return res.status(404).json({
                msg:"Application not found.",
                success:false
            })
        }
        application.status=status.toLowerCase();
        await application.save();
        return res.status(200).json({
            msg:"Status updated successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}