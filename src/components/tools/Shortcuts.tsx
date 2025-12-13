import { useEffect } from "react";

interface ShortcutOptions {
  onCopy: () => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
}

export const useShortcuts = ({
  onCopy,
  onClear,
  onUndo,
  onRedo,
}: ShortcutOptions) => {
  useEffect(() => {
    const map: Record<string, () => void> = {
      "ctrl+c": onCopy,
      "ctrl+x": onClear,
      "ctrl+z": onUndo,
      "ctrl+shift+z": onRedo,
    };

    const handler = (e: KeyboardEvent) => {
      const key = `${e.ctrlKey ? "ctrl+" : ""}${
        e.shiftKey ? "shift+" : ""
      }${e.key.toLowerCase()}`;
      const action = map[key];
      if (action) {
        e.preventDefault();
        action();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCopy, onClear, onUndo, onRedo]);
};
