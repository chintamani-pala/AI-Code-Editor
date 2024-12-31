import { Monaco } from "@monaco-editor/react";
import { Theme } from "../../../types";

type LanguageConfig = Record<
  string,
  {
    isProReq: boolean;
    id: string;
    label: string;
    logoPath: string;
    pistonRuntime: { language: string; version: string };
    monacoLanguage: string;
    defaultCode: string;
  }
>;

export const LANGUAGE_CONFIG: LanguageConfig = {
  javascript: {
    isProReq: false,
    id: "javascript",
    label: "JavaScript",
    logoPath: "/javascript.png",
    pistonRuntime: { language: "javascript", version: "18.15.0" },
    monacoLanguage: "javascript",
    defaultCode: `// JavaScript Playground
const numbers = [1, 2, 3, 4, 5];

// Map numbers to their squares
const squares = numbers.map(n => n * n);
console.log('Original numbers:', numbers);
console.log('Squared numbers:', squares);

// Filter for even numbers
const evenNumbers = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evenNumbers);

// Calculate sum using reduce
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('Sum of numbers:', sum);`,
  },
  typescript: {
    isProReq: false,
    id: "typescript",
    label: "TypeScript",
    logoPath: "/typescript.png",
    pistonRuntime: { language: "typescript", version: "5.0.3" },
    monacoLanguage: "typescript",
    defaultCode: `// TypeScript Playground
const message: string = "Hello, TypeScript!";
console.log(message);`,
  },
  java: {
    isProReq: false,
    id: "java",
    label: "Java",
    logoPath: "/java.png",
    pistonRuntime: { language: "java", version: "15.0.2" },
    monacoLanguage: "java",
    defaultCode: `// Java Playground
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`,
  },
  python: {
    isProReq: false,
    id: "python",
    label: "Python",
    logoPath: "/python.png",
    pistonRuntime: { language: "python", version: "3.10.0" },
    monacoLanguage: "python",
    defaultCode: `# Python Playground
print("Hello, Python!")`,
  },
  php: {
    isProReq: false,
    id: "php",
    label: "PHP",
    logoPath: "/php.png",
    pistonRuntime: { language: "php", version: "8.2.3" },
    monacoLanguage: "php",
    defaultCode: `<?php
// PHP Playground
echo "Hello, PHP!";
?>`,
  },
  sqlite3: {
    isProReq: false,
    id: "sqlite3",
    label: "SQLite3",
    logoPath: "/sqlite3.png",
    pistonRuntime: { language: "sqlite3", version: "3.36.0" },
    monacoLanguage: "sql",
    defaultCode: `-- SQLite3 Playground
SELECT 'Hello, SQLite3!';`,
  },
  brainfuck: {
    isProReq: false,
    id: "brainfuck",
    label: "Brainfuck",
    logoPath: "/brainfuck.png",
    pistonRuntime: { language: "brainfuck", version: "2.7.3" },
    monacoLanguage: "brainfuck",
    defaultCode: `// Brainfuck Playground
++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.>---.+++++.`,
  },
  kotlin: {
    isProReq: true,
    id: "kotlin",
    label: "Kotlin",
    logoPath: "/kotlin.png",
    pistonRuntime: { language: "kotlin", version: "1.8.20" },
    monacoLanguage: "kotlin",
    defaultCode: `// Kotlin Playground
fun main() {
    println("Hello, Kotlin!")
}`,
  },
  rust: {
    isProReq: true,
    id: "rust",
    label: "Rust",
    logoPath: "/rust.png",
    pistonRuntime: { language: "rust", version: "1.68.2" },
    monacoLanguage: "rust",
    defaultCode: `// Rust Playground
fn main() {
    println!("Hello, Rust!");
}`,
  },
  c: {
    isProReq: true,
    id: "c",
    label: "C",
    logoPath: "/c.png",
    pistonRuntime: { language: "c", version: "10.2.0" },
    monacoLanguage: "c",
    defaultCode: `// C Playground
#include <stdio.h>
int main() {
    printf("Hello, C!");
    return 0;
}`,
  },
  "c++": {
    isProReq: true,
    id: "c++",
    label: "C++",
    logoPath: "/cpp.png",
    pistonRuntime: { language: "c++", version: "10.2.0" },
    monacoLanguage: "cpp",
    defaultCode: `// C++ Playground
#include <iostream>
int main() {
    std::cout << "Hello, C++!";
    return 0;
}`,
  },

  csharp: {
    isProReq: true,
    id: "csharp",
    label: "C#",
    logoPath: "/csharp.png",
    pistonRuntime: { language: "csharp", version: "6.12.0" },
    monacoLanguage: "csharp",
    defaultCode: `// C# Playground
using System;
class Program {
    static void Main() {
        Console.WriteLine("Hello, C#!");
    }
}`,
  },
  dart: {
    isProReq: true,
    id: "dart",
    label: "Dart",
    logoPath: "/dart.png",
    pistonRuntime: { language: "dart", version: "2.19.6" },
    monacoLanguage: "dart",
    defaultCode: `// Dart Playground
void main() {
  print('Hello, Dart!');
}`,
  },

  go: {
    isProReq: true,
    id: "go",
    label: "Go",
    logoPath: "/go.png",
    pistonRuntime: { language: "go", version: "1.16.2" },
    monacoLanguage: "go",
    defaultCode: `// Go Playground
package main
import "fmt"
func main() {
    fmt.Println("Hello, Go!")
}`,
  },

  lua: {
    isProReq: true,
    id: "lua",
    label: "Lua",
    logoPath: "/lua.png",
    pistonRuntime: { language: "lua", version: "5.4.4" },
    monacoLanguage: "lua",
    defaultCode: `-- Lua Playground
print("Hello, Lua!")`,
  },

  perl: {
    isProReq: true,
    id: "perl",
    label: "Perl",
    logoPath: "/perl.png",
    pistonRuntime: { language: "perl", version: "5.36.0" },
    monacoLanguage: "perl",
    defaultCode: `# Perl Playground
print "Hello, Perl!\n";`,
  },

  powershell: {
    isProReq: true,
    id: "powershell",
    label: "PowerShell",
    logoPath: "/powershell.png",
    pistonRuntime: { language: "powershell", version: "7.1.4" },
    monacoLanguage: "powershell",
    defaultCode: `# PowerShell Playground
Write-Host "Hello, PowerShell!"`,
  },

  ruby: {
    isProReq: true,
    id: "ruby",
    label: "Ruby",
    logoPath: "/ruby.png",
    pistonRuntime: { language: "ruby", version: "3.0.1" },
    monacoLanguage: "ruby",
    defaultCode: `# Ruby Playground
puts "Hello, Ruby!"`,
  },

  swift: {
    isProReq: true,
    id: "swift",
    label: "Swift",
    logoPath: "/swift.png",
    pistonRuntime: { language: "swift", version: "5.3.3" },
    monacoLanguage: "swift",
    defaultCode: `// Swift Playground
import Swift
print("Hello, Swift!")`,
  },
};

export const THEMES: Theme[] = [
  { id: "vs-dark", label: "VS Dark", color: "#1e1e1e" },
  { id: "vs-light", label: "VS Light", color: "#ffffff" },
  { id: "github-dark", label: "GitHub Dark", color: "#0d1117" },
  { id: "monokai", label: "Monokai", color: "#272822" },
  { id: "solarized-dark", label: "Solarized Dark", color: "#002b36" },
];

export const THEME_DEFINITONS = {
  "github-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6e7681" },
      { token: "string", foreground: "a5d6ff" },
      { token: "keyword", foreground: "ff7b72" },
      { token: "number", foreground: "79c0ff" },
      { token: "type", foreground: "ffa657" },
      { token: "class", foreground: "ffa657" },
      { token: "function", foreground: "d2a8ff" },
      { token: "variable", foreground: "ffa657" },
      { token: "operator", foreground: "ff7b72" },
    ],
    colors: {
      "editor.background": "#0d1117",
      "editor.foreground": "#c9d1d9",
      "editor.lineHighlightBackground": "#161b22",
      "editorLineNumber.foreground": "#6e7681",
      "editorIndentGuide.background": "#21262d",
      "editor.selectionBackground": "#264f78",
      "editor.inactiveSelectionBackground": "#264f7855",
    },
  },
  monokai: {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "75715E" },
      { token: "string", foreground: "E6DB74" },
      { token: "keyword", foreground: "F92672" },
      { token: "number", foreground: "AE81FF" },
      { token: "type", foreground: "66D9EF" },
      { token: "class", foreground: "A6E22E" },
      { token: "function", foreground: "A6E22E" },
      { token: "variable", foreground: "F8F8F2" },
      { token: "operator", foreground: "F92672" },
    ],
    colors: {
      "editor.background": "#272822",
      "editor.foreground": "#F8F8F2",
      "editorLineNumber.foreground": "#75715E",
      "editor.selectionBackground": "#49483E",
      "editor.lineHighlightBackground": "#3E3D32",
      "editorCursor.foreground": "#F8F8F2",
      "editor.selectionHighlightBackground": "#49483E",
    },
  },
  "solarized-dark": {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "586e75" },
      { token: "string", foreground: "2aa198" },
      { token: "keyword", foreground: "859900" },
      { token: "number", foreground: "d33682" },
      { token: "type", foreground: "b58900" },
      { token: "class", foreground: "b58900" },
      { token: "function", foreground: "268bd2" },
      { token: "variable", foreground: "b58900" },
      { token: "operator", foreground: "859900" },
    ],
    colors: {
      "editor.background": "#002b36",
      "editor.foreground": "#839496",
      "editorLineNumber.foreground": "#586e75",
      "editor.selectionBackground": "#073642",
      "editor.lineHighlightBackground": "#073642",
      "editorCursor.foreground": "#839496",
      "editor.selectionHighlightBackground": "#073642",
    },
  },
};

// Helper function to define themes in Monaco
export const defineMonacoThemes = (monaco: Monaco) => {
  Object.entries(THEME_DEFINITONS).forEach(([themeName, themeData]) => {
    monaco.editor.defineTheme(themeName, {
      base: themeData.base,
      inherit: themeData.inherit,
      rules: themeData.rules.map((rule) => ({
        ...rule,
        foreground: rule.foreground,
      })),
      colors: themeData.colors,
    });
  });
};

interface LANGUAGE_EXTENSIONS {
  [key: string]: string;
}

export const LANGUAGE_EXTENSIONS_MAPPING: LANGUAGE_EXTENSIONS = {
  javascript: "js",
  typescript: "ts",
  java: "java",
  python: "py",
  php: "php",
  sqlite3: "sqlite3",
  brainfuck: "bf",
  kotlin: "kt",
  rust: "rs",
  c: "c",
  "c++": "cpp",
  csharp: "cs",
  dart: "dart",
  go: "go",
  lua: "lua",
  perl: "pl",
  powershell: "ps1",
  ruby: "rb",
  swift: "swift",
};
