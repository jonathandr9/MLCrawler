const service = require('../services/products.service');


class ProductsController{

    async searchProducts(req, res){

        let responseSearchByKeyword;
        let arrayOfProducts;

        try{
            responseSearchByKeyword = await service.searchProductByKeyword(req.body.search);

        }catch(e){
            return res.status(404).send({message: 'Error in your search', error: e});
        }       

        
        arrayOfProducts = service.createPageArray(responseSearchByKeyword);


        return res.status(200).send(arrayOfProducts);
    } 

}

module.exports = new ProductsController();