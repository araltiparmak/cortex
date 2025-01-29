import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { AWS_CONFIG } from "../config/config";
import { BedrockModelResponse, BedrockResponse } from "../types/bedrock";

export class BedrockService {
  private client: BedrockRuntimeClient;

  constructor() {
    this.client = new BedrockRuntimeClient(AWS_CONFIG);
  }

  async query(prompt: string): Promise<BedrockResponse> {
    const input = {
      modelId: "amazon.nova-micro-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    };

    const command = new InvokeModelCommand(input);
    const response = await this.client.send(command);
    const responseBody = JSON.parse(
      new TextDecoder().decode(response.body),
    ) as BedrockModelResponse;

    return {
      response: responseBody.output.message.content[0].text,
    };
  }
}
