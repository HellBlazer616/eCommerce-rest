const passport = require('passport');
const Jwt = require('jsonwebtoken');

//  passport local verification middleware
const login = passport.authenticate('local', {
  session: false,
});

//  passport JWT verification middleware
const requireJwt = passport.authenticate('jwt', {
  session: false,
});

// Generation JWT token
const signJwt = (req, res) => {
  const { name, email, _id: id } = req.user;

  const token = `Bearer ${Jwt.sign({ name, email, id }, process.env.SECRET, {
    expiresIn: 86400,
    subject: id.toString(),
  })}`;

  res.json({ login: true, token });
};

module.exports = { login, requireJwt, signJwt };
