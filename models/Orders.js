const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../configuration/dbconfiguration');
const {User} = require('./Users');
const {Product} = require('./Product');

class Orders extends Model {};

Orders.init({

    order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.STRING
    },
    delivery_address: {
        type: DataTypes.STRING
    },
    billed_amount: {
        type:DataTypes.INTEGER   
    },
    amount_paid: {
        type: DataTypes.BOOLEAN
    }

    },
    
    {
        sequelize,
        createdAt: false,
        updatedAt: false,
        modelName: 'Orders'
    },
);

class OrderedProducts extends Model {};

OrderedProducts.init({

    },
    {
        sequelize,
        createdAt: false,
        updatedAt: false,
        modelName: 'OrderedProducts'
    }
);


User.hasMany(Orders, {
    foreignKey: "customer_id"
})

Orders.belongsTo(User, {
    foreignKey: "customer_id"
});

Orders.belongsToMany(Product, {
    through: 'OrderedProducts',
    foreignKey: 'order_id'
});

Product.belongsToMany(Orders, {
    through: 'OrderedProducts',
    foreignKey: 'productId'
})

Orders.hasMany(OrderedProducts, {foreignKey: 'order_id'});


module.exports.Orders = Orders;
module.exports.OrderedProducts = OrderedProducts; 