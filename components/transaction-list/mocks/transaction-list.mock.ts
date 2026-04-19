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

export const transactionListMock: Transaction[] = [
  { transactionId: "tx-001", description: "Pro Plan - Monthly", amount: -29.0, currency: "USD", status: "completed", date: "2026-03-28T12:00:00Z" },
  { transactionId: "tx-002", description: "Refund - Support Ticket #412", amount: 15.0, currency: "USD", status: "completed", date: "2026-03-25T09:30:00Z" },
  { transactionId: "tx-003", description: "Add-on: Extra Storage", amount: -9.99, currency: "USD", status: "pending", date: "2026-03-24T16:45:00Z" },
  { transactionId: "tx-004", description: "Enterprise upgrade attempt", amount: -99.0, currency: "USD", status: "failed", date: "2026-03-20T11:00:00Z" },
];
