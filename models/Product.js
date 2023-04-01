const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../configuration/dbconfiguration');
const {User} = require('./Users');


class Product extends Model {}

Product.init({
        productId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productTitle: {
            type: DataTypes.STRING
        },
        productDescription: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.INTEGER 
        }

    }, {
        sequelize,
        createdAt: false,
        updatedAt: false,
        modelName: 'Product'
    }
)

User.hasMany(Product, {
    foreignKey: "product_owner"
});
Product.belongsTo(User,  {
    foreignKey: "product_owner"
});

module.exports.Product = Product;