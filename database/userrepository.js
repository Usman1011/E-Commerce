const {User} = require('../models/Users');
const {Roles} = require('../models/Users');
class UserRepository {

    static getUserById = async (userId) => {

            console.log("getUserById");
            let user = await User.findByPk(userId);

            let userRole = await user?.getRole();
            console.log(userRole);

            if(user)
                user.dataValues.role = userRole.dataValues.role;
            
            return user?.dataValues ? user.dataValues : user;

    }

    static updateToken = async (user) => {
        console.log("updateToken");
        let tokenUpdated = await User.update(
            {token: user.token},
            {where: {userName:user.userName}}
        )
        return tokenUpdated
    }

    static getUserRoleByRoleId = async(roleId) =>{
        let userRole = await Roles.findByPk(roleId, {
            attributes: ['role']
        })
        console.log("Log 6");

        return userRole.dataValues.role;
    }

    static getUserByUserToken = async (token) =>{
        let user = await User.findAll({where: {
            token
        }});

        return user.length ? user[0].dataValues : "";
    };

}

module.exports = UserRepository;