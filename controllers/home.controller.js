const {Product} = require('../models/Product');
const {ProductService} = require('../services/products');
const productService = new ProductService();

class HomeController {

     getAllProducts = async (req, res) =>{
        try
        {
            let product = await productService.getAllProducts();
            res.json(product);
        }
        catch(err)
        {
            res.json({error: err})
        }
    }
}

module.exports.HomeController = HomeController;