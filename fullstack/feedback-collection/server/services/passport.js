const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) =>
  User.findById(id).then((user) => done(null, user))
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accesToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((existinhUser, err) => {
        if (existinhUser) {
          // user aready exists
          done(err, existinhUser);
        } else {
          // create user
          new User({ googleId: profile.id })
            .save()
            .then((user, err) => done(err, user));
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
    },
    (accesToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id }).then((existinhUser, err) => {
        if (existinhUser) {
          // user aready exists
          done(err, existinhUser);
        } else {
          // create user
          new User({ facebookId: profile.id })
            .save()
            .then((user, err) => done(err, user));
        }
      });
    }
  )
);
