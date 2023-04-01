const {Sequelize, DataTypes, Model, INTEGER} = require('sequelize');
const {sequelize} = require('../configuration/dbconfiguration');
const {User} = require('./Users');
const {Product} = require('./Product');

class User_Cart extends Model {};

User_Cart.init({

    cart_id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    // userName: {
    //     type: DataTypes.STRING
    // },
    // productId: {
    //     type: DataTypes.INTEGER
    // }

    },
    {
        sequelize,
        createdAt: false,
        updatedAt: false,
        modelName: 'User_Cart'
    },
)

class products_cart extends Model {};
products_cart.init({},
    {
    sequelize,
    createdAt: false,
    updatedAt: false,
    modelName: 'products_cart'
});


User.hasOne(User_Cart, {
    foreignKey: "user"
});
User_Cart.belongsTo(User, {
    foreignKey: "user"
});



User_Cart.belongsToMany(Product, {through: 'products_cart', foreignKey: 'cart_id'});
Product.belongsToMany(User_Cart, {through: 'products_cart', foreignKey: 'product_id'})


module.exports.User_Cart = User_Cart;
module.exports.products_cart = products_cart;