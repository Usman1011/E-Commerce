const express = require('express');
const app = express();
var cors = require('cors')
port = process.env.PORT || 3001;
const applyRoutes = require('./routes/index.routes')
const {sequelize} = require('./configuration/dbconfiguration'); 
var bodyParser = require('body-parser')


app.use(cors());
app.use(bodyParser.json())


sequelize.authenticate()
    .then((res) => {
        console.log('Connection has been established successfully.');
        sequelize.sync({alter: true})
        .then(() => {

            applyRoutes(app);
            app.listen(port, () => {
                console.log("Application running on port " + port);
            });
        })
},
    (err) =>{
    console.log("DataBase failed to connect: " + err);
}
);