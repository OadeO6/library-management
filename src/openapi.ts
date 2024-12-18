import { z } from 'zod';
import { createDocument } from 'zod-openapi';
import { userloginResponseSchema, userRegistrationResponseSchema, userRegistrationSchema } from './schemas/userSchemas';
import { newBookResponseSchema, newBookSchema } from './schemas/librarySchemas';
import { ErrorResponseSchema } from './schemas/types';

export const api_doc = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'Library Managment',
    version: '1.0.0',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/': {
      get: {
        summary: "Health check endpoint",
        responses: {
          '200': {
            description: 'Health check successful'
          },
        },
      },
    },
    '/user/register': {
      post: {
        operationId: 'registeruser',
        summary: 'User registration',
        requestBody: {
          content: {
            'application/json': { schema: userRegistrationSchema },
          },
        },
        responses: {
          '201': {
            description: '201 OK',
            content: {
              'application/json': { schema: userRegistrationResponseSchema },
            },
          },
          '400': {
            description: '400 data validation error',
            content: {
              'application/json': { schema: ErrorResponseSchema },
            },
          },
          '409': {
            description: '409 User Already Exist',
            content: {
              'application/json': { schema: ErrorResponseSchema },
            },
          },
          '500': {
            description: '500 internal server error',
            content: {
              'application/json': { schema: ErrorResponseSchema },
            },
          },
        },
      },
    },
    '/user/login': {
      post: {
        operationId: 'login',
        summary: 'Get user auth token',
        requestBody: {
          content: {
            'application/json': { schema: userRegistrationSchema },
          },
        },
        responses: {
          '200': {
            description: '200 OK',
            content: {
              'application/json': { schema: userloginResponseSchema },
            },
          },
          '400': {
            description: '400 Data Validation Error',
            content: {
              'application/json': { schema: ErrorResponseSchema },
            },
          },
          '500': {
            description: '500 Internal Server Error',
            content: {
              'application/json': { schema: ErrorResponseSchema },
            },
          },
        },
      },
    },
    '/book/new': {
      post: {
        operationId: 'addbook',
        summary: 'Add new Book to Library',
        requestBody: {
          content: {
            'application/json': { schema: newBookSchema },
          },
        },
        responses: {
          '201': {
            description: '200 OK',
            content: {
              'application/json': { schema: newBookResponseSchema },
            },
          },
          '400': {
            description: '400 data validation error',
            content: {
              'application/json': { schema: ErrorResponseSchema },
            },
          },
          '500': {
            description: '500 Internal Server Error',
            content: {
              'application/json': { schema: ErrorResponseSchema },
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },
  },
});