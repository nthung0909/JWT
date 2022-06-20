# JWT Example

## set up project
    npm intall

Using redis with default connection (host: 127.0.0.1, port: 6379)

## run project
    node app.js
or
    npm start

Change redis option at **.env**

## test
- Login: http://localhost:3000/access/login
- Get data via token: http://localhost:3000/todos
- Refresh token: http://localhost:3000/access/refreshtoken
- logout: http://localhost:3000/access/logout