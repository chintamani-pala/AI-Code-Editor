import express from "express";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import { getLlmModelInstance, llmAnswerMap } from "../services/modelMap.js";
import { generatePrompt } from "../services/prompt.js";

const router = express.Router();
const convex = new ConvexHttpClient(process.env.CONVEX_URL);

router.post("/", async (req, res) => {
    try {
        const { completionMetadata, modelConfig } = req.body;
        const { textBeforeCursor, textAfterCursor, language } = completionMetadata;
        const { modelId } = modelConfig

        const llmModel = await convex.query(api.llmProviders.getLlmModelById, { modelId });

        if (!llmModel) {
            return res.status(404).json({
                error: "Model not found"
            });
        }

        const modelInstance = getLlmModelInstance(llmModel.apiKey, llmModel.modelProvider, llmModel.modelUniqueId)
        const prompt = generatePrompt(language, textBeforeCursor, textAfterCursor)
        const getAnswer = llmAnswerMap[llmModel.modelProvider];

        if (!getAnswer) {
            return res.status(400).json({
                error: "Model provider not supported"
            });
        }

        const cleanSuggestion = await getAnswer({ modelInstance, prompt, llmModel })
        return res.json({
            completion: cleanSuggestion
        });
    } catch (error) {
        console.error("Error generating completion:", error);
        return res.status(500).json({
            error: "Failed to generate completion"
        });
    }
});

export default router;
