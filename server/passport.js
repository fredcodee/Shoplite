const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User =  require('./models/UserModel')
const passport = require('passport')


console.log(process.env.GOOGLE_CLIENT_ID)
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ googleId: profile.id })
    .then(result => {
      if (result) {
        return cb(null, result);
      } else {
        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName,
        });
        newUser.save();
      }
    })
    .catch(err => {
      return cb(err);
    });;
  }
));

passport.serializeUser((user, done) =>{
  done(null, user)
}) 


passport.deserializeUser((user, done) =>{
    done(err, user);
});