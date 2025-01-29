import dotenv from "dotenv";
import { BedrockRuntimeClientConfig } from "@aws-sdk/client-bedrock-runtime";

dotenv.config();

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 3000,
};

export const AWS_CONFIG: BedrockRuntimeClientConfig = {
  region: process.env.AWS_REGION,
};
