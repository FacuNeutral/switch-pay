import { useState } from "react";

export interface Transaction {
  transactionId: string;
  description: string;
  amount: number;
  currency?: string;
  status: "completed" | "pending" | "failed";
  date: string;
}

export interface TransactionListProps {
  transactions: Transaction[];
  onSelect?: (id: string) => void;
}

const statusColors: Record<Transaction["status"], string> = {
  completed: "bg-emerald-500/15 text-emerald-400",
  pending: "bg-amber-500/15 text-amber-400",
  failed: "bg-red-500/15 text-red-400",
};

export function TransactionList({ transactions, onSelect }: TransactionListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (transactions.length === 0) {
    return (
      <div data-component="TransactionList" className="p-6 text-center text-zinc-500 text-sm">
        No transactions
      </div>
    );
  }

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  function handleClick(id: string) {
    setSelectedId(id);
    onSelect?.(id);
  }

  return (
    <div data-component="TransactionList" className="flex flex-col divide-y divide-zinc-800">
      {sorted.map((tx) => {
        const isSelected = selectedId === tx.transactionId;
        const formattedDate = new Date(tx.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        const sign = tx.amount < 0 ? "-" : "+";
        const abs = Math.abs(tx.amount).toFixed(2);
        const cur = tx.currency ?? "USD";

        return (
          <div
            key={tx.transactionId}
            className={`flex items-center gap-4 px-4 py-3 transition-colors cursor-pointer hover:bg-zinc-800/40 ${
              isSelected ? "border-l-2 border-indigo-500 bg-zinc-800/30" : "border-l-2 border-transparent"
            }`}
            onClick={() => handleClick(tx.transactionId)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm text-zinc-200 truncate">{tx.description}</p>
              <p className="text-xs text-zinc-600">{formattedDate}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[tx.status]}`}>
              {tx.status}
            </span>
            <span
              className={`text-sm font-mono font-medium tabular-nums ${
                tx.amount < 0 ? "text-zinc-300" : "text-emerald-400"
              }`}
            >
              {sign}${abs} {cur}
            </span>
          </div>
        );
      })}
    </div>
  );
}
