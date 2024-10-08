import {Job} from "../models/job.model.js"
//Admin will post the job on job portal
export const postjob=async(req,res)=>{
    try {
        const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
        const userId=req._id;
        if(!title || !description ||    
            !requirements || !salary|| !location|| !jobType  || !experience || !position || !companyId){
                return res.status(400).json({
                    msg:"Something is missing.",
                    success:false
                })
            }
            const job=await Job.create({
                title,
                description,
                requirements:requirements.split(","),
                salary:Number(salary),
                location,
                jobType,
                experienceLevel:experience,
                position,
                company:companyId,
                created_by:userId

            })
            return res.status(201).json({msg:"New Job Created successfully",
            job,
            success:true
            })
    } catch (error) {
        console.log(error);
    }
}
//it's for the job seeker to get all jobs
export const getAllJob=async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        console.log(res)
        console.log(req)
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        console.log(jobs)
        if (!jobs) {
            return res.status(404).json({
                msg: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//it's for the job seeker to get by job id
export const getJobById=async (req,res)=>{
    try {
        const jobId=req.params.id;
        const job= await Job.findById(jobId).populate({
            path:'applications'
        });
        if(!job){
            return res.status(404).json({
                msg:"Job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//jobs created by the admin or recruiter
export const getAdminJobs= async(req,res)=>{
    try {
       
        const adminId = req._id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        
         if (!jobs) {
            return res.status(404).json({
                msg: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}