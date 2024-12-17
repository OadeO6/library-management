import cors from "cors";
import 'zod-openapi/extend';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';
import { connectDB } from "./connections/db";
import { createDocument } from 'zod-openapi';
import { z } from 'zod';
import swaggerUi from "swagger-ui-express";
import libraryRouter from "./routes/libraryRoutes";

const app = express();
const PORT: number = 3000;

// Express middleware
app.use(cors());
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/book', libraryRouter);

// Error handling middleware
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && (err as any).status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next(err); // Forward the error to the default handler
});

// Zod schema for the health check response
const messageSchema = z.string().openapi({
  description: 'Health check success message',
  example: "Health check successful",
});

// OpenAPI documentation
const document = createDocument({
  openapi: '3.1.0',
  info: {
    title: 'My API',
    version: '1.0.0',
  },
  paths: {
    '/': {
      get: {
        summary: "Health check endpoint",
        responses: {
          '200': {
            description: 'Health check successful',
            content: {
              'application/json': {
                schema: z.object({ message: messageSchema }),
              },
            },
          },
        },
      },
    },
  },
});

// Health check route
app.get("/", (_: Request, res: Response) => {
  res.status(200).json({ message: "Health check successful" });
});

// Swagger documentation route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(document));

// Start the server
(async () => {
  try {
    await connectDB(); // Connect to the database
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
})();
