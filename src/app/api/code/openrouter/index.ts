export type getLlmAnswerParams = {
    modelInstance: any,
    prompt: string,
    llmModel: any
}

export const getOpenRouterLlmAnswer = async ({ modelInstance, prompt, llmModel }: getLlmAnswerParams) => {
    const completion = await modelInstance?.chat.send({
        model: `${llmModel.modelUniqueId}`,
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        stream: false,
    });

    const content = completion?.choices[0]?.message?.content;
    let suggestion = "";

    if (typeof content === "string") {
        suggestion = content;
    } else if (Array.isArray(content)) {
        suggestion = content.map((c: any) => c.text || "").join("");
    }

    // Basic cleanup if the model still returns markdown blocks
    const cleanSuggestion = suggestion.replace(/^```[\s\S]*?\n/, "").replace(/```$/, "");

    return cleanSuggestion
}