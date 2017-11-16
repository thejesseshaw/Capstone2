const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const metaget = require('metaget');

var User =  require('../models/user');
var Resources = require('../models/model.js');


router.get('/', (req, res) => {
    res.render('./app', {
      smallheader: `
        <section class="small-header-logo">
            <img src="/Images/Logo/LogoText2.png" alt="Squares Logo with Text">
        </section>
        <section class="right-elements">
            <a href="/login">
            <span class="login-here">Login</span>
            <i class="fa fa-plus-circle hidden" aria-hidden="true" onclick="showSubmit()"></i>
            </a>
        </section>
      `,
      masthead: `
        <section class="masthead">
            <div class="header-content">
              <div class="header-content-inner">
                  <img src="/Images/Logo/LogoText2.png" alt="Squares Logo with Text">
                  <div id="headingbackground">
                      <h1 id="homeheading">Your projects resource storage database</h1>
                  </div>
                <hr>
                <p></p>
              </div>
            </div>
        </section>
      `,
      bgprimary: `
          <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto text-center">
              <h2 class="section-heading text-white">How to use the application</h2>
              <hr class="light">
              <div class="directions">
              <p class="text-faded">This app is an online resource database to save resources for your project team and yourself.</p>
              </div>
              <!--
              <a class="btn btn-default btn-xl js-scroll-trigger" href="app.html">Click Here to try out the app!</a>
              -->
            </div>
          </div>
        </div>
      `,
      login: ``,
      register: ``,
      inputform: ``,
      readmore: ``,
      editform: ``,
      GridContent: ``,
      contact: `
          <footer>
          <div class="container">
              <div class="row">
                  <div class="col-lg-8 mx-auto text-center">
                      <h2 class="section-heading">Questions about the App?</h2>
                      <hr class="primary">
                      <p class="contactp">If you have any questions regarding this project, feel free to contact Jesse Shaw at any of the points of contact below:</p>
                  </div>
              </div>
          <div class="contactpoints">
              <div class="col-lg-4 ml-auto text-center">
                  <i class="fa fa-phone fa-3x sr-contact"></i>
                  <p><a href="tel:410-703-6125">410-703-6125</a></p>
              </div>
              <div class="col-lg-4 mr-auto text-center">
                  <i class="fa fa-envelope-o fa-3x sr-contact"></i>
                      <p>
                          <a href="mailto:your-email@your-domain.com">jdshaw1987@gmail.com</a>
                      </p>
              </div>
              <div class="col-lg-4 mr-auto text-center">
                  <i class="fa fa-github fa-3x sr-contact"></i>
                      <p>
                          <a href="https://github.com/thejesseshaw">GitHub</a>
                      </p>
              </div>  
              <div class="col-lg-4 mr-auto text-center">
                  <a href="index.html">
                      <img src="/Images/Logo/JPG/Logo3.jpg" alt="Squares Logo">
                  </a>
              </div>
          </div>
          </div>
      </footer>
      `
    });
    console.log("Landing Page loaded");
});

///Login Page///

router.get('/login', (req, res) => {
    console.log("Login Page loaded");
    res.render('./app', {
      smallheader: `
      <section class="small-header-logo">
          <a href="/"><img src="/Images/Logo/LogoText2.png" alt="Squares Logo with Text"></a>
      </section>
    `,
      masthead: ``,
      bgprimary: ``,
      login: `
          <div class="login">
          <label>
          <h1>Login</h1>
          <form class="loginform" action="/login" method="post">
              <label>Username</label>
              <input type="text" class="username" name="username"/>
              <label>Password</label>
              <input type="text" class="password" name="password" autocomplete="off"/>
              <div class="submit">
              <input type="submit" value="Log In">
              </div>
          </form>
          </label>
          <div class="loginerror hidden">You did not enter a correct username and/or password</div>
          <div class="testlogin">
          <span>To test this application, use the following:</span>
          <span>Login: demo</span>
          <span>Password: p@$$word2017</span>
          </div>
          <div class="newuser">
              <span>New User? Click Below to Register</span>
              <a href="/register"><button class="registerbutton">Register</button></a>
          </div>
          </div>
      `,
      register: `
      `,
      inputform: ``,
      readmore: ``,
      editform: ``,
      GridContent: ``,
      contact: ``
    })
});

router.get('/retrylogin', (req, res) => {
    console.log("Login Retry Page loaded");
    res.render('./app', {
      smallheader: `
      <section class="small-header-logo">
          <a href="/"><img src="/Images/Logo/LogoText2.png" alt="Squares Logo with Text"></a>
      </section>
    `,
      masthead: ``,
      bgprimary: ``,
      login: `
          <div class="login">
          <label>
          <h1>Login</h1>
          <form class="loginform" action="/login" method="post">
                <label class="loginerror">Sorry. The username/password combination was not accepted. Please try to login again</label>   
                <label>Username</label>
                <input type="text" class="username" name="username"/>
                <label>Password</label>
                <input type="text" class="password" name="password"/>
                <div class="submit">
                <input type="submit" value="Log In">
                </div>
          </form>
          </label>
          <div class="loginerror hidden">You did not enter a correct username and/or password</div>
          <div class="testlogin">
          <span>To test this application, use the following:</span>
          <span>Login: demo</span>
          <span>Password: p@$$word2017</span>
          </div>
          <div class="newuser">
              <span>New User? Click Below to Register</span>
              <a href="/register"><button class="registerbutton">Register</button></a>
          </div>
          </div>
      `,
      register: `
      `,
      inputform: ``,
      readmore: ``,
      editform: ``,
      GridContent: ``,
      contact: ``
    })
});

///Register Page///

router.get('/register', (req, res) => {
    res.render('./app', {
      smallheader: `
      <section class="small-header-logo">
          <a href="/"><img src="/Images/Logo/LogoText2.png" alt="Squares Logo with Text"></a>
      </section>
    `,
      masthead: ``,
      bgprimary: ``,
      login: `
      `,
      register: `
      <div class="register">
        <h1>Register</h1>
        <form class="registerform">
            <label>Username</label>
            <input type="text" class="usernameregister" name="username">
            <label>Password</label>
            <input type="text" class="passwordregister" name="password" autocomplete="off">
            <span class="passwarning1 hidden">Password must have a minimum of 10 characters</span>
            <label>Confirm Password</label>
            <input type="text" class="passwordconfirm" name="confirm"  autocomplete="off">
            <span class="passwarning2 hidden">Your passwords do not match</span>
            <label>First Name</label>
            <input type="text" class="firstname" name="firstname">
            <label>Last Name</label>
            <input type="text" class="lastname" name="lastname">
            <div class="submitsection">
            <button type="submit" class="submit">Submit</button>
            </div>
        </form>
        <section>
            <span>Already registered? Click below to login</span>
            <a href="/login"><button class="showlogin">Login</button></a>
        </section>
      </div>
      `,
      inputform: ``,
      readmore: ``,
      editform: ``,
      GridContent: ``,
      contact: ``
    })
    console.log("Register");
});

//Dashboard//

router.get('/app/:id', (req, res) => {
    let userId = req.params.id;
    let ret = [];
    let rej = [];
    User
        .findById(userId)
        .catch(err => {
            console.error(err);
            res.status(404).json({error: 'Sorry. That user ID could not be found.'});
        })
        res.render('./app', {
            masthead: ``,
            bgprimary: ``,
            login: ``,
            register: ``,
            GridContent: `
            <div class="grid" onload="startMasonry()">
            </div>
            `,
            smallheader: `            
            <section class="small-header-logo">
                <a href="/">
                <img src="/Images/Logo/LogoText2.png" alt="Squares Logo with Text">
                </a>
            </section>
            <section class="right-elements">
                <section class="plus-sign">
                        <i class="fa fa-plus-circle" aria-hidden="true" onclick="showSubmit()"></i>
                </section>
                <a href="/logout">
                <span class="login-here"><i class="fa fa-power-off" aria-hidden="true"></i></span>
                </a>  
            </section>`,
            inputform: `            
            <div class="formsection">
            <label>
                <h1 class="greeting"></h1>
            <form class="resoure-submit" onsubmit="submitIt(event, '${userId}') & setTimeout(function () { window.location.reload(); }, 1000)">
                <label for="link">Link</label>
                <input type="text" class="link">
                <div class="submit">
                <input type="submit">
                </div>
            </form>
            </label>
            </div>
                `,
            readmore: `            
            <div class="readmore hidden">
            <form>
                <section class="readmorecontent">
                    <h2 class="title"></h2>
                    <p class="description-readmore"></p>
                    <img class="sourceimage">
                    <a class="link-readmore"></a>
                </section>
                    <input type="button" value="Close" onclick="closeReadMore()">
            </form>
            </div>
            `,
            contact: `            
            <footer>
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mx-auto text-center">
                        <h2 class="section-heading">Questions about the App?</h2>
                        <hr class="primary">
                        <p class="contactp">If you have any questions regarding this project, feel free to contact Jesse Shaw at any of the points of contact below:</p>
                    </div>
                </div>
            <div class="contactpoints">
                <div class="col-lg-4 ml-auto text-center">
                    <i class="fa fa-phone fa-3x sr-contact"></i>
                    <p><a href="tel:410-703-6125">410-703-6125</a></p>
                </div>
                <div class="col-lg-4 mr-auto text-center">
                    <i class="fa fa-envelope-o fa-3x sr-contact"></i>
                        <p>
                            <a href="mailto:your-email@your-domain.com">jdshaw1987@gmail.com</a>
                        </p>
                </div>
                <div class="col-lg-4 mr-auto text-center">
                    <i class="fa fa-github fa-3x sr-contact"></i>
                        <p>
                            <a href="https://github.com/thejesseshaw">GitHub</a>
                        </p>
                </div>  
                <div class="col-lg-4 mr-auto text-center">
                    <a href="index.html">
                        <img src="/Images/Logo/JPG/Logo3.jpg" alt="Squares Logo">
                    </a>
                </div>
            </div>
            </div>
            </footer>
            `,
            editform: `            
            <div class="editformsection">
            <form class="editform hidden">
                <h1>Edit Resource</h1>
                <label>Title</label>
                <input type="text" class="title edit-title">
                <label>Description</label>
                <textarea type="text" class="description edit-description"></textarea>
                <label>Link</label>
                <input type="text" class="link edit-link">
                <div class="submit">
                <input type="submit">
                <!--
                <input type="button" value="Close" onclick="closeEdit()">
                -->
                </div>
            </form>
            </div>
            `
        })
        // res.json(ret);
        // res.render('./app.ejs');
      })
      /*
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went horribly awry'});
      });
//})*/
  

//register route

router.post('/register', function(req, res) {
    console.log("User has attempted to register via index route");
    let username = req.body.username;
    let password = bcrypt.hashSync(req.body.password, 10);
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    //validation 
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is required').notEmpty();

    var errors = req.validationErrors();

    var newuser = new User();
    newuser.username = username;
    newuser.password = password;
    newuser.firstName = firstName;
    newuser.lastName = lastName;
    let userId = newuser._id;
    // console.log(newuser);
    User.create(newuser, function(err, user) {
        console.log(`Creating user ${userId}`);
        if(err) {
            console.log(`Error creating User: ${err.code}`);
            return err;
        }
        else {
            console.log(`Load login page for ${userId}`);
            res.status(201).send();
        }
        // console.log(`User with id ${userId} has been registered`);
        // res.status(201).send();
    });
})

router.post('/resources', function(req, res) {
    // console.log(req.body);
    let author = req.body.author;
    console.log(link);
    console.log(author);
    metaget.fetch(`${link}`, function (err, meta_response) {
        if(err){
            console.log(err);
        }else{
            console.log(meta_response);
            let description = meta_response['og:description'];
            let title = meta_response['og:title'];
            let link = meta_response['og:url'];
            let image = meta_response['og:image'];
        }
    });
    console.log(description);

})

passport.use(new localStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (user) {
            let userPassword = user.password; 
        }
        if (err) { 
            return done(err); 
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
            // console.log(`User.password is ${User.password}`);
            if (err) { 
                return done(err); 
            }
            if (isMatch) {
                console.log("It's a match");
                return done(null, user);
            }
            else {
                console.log("Invalid Password");
                return done(null, false, {message: "Invalid Password"});
            }
        })
      });
    }
  ));

//Local Strategy

passport.deserializeUser(function(id, done) {
    console.log("Deserializer was used");    
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
});

passport.serializeUser(function(user, done) {
    console.log("Serializer was used");
    return done(null, user.id);
});


//Login Route
router.post('/login', 
    passport.authenticate('local', {/*successRedirect: `/app/${req.user._id}`, */failureRedirect: '/retrylogin', failureFlash: true}), 
    function(req, res) {
        // let username = req.body.username;
        // let password = req.body.password;
        // console.log("User attempted login");
        res.redirect(`/app/${req.user._id}`);
})

router.get('/logout', function(req, res) {
    req.logout();
    // req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
})

module.exports = router;