const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../configuration/dbconfiguration')

class Product extends Model {}

Product.init({
        productId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productTitle: {
            type: DataTypes.STRING
        }

    }, {
        sequelize,
        createdAt: false,
        updatedAt: false,
        modelName: 'Product'
    }
)


module.exports.Product = Product;