import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userId: v.string(),
    email: v.string(),
    name: v.string(),
    isPro: v.boolean(),
    proSince: v.optional(v.number()),
    lemonSqueezyCustomerId: v.optional(v.string()),
    lemonSqueezyOrderId: v.optional(v.string()),
    userType: v.optional(v.string()),
    isDeleted: v.optional(v.boolean()),
  }).index("by_user_id", ["userId"]),

  llmModels: defineTable({
    modelUniqueId: v.string(),
    modelName: v.string(),
    modelDisplayName: v.string(),
    modelProvider: v.string(),
    isPaid: v.boolean(),
    isDeleted: v.optional(v.boolean()),
    apiKey: v.string(),
  }).index("by_model_id", ["modelUniqueId"]),

  codeExecutions: defineTable({
    userId: v.string(),
    language: v.string(),
    code: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
    isDeleted: v.optional(v.boolean()),
  }).index("by_user_id", ["userId"]),

  snippets: defineTable({
    userId: v.string(),
    title: v.string(),
    language: v.string(),
    code: v.string(),
    userName: v.string(), // store user's name for easy access
    isDeleted: v.optional(v.boolean()),
  }).index("by_user_id", ["userId"]),

  snippetComments: defineTable({
    snippetId: v.id("snippets"),
    userId: v.string(),
    userName: v.string(),
    content: v.string(), // This will store HTML content
    isDeleted: v.optional(v.boolean()),
  }).index("by_snippet_id", ["snippetId"]),

  stars: defineTable({
    userId: v.string(),
    snippetId: v.id("snippets"),
    isDeleted: v.optional(v.boolean()),
  })
    .index("by_user_id", ["userId"])
    .index("by_snippet_id", ["snippetId"])
    .index("by_user_id_and_snippet_id", ["userId", "snippetId"]),
});
