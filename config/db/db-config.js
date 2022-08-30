//import { Sequelize } from 'sequelize';
const { Sequelize } = require('sequelize');

const sqlize = new Sequelize(
  'estudos_node_blog',
  'root',
  undefined,
  {
    //timezone: '-03:00',
    host: 'localhost',
    dialect: 'mysql'
  });

module.exports = sqlize;