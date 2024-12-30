"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import { registerCompletion } from "monacopilot";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, TypeIcon, WandSparkles } from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "../../../hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";
import OptionsEditor from "./OptionsEditor";

function EditorPanel() {
  const [isMobile, setIsMobile] = useState(false);
  const { isSignedIn } = useUser();
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } =
    useCodeEditorStore();
  const [monacoInstance, setMonaco] = useState<any>(null);
  const [completionProvider, setCompletionProvider] = useState<any>(null);

  const mounted = useMounted();
  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.matchMedia("(max-width: 600px)").matches);
    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (editor && monacoInstance) {
      monacoInstance.editor.addEditorAction({
        id: "Clear-editor-code",
        label: "Clear Code",
        contextMenuGroupId: "navigation",
        keybindings: [
          monacoInstance.KeyMod.CtrlCmd |
            monacoInstance.KeyMod.Shift |
            monacoInstance.KeyCode.Delete,
        ],
        run: () => {
          editor.setValue("");
        },
      });
    }
  }, [editor, monacoInstance]);

  // Load saved code when language changes
  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(newCode);

    if (editor && monacoInstance) {
      if (isSignedIn && !completionProvider && !isMobile) {
        // Initialize the completion provider only if the user is signed in and it hasn't been initialized yet
        const completion = registerCompletion(monacoInstance, editor, {
          endpoint: process.env.NEXT_PUBLIC_AI_CODE_API || "",
          language: LANGUAGE_CONFIG[language]?.monacoLanguage || "javascript",
          trigger: "onDemand",
          maxContextLines: 80,
        });
        // setCompletionInstance(completion);

        setCompletionProvider(completion);

        // Bind Ctrl+Space to trigger on-demand completion
        monacoInstance.editor.addEditorAction({
          id: "monacopilot.triggerCompletion",
          label: "Complete Code",
          contextMenuGroupId: "navigation",
          keybindings: [
            monacoInstance.KeyMod.CtrlCmd |
              monacoInstance.KeyMod.Shift |
              monacoInstance.KeyCode.Space,
          ],
          run: () => {
            completion.trigger();
          },
        });
      } else if (!isSignedIn && completionProvider) {
        // Cleanup the completion provider if the user logs out
        if (typeof completionProvider.unregister === "function") {
          completionProvider.unregister();
        }

        // Reset the completionProvider to null
        setCompletionProvider(null);
      }
    }
  }, [isSignedIn, editor, monacoInstance, language, completionProvider]);

  // Load saved font size
  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
  }, [setFontSize]);

  // Handle refresh action
  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };

  // Save editor content to local storage
  const handleEditorChange = (value: string | undefined) => {
    if (value) localStorage.setItem(`editor-code-${language}`, value);
  };

  // Handle font size slider
  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  // Initialize editor on mount
  const handleEditorMount = (
    editorInstance: unknown,
    monacoInstance: unknown
  ) => {
    setEditor(editorInstance); // Store editor instance for later use
    setMonaco(monacoInstance); // Store monaco instance
  };

  // Handle AI Accept logic (insert AI code at cursor position)
  const handleAiAccept = async () => {
    const position = editor.getPosition();

    // Get the model (text content) of the editor
    const model = editor.getModel();
    if (position && model) {
      const lineNumber = position.lineNumber;
      const column = position.column;
      const totalLines = model.getLineCount();

      // Get the text before the cursor
      const textBeforeCursor = model.getValueInRange(
        new monacoInstance.Range(1, 1, lineNumber, column)
      );

      // Get the text after the cursor (you can specify how many characters after you want to get)
      const textAfterCursor = model.getValueInRange(
        new monacoInstance.Range(lineNumber, column, totalLines, 1) // Adjust 50 to the length you want
      );

      try {
        // Call the API endpoint to get AI-generated code
        const response = await fetch(
          process.env.NEXT_PUBLIC_AI_CODE_API || "",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              completionMetadata: {
                language: language,
                textBeforeCursor: textBeforeCursor,
                textAfterCursor: textAfterCursor,
                cursorPosition: { lineNumber, column },
                editorState: { completionMode: "continue" },
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch AI code");
        }

        const data = await response.json();
        const formattedCode = data.completion.trim().replace(/^```|```$/g, "");
        const generatedCode = formattedCode || "";

        // Create a range for where to insert the AI code (at the cursor position)
        const range = new monacoInstance.Range(
          lineNumber,
          column,
          lineNumber,
          column
        );

        // Apply the AI-generated code at the cursor position
        const editOperation = {
          range: range,
          text: generatedCode,
        };

        // Execute the editor operation to insert AI-generated code
        model.pushEditOperations([], [editOperation], () => null);
      } catch (error) {
        console.error("Error fetching AI code:", error);
      }
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
              <Image
                src={"/" + language + ".png"}
                alt="Logo"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">
                {String(language[0]).toUpperCase() + String(language).slice(1)}
              </h2>
              <p className="text-xs text-gray-500">
                Version: {LANGUAGE_CONFIG[language].pistonRuntime.version}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Font Size Slider */}
            <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
              <TypeIcon className="size-4 text-gray-400" />
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) =>
                    handleFontSizeChange(parseInt(e.target.value))
                  }
                  className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>

            {/* Reset Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
              aria-label="Reset to default code"
            >
              <RotateCcwIcon className="size-4 text-gray-400" />
            </motion.button>

            {/* ai accept Button */}
            {isSignedIn && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAiAccept}
                className="block sm:hidden p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
                aria-label="Accept AI Code"
              >
                <WandSparkles className="size-4 text-gray-400" />
              </motion.button>
            )}

            {/* Share Button */}
            <OptionsEditor isSignedIn={isSignedIn} />
          </div>
        </div>

        {/* Editor */}
        <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
          {clerk.loaded && (
            <Editor
              height="600px"
              language={
                LANGUAGE_CONFIG[language]?.monacoLanguage || "javascript"
              }
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={handleEditorMount}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
              }}
            />
          )}
          {!clerk.loaded && <EditorPanelSkeleton />}
        </div>
      </div>

      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
    </div>
  );
}

export default EditorPanel;
