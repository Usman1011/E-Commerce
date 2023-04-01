const authenticationRoute = require('./authentication.routes');
const productRoute = require('./products-routes')

const apiV1 = "/api/v1";

const applyRoutes = (app) =>{
    // app.use(require('./routes/index.routes'));
    app.use(`${apiV1}/authentication`, authenticationRoute);
    app.use(`${apiV1}/products`, productRoute);

    
}
module.exports = applyRoutes;