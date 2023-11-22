import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";


//IMORTING ROUTES
// Authentication routes
import authRoutes from "./routes/auth.js";
//menu routes
import AdminMenuRoutes from "./routes/Admin/menuRoutes.js"
import StundentMenuRoutes from "./routes/Student/MenuRoutes.js";
// complaint box routes
import StundentComplaintRoutes from "./routes/Student/ComplaintRoutes.js";
import AdminComplaintRoutes from "./routes/Admin/complaintRoutes.js";
// notice board routes
import AdminNoticeRoutes from "./routes/Admin/NoticeRoutes.js";
import StudentNoticeRoutes from "./routes/Student/NoticeRoutes.js";
// transaction routes
import AdminTransRoutes from "./routes/Admin/transRoutes.js";


import { verifyToken } from "./middleware/auth.js";
import { register } from "./controllers/auth.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
//MiddleWares
app.use(express.json());  
app.use(express.urlencoded({extended:false}));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

//Routes with files
app.post("/auth/register", upload.single("picture"), register);

/* Routes */
app.use(authRoutes);

//menu
app.use(AdminMenuRoutes); 
app.use(StundentMenuRoutes);    
//complaint
app.use(StundentComplaintRoutes);
app.use(AdminComplaintRoutes);
//notice
app.use(AdminNoticeRoutes);
app.use(StudentNoticeRoutes);
//transaction
app.use(AdminTransRoutes);



// MONGOOSE SETUP (firstly connect the database then fire the server)
const PORT = process.env.PORT || 6001;
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,  ()=>{
        console.log(`server running on port ${PORT}`);
    }) 
})
.catch((err)=> console.log(err));


