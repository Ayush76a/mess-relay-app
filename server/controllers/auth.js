import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Token from "../models/tokenModel.js";
// crypto for token of forgot password controller : A bult in package in Express
import crypto from "crypto"
import sendEmail from "../utils/sendEmail.js";


/* REGISTER */
export const register = async (req, res) => {
    const { firstName, lastName, email, password, role, hostel } = req.body;
    if(!firstName || !email || !password || !role || !hostel){
        return res.send("Please, Fill all the required Fields !");
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            role,
            hostel,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user)
            return res.status(400).json({ msg: "User does not exist. " });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials. " });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Forgot Password along with its Sub Part Reset Password
// Forgot Pass controller
export const forgotPassword= async(req, res) => { 
    // take the email of user 
    const {email} = req.body;

    const user= await User.findOne({email});
    if(!user){
        res.status(404);
        throw new Error("User do not exist");
    }
    
    // delete if mutiple token for an email exist in database
    let token = await Token.findOne({userId: user._id});
    if(token){
        await token.deleteOne();
    }
     
    // token creation with crypto( a built in package in express )
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id
    console.log("Copy the Token !! and Use as Params :");
    console.log(resetToken);
    
    // Hash the token before saving to Db
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    
    // Save token to Db
    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(), 
        expiresAt: Date.now() + 5 *(60 * 1000)       // token expires in 5 minutes
    }).save();



    // Construct Reset Url
    // reset url = frontened Url + token
    // frontend Url in .env file
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    console.log(process.env.FRONTEND_URL);

    // ResetEmail message content
    const message= `
       <h2>Hello ✋  ${user.firstName}</h2>
       <p>Please use the link below to reset your password</p>
       <p>This reset link is valid for 5 minutes.</p>

       <a href=${resetUrl} clicktracking=off> ${resetUrl} </a>

       <p>Regards...</p>
       <p>Team Ye-Shaam-Mastaani</p>
    `;

     const subject = "Password Reset Request"
     const send_to = user.email
     const sent_from = process.env.EMAIL_USER
     
     try{
        await sendEmail(subject, message, send_to, sent_from)
        res.status(200).json({suceess:true, message:"Reset Email Sent"})
     }
     catch(err){
        console.log(err); 
        res.status(500);
        throw new Error("Email not Sent, Please try again")
     }
};


// Reset Password Controller
export   const resetPassword = async(req,res) => {
        // we will get params from the url
        // and the password from the body 

        const {newPassword, confirmPassword} = req.body
        const {resetToken} = req.params
        
        if(confirmPassword !== newPassword){
            res.send("ConfirmPassword not Matches with newPassword !!!");
        }
        else{
        // hashed the obtained  
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        
        // find the user data using the token
        const userToken = await Token.findOne({
           token: hashedToken,
           expiresAt: {$gt : Date.now()}
        })

        if(!userToken){
            res.status(404);
            throw new Error("Invalid or Expired Token");
        }
        // Find the user if the token is founded in database from the token's userId 
        const user = await User.findOne({_id: userToken.userId})

        // hash the password before saving to database using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(newPassword, salt);
        // update the password
        user.password = hashedPass
        // then in order to updates go to the database => Use .save()
        await user.save();
        res.status(200).send("Password reset Successful, Please Login");
      }
    }