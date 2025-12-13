import React, { useState, useRef } from "react";
import { useShortcuts } from "../tools/Shortcuts";

type Action = () => void;

const AnimatedButton = ({
  label,
  successLabel,
  onAction,
  triggerRef,
}: {
  label: string;
  successLabel: string;
  onAction: Action;
  triggerRef: React.MutableRefObject<(() => void) | null>;
}) => {
  const [text, setText] = useState(label);

  const run = () => {
    onAction();
    setText(successLabel);
    setTimeout(() => setText(label), 2000);
  };

  triggerRef.current = run;

  return <button onClick={run}>{text}</button>;
};

const Button = ({
  onUndo,
  onRedo,
  onClear,
  onCopy,
}: {
  onUndo?: Action;
  onRedo?: Action;
  onClear?: Action;
  onCopy?: Action;
}) => {
  const undoRef = useRef<(() => void) | null>(null);
  const redoRef = useRef<(() => void) | null>(null);
  const clearRef = useRef<(() => void) | null>(null);
  const copyRef = useRef<(() => void) | null>(null);

  useShortcuts({
    onUndo: () => undoRef.current?.(),
    onRedo: () => redoRef.current?.(),
    onClear: () => clearRef.current?.(),
    onCopy: () => copyRef.current?.(),
  });

  return (
    <div className="buttoncont">
      {onRedo && (
        <AnimatedButton
          label="↪️ Redo"
          successLabel="✅ Done!"
          onAction={onRedo}
          triggerRef={redoRef}
        />
      )}
      {onUndo && (
        <AnimatedButton
          label="↩️ Undo"
          successLabel="✅ Reverted!"
          onAction={onUndo}
          triggerRef={undoRef}
        />
      )}
      {onClear && (
        <AnimatedButton
          label="🗑️ Clear!"
          successLabel="🚮 Cleared!"
          onAction={onClear}
          triggerRef={clearRef}
        />
      )}
      {onCopy && (
        <AnimatedButton
          label="📋 Copy!"
          successLabel="✅ Copied!"
          onAction={onCopy}
          triggerRef={copyRef}
        />
      )}
    </div>
  );
};

export default Button;
