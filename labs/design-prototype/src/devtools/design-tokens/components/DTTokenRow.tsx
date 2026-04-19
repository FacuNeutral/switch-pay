//* @type Integration Component
//* @context Design Tokens
//* @utility Fila individual de token con preview visual y editor inline según tipo de dato.

import { useState, useRef, useEffect } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { useDesignTokensStore } from "../store/design-tokens.slice";
import type { DesignToken } from "../store/design-tokens.mock";

interface DTTokenRowProps {
  token: DesignToken;
}

export default function DTTokenRow({ token }: DTTokenRowProps) {
  const updateToken = useDesignTokensStore((s) => s.updateToken);
  const resetToken = useDesignTokensStore((s) => s.resetToken);
  const setEditingToken = useDesignTokensStore((s) => s.setEditingToken);
  const pendingChanges = useDesignTokensStore((s) => s.pendingChanges);
  const rawTokens = useDesignTokensStore((s) => s.rawTokens);

  const isModified = token.key in pendingChanges;
  const currentValue = isModified ? pendingChanges[token.key] : token.value;

  return (
    <div
      className={`
        flex items-center gap-3 px-3 py-2 rounded-(--radius-debug-tab) group
        transition-colors duration-150
        ${isModified
          ? "bg-debug-primary/5 border border-debug-primary/20"
          : "hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark border border-transparent"
        }
      `}
    >
      {/* <Tag> Token Label */}
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-debug-text dark:text-debug-text-dark truncate block">
          {token.label}
        </span>
        <span className="text-[10px] text-debug-text-muted dark:text-debug-text-muted-dark font-mono truncate block">
          {token.key}
        </span>
      </div>

      {/* <Tag> Token Preview + Editor */}
      <div className="flex items-center gap-2 shrink-0">
        <TokenPreview token={token} value={currentValue} />
        <TokenEditor token={token} value={currentValue} onChange={(v) => updateToken(token.key, v)} />
      </div>

      {/* <Tag> Reset Button */}
      {isModified && (
        <button
          onClick={() => resetToken(token.key)}
          className="p-1 rounded-(--radius-debug-tab) text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-primary transition-colors duration-150"
          title="Reset to original"
        >
          <RotateCcw size={12} />
        </button>
      )}
    </div>
  );
}

// ==========================================
// Token Preview
// ==========================================

function TokenPreview({ token, value }: { token: DesignToken; value: string }) {
  switch (token.type) {
    case "color":
      return (
        <div
          className="w-7 h-7 rounded-(--radius-debug-tab) border border-debug-border dark:border-debug-border-dark shadow-sm shrink-0"
          style={{ backgroundColor: value }}
        />
      );
    case "font-family":
      return (
        <span className="text-xs text-debug-text dark:text-debug-text-dark" style={{ fontFamily: value }}>
          Abc
        </span>
      );
    case "shadow":
      return (
        <div
          className="w-7 h-7 rounded-(--radius-debug-tab) bg-debug-surface dark:bg-debug-surface-raised-dark shrink-0"
          style={{ boxShadow: value }}
        />
      );
    case "dimension":
    case "blur":
      return (
        <span className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark min-w-16 text-right">
          {value}
        </span>
      );
    case "opacity":
      return (
        <div className="flex items-center gap-1">
          <div
            className="w-7 h-7 rounded-(--radius-debug-tab) bg-debug-primary shrink-0"
            style={{ opacity: parseFloat(value) }}
          />
          <span className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark">
            {value}
          </span>
        </div>
      );
    case "font-weight":
      return (
        <span className="text-xs text-debug-text dark:text-debug-text-dark" style={{ fontWeight: value }}>
          Aa
        </span>
      );
    case "z-index":
      return (
        <span className="text-[10px] font-mono text-debug-accent min-w-12 text-right">
          {value}
        </span>
      );
    default:
      return (
        <span className="text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark max-w-32 truncate text-right">
          {value}
        </span>
      );
  }
}

// ==========================================
// Token Editor
// ==========================================

function TokenEditor({ token, value, onChange }: { token: DesignToken; value: string; onChange: (v: string) => void }) {
  const setEditingToken = useDesignTokensStore((s) => s.setEditingToken);

  // Color → abre modal
  if (token.type === "color") {
    return (
      <button
        onClick={() => setEditingToken(token)}
        className="px-2 py-1 rounded-(--radius-debug-tab) text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark border border-debug-border dark:border-debug-border-dark transition-colors duration-150"
      >
        {value}
      </button>
    );
  }

  // Dimension values (rem, px) → increment/decrement
  if (token.type === "dimension" || token.type === "blur") {
    return <DimensionEditor value={value} onChange={onChange} />;
  }

  // Font weight → increment/decrement by 100
  if (token.type === "font-weight") {
    return <WeightEditor value={value} onChange={onChange} />;
  }

  // Z-index → number input
  if (token.type === "z-index") {
    return <NumberEditor value={value} onChange={onChange} step={1} />;
  }

  // Opacity → number input with 0.1 step
  if (token.type === "opacity") {
    return <NumberEditor value={value} onChange={onChange} step={0.1} min={0} max={1} />;
  }

  // Font family, shadow, easing, animation, aspect-ratio → text input
  return <TextEditor value={value} onChange={onChange} />;
}

// ==========================================
// Dimension Editor (rem/px increment/decrement)
// ==========================================

function DimensionEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const parsed = parseFloat(value);
  const unit = value.replace(/[\d.]/g, "").trim() || "rem";
  const step = unit === "px" ? 1 : 0.125;

  const increment = () => {
    const next = Math.round((parsed + step) * 1000) / 1000;
    onChange(`${next}${unit}`);
  };

  const decrement = () => {
    const next = Math.max(0, Math.round((parsed - step) * 1000) / 1000);
    onChange(`${next}${unit}`);
  };

  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setText(value); }, [value]);

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => { onChange(text); setEditing(false); }}
        onKeyDown={(e) => {
          if (e.key === "Enter") { onChange(text); setEditing(false); }
          if (e.key === "Escape") { setText(value); setEditing(false); }
        }}
        autoFocus
        className="w-20 px-1.5 py-0.5 rounded-(--radius-debug-tab) text-[10px] font-mono bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark text-debug-text dark:text-debug-text-dark border border-debug-border-active dark:border-debug-border-active-dark outline-none"
      />
    );
  }

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={decrement}
        className="p-0.5 rounded text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark transition-colors"
      >
        <Minus size={10} />
      </button>
      <button
        onClick={() => setEditing(true)}
        className="px-1.5 py-0.5 rounded-(--radius-debug-tab) text-[10px] font-mono text-debug-text dark:text-debug-text-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150 min-w-14 text-center"
      >
        {value}
      </button>
      <button
        onClick={increment}
        className="p-0.5 rounded text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark transition-colors"
      >
        <Plus size={10} />
      </button>
    </div>
  );
}

// ==========================================
// Weight Editor (100-step increments)
// ==========================================

function WeightEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const num = parseInt(value) || 400;
  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={() => onChange(String(Math.max(100, num - 100)))}
        className="p-0.5 rounded text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark transition-colors"
      >
        <Minus size={10} />
      </button>
      <span className="px-1.5 py-0.5 text-[10px] font-mono text-debug-text dark:text-debug-text-dark min-w-8 text-center">
        {value}
      </span>
      <button
        onClick={() => onChange(String(Math.min(900, num + 100)))}
        className="p-0.5 rounded text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark transition-colors"
      >
        <Plus size={10} />
      </button>
    </div>
  );
}

// ==========================================
// Number Editor
// ==========================================

function NumberEditor({ value, onChange, step = 1, min, max }: { value: string; onChange: (v: string) => void; step?: number; min?: number; max?: number }) {
  const num = parseFloat(value) || 0;
  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={() => {
          let next = Math.round((num - step) * 1000) / 1000;
          if (min !== undefined) next = Math.max(min, next);
          onChange(String(next));
        }}
        className="p-0.5 rounded text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark transition-colors"
      >
        <Minus size={10} />
      </button>
      <span className="px-1.5 py-0.5 text-[10px] font-mono text-debug-text dark:text-debug-text-dark min-w-10 text-center">
        {value}
      </span>
      <button
        onClick={() => {
          let next = Math.round((num + step) * 1000) / 1000;
          if (max !== undefined) next = Math.min(max, next);
          onChange(String(next));
        }}
        className="p-0.5 rounded text-debug-text-muted dark:text-debug-text-muted-dark hover:text-debug-text dark:hover:text-debug-text-dark transition-colors"
      >
        <Plus size={10} />
      </button>
    </div>
  );
}

// ==========================================
// Text Editor
// ==========================================

function TextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  useEffect(() => { setText(value); }, [value]);

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="px-2 py-0.5 rounded-(--radius-debug-tab) text-[10px] font-mono text-debug-text-muted dark:text-debug-text-muted-dark hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark border border-transparent hover:border-debug-border dark:hover:border-debug-border-dark transition-colors duration-150 max-w-40 truncate text-right"
      >
        {value}
      </button>
    );
  }

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => { onChange(text); setEditing(false); }}
      onKeyDown={(e) => {
        if (e.key === "Enter") { onChange(text); setEditing(false); }
        if (e.key === "Escape") { setText(value); setEditing(false); }
      }}
      autoFocus
      className="w-40 px-1.5 py-0.5 rounded-(--radius-debug-tab) text-[10px] font-mono bg-debug-surface-overlay dark:bg-debug-surface-overlay-dark text-debug-text dark:text-debug-text-dark border border-debug-border-active dark:border-debug-border-active-dark outline-none"
    />
  );
}
