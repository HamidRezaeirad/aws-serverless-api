# Implementation

Managing product inventory requires adding products to a product catalog and adding warehouses to store the products.

Develop a backend app that exposes endpoints API for managing inventory with these nine (9) functionality:

- Add product
- Add warehouse
- Stock
- Unstock
- List product
- List warehouses
- List warehouse
- Delete product
- Delete Warehouse

## Backend

Node js (Serverless Framework).

## Frontend

Please use below frontend app in order to login and get JWT token: <br>
[https://master.d353pmvexcu0ug.amplifyapp.com](https://master.d353pmvexcu0ug.amplifyapp.com)

## Below Package Libraries are used:

## Serverless Framework

The Serverless Framework is a free and open-source web framework written using Node.js.

## Auth0

Utilized Auth0 in order to authentication

## Clone

Use [Git](https://git-scm.com/) to clone project in local machine.

```bash
git init
git clone https://github.com/HamidRezaeirad/aws-serverless-api.git
cd aws-serverless-api
```

## Configuration

```
Database Configuration:

Please add mongodb connection string as below:
challenge/product-service/config/dev.json
{
"DB": "mongodb://localhost:27017/smqm"
}

Auth0 public key:

Please add public key to secret.pem
challenge/auth-service/secret.pem

```

## Installation

Use the package manager [npm](https://docs.npmjs.com/cli/install) to install project.

```bash
npm install
sls deploy -v


```

## Postman Document

challenge/docs

## Endpoints:

- POST - https://ky0w93mlsh.execute-api.ap-southeast-1.amazonaws.com/dev/product
- GET - https://ky0w93mlsh.execute-api.ap-southeast-1.amazonaws.com/dev/products
- DELETE - https://ky0w93mlsh.execute-api.ap-southeast-1.amazonaws.com/dev/product/{id}
- POST - https://ky0w93mlsh.execute-api.ap-southeast-1.amazonaws.com/dev/warehouse
- GET - https://ky0w93mlsh.execute-api.ap-southeast-1.amazonaws.com/dev/warehouses
- GET - https://ky0w93mlsh.execute-api.ap-southeast-1.amazonaws.com/dev/warehouse/{id}
- DELETE - https://ky0w93mlsh.execute-api.ap-southeast-1.amazonaws.com/dev/warehouse/{id}
- POST - https://ky0w93mlsh.execute-api.ap-southeast-1.amazonaws.com/dev/addproduct/warehouse/{warehouse_id}/product/{product_id}
- GET - https://ky0w93mlsh.execute-api.ap-southeast-1.amazonaws.com/dev/stock/warehouse/{warehouse_id}/product/{product_id}
- PATCH - https://ky0w93mlsh.execute-api.ap-southeast-1.amazonaws.com/dev/unstock/warehouse/{warehouse_id}/product/{product_id}

## Accessibly

Web application is accessible through below URL and port
<br/>
[https://hif39tok0k.execute-api.ap-southeast-1.amazonaws.com/dev/private](https://hif39tok0k.execute-api.ap-southeast-1.amazonaws.com/dev/private) Auth
<br/>
[https://ky0w93mlsh.execute-api.ap-southeast-1.amazonaws.com](https://ky0w93mlsh.execute-api.ap-southeast-1.amazonaws.com) Product

## License

[MIT](https://choosealicense.com/licenses/mit/)
