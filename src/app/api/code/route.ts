import { NextResponse } from "next/server";
import { generatePrompt } from "./prompt";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { getLlmModelInstance, llmAnswerMap } from "./modelMap";
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { completionMetadata, modelConfig } = body;
        const { textBeforeCursor, textAfterCursor, language } = completionMetadata;
        const { modelId } = modelConfig
        if (!modelId) {
            return NextResponse.json({
                error: "Model ID is required"
            }, { status: 400 });
        }
        const llmModel = await convex.query(api.llmProviders.getLlmModelById, { modelId });
        if (!llmModel) {
            return NextResponse.json({
                error: "Model not found"
            }, { status: 404 });
        }
        const modelInstance = getLlmModelInstance(llmModel.apiKey, llmModel.modelProvider, llmModel.modelUniqueId)
        const prompt = generatePrompt(language, textBeforeCursor, textAfterCursor)
        const getAnswer = llmAnswerMap[llmModel.modelProvider as keyof typeof llmAnswerMap];

        if (!getAnswer) {
            return NextResponse.json({
                error: "Model provider not supported"
            }, { status: 400 });
        }

        const cleanSuggestion = await getAnswer({ modelInstance, prompt, llmModel })
        return NextResponse.json({
            completion: cleanSuggestion
        });
    } catch (error) {
        console.error("Error generating completion:", error);
        return NextResponse.json(
            { error: "Failed to generate completion" },
            { status: 500 }
        );
    }
}
