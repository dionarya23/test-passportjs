const Sequelize = require('sequelize');
const sequelize = new Sequelize('cl_mahasiswa', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  operatorsAliases: true
});

module.exports = {req1: Sequelize, req2: sequelize};