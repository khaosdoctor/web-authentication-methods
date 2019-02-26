# JWT

1. Install packages with `npm i`
2. Start the server with `npm start`
3. Perform a POST request to /login sending `{ "user": "lucas", "pass": "secret" }` as JSON
4. Save token
5. Perform a GET request to /resource along with the header `Authorization: Bearer <token>`