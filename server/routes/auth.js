const router = require('express').Router()
const passport = require("passport")


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