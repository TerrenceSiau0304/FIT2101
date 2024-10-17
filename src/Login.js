import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure this path is correct
import animeChar1 from './characters/anime_char_1.jpg';
import animeChar2 from './characters/anime_char_2.png';
import animeChar3 from './characters/anime_char_3.png';
import animeChar4 from './characters/anime_char_4.png';
import animeChar5 from './characters/anime_char_5.png';
import animeChar6 from './characters/anime_char_6.png';
import beachChar1 from './characters/beach_char_1.png';
import beachChar2 from './characters/beach_char_2.png';
import beachChar3 from './characters/beach_char_3.png';
import beachChar4 from './characters/beach_char_4.png';
import beachChar5 from './characters/beach_char_5.png';
import beachChar6 from './characters/beach_char_6.png';
import forestChar1 from './characters/forest_char_1.png';
import forestChar2 from './characters/forest_char_2.png';
import forestChar3 from './characters/forest_char_3.png';
import forestChar4 from './characters/forest_char_4.png';
import forestChar5 from './characters/forest_char_5.png';
import forestChar6 from './characters/forest_char_6.png';

const Login = ({selectedBackground}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' // Development API
    : 'https://terrencesiau0304.github.io/FIT2101'; // Replace with the deployed backend URL

    useEffect(() => {
        document.body.classList.add('login-page');
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // First check for admin login
            const adminResponse = await axios.post(`${API_URL}/admin/login`, { username, password });
            const { token: adminToken } = adminResponse.data;
            // If admin login is successful, store the token and redirect to admin page
            localStorage.setItem('authToken', adminToken);
            localStorage.setItem('username', username);
            navigate('/');
        } catch (adminError) {
            // If admin login fails, try user login
            try {
                const userResponse = await axios.post(`${API_URL}/user/login`, { username, password });
                const { token: userToken } = userResponse.data;
                // If user login is successful, store the token and redirect to user dashboard
                localStorage.setItem('authToken', userToken);
                localStorage.setItem('username', username);
                navigate('/ProductBacklogUser');
            } catch (userError) {
                // If both admin and user login fail, show an error message
                setError(userError.response?.data || 'Invalid credentials for both admin and user.');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error">{error}</div>}
                    <div className="input-box">
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="input-box">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="submit-box">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
            {selectedBackground === 'anime' && (
                <>
                    <img 
                    src={animeChar1} 
                    alt="Anime Character 1" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '550px',
                        left: '500px',
                        transform: 'scale(2.5)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={animeChar2} 
                    alt="Anime Character 2" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '300px',
                        left: '500px',
                        transform: 'scale(2)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={animeChar3} 
                    alt="Anime Character 3" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '630px',
                        left: '775px',
                        transform: 'scale(1.8)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={animeChar4} 
                    alt="Anime Character 4" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '300px',
                        left: '905px',
                        transform: 'scale(1.8)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={animeChar5} 
                    alt="Anime Character 5" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '500px',
                        left: '900px',
                        transform: 'scale(2)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={animeChar6} 
                    alt="Anime Character 6" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '250px',
                        left: '720px',
                        transform: 'scale(2)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                />
            </>
            )}
            {selectedBackground === 'beach' && (
                <>
                    <img 
                    src={beachChar1} 
                    alt="Beach Character 1" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '550px',
                        left: '500px',
                        transform: 'scale(2.5)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={beachChar2} 
                    alt="Beach Character 2" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '300px',
                        left: '500px',
                        transform: 'scale(2)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={beachChar3} 
                    alt="Beach Character 3" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '630px',
                        left: '775px',
                        transform: 'scale(1.8)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={beachChar4} 
                    alt="Beach Character 4" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '300px',
                        left: '905px',
                        transform: 'scale(1.8)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={beachChar5} 
                    alt="Beach Character 5" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '500px',
                        left: '900px',
                        transform: 'scale(2)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={beachChar6} 
                    alt="Beach Character 6" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '250px',
                        left: '720px',
                        transform: 'scale(2)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                />
            </>
            )}
            {selectedBackground === 'forest' && (
                <>
                    <img 
                    src={forestChar1} 
                    alt="Forest Character 1" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '550px',
                        left: '500px',
                        transform: 'scale(2.5)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={forestChar2} 
                    alt="Forest Character 2" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '300px',
                        left: '500px',
                        transform: 'scale(2)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={forestChar3} 
                    alt="Forest Character 3" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '630px',
                        left: '775px',
                        transform: 'scale(1.8)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={forestChar4} 
                    alt="Anime Character 4" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '300px',
                        left: '905px',
                        transform: 'scale(1.8)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={forestChar5} 
                    alt="Forest Character 5" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '500px',
                        left: '900px',
                        transform: 'scale(2)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                    />
                    <img 
                    src={forestChar6} 
                    alt="Forest Character 6" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '250px',
                        left: '720px',
                        transform: 'scale(2)',
                        margin: '0',
                        zIndex: 1000
                    }} 
                />
            </>
            )}
        </div>
    );
};

export default Login;