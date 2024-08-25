import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js"
import userRoute from "./route/user.route.js"
import comapanyRoute from "./route/company.route.js"
import applicationRoute from "./route/application.route.js"
import jobRoute from "./route/job.route.js"
dotenv.config({})
const app = express();


app.get("/home",(req,res)=>{
    return res.status(200).json({msg:"Home page",success:true})
})
//middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));

const PORT =process.env.PORT || 3000;

//api's


app.use("/hello",(req,res)=>{
    res.send({message:"hello"})
})
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",comapanyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)




app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at port ${PORT}`);
});


export default app;