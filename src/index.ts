import cors from "cors";
import 'zod-openapi/extend';
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';
import { connectDB } from "./connections/db";
// import { createDocument } from 'zod-openapi';
import { z } from 'zod';
import swaggerUi from "swagger-ui-express";
import libraryRouter from "./routes/libraryRoutes";
import { api_doc } from "./openapi";
import { PORT } from "./config/env";

const app = express();

// Express middleware
app.use(cors());
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/book', libraryRouter);

// Error handling middleware
app.use(((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && (err as any).status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }
  next(err); // Forward the error to the default handler
}) as ErrorRequestHandler);

// Zod schema for the health check response
const messageSchema = z.string().openapi({
  description: 'Health check success message',
  example: "Health check successful",
});

// Health check route
app.get("/", (_: Request, res: Response) => {
  res.status(200).json({ message: "Health check successful" });
});

// Swagger documentation route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(api_doc));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    error: "Not Found",
    message: `The endpoint ${req.originalUrl} does not exist.`,
  });
});

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
