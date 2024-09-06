import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/isadmin', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsAdmin(response.data);
      } catch (err) {
        setError('Erreur lors de la vérification des droits administratifs.');
        navigate('/'); // Rediriger vers la page d'accueil ou autre page
      }
    };

    checkAdminStatus();
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return; // Ne pas charger les utilisateurs si ce n'est pas un admin

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
  }, [isAdmin]);

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('Erreur lors de la suppression de l\'utilisateur.');
    }
  };

  if (!isAdmin) {
    return <div className="text-center py-4">Vous n'avez pas accès à cette page.</div>;
  }

  if (loading) {
    return <div className="text-center py-4">Chargement des utilisateurs...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Liste des utilisateurs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="py-3 px-6 text-center text-gray-600">ID</th>
              <th className="py-3 px-6 text-center text-gray-600">Nom</th>
              <th className="py-3 px-6 text-center text-gray-600">Email</th>
              <th className="py-3 px-6 text-center text-gray-600">Role</th>
              <th className="py-3 px-6 text-center text-gray-600">Actions</th>
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
                <td className="py-3 px-6 text-center">
                <button className="hover:underline">
                  <Link to={`/edit-user/${user.id}`}>
                    Modifier
                  </Link>
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="hover:underline"
                >
                  Supprimer
                </button>
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
