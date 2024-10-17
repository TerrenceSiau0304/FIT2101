import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserResetPassword.css';
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

const UserResetPassword = ({selectedBackground}) => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const closePopup = () => {
        setShowPopup(false);
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

    
        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            setShowPopup(true);
            return;
        }

        if (username !== localStorage.getItem('username')){
            setError("Invalid username.");
            setShowPopup(true);
            return;
        }

    
        try {
            const currentUser = localStorage.getItem('username');
            const userData = await axios.get(`http://localhost:5000/user/${currentUser}`);

            const newData = {
                username : currentUser,
                useremail : userData.data.useremail,
                password : newPassword,
            };

            try{
                const response = await axios.put(`http://localhost:5000/user/update/${currentUser}`, newData);
                console.log('Password updated successfully:', response.data);
                setSuccessMessage( 'Password reset successful! You can now log in with your new password.');
                navigate('/TeamBoardUser'); 
                
            }catch (err){
                setShowPopup(true);
                setError('Cannot saved the new password.')
            }
        } catch (err) {
            setShowPopup(true);
            setError('Couldn\'t fetch the data.');
        }
    };


    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h1>Reset Password</h1>
                <p>Please enter your new password</p>
            

                    {successMessage && <div className="success">{successMessage}</div>}
            
                    <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required 
                        placeholder="Please enter your username" />
                    </div>

                    <div className="input-field">
                        <label htmlFor="new-password">New Password</label>
                        <input type="password" id="new-password" name="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required 
                        placeholder="Please enter new password" />
                    </div>

                    <div className="input-field">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required 
                        placeholder="Please confirm new password" />
                    </div>

                    <div className="reset-button">
                        <button type="submit" onClick={handleSubmit}>Reset Password</button>
                        {showPopup && (
                            <div className="popup-overlay">
                            <div className="popup-content">
                                <p>{error}</p>
                                <button onClick={closePopup}>Close</button>
                            </div>
                            </div>
                        )}
                    </div>
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
                        top: '500px',
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
                        top: '250px',
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
                        top: '650px',
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
                        top: '250px',
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
                        top: '450px',
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
                        top: '150px',
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
                    top: '500px',
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
                    top: '250px',
                    left: '480px',
                    transform: 'scale(3)',
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
                    top: '620px',
                    left: '775px',
                    transform: 'scale(2.5)',
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
                    top: '250px',
                    left: '920px',
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
                    top: '450px',
                    left: '920px',
                    transform: 'scale(1.7)',
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
                    top: '150px',
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
                    top: '530px',
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
                    top: '280px',
                    left: '450px',
                    transform: 'scale(3)',
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
                    top: '620px',
                    left: '775px',
                    transform: 'scale(2.5)',
                    margin: '0',
                    zIndex: 1000
                }} 
                />
                <img 
                src={forestChar4} 
                alt="Forest Character 4" 
                style={{
                    position: 'absolute',
                    width: '50px',
                    height: 'auto',
                    top: '280px',
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
                    top: '480px',
                    left: '900px',
                    transform: 'scale(4)',
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
                    top: '150px',
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

export default UserResetPassword;