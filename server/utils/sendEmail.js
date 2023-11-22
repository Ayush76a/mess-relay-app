import nodemailer from "nodemailer"

// send Email will have arguments like "subjectOfEmail", "messageInMail", "Sender", "reciever", "SpecailReplyAddress" 
const sendEmail = async(subject, message, sent_to, sent_from, reply_to) => {
   
    // Transporter : a variable which will transport the mail
    // and it will do the authentication, request form the mail host
    const trasporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST ,
        port: 465,
        secure:true,
        auth: {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS,  
        },

        tls:{
            rejectUnauthorized : false
        }
    })
    
    // options are the info about than .sendMail function needs
    const options = {
        from: sent_from,
        to: sent_to,
        replyTo: reply_to,
        subject: subject,
        html: message,
    }

    // .sendMail() is the used to send the mail at last
    trasporter.sendMail(options, function(err, info){
        if(err){
            console.log(err);
        }
        else{
            console.log(info);
        }
    })
}

export default sendEmail