import { useState, useCallback } from "react";
import {
  componentRegistry,
  type RegistryEntry,
} from "../../registry/component-registry";

interface ComponentPreviewProps {
  componentName: string | null;
}

export function ComponentPreview({ componentName }: ComponentPreviewProps) {
  if (!componentName) {
    return (
      <div
        data-component="ComponentPreview"
        className="flex items-center justify-center h-full text-zinc-600 text-sm"
      >
        Selecciona un componente para ver el preview
      </div>
    );
  }

  const entry = componentRegistry[componentName];
  if (!entry) {
    return (
      <div
        data-component="ComponentPreview"
        className="flex items-center justify-center h-full text-zinc-500 text-sm"
      >
        Preview no disponible para "{componentName}"
      </div>
    );
  }

  return (
    <div data-component="ComponentPreview" className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2 px-1">
        <span className="text-xs text-zinc-500">Live Preview</span>
        <span className="text-xs bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded">
          {entry.family}
        </span>
      </div>
      <div className="flex-1 flex items-start justify-center overflow-auto rounded-xl border border-zinc-800 bg-zinc-950/50 p-6">
        <PreviewRenderer entry={entry} componentName={componentName} />
      </div>
    </div>
  );
}

function PreviewRenderer({
  entry,
  componentName,
}: {
  entry: RegistryEntry;
  componentName: string;
}) {
  if (entry.family === "input") {
    return <InputPreview entry={entry} componentName={componentName} />;
  }

  const Component = entry.component;
  return (
    <div className="w-full max-w-sm">
      <Component {...entry.defaultProps} />
    </div>
  );
}

function InputPreview({
  entry,
  componentName,
}: {
  entry: RegistryEntry;
  componentName: string;
}) {
  const Component = entry.component;

  // TagInput: controlled string[]
  const [tags, setTags] = useState<string[]>(
    componentName === "TagInput" ? entry.defaultProps.value : []
  );

  // RatingInput: controlled number
  const [rating, setRating] = useState<number>(
    componentName === "RatingInput" ? entry.defaultProps.value : 0
  );

  // DateRangeSelector: controlled start/end
  const [dateStart, setDateStart] = useState<string>(
    componentName === "DateRangeSelector"
      ? entry.defaultProps.startDate
      : ""
  );
  const [dateEnd, setDateEnd] = useState<string>(
    componentName === "DateRangeSelector" ? entry.defaultProps.endDate : ""
  );

  const handleDateChange = useCallback((start: string, end: string) => {
    setDateStart(start);
    setDateEnd(end);
  }, []);

  if (componentName === "TagInput") {
    return (
      <div className="w-full max-w-sm">
        <Component
          {...entry.defaultProps}
          value={tags}
          onChange={setTags}
        />
      </div>
    );
  }

  if (componentName === "RatingInput") {
    return (
      <div className="w-full max-w-sm">
        <Component
          {...entry.defaultProps}
          value={rating}
          onChange={setRating}
        />
      </div>
    );
  }

  if (componentName === "DateRangeSelector") {
    return (
      <div className="w-full max-w-sm">
        <Component
          {...entry.defaultProps}
          startDate={dateStart}
          endDate={dateEnd}
          onChange={handleDateChange}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <Component {...entry.defaultProps} />
    </div>
  );
}
