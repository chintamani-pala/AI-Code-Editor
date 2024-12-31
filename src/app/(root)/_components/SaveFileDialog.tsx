import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import CustomAlert from "../_constants/CustomeAlert";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { LANGUAGE_EXTENSIONS_MAPPING } from "../_constants";

function SaveFileDialog({ onClose }: { onClose: () => void }) {
  const [fileName, setFileName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { language, editor } = useCodeEditorStore();

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    if (!fileName) {
      CustomAlert("error", "File Name Is Required");
      return;
    }
    e.preventDefault();
    setIsSaving(true);
    try {
      const fileExtension = LANGUAGE_EXTENSIONS_MAPPING[language];
      const code = editor.getValue();
      const blob = new Blob([code], { type: "text/plain" });

      const file = new File([blob], `${fileName}.${fileExtension}`, {
        type: "text/plain",
      });
      const a = document.createElement("a");
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = file.name; // Set the filename
      document.body.appendChild(a);
      a.click(); // Trigger the download
      document.body.removeChild(a); // Clean up the DOM
      URL.revokeObjectURL(url); // Release memory
      onClose();
      CustomAlert("success", "File saved successfully");
    } catch (error) {
      console.log("Error saving file:", error);
      CustomAlert("error", "Error saving file");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e2e] rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Save File</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => handleSave(e)}>
          <div className="mb-4">
            <label
              htmlFor="fileName"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              File Name (without Extension)
            </label>
            <input
              type="text"
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3 py-2 bg-[#181825] border border-[#313244] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter file name"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
              disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SaveFileDialog;
