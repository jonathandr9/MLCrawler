const app = require('../../src/app');
const request = require('supertest')


describe("Search Products", () =>{

    it("Should returns list of produts", async ()=>{
        
        let find = { 
            search: "cadeado", // termo usado na busca 
            limit: 10 // número de registros retornados 
        };

        const response = await request(app)  
                        .post('/findProduct')
                        .send(find);

        expect(response.status).toBe(200);

    });
});