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
            nameame: name,
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



router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        cookies: req.cookies
      });
    }
  });

  router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.FRONTEND_DOMAIN+"login");
  });
  

router.get("/login/failed", (req, res) => {
    res.status(401).json({
      success: false,
      message: "failure",
    });
  });

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login/failed' }), (req, res) => {
  // Redirect to your React app's frontend
  res.redirect(process.env.FRONTEND_DOMAIN);
});

module.exports = router;