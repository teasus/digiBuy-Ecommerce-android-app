//We'll use this to hash the password that is received from the users.
const bcrypt = require("bcrypt");

//this is used to make http request
const express = require("express");
//must use this or else undef
const bodyParser = require('body-parser')
const app = express();
const jwt = require("jsonwebtoken");

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// require database connection 
const dbConnect = require("./db/dbConnect");

const User = require("./db/userModel");

// execute database connection 
dbConnect();

// user registration ;
app.post("/register", (request, response) => {
    // the password is hashed here
    bcrypt.hash(request.body.password, 10)
        .then((hashedPassword) => {
            //new use object createed
            const user = new User({
                email: request.body.email,
                password: hashedPassword,
            });
            //saved into db
            user
                .save()
                .then((result) => {
                    response.status(201).send({
                        message: "User Created Successfully",
                        result,
                        password: hashedPassword,
                        nonHashed: request.body.password
                    });
                })
                //error catchign for db saving
                .catch((error) => {
                    response.status(500).send({
                        message: "Error creating user",
                        error,
                    });
                })



        })
        // catch error if the password hash isn't successful
        .catch((e) => {
            response.status(500).send({
                message: "Password was not hashed successfully",
                e,
            });
        });
});

//user login :
app.post("/login", async (request, response) => {
    //pass check
    console.log("loginn ", request.body);
    //finiding user in db
    let user = await User.findOne({ email: request.body.email });

    console.log("loginn user ", user);
    //comparing password
    if (!user) {
        return response.status(404).send({
            message: "User not found",
        });
    }

    const validPassword = await bcrypt.compare(request.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Email or Password.');


    //If the password matches, then create a random token with the 
    //jwt.sign() function. 
    //It takes 3 parameters: jwt.sign(payload, secretOrPrivateKey, [options, callback])
    const token = jwt.sign({
        userId: user._id,
        userEmail: user.email,
        expire: Date.now() + (1000 * 60 * 60) //1 hour
    }, "RANDOM-TOKEN"
    );

    return response.status(201).send({
        message: "login successfull",
        email: user.email,
        token,
    });



});


module.exports = app;