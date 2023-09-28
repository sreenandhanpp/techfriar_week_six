//importing modules
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./MongoDb/connect.js');
const cors = require('cors');
const helpers = require('./helpers/index.js');
const { resendEmailOtp, resendPhoneOtp } = require('./helpers/resendOtp.js');
const signupValidator = require('./middlewares/signupValidator.js');
const { validationResult } = require('express-validator');
const phoneValidator = require('./middlewares/phoneValidator.js');
const aadharValidator = require('./middlewares/aadharValidator.js');


//compiling .env file
dotenv.config();


//taking the values from .env file
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

//creating the server from express library
const app = express();

//encoding the url to make the data passed through it to a object 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//creating user route


app.post('/signup', signupValidator, (req, res) => {

    /*doSignup function in helpers take body of the request as
    parameter and save the user data in the data base*/

    console.log(req.body);
    /* checking if there is any validation error,
        -->sending error response
        -->else do signup 
    */
    const err = validationResult(req);
    if (!err.isEmpty()) {
        let errors = err.array()
        let error = JSON.stringify(errors);
        res.status(401).json({ error });
    } else {
        helpers.doSignup(req.body).then(resp => {
            const data = JSON.stringify(resp);
            res.status(200).json(data);
        }).catch(err => {
            res.status(401).json(err);
        });
    }

});

//send email otp
app.post('/send-email-otp', (req, res) => {
    /*
    sendOtpVerificationEmail function takes body of the req as
    parameter and generate otp then save the user id and hashed otp to database
    and returning appropriate messages
    */
    helpers.sendOtpVerificationEmail(req.body).then(resp => {
        res.status(200).json({ message: resp });
    }).catch(err => {
        res.status(401).json({ message: err })
    })
});

//verify email otp
app.post('/verify-email-otp', (req, res) => {
    /*
    takes body of the req as parameter then if the credentials matches response with
    appropriate message,if not matches do the same 
    */
    helpers.VerifyEmailOtp(req.body).then(resp => {
        res.status(200).json({ message: resp });
    }).catch(err => {
        res.status(401).json({ message: err })
    })
});

//sending phone otp
app.post('/send-phone-otp', (req, res) => {
    /*
     sendPhoneOtpVerification function takes body of the req as
     parameter and generate otp then save the user id and hashed otp to database
     and returning appropriate messages
    */
    helpers.sendPhoneOtpVerification(req.body).then(resp => {
        res.status(200).json({ message: resp });
    }).catch(err => {
        res.status(401).json({ message: err })
    })
});

//verifing phone otp

app.post('/verify-phone-otp', (req, res) => {
    /*
    takes body of the req as parameter then if the credentials matches response with
    appropriate message,if not matches do the same 
    */
    helpers.VerifyPhoneOtp(req.body).then(resp => {
        res.status(200).json({ message: resp });
    }).catch(err => {
        res.status(401).json({ message: err })
    })
});


//resend otp

//resending email otp route
app.post('/resend-email-otp', (req, res) => {
    console.log(req.body)
    resendEmailOtp(req.body).then(resp => {
        res.json({ message: resp }).status(200);
    }).catch(err => {
        res.status(400).json({ message: err });
    })
});

//resending phone otp route
app.post('/resend-phone-otp', (req, res) => {
    console.log(req.body)
    resendPhoneOtp(req.body).then(resp => {
        res.json({ message: resp }).status(200);
    }).catch(err => {
        res.status(400).json({ message: err });
    })
});

//Aadhar verification 

app.post('/aadhar', (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json({ error: err.array() });
    } else {
        res.status(200).json({ message: "Verified Successfully" });
    }
});

//function to start the server
const StartServer = (MONGODB_URL) => {

    //passing mongoDB url to database connecting function
    connectDB(MONGODB_URL);
    //make the server to listen the port  
    app.listen(PORT, () => {
        console.log(`Server started ${PORT}`)
    });
};


StartServer(MONGODB_URL);
