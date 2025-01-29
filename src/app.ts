import express, { NextFunction, Request, Response } from "express";
import { BedrockRequest, BedrockError, BedrockResponse } from "./types/bedrock";
import { SERVER_CONFIG } from "./config/config";
import { BedrockService } from "./services/bedrock";

const app = express();

app.use(express.json());

const bedrockService = new BedrockService();

app.get("/", (res: Response) => {
  res.send("Hello World!");
});

app.post(
  "/query",
  async (
    req: Request<{}, BedrockResponse | BedrockError, BedrockRequest>,
    res: Response<BedrockResponse | BedrockError>,
    next: NextFunction,
  ) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        return res.status(400).json({
          error: "Prompt is required",
        } as BedrockError);
      }

      const result = await bedrockService.query(prompt);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server running on port ${SERVER_CONFIG.PORT}`);
});
