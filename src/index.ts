import cors from "cors";
import 'zod-openapi/extend';
import express from 'express';
import { Response } from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';
import { connectDB } from "./connections/db";
import { createDocument } from 'zod-openapi';
import { z } from 'zod';
import swaggerUi from "swagger-ui-express";

const app = express();
const PORT = 3000;

app.use(cors());
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use('/user', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next();
});

const message = z.string().openapi({
  description: 'message',
  example: "Health check succesfull",
});

const document = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'My API',
    version: '1.0.0',
  },
  paths: {
    '/': {
      get: {
        requestBody: {
          content: {},
        },
        responses: {
          '200': {
            description: 'Health check',
            content: {
              'application/json': { schema: z.object({ message}) },
            },
          },
        },
      },
    },
  },
});

app.get("/", (_, res: Response) => {
  res.status(200).json({ message: "Health check succesfull"});
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(document));

(async ()=> {
  try {
    await connectDB();
    app.listen(PORT);
    console.log('🚀 Server is running on port ' + PORT);
  } catch (err) {
    console.error(err);
  }
})();
