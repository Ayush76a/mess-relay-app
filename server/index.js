import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
<<<<<<< HEAD

//importing routes
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

=======
import { register } from "./controllers/auth.js";
>>>>>>> 5b7af11f5ebae66947a90d64700df247a19369cf

import { verifyToken } from "./middleware/auth.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
<<<<<<< HEAD
//MiddleWares
app.use(express.json());  
app.use(express.urlencoded({extended:false}));

=======
app.use(express.json());
>>>>>>> 5b7af11f5ebae66947a90d64700df247a19369cf
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
app.use("/auth", authRoutes);

<<<<<<< HEAD
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
mongoose.connect("mongodb+srv://ayush760a:%23inlcude<plum>@cluster0.ybsjr37.mongodb.net/MessManager?retryWrites=true&w=majority")
.then(()=>{
    app.listen(PORT,  ()=>{
        console.log(`server running on port ${PORT}`);
    }) 
})
.catch((err)=> console.log(err));



// ROUTES 
app.get("/", (req,res)=>{
    res.send("This is HomePage");
})

app.get("/contact", (req,res)=>{
    res.send("This is Contact Us Page");
})

app.get("/admin", (req,res)=>{
    res.send("This is Admin Portal");
})

app.get("/user", (req,res)=>{
    res.send("This is User Portal");
})

=======
// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
    })
    .catch((error) => console.log(`${error} \ndid not connect`));
>>>>>>> 5b7af11f5ebae66947a90d64700df247a19369cf
