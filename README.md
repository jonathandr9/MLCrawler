# MLCrawler

Api para busca de produtos no site Mercado Livre. Construido em Node.Js com Express.

## Iniciar a aplicação

Navegar até a raiz do projeto e executar o seguinte comando para baixar as dependências do projeto.

```
#baixar as dependências do projeto
npm install

#executar o projeto
npm start
```

## Requisição

Deve ser chamado o método findProds, com a seguinte estrutura aprensentada abaixo

```bash
curl --location --request POST 'http://localhost:3000/findProds' \
--header 'Content-Type: application/json' \
--data-raw '{ 
	"search": "bicicleta",
    "limit": 500 
}'
```
> O dados seram retornados com a seguinte estrutura
![Result](https://i.imgur.com/fqgep3r.png)

## Teste automatizados

Foi utilizado a ferramenta Jest para a execução dos testes automatizados. Para rodar os testes bastar executar o seguinte comando:

```bash
    npm test
```

> Após a finalização dos teste a seguinte saida deve ser apresentada

![terminal](https://i.imgur.com/ELDeg7p.png)
