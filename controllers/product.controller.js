const {Product} = require('../models/Product');
const {Orders} = require('../models/Orders');
const {User_Cart} = require('../models/Cart');
const ProductService = require('../services/products');
const { getStorage, ref, uploadBytes  } =  require ("firebase/storage");
const { Op } = require("sequelize");


const productService = new ProductService();

class ProductController {

    getAllProducts = async (req, res) =>{
        try
        {
            let product = await productService.getAllProducts();
            res.status(200).json(product);
        }
        catch(err)
        {
            res.json({error: err})
        }
    }

    addProduct = async (req, res) => {
        try {
        
            console.log("Add Product: ", req.body);
            let {product} = req.body; 
            await productService.addProduct(product);
            

            res.status(200).json({Status: "Success"});
        }
        catch(err) {
            console.log("Error in AddProduct Api: " + err.message);
            res.status(400).json({error: 'Unable to Add Product'});
        }
    }
    getProductById = async (req, res) => {
        console.log("getProductById: ");
        const {id} = req.body;
        try {

            let product = await productService.getProductById(id);
            res.status(200).json({product});

        }
        catch(error)
        {
            console.log("getProductById Catch Block ", error);    
            res.status(400).json({error: error.message});
        }
    }
    getAllCategories = async (req,res)=> {
        console.log("getAllCategories");
        try{
            let categories = await productService.getAllCategories();
            res.json(categories);
        }
        catch(error)
        {
            res.status(400).json({error});
        }
    }
    getProductsFromCategories = async (req, res) => {

        let {id} = req.query;

        console.log("getProductsFromCategories", id);
        {
            try {
                let products = await productService.getProductsFromCategories(id);
                res.status(200).send({products});
            }
            catch (error) {
                console.log("Error Fetching Products: ", error.message);
                res.status(400).send("Unable To Fetch Products");
            }

        }
    }
    buyProducts = async (req, res) =>{
        console.log("USER: ", req.user);
        try {

            let {products} = req.body;    
            let {user} = req;
            user.address = req.body.address;
            productService.buyProducts(products, user);
            res.status(200).send("Order Sent Succeessfully");
        }
        catch(error)
        {
            res.status(200).send({error: "Error Dispatching Order"});
        }
    }

    addToCart = async (req, res) =>{

        try {
            await productService.addToCart(req.body, req.user);
            res.status(200).json({responseCode: '000', status: "success"});
        }
        catch(err)
        {
            res.status(500).json({error: err.message})
        }
    }

    getCart = async(req, res) => { 
        try {
            let {userName} = req.user;
            let response = await productService.getCart(userName);
            res.status(200).json(response);
        }
        catch(error)
        {
            res.status(400).json({error: error.message})
        }
    }

}

module.exports.ProductController = ProductController;