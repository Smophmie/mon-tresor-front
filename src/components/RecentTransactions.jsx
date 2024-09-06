import React from 'react';
import { format } from 'date-fns';

const RecentTransactions = ({ latestTransactions }) => {
  return (
    <div className='w-2/3 bg-white p-4 rounded-lg shadow-md'>
      <h1 className="text-lg">Dernières transactions</h1>
      {latestTransactions.map(transaction => (
        <div key={transaction.id} className="mb-2">
            <p className="text-sm text-gray-600">{format(new Date(transaction.date), 'dd/MM/yyyy')}</p>
            <p className="text-md text-gray-800 font-medium">
                <span>{transaction.name}: </span>
                <span className={`${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                {transaction.type === 'expense' ? '-' : ''}{transaction.amount} €
                </span>
            </p>
        </div>
      ))}
    </div>
  );
}

export default RecentTransactions;
