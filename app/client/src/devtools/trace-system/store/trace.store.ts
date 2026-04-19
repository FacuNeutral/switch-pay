export type ChangeType = "added" | "removed";

export interface TraceLog {
  id: string;
  dataId: string;
  prev: string;
  next: string;
  added: string[];
  removed: string[];
  timestamp: number;
}

type Listener = () => void;

let logs: TraceLog[] = [];
let counter = 0;
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function pushTrace(log: Omit<TraceLog, "id">) {
  counter++;
  logs = [...logs, { ...log, id: `trace-${counter}` }];
  emit();
}

export function clearTraces() {
  logs = [];
  counter = 0;
  emit();
}

export function getTraces(): TraceLog[] {
  return logs;
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
