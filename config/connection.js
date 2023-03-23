//importing dotenv package
require('dotenv').config();
//importing sequelize
const Sequelize = require('sequelize');
//ensuring sequelize can utilize the database name, username and pw in the .env file
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });
// exporting settings
module.exports = sequelize;
