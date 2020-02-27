const app = require('../../src/app');
const request = require('supertest')


describe("Search Products", () =>{

    beforeEach(() => {
        jest.setTimeout(100000);
      });

    it("Should returns 200", async ()=>{
        
        let find = { 
            search: "relogio", // termo usado na busca 
            limit: 1 // número de registros retornados 
        };

        const response = await request(app)  
                        .post('/findProds')
                        .send(find);        
    
        expect(response.status).toBe(200);

    });

    it("Should returns array legth 135", async ()=>{
        
        let find = { 
            search: "bicicleta", // termo usado na busca 
            limit: 135 // número de registros retornados 
        };

        const response = await request(app)  
                        .post('/findProds')
                        .send(find);
    
        expect(response.body.length).toBe(135);

    });

    it("Should returns array legth 500", async ()=>{
        
        let find = { 
            search: "bicicleta", // termo usado na busca 
            limit: 500 // número de registros retornados 
        };

        const response = await request(app)  
                        .post('/findProds')
                        .send(find);
        
        
    
        expect(response.body.length).toBe(500);

    });


    it("Should returns status 404", async ()=>{
        
        let find = { 
            search: "safdffvfsdvcsdçlkvjndsvdljnvdjkvndlvkjbldhdbjkg", // termo usado na busca 
            limit: 10 // número de registros retornados 
        };

        const response = await request(app)  
                        .post('/findProds')
                        .send(find);
    
        expect(response.status).toBe(404);

    });

    it("Should does not return null name, link and price", async ()=>{
        
        let find = { 
            search: "relogio", // termo usado na busca 
            limit: 500 // número de registros retornados 
        };

        let nullReturns = false;

        const response = await request(app)  
                        .post('/findProds')
                        .send(find);

        response.body.forEach((item) =>{

            if(item.name === null || item.links === null || item.price === null){
               
                nullReturns = true;
            }            
        });
    
        expect(nullReturns).toBe(false);

    });



});