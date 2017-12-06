const User          = require('./models/user');

module.exports = function(app, passport){

  const LocalStrategy = require('passport-local').Strategy;

app.get('/', notAuthenticated, function(req, res){
    res.render('index');
});

app.post('/', passport.authenticate('local', {
        successRedirect : '/sukses',
        failureRedirect : '/login'
    }));

app.get('/sukses', isAuthenticated, function(req, res){
  res.render('profile', {user: req.user});
});

app.get('/keluar', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/login', notAuthenticated, (req, res) => {
res.send("Gagal Login");
});

app.get('/twitter', notAuthenticated, passport.authenticate('twitter'));


app.get('/twitter/callback', notAuthenticated, passport.authenticate('twitter', {
  failureRedirect : '/'
}), (req, res) => {
    res.redirect('/sukses');
});

app.get('/facebook', notAuthenticated, passport.authenticate('facebook', { scope: ['user_friends'] }));
app.get('/facebook/callback', notAuthenticated, passport.authenticate('facebook', { failureRedirect: '/'}), (req, res) => {
  res.redirect('/sukses');
});

app.get('/ig', notAuthenticated, passport.authenticate('instagram'));
app.get('/ig/callback', notAuthenticated, passport.authenticate('instagram', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/sukses');
});

app.get('/github', notAuthenticated, passport.authenticate('github'));
app.get('/github/callback', notAuthenticated, passport.authenticate('github'),
(req, res) => {
  res.redirect('/sukses');
});


}; //END OF MODULE EXPORTS

const isAuthenticated = (req, res, next) => {
  if(req.user) return next();
  res.redirect('/');
};

const notAuthenticated = (req, res, next) => {
  if(!req.user) return next();
  res.redirect('/sukses');
};
