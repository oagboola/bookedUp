var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
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
  function(accessToken, refreshToken, profile, done) {
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

  //config for twitter auth

  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackUrl: 'http://localhost:5000/twitter/callback'
  },
  function(token, tokenSecret, profile, done){
    var userProfile = profile._json;
    // User.findOne({email: userProfile.})
  }));

  //config for google auth
  passport.use(new GoogleStrategy({
    clientID: '1083835154214-82kq91lvsdl3tl23eqt25qblu2hiu8ch.apps.googleusercontent.com',
    clientSecret: 'CVt-cFffWpAbNHEiHlIea6_S',
    callbackURL: 'http://localhost:5000/auth/google/callback'
  },
  function(token, tokenSecret, profile, done){
    var userProfile = profile._json;
    User.findOne({email: userProfile.emails[0].value}, function(err, user){
      if(err){
        return done(err)
      }
      if(user){
        return done(null, user);
      }

      var user = new User();

      user.lastname = userProfile.name.familyName;
      user.firstname = userProfile.name.givenName;
      user.email = userProfile.emails[0].value;

      user.save(function(err, user){
        if(err){
          return done(err);
        }
        return done(null, user);
      });
    });
  }));
}