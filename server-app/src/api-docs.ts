import swaggerJsdoc, { OAS3Options } from 'swagger-jsdoc';

const options: OAS3Options = {
  failOnErrors: false,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PALS Rest API',
      version: '1.0.0',
      contact: {
        name: 'Chien Kieu (Ryan)',
        url: 'https://pals.sifadns.net',
        email: 'chien.tankieu@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'PALS Rest API URL',
      },
    ],
  },
  apis: ['./routes/*.ts'],
};

export default swaggerJsdoc(options);
