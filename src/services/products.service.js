const request = require('request');
const cheerio = require('cheerio');
const Product = require('../models/product.model');


exports.searchProductByKeyword = async (palavra_chave) => {

    return new Promise(function (resolve, reject) {
        request(`https://lista.mercadolivre.com.br/${palavra_chave}_DisplayType_G`, function (error, res, body) {
          if (!error && res.statusCode == 200) {
            resolve(body);
          } else {
            reject(error);
          }
        });
      });


}

exports.getNextPage = async(strPage) => {

  let $ = cheerio.load(strPage);
  let arrayOfProducts = [];
  
  let pageLinkOfIndex = $('.andes-pagination').children().last().children().first().attr('href');

  return new Promise(function (resolve, reject) {
    request(pageLinkOfIndex, function (error, res, body) {
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
      let price = parseFloat($(this).find('.price__fraction').text().trim().replace(/[.]/g,"") + '.' + 
                            ($(this).find('.price__decimals').text().trim()  || '00'));
      let store = $(this).find('.item__brand-title-tos').text().trim().replace('por ', '') || null;
      let state = $(this).find('.item__status').children('.item__condition').text().trim() || null;  

      var product = new Product(name, link, price, store, state);
      arrayOfProducts.push(product);
  });

  return arrayOfProducts;
}