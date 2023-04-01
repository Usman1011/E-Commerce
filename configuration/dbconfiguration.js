const { Sequelize } = require('sequelize');

let dbConf = {
    dbName : 'E-Commerce', //Enter Your DB Name Here
    dbUsername: 'sa',   //Enter Your DB Username Here
    password: '123',    //Enter Your DB Password Here
    dbDialect : "mssql" ////Enter Your Dialect Name Here, In our case, mssql
}

const sequelize = new Sequelize( 
    dbConf.dbName,
    dbConf.dbUsername,
    dbConf.password,
    {
    host: 'localhost',
    dialect: dbConf.dbDialect,
    logging: false
    }
    );

module.exports.sequelize = sequelize;