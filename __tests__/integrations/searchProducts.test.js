const app = require('../../src/app');
const request = require('supertest')


describe("Search Products", () =>{

    beforeEach(() => {
        jest.setTimeout(10000);
      });

    it("Should returns list of produts", async ()=>{
        
        let find = { 
            search: "relogio", // termo usado na busca 
            limit: 120 // número de registros retornados 
        };

        const response = await request(app)  
                        .post('/findProds')
                        .send(find);

        console.log(response.body.length);
    
        expect(response.status).toBe(200);

    });
});