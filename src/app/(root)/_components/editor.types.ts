import { Monaco } from "@monaco-editor/react";

export interface FetchCompletionItemReturn {
    completion: string | null;
    error?: string;
}

export type MonacoInstance = Monaco;

export interface CompletionProvider {
    trigger: () => void;
    unregister?: () => void;
}

export type LlmModelConfig = {
    _id: string;
    _creationTime: number;
    modelName: string;
    modelProvider: string;
    modelUniqueId: string;
    modelDisplayName: string;
    apiKey: string;
    isPaid: boolean;
}