import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TeamBoardLogin.css';
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

function TeamBoardLogin({selectedBackground}) {
    const navigate = useNavigate();

    return (
        <div className="team-board-login-container">
            <div className="login-box">
                <h1>Team Board</h1>
                <p>Login as:</p>
                <button onClick={() => navigate('/TeamBoardAdminLogin')}>Admin</button>
                <button onClick={() => navigate('/TeamBoardUserLogin')}>Team Member</button>
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
                    top: '600px',
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
                    top: '200px',
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
                    top: '530px',
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
                    top: '280px',
                    left: '500px',
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
                    top: '580px',
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
                    top: '280px',
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
                    top: '480px',
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
                    top: '200px',
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
                    left: '500px',
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
                    top: '580px',
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
                    transform: 'scale(3)',
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
                    top: '200px',
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
}

export default TeamBoardLogin;
