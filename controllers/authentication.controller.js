const {Product} = require('../models/Product');
const ProductService = require('../services/products');
const UserService = require('../services/user');
const productService = new ProductService();
const ResponseUtils = require('../utils/response-utils');
const RequestUtils = require('../utils/request-utils')

const bcrypt = require('bcrypt');
const saltRounds = 10;

class AuthenticationController {

    constructor() {
        this.userService = new UserService;
    }

    login = async (req, res) =>{
        
        try
        {
            RequestUtils.validateRequest(req.body, 
            [
                {key:"userName", criterias: ['required']},
                {key:"password", criterias: ['required']}
            ]
            );
            
            let authenticationResponse = await this.userService.userAuthentication(req, res);
            ResponseUtils.setResponseObject(authenticationResponse);
            if(authenticationResponse.error)
            {
                throw (authenticationResponse.error);
            }
            res.status(200).json(authenticationResponse);
            
            
        }
        catch(err)
        {   
            console.log("Error At AuthenticationController: " + err);
            res.status(500).send({Error: err});
        }
    }
}

module.exports.AuthenticationController = AuthenticationController;