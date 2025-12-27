"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import useMounted from "@/hooks/useMounted";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { LlmModelConfig } from "./editor.types";

function ModelSelector() {
    const { isSignedIn, isLoaded } = useUser();
    const [isOpen, setIsOpen] = useState(false);


    const mounted = useMounted();
    const { getLlmModelConfig, setLlmModelConfig } = useCodeEditorStore();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const allModels = useQuery(api.llmProviders.getAllLlmModels);
    const defaultModel = allModels?.find((model) => model.modelName.toLowerCase() === "default");
    // Ensure default language is set for non-signed-in users
    useEffect(() => {
        if (isLoaded && defaultModel) {
            setLlmModelConfig(defaultModel);
        }
    }, [isLoaded, isSignedIn, defaultModel]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!mounted) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Dropdown button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative flex items-center gap-3 px-4 py-2.5 bg-[#1e1e2e]/80 
        rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700`}
            >
                {/* Decoration */}
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 
          rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                />

                {/* Language Label */}
                <span className="text-gray-200 min-w-[80px] text-left group-hover:text-white transition-colors">
                    {getLlmModelConfig()?.modelDisplayName}
                </span>

                <ChevronDownIcon
                    className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300
          ${isOpen ? "rotate-180" : ""}`}
                />
            </motion.button>

            {/* Dropdown menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-[#1e1e2e]/95 backdrop-blur-xl
             rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
                    >
                        <div className="px-3 pb-2 mb-2 border-b border-gray-800/50">
                            <p className="text-xs font-medium text-gray-400">
                                Select LLM Model
                            </p>
                        </div>

                        {/* Language Options */}
                        <div className="max-h-[280px] overflow-y-auto overflow-x-hidden">
                            {allModels?.map((model, index) => {
                                return (
                                    <motion.div
                                        key={model._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative group px-2"
                                    >
                                        <button
                                            className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200`}
                                            onClick={() => {
                                                setLlmModelConfig(model);
                                                setIsOpen(false);
                                            }}
                                        >
                                            {/* Decoration */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                                            {/* Language Label */}
                                            <span className="flex-1 text-left group-hover:text-white transition-colors">
                                                {
                                                    `${model.modelDisplayName}: ${model.modelProvider.charAt(0).toUpperCase() + model.modelProvider.slice(1)} ${model.isPaid ? "(Paid)" : ""}`
                                                }
                                            </span>
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ModelSelector;
