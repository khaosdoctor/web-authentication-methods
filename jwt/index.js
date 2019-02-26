const express = require('express')
const jwt = require('jsonwebtoken')
const middleware = require('express-jwt')
const body = require('body-parser')

const app = express()
const userObj = {
  user: 'lucas',
  pass: 'secret'
}
const opts = {
  aud: 'myapp',
  iss: 'urn:auth:myapp',
  secret: 'shhhhhh'
}

app.use(body.urlencoded())
app.post('/login', (req, res) => {
  const { user, pass } = req.body
  if (!user === userObj.user || !pass === userObj.pass) return res.status(401)
  const token = jwt.sign({ user, data: 'mydata' }, opts.secret, { audience: opts.aud, issuer: opts.iss })
  res.json({ token })
})

app.get('/resource', middleware({ secret: opts.secret, audience: opts.aud, issuer: opts.iss }), (req, res) => {
  res.json(req.user)
})

app.listen(3000)