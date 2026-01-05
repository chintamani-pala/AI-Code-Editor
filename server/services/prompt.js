export const generatePrompt = (language, textBeforeCursor, textAfterCursor) => {
    return `You are an expert coding assistant. Complete the code following the cursor.
    Language: ${language}
    Context:
    ${textBeforeCursor}<CURSOR>${textAfterCursor}
    
    Only provide the code completion that belongs at <CURSOR>. Do not repeat existing code. Do not wrap in markdown blocks.`;
} 
