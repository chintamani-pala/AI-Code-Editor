import React from "react";
import { Terminal } from "lucide-react";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";

const StdInput = () => {
  const { stdInput, setStdInput } = useCodeEditorStore();
  return (
    <div
      className="mt-3 relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] 
        rounded-xl p-4 h-[300px] overflow-y-auto font-mono text-sm text-gray-300"
    >
      {/* Header Section */}
      <div className="mb-3">
        <div className="flex items-center gap-3 text-gray-300">
          <Terminal className="w-5 h-5 flex-shrink-0" />
          <h2 className="font-semibold text-lg">Runtime Inputs</h2>
        </div>
      </div>

      {/* Runtime Input Text Area */}
      <div className="mb-4">
        <textarea
          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg 
            text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 h-[200px]
            resize-none overflow-y-auto"
          placeholder="Enter runtime input here..."
          value={stdInput}
          onChange={(e) => setStdInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default StdInput;
