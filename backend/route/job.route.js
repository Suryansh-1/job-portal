import express from "express";
import {postjob,getAllJob,getJobById,getAdminJobs} from "../controllers/job.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js"
const router=express.Router();

router.route("/post").post(isAuthenticated,postjob);
router.route("/get").get(isAuthenticated,getAllJob);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getAdminjobs").get(isAuthenticated,getAdminJobs);

export default router;