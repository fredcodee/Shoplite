const router = require('express').Router()
const errorHandler = require('../middlewares/errorHandler')
const userService  = require('../services/userServices')
const decode = require("jwt-decode")



router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    //check if user is already registered
    const registered = await userService.checkIfUserIsRegistered(email);
    if (registered) {
      return res.status(401).json({ message: 'This email is already registered' });
    }
    await userService.addUserToDb(name, email, password);
    return res.json({ message: 'user is registered successfully' });
  } catch (error) {
    errorHandler.errorHandler(error, res)
  }
})

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userService.findAndVerifyUserCredentials(email, password);
    if (user) {
      const token = await userService.generateToken(user);
      return res.json({ request: "user details are valid", token: token })
    } else {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    errorHandler.errorHandler(error, res)
  }
});

//google auth handler
router.post('/google-auth', async(req,res)=>{
  try {
    const googleToken = req.body.token
    const decoded = decode(googleToken)
    const userAuth = await userService.googleAuth(decoded.name, decoded.email, decoded.sub)
    const token =  await userService.generateToken(userAuth)
    return res.json({ request: "user details are valid", token: token })
  } catch (error) {
    errorHandler.errorHandler(error, res)
  }
})

module.exports = router;