import React from 'react';

const BankCard = ({ userName, balance }) => {
  const cardNumber = '**** **** **** 1234';
  const expirationDate = '12/25';

  return (
    <div className="w-1/3 bg-gradient-to-r from-purple-700 to-purple-400 text-white p-6 rounded-lg shadow-md mr-4 relative">
      <div className="absolute top-2 right-2">
        <img src="/images/MonTrésor-removebg-preview.png" alt="Logo" className="h-14" />
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold tracking-wider">{cardNumber}</h2>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold tracking-wider">Titulaire</h2>
          <p className="text-sm">{userName}</p>
        </div>
        <div>
          <h3 className="text-md">Date d'expiration</h3>
          <p className="text-sm">{expirationDate}</p>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold tracking-wider">Balance du mois</h2>
        <p className="text-lg font-semibold tracking-wider">{balance} €</p>
      </div>
    </div>
  );
};

export default BankCard;
