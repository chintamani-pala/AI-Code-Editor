import { OpenRouter } from "@openrouter/sdk";
import { getOpenRouterLlmAnswer } from "./openrouter/index.js";

export const getLlmModelInstance = (modelApiKey, modelProvider, modelUniqueId) => {
    switch (modelProvider) {
        case "openrouter":
            const openRouter = new OpenRouter({
                apiKey: modelApiKey,
            });
            return openRouter;
        default:
            return null;
    }
}

export const llmAnswerMap = {
    openrouter: getOpenRouterLlmAnswer
}
