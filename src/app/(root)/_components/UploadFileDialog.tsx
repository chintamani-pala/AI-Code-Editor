import { useState } from "react";
import { X } from "lucide-react";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import CustomAlert from "../_constants/CustomeAlert";

const allowedExtensions = [
  "txt",
  "js",
  "ts",
  "java",
  "py",
  "php",
  "sqlite3",
  "bf",
  "kt",
  "rs",
  "c",
  "cpp",
  "cs",
  "dart",
  "go",
  "lua",
  "pl",
  "ps1",
  "ps2",
  "rb",
  "swift",
];
function UploadFileDialog({ onClose }: { onClose: () => void }) {
  const [fileName, setFileName] = useState("");
  const [isReading, setIsReading] = useState(false);
  const { editor } = useCodeEditorStore();

  const handleFileChange = (e: unknown) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      CustomAlert("error", "This File Is Not Allowed");
      return;
    }

    setFileName(file.name); // Set the file name for display
    setIsReading(true);

    const reader = new FileReader();

    // Read file content
    reader.onload = (event) => {
      const fileContent = event?.target.result;
      editor.setValue(fileContent); // Set the content to the editor
      setIsReading(false);
    };

    reader.onerror = () => {
      console.error("Error reading file");
      setIsReading(false);
    };

    reader.readAsText(file); // Read file as text
    CustomAlert("success", "File Uploaded Successfully");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e2e] rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Upload File</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Select a file to upload
          </label>
          <input
            type="file"
            accept=".txt,.js,.json,.html,.css,.md" // Allow specific file types
            onChange={handleFileChange}
            className="block w-full text-gray-200 bg-[#181825] border border-[#313244] rounded-lg px-3 py-2 cursor-pointer"
          />
        </div>

        {fileName && (
          <p className="text-sm text-gray-400 mb-4">
            Selected File:{" "}
            <span className="font-medium text-white">{fileName}</span>
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isReading}
            onClick={() => onClose()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isReading ? "Reading..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadFileDialog;
