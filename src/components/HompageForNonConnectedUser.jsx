import React from 'react';
import { Link } from 'react-router-dom';

const HomepageForNonConnectedUser = () => {
  return (
    <div className="container">
      <h1 className="text-xl">Rejoignez-nous !</h1>
      <p className="text-gray-700 mb-4">
        Créez un compte pour bénéficier d'une gestion complète de vos finances. 
        Suivez vos transactions, et obtenez des analyses détaillées pour prendre le contrôle de vos finances.
      </p>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Pourquoi s'inscrire ?</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Suivi facile de vos dépenses et revenus</li>
          <li>Analyse graphique de vos transactions</li>
          <li>Gestion simplifiée de votre budget</li>
          <li>Accès à des outils avancés et rapports</li>
        </ul>
      </div>
      <button className="">
        <Link to="/register" className="">Créer un compte</Link>
      </button>
    </div>
  );
};

export default HomepageForNonConnectedUser;
