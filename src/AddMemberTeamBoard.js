import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import './AddMemberTeamBoard.css';
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

const AddMemberTeamBoard = ({selectedBackground}) => {
    const navigate = useNavigate();
    const [memberName, setMemberName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const newUser = {
            username: memberName,
            userEmail: memberEmail,
            password: password,
            isAdmin: false,
        };

        try {
            const response = await fetch('http://localhost:5000/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                alert('Member added successfully');
                navigate('/CreateManageTeam');
            } else {
                const data = await response.json();
                setErrorMessage(`Error: ${data}`);
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className="add-member-container">
            <form className="add-member-box" onSubmit={handleSubmit}>
                <h1>Add Member to Project</h1>
                <label htmlFor="memberName">Member's Name:</label>
                <input 
                    type="text" 
                    id="memberName" 
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)} 
                    required 
                />
                
                <label htmlFor="memberEmail">Member's Email:</label>
                <input 
                    type="email" 
                    id="memberEmail" 
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)} 
                    required 
                />
                
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />

                <button type="submit">Add Member</button>
            </form>
            {selectedBackground === 'anime' && (
                <>
                    <img 
                    src={animeChar1} 
                    alt="Anime Character 1" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '520px',
                        left: '470px',
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
                        top: '270px',
                        left: '480px',
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
                        top: '620px',
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
                        top: '270px',
                        left: '950px',
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
                        top: '470px',
                        left: '950px',
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
                        transform: 'scale(2.5)',
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
                    left: '450px',
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
                    top: '570px',
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
                    top: '250px',
                    left: '950px',
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
                    left: '950px',
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
}

export default AddMemberTeamBoard;