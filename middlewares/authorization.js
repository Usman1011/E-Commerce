const {User, Roles} = require('../models/Users');
const UserRepository = require('../database/userrepository');

const userAuthorizationMiddleWare = async (req, res, next) => {

    try {
        let token = req.get('Authorization').substring(7);
        let user = await UserRepository.getUserByUserToken(token);

        if(user){

            req.user = user;
            next();
        }
        else
        {
            throw Error("No User Found Against token");
        }
        
    }
    catch(error) {

        console.log("Erorr at User Authorization: ", error.message);
        res.status(401).send("User Not Authorized For This Request")
    }
}

const userAuthorizationAPI = async (req, res) => {

    try {
        let token = req.body.token;
        let user = await UserRepository.getUserByUserToken(token);
        if(user)
        {
            res.status(200).json({user});
        }
        else
        {
            res.status(400).json({error: "Token Invalid/Expired"});
        }
        
    }
    catch(error) {
        console.log("Erorr at User Authorization: ", error.message);
        res.status(401).send("User Not Authorized For This Request")
    }
};

const isUserAdmin = async (req, res, next) => {
    try {

        let {user} = req;
        let userRole = await UserRepository.getUserRoleByRoleId(user.RoleId);
        if(!userRole === "Admin")
            throw Error("User Role is Not Admin");
        next();
    }
    catch(err)
    {
        console.log("Error At Admin Authorization", err.message);
        res.status(401).send("Only Admin User Is Authorized for this request");
    }
}

module.exports.userAuthorizationMiddleWare = userAuthorizationMiddleWare; 
module.exports.isUserAdmin = isUserAdmin; 
module.exports.userAuthorizationAPI = userAuthorizationAPI;