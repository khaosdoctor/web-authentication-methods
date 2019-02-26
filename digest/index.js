const Express = require('express')
const passport = require('passport')
const { DigestStrategy } = require('passport-http')
const app = Express()

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(new DigestStrategy({ qop: 'auth' }, (username, done) => {
  const user = {
    name: 'lucas',
    pass: 'secret'
  }
  return done(null, user, user.pass)
}))

// implement function to serialize user into session
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get('/login', passport.authenticate('digest', { session: 'false' }), (req, res) => {
  res.json({ message: 'Welcome user', user: req.user })
})

app.listen(3000)