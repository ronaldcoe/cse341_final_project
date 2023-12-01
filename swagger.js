const swaggerAutogen = require('swagger-autogen')();  //Week 2

const doc = {
    info: {
        title: "API Tests",
        description: "API for NodeJS"
    },
    host: "localhost:3000",
    schemes: ['http']
    };

const outputFile = './swagger.json';    
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);
