module.exports = function(User, passport, bcrypt){

  const LocalStrategy   = require('passport-local').Strategy;
  const FBStrategy      = require('passport-facebook').Strategy;
  const TwitterStrategy = require('passport-twitter').Strategy;
  const IgStrategy      = require('passport-instagram').Strategy;
  const GithubStrategy  = require('passport-github').Strategy;
  const secret          = require('./secret');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    User.findOne({where : {id: id}}).then(user =>  {
      if(user){
        done(null, user);
      }else{
        let err = "Some Error";
        done(err, null);
      }
    });
    // done(null, user);

});

passport.use('local', new LocalStrategy(
    function(username, password, done) {
      User.findOne({ where : {username: username }}).then(user => {
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.passsword, function(err, hasil) {
            if (!hasil) { return done(null, false); }else
            return done(null, user);
        });

      });
    }
  ));

passport.use(new TwitterStrategy ({
    consumerKey   : secret.twitter.consumerKey,
    consumerSecret: secret.twitter.consumerSecret,
    callbackURL   : secret.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {

      const namanya   = profile.displayName,
            gambarnya = profile.photos[0].value;

      User.findOne({where : {id_twit : profile.id}}).then(user => {

        if(user){
          return done(false, user);
        }else{

          let newUser = {
            nama: namanya,
            username : profile.username,
            passsword: '',
            email: profile.email,
            gambar : gambarnya,
            id_twit: profile.id,
            id_facebook: '',
            id_github : ''
          };


          User.create(newUser).then(newU => {
              return done(false, newU);
          });

        }
      });

    });
  }
)); //END OF Twitter Strategy

passport.use(new FBStrategy({
      clientID    : secret.fb.clientID,
      clientSecret: secret.fb.clientSecret,
      callbackURL : secret.fb.callbackURL,
      profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {

     let angka = Math.floor(Math.random() * 9000),
         str   = `${profile.displayName}_${angka}`;
         profile.username = str.replace(/\s/g, '');

          User.findOne({where : {id_facebook : profile.id}}).then(user => {
            if(user){
              done(false, user);
            }else{

              let new_user = {
                nama : profile.displayName,
                username : profile.username,
                passsword : '',
                email : profile.emails[0].value,
                gambar : "sample.jpg",
                id_twit : '',
                id_facebook : profile.id,
                id_github : ''
              };

              User.create(new_user).then(newUser => {
                done(false, newUser);
              });

          }

          });
  });
})); //end of facebook strategy

  passport.use(new IgStrategy({
  clientID    : secret.ig.clientID,
  clientSecret: secret.ig.clientSecret,
  callbackURL : secret.ig.callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {

    User.findOne({where : {id_ig: profile.id}}).then(user => {
        if(user){
          done(false, user);
        }else{
          let user_ig = {
            nama : profile.displayName,
            username : profile.username,
            passsword : '',
            email : '',
            gambar : "sample.jpg",
            id_twit : '',
            id_facebook : '',
            id_ig : profile.id,
            id_github: ''
          };

          User.create(user_ig).then(newUser => {
            done(false, newUser);
          });
        }
    });
  }));


  passport.use(new GithubStrategy({
    clientID: secret.github.clientID,
    clientSecret: secret.github.clientSecret,
    callbackURL: secret.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {

    User.findOne({where : {id_github: profile.id}}).then(user => {
        if(user){
          done(false, user);
        }else{
          let user_github = {
            nama        : profile.displayName,
            username    : profile.username,
            passsword   : '',
            email       : profile.emails[0].value,
            gambar      : "sample.jpg",
            id_twit     : '',
            id_facebook : '',
            id_ig       : '',
            id_github   : profile.id
          };

          User.create(user_github).then(newUser => {
            done(false, newUser);
          });
        }
    });
  }));



}; //end Of module export
