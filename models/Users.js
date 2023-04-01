const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../configuration/dbconfiguration')

class User extends Model {};
class Roles extends Model {}

User.init({
    userName: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING
    },
    },
    {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'User'
}
);

Roles.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING
    }

}, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'Roles'
}
);

Roles.hasMany(User);
User.belongsTo(Roles);

module.exports.User = User;
module.exports.Roles = Roles;
