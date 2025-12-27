import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const getAllLlmModels = query({
    handler: async (ctx) => {
        const llmModels = await ctx.db.query("llmModels").collect();
        return llmModels;
    },
});

export const getLlmModelById = query({
    args: {
        modelId: v.id("llmModels"),
    },
    handler: async (ctx, args) => {
        const llmModel = await ctx.db.get(args.modelId);
        if (!llmModel) throw new Error("LLM Model not found");
        return llmModel;
    },
});
export const addLlmModel = mutation({
    args: {
        modelUniqueId: v.string(),
        modelName: v.string(),
        modelProvider: v.string(),
        modelDisplayName: v.string(),
        isPaid: v.boolean(),
        apiKey: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_user_id")
            .filter((q) => q.eq(q.field("userId"), identity.subject))
            .first();

        if (!user) throw new Error("User not found");

        const modelId = await ctx.db.insert("llmModels", {
            modelUniqueId: args.modelUniqueId,
            modelDisplayName: args.modelName,
            modelName: args.modelName,
            modelProvider: args.modelProvider,
            isPaid: args.isPaid,
            apiKey: args.apiKey,
        });

        return modelId;
    },
});

export const deleteLlmModel = mutation({
    args: {
        modelId: v.id("llmModels"),
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");
        const llmModel = await ctx.db.query("llmModels")
            .withIndex("by_model_id")
            .filter((q) => q.eq(q.field("_id"), args.modelId))
            .first();
        if (!llmModel) throw new Error("LLM Model not found");

        const isDeleted = await ctx.db.patch(llmModel._id, {
            isDeleted: true,
        });
        return isDeleted;
    },
});
