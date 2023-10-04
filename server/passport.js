const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User =  require('./models/UserModel')
const passport = require('passport')
const bcrypt = require('bcrypt')

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

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({email})
    .then(response =>{
      if (response){
        bcrypt.compare(password, response.password, (err, isMatch)=>{
          if (err) return done(err);
          if (!isMatch) return done(null, false, {message:"incorrect password"});
          return done(null, response);
        })
      }
      else{
        return done(null, false,{message:"invalid credentials"});
      }
    })
  })
);

passport.serializeUser((user, done) =>{
  done(null, user)
}) 


passport.deserializeUser((user, done) =>{
    done(null, user);
});