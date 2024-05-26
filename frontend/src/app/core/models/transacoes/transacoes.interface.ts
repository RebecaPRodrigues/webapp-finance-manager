export interface Transaction {
  _id: string;
  type: 'despesa' | 'receita';
  amount: number;
  transactionWith: string;
  description: string;
  date: string;
  category: string;
  paymentMethod: string;
}
