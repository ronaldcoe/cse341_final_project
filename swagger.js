const swaggerAutogen = require('swagger-autogen')();  //Week 2

const doc = {
    info: {
        title: "API Tests",
        description: "API for NodeJS"
    },
    host: "cse341-final-project-j17k.onrender.com",
    schemes: ['https']
    };

const outputFile = './swagger.json';    
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);
