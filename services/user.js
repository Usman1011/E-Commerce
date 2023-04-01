const UserRepository = require('../database/userrepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { updateToken } = require('../database/userrepository');


class UserService {

    userAuthentication = async (req, res) =>{

        console.log("UserService.userAuthentication");
        let authenticationModel = {};

        try {
            const {userName, password} = req.body;
            
            let user = await UserRepository.getUserById(userName);
            console.log(user);
            

            if(user)
            {
                let isValidPassword = await bcrypt.compare(password, user.password);

                if(isValidPassword)
                {   
                    user.token = await jwt.sign({userName}, 'qwerty');
                    await UserRepository.updateToken(user);
                    
                    authenticationModel.user = user;
                    authenticationModel.responseCode = '000';
                }
                else
                {
                    authenticationModel.responseCode = '002';
                }
            }    
            else
            {   
                authenticationModel.responseCode = '001';
            }
        }

        catch (err) {
            console.log("Error at UserService: " + err);
            authenticationModel.responseCode = '500';
        }
        
        return authenticationModel;
    }

    showMyOrders = async (req, res) =>{
        console.log("showMyOrders");
    }
}

module.exports = UserService;