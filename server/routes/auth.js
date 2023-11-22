import express from "express";
import { forgotPassword, login, register, resetPassword } from "../controllers/auth.js";

const router = express.Router();

// HomePage
router.get("/", (req,res)=>{
    res.send("This is HomePage");
})

//Contact Us Page
router.get("/contact", (req,res)=>{
    res.send("This is Contact Us Page");
})

//Register
router.post("/register", register);

//LOGIN
router.post("/login", login);

//ForgetPassword -> a post request(since on clicking forget password -> we need to send the users email)
router.post("/forgotpassword", forgotPassword);

//Reset Password -> it will have the Token in its Url
router.put("/resetpassword/:resetToken", resetPassword)

export default router;
