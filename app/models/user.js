const cdb    = require('../../config/database.js');
const User = cdb.req2.define('user', {
    nama        : cdb.req1.STRING,
    username    : cdb.req1.STRING,
    passsword   : cdb.req1.STRING,
    email       : cdb.req1.STRING,
    gambar      : cdb.req1.STRING,
    id_twit     : cdb.req1.STRING,
    id_facebook : cdb.req1.STRING,
    id_ig       : cdb.req1.STRING,
    id_github   : cdb.req1.STRING
  });

  module.exports = User;
