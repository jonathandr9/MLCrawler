const service = require('../services/products.service');


class ProductsController{

    async searchProducts(req, res){

        let pageCurrent;
        let arrayOfProducts;
        let numberOfPages = Math.ceil(req.body.limit / 50);

        try{            
            
            pageCurrent = await service.searchProductByKeyword(req.body.search);
            arrayOfProducts = service.createPageArray(page);            

            //Navega pelas paginas
            for(var index = 2; index <= numberOfPages; index++ ){
                
                page = await service.getNextPage(page)                
                arrayOfProducts = arrayOfProducts.concat(service.createPageArray(page));
            }            

        }catch(e){
            return res.status(404).send({message: 'Error in your search', error: e});
        }         

        return res.status(200).send(arrayOfProducts.slice(0, (req.body.limit)));
    } 

}

module.exports = new ProductsController();