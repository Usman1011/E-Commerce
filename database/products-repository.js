const {Product} = require('../models/Product');
const {User_Cart} = require('../models/Cart');
const {products_cart} = require('../models/Cart')

const {sequelize} = require('../configuration/dbconfiguration');
const { Op } = require("sequelize");



class ProductRepository {

    static getProductById = async (id) => {

        let product = await Product.findByPk(id);
        return product?.dataValues ? product?.dataValues : undefined;

    }

    static getProductsById = async (id) => {

        let products = await Product.findAll({
            where: {
                productId: {
                    [Op.or]: [...id]
                }
            }
        });
        products = products.map(product => product.dataValues);
        return products;
    }

    static getProductsFromCategoriesFromDB= async (id) => {
        let [products] = await sequelize.query(
            'EXEC getProductsFromCategories @categoryId = :id;',
            {
                replacements: { id: id },
            }
        )

        return products;
    }

    static getCartIdByUser = async (userName) => {
        let cartId = await User_Cart.findOne({where: {user: userName}})
        return cartId?.dataValues?.cart_id;
    }

    static addToCart = async (cartId, productId) =>{
        try {

            let res = await products_cart.create({
                cart_id: cartId,
                product_id: productId
            })

            console.log("REsponse adding to cart: " ,res);
        }
        catch(err)
        {
            console.log("error adding to cart", err.message);
            if(err.message == 'Validation error')
                throw Error('Product Already Added To the Cart');
        }
    }

    static getMyCartProducts = async (user) => {
        console.log("getMyCartProducts");

        let data = await User_Cart.findOne({ where:{user: user},include: {model: Product}})
        return data?.dataValues;
    }
};

module.exports.ProductRepository = ProductRepository;