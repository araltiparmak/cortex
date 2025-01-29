export interface BedrockRequest {
  prompt: string;
}

export interface BedrockModelResponse {
  output: {
    message: {
      content: Array<{
        text: string;
      }>;
    };
  };
}

export interface BedrockResponse {
  response: string;
}

export interface BedrockError {
  error: string;
}
