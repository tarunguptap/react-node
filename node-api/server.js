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
  id: 1,
  email: "tarun@qasource.com",
  password: "tarun",
  name: "tarun",
  username: "tarun",
  isAdmin: true,
  first_name: "tarun",
  last_name: "gupta",
  role: "Admin",
  team: "test",
  expertise: "java"
};

const userList1 = [{
  id: 4,
  email: "ankur@qasource.com",
  password: "Ankur",
  name: "Ankur",
  username: "Ankur",
  isAdmin: true,
  first_name: "ankur",
  last_name: "sharma",
  role: "admin",
  team: "test",
  expertise: "java"
},
{
  id: 5,
  email: "sachin@qasource.com",
  password: "Sachin",
  name: "Sachin",
  username: "Sachin",
  isAdmin: false,
  first_name: "sachin",
  last_name: "sharma",
  role: "admin",
  team: "test",
  expertise: "java"
}];

const userListEmpty = [];

const userList = [{
  id: 1,
  email: "tarun@qasource.com",
  password: "tarun",
  name: "tarun",
  username: "tarun",
  isAdmin: true,
  first_name: "tarun",
  last_name: "gupta",
  role: "manager",
  team: "test",
  expertise: "java"
},
{
  id: 2,
  email: "navneet@qasource.com",
  password: "Navneet",
  name: "Navneet",
  username: "Navneet",
  isAdmin: false,
  first_name: "navneet",
  last_name: "sharma",
  role: "manager",
  team: "test",
  expertise: "java"
}, {
  id: 3,
  email: "karan@qasource.com",
  password: "Karan",
  name: "Karan",
  username: "Karan",
  isAdmin: false,
  first_name: "karan",
  last_name: "sharma",
  role: "manager",
  team: "test",
  expertise: "java"
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
  return res.json({ records: userListEmpty, total : 0});
});

// request handlers
app.get('/userList', (req, res) => {
  const searchText = req.query.searchText;
  const pagenumber = req.query.pagenumber;
  const totalRecords = 5;
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  let returnList = userList;
  if(pagenumber > 1) {
    returnList = userList1;    
  }
  if(searchText) {
    returnList = returnList.filter(user => user.email.includes(searchText) || user.username.includes(searchText));
  }
  console.log("@@@@@ returnList ::: ",JSON.stringify(returnList));
  return res.json({ records: returnList, total : totalRecords});
});

// request handlers
app.get('/user/:id', (req, res) => {
  console.log("Inside user by id method");
  const userId = req.param.id;
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  return res.json(userData);
});


// validate the user credentials
app.post('/create-user', function (req, res) {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  const email = req.body.params.email;
  const fstname = req.body.params.first_name;
  console.log(req.body);
  // return 400 status if username/password is not exist
  if (!email || !fstname) {
    console.log("emai :: ", email, " firstname :: ", fstname)
    return res.status(400).json({
      error: true,
      message: "User email or name is required."
    });    
  }
  return res.send('User created Scessfully!!');
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

// request handlers
app.put('/update-user', (req, res) => {
  if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
  const firstName = req.body.first_name;
  res.send('Password changed succesfully  - ' + firstName);
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
