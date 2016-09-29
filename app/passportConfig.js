var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuthStrategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('./models/users.model'),
    Account = require('./models/accounts.model');

module.exports = function(){

  //serialize and deserialize user to enable login sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  //configure passport for local auth
  passport.use(new LocalStrategy({
      usernameField: 'email',
    },
    function(email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  // configure passport for facebook auth
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'verified']
  },
  function(req, accessToken, refreshToken, profile, done) {

    var userProfile = profile._json;
    User.findOne({email: userProfile.email}, function(err, user){
      if(err){
        return done(err)
      }
      if(user){
        return done(null, user);
      }

      var user = new User();
      user.lastname = userProfile.last_name;
      user.firstname = userProfile.first_name;
      user.email = userProfile.email;

      user.save(function(err, user){
        if(err){
          return done(err);
        }
        return done(null, user);
      });
    });
  }
  ));

}