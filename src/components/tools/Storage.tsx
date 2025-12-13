import { useRef, useState } from "react";

export function useTextStorage(initial: string = "") {
  const [text, setText] = useState(initial);
  const undoStack = useRef<string[]>([]);
  const redoStack = useRef<string[]>([]);

  const updateText = (newText: string) => {
    undoStack.current.push(text);
    redoStack.current = [];
    setText(newText);
  };

  const undo = () => {
    const prev = undoStack.current.pop();
    if (prev === undefined) return;
    redoStack.current.push(text);
    setText(prev);
  };

  const redo = () => {
    const next = redoStack.current.pop();
    if (next === undefined) return;
    undoStack.current.push(text);
    setText(next);
  };

  const clear = () => {
    undoStack.current.push(text);
    redoStack.current = [];
    setText("");
  };

  const saveToLocal = (key: string) => localStorage.setItem(key, text);
  const loadFromLocal = (key: string) => {
    const saved = localStorage.getItem(key);
    if (saved !== null) setText(saved);
  };

  return {
    text,
    setText: updateText,
    undo,
    redo,
    clear,
    saveToLocal,
    loadFromLocal,
  };
}
