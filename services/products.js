const {Product} = require('../models/Product');
const {ProductRepository} = require('../database/products-repository');
const {sequelize} = require('../configuration/dbconfiguration');
const {Orders, OrderedProducts} = require('../models/Orders');


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

    addProduct = async (product) => {
       
        try
        {
            console.log("AddProduct Service: ", product);
            let {productTitle, productDescription, price, category} = product
            await Product.create(
            {
                productTitle,
                productDescription,
                price,
                category,
                product_owner: 'usmanadmin'
            });
            
        }
        catch(err)
        {
            console.log("Error In Adding Product", err.message);
            throw Error(err.message);
        }
        
    }

    getProductById = async (id) => {
        try 
        {
            let product = await ProductRepository.getProductById(id)
            return product ? product: "Product Not Found" ;
        }
        catch(err)
        {
            console.log("Product Not FOund: ", err);
            throw("Error Fetching The Product");
        }
    }

    getAllCategories = async () =>{
        
        try {
            let [categories] = await sequelize.query('EXEC getAllCategories;')
            for(let i in categories)
            {
                if(!categories[i].parent)
                    {

                        delete categories[i].parent;
                        categories[i].childCategories = [];
                        categories[i].showChildren = false;
                        delete categories[i].parent;
                        
                        for (let j =0; j<categories.length; j++)
                        {
                            if(categories[i].category_id === categories[j].parent)
                            {
                                categories[i].childCategories.push(categories[j])
                                categories.splice(j,1);
                                --j;
                            }
                        }
                    }
            }
            // categories[0].showChildren = true;
            return categories;
        }
        catch(err)
        {
            console.log("Error getting Categories:", err);
            throw err;
        }
    }

    getProductsFromCategories = async (id) => {

        try
        {
            let products = await ProductRepository.getProductsFromCategoriesFromDB(id);

            return products;
        }
        catch(err)
        {
            console.log("Error ProductsFetching Service:", err.message);
            throw err.message;
        }

    }

    buyProducts = async (productIds, user) => {
        
        try{
            let products = await ProductRepository.getProductsById(productIds);
            let billedAmount = 0;
            products.forEach((product)=> { billedAmount += product.price});

            let orderedProducts = productIds.map((productId) => { return { productId } });
            
            await Orders.create({
                status: "progress",
                delivery_address: user.address,
                customer_id: user.userName,
                billed_amount: billedAmount,
                amount_paid: false,
                OrderedProducts: orderedProducts
            }, {
                include: [{
                    model: OrderedProducts
                }]
            });
            }
            
        catch(error)
        {
            console.log("Error Creating the Error: ", error);
        }
    }

    addToCart = async (body, user) => {
        try {
            let cart_id = await ProductRepository.getCartIdByUser(user.userName)
            await ProductRepository.addToCart(cart_id, body.productId);
        }
        catch(err)
        {
            console.log("Error at addToCart Service: ", err.message);
            throw err;
        }

    }

    getCart = async (userName) => {
        try {

            let cartBody = await ProductRepository.getMyCartProducts(userName);
            return cartBody;
        }
        catch(err)
        {
            console.log("Error at cart Service: ", err.message);
            throw err;
        }
    }

}

module.exports = ProductService;