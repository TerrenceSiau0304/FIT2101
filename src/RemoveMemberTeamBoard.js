import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RemoveMemberTeamBoard.css';
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

const RemoveMemberTeamBoard = ({selectedBackground}) => {
    const navigate = useNavigate();
    const [memberName, setMemberName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/user/${memberName}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json();

            if (response.ok) {
                if (result.message === 'Team member has ongoing tasks. Please reassign them.') {
                    setTasks(result.tasks);
                    setUsers(result.users);
                } else {
                    alert('Member removed successfully');
                    navigate('/CreateManageTeam');
                }
            } else {
                alert(result);
            }
        } catch (error) {
            console.error('Error removing member:', error);
            alert('An error occurred while trying to remove the member');
        }
    };

    const handleReassignSubmit = async () => {
        try {
            const taskIds = tasks.map(task => task._id);
            
                    // Log the data being sent
            console.log({
                taskIds,
                newAssignee: selectedUser,
                oldUsername: memberName
            });
    
            const response = await fetch('http://localhost:5000/user/reassign-tasks-and-delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskIds,
                    newAssignee: selectedUser,
                    oldUsername: memberName
                }),
            });
    
            if (response.ok) {
                alert('Tasks reassigned and member removed successfully');
                navigate('/CreateManageTeam');
            } else {
                alert('Error reassigning tasks and removing the member');
            }
        } catch (error) {
            console.error('Error reassigning tasks and removing the member:', error);
            alert('An error occurred while reassigning tasks and removing the member');
        }
    };    

    return (
        <div className="remove-member-container">
            <div className="remove-member-box">
                <h1>Remove Member from Project</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="memberName">Member's Name:</label>
                    <input 
                        type="text" 
                        id="memberName" 
                        value={memberName}
                        onChange={(e) => setMemberName(e.target.value)} 
                        required 
                    />
                    <button type="submit">Remove Member</button>
            </form>
            </div>

            {tasks.length > 0 && (
                <div className="reassign-tasks-box">
                    <h2>Reassign Tasks</h2>
                    <label htmlFor="newAssignee">Select new assignee:</label>
                    <select id="newAssignee" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">Select a user</option> {/* Add a default option */}
                        {users.map(user => (
                            <option key={user._id} value={user.username}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleReassignSubmit}>Reassign Tasks</button>
                </div>
            )}
            {selectedBackground === 'anime' && (
                <>
                    <img 
                    src={animeChar1} 
                    alt="Anime Character 1" 
                    style={{
                        position: 'absolute',
                        width: '50px',
                        height: 'auto',
                        top: '480px',
                        left: '470px',
                        transform: 'scale(2)',
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
                        top: '280px',
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
                        top: '550px',
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
                        top: '280px',
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
                        top: '480px',
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
                        top: '230px',
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
                        transform: 'scale(3)',
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
                        top: '550px',
                        left: '775px',
                        transform: 'scale(2)',
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
                        left: '950px',
                        transform: 'scale(2)',
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
                        top: '230px',
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
                        top: '500px',
                        left: '500px',
                        transform: 'scale(3)',
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
                        top: '550px',
                        left: '775px',
                        transform: 'scale(3)',
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
                        top: '300px',
                        left: '950px',
                        transform: 'scale(2)',
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
                        top: '450px',
                        left: '950px',
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
                        top: '230px',
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

export default RemoveMemberTeamBoard;