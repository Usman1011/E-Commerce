const {Product} = require('../models/Product')

class ProductService {

    getAllProducts = async () =>{
        try
        {
            let products = await Product.findAll();
            return products;
        }
        catch(err)
        {
            return err;
        }
    }
}

module.exports.ProductService = ProductService;