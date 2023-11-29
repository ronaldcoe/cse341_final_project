// Importing the swagger-autogen module and creating an instance
const swaggerAutogen = require('swagger-autogen')();
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');  // Swagger-ui-express module for serving the Swagger UI

// Basic information for Swagger documentation
const doc = {
    info: {
        title: "European Premier League API",  
        description: "Get information about the European Premier League", 
    },
    host: "localhost:3000",  
    schemes: ['http']  
};


const outputFile = './swagger.json';   // Defining the path for the generated Swagger JSON file
const endpointsFiles = ['./routes/index.js'];  // Specifying the file(s) where the API endpoints are defined


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {      // Generating Swagger documentation and setting up the Swagger UI
    const swaggerDocument = require('./swagger.json');   // Importing the generated Swagger JSON document
    router.use('/api-docs', swaggerUi.serve);   // Serving the Swagger UI at the '/api-docs' route
    router.get('/api-docs', swaggerUi.setup(swaggerDocument));    // Setting up the Swagger UI to use the imported Swagger document
});


module.exports = router;
