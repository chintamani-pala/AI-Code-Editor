import { LlmModelConfig } from "@/app/(root)/_components/editor.types";
import { OpenRouter } from "@openrouter/sdk";
import { getOpenRouterLlmAnswer } from "./openrouter";

export const getLlmModelInstance = (modelApiKey: string, modelProvider: string, modelUniqueId?: string) => {
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