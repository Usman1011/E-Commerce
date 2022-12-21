const express = require('express');
const app = express();
port = process.env.PORT || 3001;
const indexRoute = require('./routes/index.routes');
const {sequelize} = require('./configuration/dbconfiguration'); 


sequelize.authenticate()
    .then((res) => {
    console.log('Connection has been established successfully.');
    sequelize.sync({alter:true})
    .then(() => {
        app.use(require('./routes/index.routes'));
        app.listen(port, () => {
            console.log("Application running on port " + port);
        });
    })
},
    (err) =>{
    console.log("DataBase failed to connect: " + err);
}
)

     



