const passport = require('passport');
const Jwt = require('jsonwebtoken');
const passportJwt = require('passport-jwt');
const User = require('../Models/User');

passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
      algorithms: ['HS256'],
    },
    (payload, done) => {
      User.findById(payload.sub)
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch((error) => {
          done(error, false);
        });
    }
  )
);

const login = passport.authenticate('local', {
  session: false,
});

const requireJwt = passport.authenticate('jwt', { session: false });

const signJwt = (req, res) => {
  const { name, email, _id: id } = req.user;

  const token = `Bearer ${Jwt.sign({ name, email, id }, process.env.SECRET, {
    expiresIn: 86400,
    subject: id.toString(),
  })}`;

  res.json({ login: true, token });
};

const logout = (req, res) => {
  req.logout();
  res.json({ data: { message: 'You are now logged out' } });
};

const isLoggedIn = (req, res, next) => {
  console.log(req?.user);
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.json('not logged in');
};

module.exports = { login, logout, isLoggedIn, requireJwt, signJwt };
