const passport = require('passport');
const Jwt = require('jsonwebtoken');

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

const isLoggedIn = (req, res, next) => {
  console.log(req?.user);
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.json('not logged in');
};

module.exports = { login, isLoggedIn, requireJwt, signJwt };
