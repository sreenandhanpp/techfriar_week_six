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
const aadharValidator = require('aadhaar-validator');
const axios = require('axios');



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

    /* checking if there is any validation error,
        -->sending error response
        -->else do signup 
    */
    const err = validationResult(req);
    if (!err.isEmpty()) {
        let errors = err.array()
        // let error = JSON.stringify(errors);
        res.status(401).json({ error: errors });
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
    resendEmailOtp(req.body).then(resp => {
        res.json({ message: resp }).status(200);
    }).catch(err => {
        res.status(400).json({ message: err });
    })
});

//resending phone otp route
app.post('/resend-phone-otp', (req, res) => {
    resendPhoneOtp(req.body).then(resp => {
        res.json({ message: resp }).status(200);
    }).catch(err => {
        res.status(400).json({ message: err });
    })
});

//Aadhar verification 

//get adhaar details



app.get('/getAadhar', async (req, res) => {





})


app.post('/validate-aadhar', async (req, res) => {
    const { aadhar } = req.body;
    console.log(aadhar);
    const encodedParams = new URLSearchParams();
    encodedParams.set('txn_id', '17c6fa41-778f-49c1-a80a-cfaf7fae2fb8');
    encodedParams.set('consent', 'Y');
    encodedParams.set('uidnumber', aadhar);
    encodedParams.set('clientid', '222');
    encodedParams.set('method', 'uidvalidatev2');
    const options = {
        method: 'POST',
        url: 'https://verifyaadhaarnumber.p.rapidapi.com/Uidverifywebsvcv1/VerifyAadhaarNumber',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '3517e41e7dmsh05ec40135f0c319p199618jsn968586f74100',
            'X-RapidAPI-Host': 'verifyaadhaarnumber.p.rapidapi.com'
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        if (response.data.Succeeded.Verify_status === 'Uid is Valid') {
            res.json({ message: "Aadhar number verified" }).status(200);
        } else {
            res.status(400).json({ message: "Invalid Aadhar number" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid Aadhar number" });

    }

});

//get user details

app.post('/get-user-details', (req, res) => {
    helpers.getUserDetails(req.body).then(resp => {
        res.json(resp).status(200);
    }).catch(err => {
        res.status(400).json(err);
    })
})


//clear database
app.get('/clear', signupValidator, (req, res) => {
    helpers.clearDatabase().then(resp => {
        res.status(200).json(true);
    }).catch(err => {
        res.status(400).json(false);
    })
})
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
