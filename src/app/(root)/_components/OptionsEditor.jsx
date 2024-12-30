"use client";

import React, { act, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, ShareIcon, UploadIcon, SaveIcon } from "lucide-react";
import useMounted from "../../../hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";
import RunButton from "./RunButton";
import UploadFileDialog from "./UploadFileDialog";
import SaveFileDialog from "./SaveFileDialog";

function OptionsEditor({ isSignedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Share Snippet"); // State for selected option
  const mounted = useMounted();
  const dropdownRef = useRef(null);
  const [actionset, setActionset] = useState("share");
  const [isSetActionOpen, setIsSetActionOpen] = useState(false);

  const ACTIONS = [
    { id: "share", label: "Share Snippet", icon: ShareIcon },
    { id: "upload", label: "Upload File", icon: UploadIcon },
    { id: "save", label: "Save File", icon: SaveIcon },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (action) => {
    setSelectedOption(action.label); // Update the button label
    setIsOpen(false); // Close the dropdown
    // Implement logic for each action
    setActionset(action.id);
    setIsSetActionOpen(action.id);
  };

  if (!mounted) return null;

  return isSignedIn ? (
    <div className="relative" ref={dropdownRef}>
      {/* Main Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsSetActionOpen(actionset)}
        className="group relative flex items-center gap-3 px-4 py-2.5 bg-[#1e1e2e]/80 
        rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700"
      >
        {/* Background Decoration */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 
          rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
        />

        {/* Label */}
        <span className="text-gray-200 min-w-[80px] text-left group-hover:text-white transition-colors">
          {selectedOption}
        </span>
        <motion.button
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen(!isOpen);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center gap-3 px-4 py-2.5 bg-[#1e1e2e]/80 border-stone-500 
        rounded-lg transition-all duration-200 border border-gray-800/50 hover:border-gray-700"
        >
          <ChevronDownIcon
            className={`size-4 text-gray-400 transition-all duration-300 group-hover:text-gray-300 
          ${isOpen ? "rotate-180" : ""}`}
          />
        </motion.button>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-[#1e1e2e]/95 
            backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
          >
            <div className="px-2 pb-2 mb-2 border-b border-gray-800/50">
              <p className="text-xs font-medium text-gray-400 px-2">Actions</p>
            </div>

            {ACTIONS.map((action) => (
              <button
                key={action.id}
                onClick={(event) => {
                  event.stopPropagation();
                  handleOptionClick(action);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-800/50 rounded-lg transition-all"
              >
                <action.icon className="size-4 text-gray-400" />
                {action.label}
              </button>
            ))}
          </motion.div>
        )}
        {isSetActionOpen === "share" && (
          <ShareSnippetDialog onClose={() => setIsSetActionOpen(false)} />
        )}
        {isSetActionOpen === "upload" && (
          <UploadFileDialog onClose={() => setIsSetActionOpen(false)} />
        )}
        {isSetActionOpen === "save" && (
          <SaveFileDialog onClose={() => setIsSetActionOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  ) : (
    <RunButton />
  );
}

export default OptionsEditor;
