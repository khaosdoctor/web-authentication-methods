const http = require('http')
const auth = require('basic-auth')

const server = http.createServer((req, res) => {
  const credentials = auth(req)

  if (!credentials || !isValid(credentials)) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="simple"')
    return res.end('Access denied')
  }

  return res.end('Access granted')
})

function isValid (credentials) {
  return credentials.name === 'lucas' && credentials.pass === 'secret'
}

server.listen(3000)