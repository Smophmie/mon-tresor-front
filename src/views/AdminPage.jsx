import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (err) {
        setError('Erreur lors du chargement des utilisateurs.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl">Liste des utilisateurs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-center text-gray-600">ID</th>
              <th className="py-3 px-6 text-center text-gray-600">Nom</th>
              <th className="py-3 px-6 text-center text-gray-600">Email</th>
              <th className="py-3 px-6 text-center text-gray-600">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="py-3 px-6 text-center text-gray-700">{user.id}</td>
                <td className="py-3 px-6 text-center text-gray-700">{user.name}</td>
                <td className="py-3 px-6 text-center text-gray-700">{user.email}</td>
                <td className="py-3 px-6 text-center text-gray-700">
                  {user.admin ? 'Administrateur' : 'Utilisateur'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
