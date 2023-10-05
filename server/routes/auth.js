const router = require('express').Router()
const passport = require("passport")
const bcrypt = require("bcrypt")
const User  = require("../models/UserModel")


router.post("/register", async(req, res)=>{
    let {name, email, password } =  req.body
    password = bcrypt.hashSync(password, 10)
    const checkAlreadyExist = await User.findOne({email:email})
    if(checkAlreadyExist){
        return res.status(400).json({message:"user already registered with this email"})
    } 

    const user = new User({
            name: name,
            email: email,
            password: password,
        });
    await user.save();
    res.json({message:"user successfully registered"})
})

router.post("/login", passport.authenticate("local"), (req, res) => {
    // User is authenticated
    res.status(200).json({ message: "Login successful" });
  });



router.get("/check-authentication", (req, res) => {
    if (req.user) {
      return res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user
      });
    }
    return res.status(400).json({message:"please Login"})
  });


router.get("/logout", (req, res) => {
    req.logout(((err) => {
        if (err) {
            console.error(err);
        }
        return res.status(200).json({ message: "user logged out"})
    }
    ))
});
  

router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_DOMAIN}login` }), (req, res) => {
  // Redirect to your React app's frontend
  res.redirect(`${process.env.FRONTEND_DOMAIN}homepage`);
});

module.exports = router;