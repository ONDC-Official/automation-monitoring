import express from "express";
import { logger } from "./utils/logger";
import dotenv from "dotenv";

// Initialize dotenv to load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

// Start the server
app.listen(port, () => {
  logger.info(`Monitoring service is running on http://localhost:${port}`);
});
