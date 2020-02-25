const request = require('request');
const cheerio = require('cheerio');
const Product = require('../model/product.model');


exports.searchProductByKeyword = async (palavra_chave) => {

    return new Promise(function (resolve, reject) {
        request(`https://lista.mercadolivre.com.br/${palavra_chave}#D[A:${palavra_chave}]`, function (error, res, body) {
          if (!error && res.statusCode == 200) {
            resolve(body);
          } else {
            reject(error);
          }
        });
      });


}

exports.createPageArray = (strPage) => {

  let $ = cheerio.load(strPage);

  let arrayOfProducts = [];
  
  $('.item__info').each(function(){
      
      let name = $(this).find('.main-title').text().trim();            
      let link =  $(this).parent().attr('href');
      let price = $(this).find('.price__symbol').text().trim() + 
                  $(this).find('.price__fraction').text().trim() + ',' + 
                  ($(this).find('.price__decimals').text().trim()  || '00');
      let store = $(this).find('.item__brand-title-tos').text().trim().replace('por ', '') || null;
      let state = $(this).find('.item__status').children('.item__condition').text().trim() || null;  

      var product = new Product(name, link, price, store, state);
      arrayOfProducts.push(product);
  });

  return arrayOfProducts;


}