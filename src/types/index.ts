export type TransactionType = 'payment' | 'credit';

export type TransactionStatus = 'approved' | 'pending';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  name: string;
  description: string;
  date: string;
  status: TransactionStatus;
  icon: string;
  authorizedUser?: string;
  cardUsed?: string;
  percentage?: number;
}

export interface WalletData {
  cardLimit: number;
  cardBalance: number;
  transactions: Transaction[];
  dailyPoints: number;
  seasonStartDate?: string;
}

export interface CardBalanceData {
  limit: number;
  balance: number;
  available: number;
}

