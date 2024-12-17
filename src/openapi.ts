import { z } from 'zod';
import { createDocument } from 'zod-openapi';
import { userloginResponseSchema, userRegistrationResponseSchema, userRegistrationSchema } from './schemas/userSchemas';
import { newBookResponseSchema, newBookSchema } from './schemas/librarySchemas';

export const api_doc = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'Library Managment',
    version: '1.0.0',
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
          '200': {
            description: '200 OK',
            content: {
              'application/json': { schema: userRegistrationResponseSchema },
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
          '200': {
            description: '200 OK',
            content: {
              'application/json': { schema: newBookResponseSchema },
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    },
  },
});
