function basicAuth (req, res, next) {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1)
    return res.status(401).json({ message: 'Missing authentication header' })

  const [, base64Credentials] = req.headers.authorization.split(' ')
  const plainTextCredentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
  const [user, pass] = plainTextCredentials.split(':')

  if (user !== 'lucas' || pass !== 'secret') return res.status(401).json({ message: 'Not authorized' })

  req.user = user
  next()
}

module.exports = basicAuth