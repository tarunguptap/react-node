require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');

const app = express();
const port = process.env.PORT || 4000;

// static user details
const userData = {
  email: "tarun@qasource.com",
  password: "tarun",
  name: "tarun",
  username: "tarun",
  isAdmin: true
};

const userList1 = [{
  email: "ankur@qasource.com",
  password: "Ankur",
  name: "Ankur",
  username: "Ankur",
  isAdmin: true
},
{
  email: "sachin@qasource.com",
  password: "Sachin",
  name: "Sachin",
  username: "Sachin",
  isAdmin: false
}];

const userListEmpty = [];

const userList = [{
  email: "tarun@qasource.com",
  password: "tarun",
  name: "tarun",
  username: "tarun",
  isAdmin: true
},
{
  email: "navneet@qasource.com",
  password: "Navneet",
  name: "Navneet",
  username: "Navneet",
  isAdmin: false
}, {
  email: "karan@qasource.com",
  password: "Karan",
  name: "Karan",
  username: "Karan",
  isAdmin: false
}];

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});


// request handlers
app.get('/', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
});

// request handlers
app.get('/userListEmpty', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  return res.json({ records: userListEmpty, total : "0"});;
});

// request handlers
app.get('/userList', (req, res) => {
  const pagenumber = req.query.pagenumber;
  const totalRecords = 5;
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  if(pagenumber == 1) {
    console.log("@@@@@  userList :: ",JSON.stringify(userList));
    return res.json({ records: userList, total : totalRecords});
  }
  console.log("@@@@@ userList1 ::: ",JSON.stringify(userList1));
  return res.json({ records: userList1, total : totalRecords});;
});



// request handlers
app.put('/changepassword', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  const currentpwd = req.body.currentpassword;
  const newpwd = req.body.newpassword;
  if (!currentpwd || !newpwd) {
    return res.status(400).json({
      error: true,
      message: "User current Password or New Password or Confirm Password is required."
    });
  }
  // return 401 status if the credential is not match.
  if (currentpwd !== userData.password) {
    return res.status(401).json({
      error: true,
      message: "User Password is Wrong."
    });
  }
  res.send('Password changed succesfully  - ' + userData.name);
});


// validate the user credentials
app.post('/user/login', function (req, res) {
  const email = req.body.email;
  const pwd = req.body.password;
  console.log(req.body);
  // return 400 status if username/password is not exist
  if (!email || !pwd) {
    return res.status(400).json({
      error: true,
      message: "User email or Password required."
    });
  }

  // return 401 status if the credential is not match.
  if (email !== userData.email || pwd !== userData.password) {
    return res.status(401).json({
      error: true,
      message: "User email or Password is Wrong."
    });
  }

  // generate token
  const token = utils.generateToken(userData);
  // get basic user details
  const userObj = utils.getCleanUser(userData);
  // return the token along with user details
  return res.json({ user: userObj, token });
});


// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    // return 401 status if the userId does not match.
    if (user.email !== userData.email) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    }
    // get basic user details
    var userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });
});

app.listen(port, () => {
  console.log('Server started on: ' + port);
});
