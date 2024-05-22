import { Transaction } from "./transacoes.interface";

export const transactionsMocked: Transaction[] = [
  {
    _id: '1',
    type: 'despesa',
    amount: 150.00,
    transactionWith: 'Supermercado Central',
    description: 'Compras de alimentos',
    date: '2024-06-01',
    category: 'Alimentação',
    paymentMethod: 'Cartão de Crédito'
  },
  {
    _id: '2',
    type: 'receita',
    amount: 1200.00,
    transactionWith: 'Empresa ABC',
    description: 'Salário mensal',
    date: '2024-06-05',
    category: 'Salário',
    paymentMethod: 'Depósito Bancário'
  },
  {
    _id: '3',
    type: 'despesa',
    amount: 50.00,
    transactionWith: 'Cinema City',
    description: 'Ingresso de cinema',
    date: '2024-06-07',
    category: 'Lazer',
    paymentMethod: 'Pix'
  },
  {
    _id: '4',
    type: 'receita',
    amount: 300.00,
    transactionWith: 'Freelance Job',
    description: 'Projeto de design gráfico',
    date: '2024-06-10',
    category: 'Freelance',
    paymentMethod: 'Pix'
  },
  {
    _id: '5',
    type: 'despesa',
    amount: 200.00,
    transactionWith: 'Restaurante do Mar',
    description: 'Jantar com a família',
    date: '2024-06-12',
    category: 'Restaurante',
    paymentMethod: 'Cartão de Débito'
  },
  {
    _id: '6',
    type: 'receita',
    amount: 450.00,
    transactionWith: 'Renda Extra',
    description: 'Venda de produtos usados',
    date: '2024-06-15',
    category: 'Vendas',
    paymentMethod: 'Pix'
  },
  {
    _id: '7',
    type: 'despesa',
    amount: 90.00,
    transactionWith: 'Loja de Esportes',
    description: 'Equipamento esportivo',
    date: '2024-06-18',
    category: 'Esportes',
    paymentMethod: 'Cartão de Crédito'
  },
  {
    _id: '8',
    type: 'receita',
    amount: 600.00,
    transactionWith: 'Aula Particular',
    description: 'Aulas de inglês',
    date: '2024-06-20',
    category: 'Educação',
    paymentMethod: 'Dinheiro'
  },
  {
    _id: '9',
    type: 'despesa',
    amount: 120.00,
    transactionWith: 'Pet Shop',
    description: 'Cuidados com o pet',
    date: '2024-06-22',
    category: 'Pet',
    paymentMethod: 'Cartão de Débito'
  },
  {
    _id: '10',
    type: 'receita',
    amount: 800.00,
    transactionWith: 'Consultoria Financeira',
    description: 'Consultoria prestada',
    date: '2024-06-25',
    category: 'Consultoria',
    paymentMethod: 'Transferência Bancária'
  },
  {
    _id: '11',
    type: 'despesa',
    amount: 45.00,
    transactionWith: 'Spotify',
    description: 'Assinatura mensal',
    date: '2024-06-28',
    category: 'Música',
    paymentMethod: 'Cartão de Crédito'
  },
  {
    _id: '12',
    type: 'receita',
    amount: 1100.00,
    transactionWith: 'Bônus Trimestral',
    description: 'Bônus de desempenho',
    date: '2024-06-30',
    category: 'Bônus',
    paymentMethod: 'Depósito Bancário'
  },
  {
    _id: '13',
    type: 'despesa',
    amount: 320.00,
    transactionWith: 'Manutenção Automotiva',
    description: 'Revisão do carro',
    date: '2024-07-03',
    category: 'Automotivo',
    paymentMethod: 'Pix'
  },
  {
    _id: '14',
    type: 'receita',
    amount: 2000.00,
    transactionWith: 'Retorno de Investimento',
    description: 'Dividendos recebidos',
    date: '2024-07-05',
    category: 'Investimentos',
    paymentMethod: 'Transferência Bancária'
  },
  {
    _id: '15',
    type: 'despesa',
    amount: 1500.00,
    transactionWith: 'Compra de Equipamento',
    description: 'Nova câmera fotográfica',
    date: '2024-07-08',
    category: 'Eletrônicos',
    paymentMethod: 'Cartão de Crédito'
  }
];
