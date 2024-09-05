import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../style/Login.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
  
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/register', formData)
            .then(response => {
                setMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                });
                setErrors({});
                // Rediriger l'utilisateur vers la page de connexion ou autre après inscription
                navigate('/login');
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data.errors);
                    setMessage(error.response.data.message || 'Une erreur est survenue lors de l\'inscription.');
                } else {
                    setMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
                }
            });
    };

    return (
        <div className="container">
            <div className="form">
                <h1 className='text-xl'>S’enregistrer</h1>
                {message && <p style={{ color: 'red' }}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Nom" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className="input input-bordered w-full"
                        />
                        {errors.name && <p style={{ color: 'red' }}>{errors.name[0]}</p>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="input input-bordered w-full"
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email[0]}</p>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Mot de passe" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="input input-bordered w-full"
                        />
                        {errors.password && <p style={{ color: 'red' }}>{errors.password[0]}</p>}
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            name="password_confirmation" 
                            placeholder="Confirmer le mot de passe" 
                            value={formData.password_confirmation} 
                            onChange={handleChange} 
                            className="input input-bordered w-full"
                        />
                    </div>
                    <button type="submit" className="btnForm mt-10 btn-register">S’enregistrer</button>
                    <button className="btnForm mt-10 btn-login">
                        <Link to='/login'>Vous avez déjà un compte ? Se connecter</Link>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
