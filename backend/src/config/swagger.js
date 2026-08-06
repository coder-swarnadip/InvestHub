const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Investment Platform API",
            version: "1.0.0",
            description: "REST API Documentation",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: [
        path.resolve(__dirname, "../routes/*.js").replace(/\\/g, "/"),
    ],
};

module.exports = swaggerJsdoc(options);
