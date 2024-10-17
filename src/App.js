import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductBacklogAdmin from './ProductBacklogAdmin';
import CreateTask from './CreateTask';
import EditTask from './EditTask';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import CreateSprint from './CreateSprint';
import SprintBacklog from './SprintBacklog';
import History from './History';
import KanbanBoard from './KanbanBoard';
import DragAndDrop from './DragAndDrop';
import TeamBoardLogin from './TeamBoardLogin';
import TeamBoardAdminLogin from './TeamBoardAdminLogin';
import TeamBoardUserLogin from './TeamBoardUserLogin';
import TeamBoardAdmin from './TeamBoardAdmin';
import TeamBoardUser from './TeamBoardUser';
import CreateManageTeam from './CreateManageTeam';
import AddMemberTeamBoard from './AddMemberTeamBoard';
import RemoveMemberTeamBoard from './RemoveMemberTeamBoard';
import TeamDashBoard from './TeamDashBoard';
import MemberDashBoard from './MemberDashBoard';
import UserResetPassword from './UserResetPassword';
import TeamAverageWorkingHours from './TeamAverageWorkingHours';
import MemberAverageWorkingHours from './MemberAverageWorkingHours';
import ProductBacklogUser from './ProductBacklogUser';
import SprintBoardUser from './SprintBoardUser';
import BurnDownChart from './BurnDownChart';
import './App.css';
import LogTime from './LogTime';  // Adjust the path if necessary depending on your file structure
import TeamChart from './TeamChart';

function App() {
  // State to store the selected background
  const [selectedBackground, setSelectedBackground] = useState(() => {
    return localStorage.getItem('background') || 'beach'; // Default to 'beach'
  });

  // State to store the selected theme (light or dark)
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'; // Default to 'light'
  });

  // Track whether the user has selected a background and theme
  const [isBackgroundSelected, setIsBackgroundSelected] = useState(false);

  useEffect(() => {
    // Store the selected background and theme in localStorage
    localStorage.setItem('background', selectedBackground);
    localStorage.setItem('theme', selectedTheme);
  }, [selectedBackground, selectedTheme]);

  // Update the body class based on the theme
  useEffect(() => {
    document.body.classList.toggle('dark-mode', selectedTheme === 'dark');
    document.body.classList.toggle('light-mode', selectedTheme === 'light');
  }, [selectedTheme]);

  // Handler for changing the background
  const handleBackgroundChange = (e) => {
    setSelectedBackground(e.target.value);
    setIsBackgroundSelected(true); // Set as selected
  };

  // Handler for changing the theme
  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
    setIsBackgroundSelected(true); // Set as selected
  };

  // Handler to reset background selection
  const resetBackgroundSelection = () => {
    setIsBackgroundSelected(false); // Show background and theme selectors
  };

  return (
    <div className={`app-container ${selectedBackground}-${selectedTheme}`}>
      <Router>
        {/* Background and Theme Selectors */}
        {!isBackgroundSelected && (
          <div className="background-selector">
            <label htmlFor="background">Select Background:</label>
            <select
              id="background"
              value={selectedBackground}
              onChange={handleBackgroundChange}
            >
              <option value="beach">Beach</option>
              <option value="forest">Forest</option>
              <option value="anime">Anime</option>
            </select>

            <div style={{alignItems: 'center', margin: '0' }}>
              <div style={{alignItems: 'center' , marginLeft: '0'}}>
                <input
                  type="checkbox"
                  id="light-mode"
                  checked={selectedTheme === 'light'}
                  onChange={() => setSelectedTheme('light')}
                  style={{ margin: '0', padding: '0' }} // No margin or padding
                />
                <label htmlFor="light-mode" style={{ margin: '0', padding: '0' }}>Light Mode</label>
              </div>

              <div style={{alignItems: 'center', marginLeft: '0' }}> {/* Remove margin */}
                <input
                  type="checkbox"
                  id="dark-mode"
                  checked={selectedTheme === 'dark'}
                  onChange={() => setSelectedTheme('dark')}
                  style={{ margin: '0', padding: '0' }} // No margin or padding
                />
                <label htmlFor="dark-mode" style={{ margin: '0', padding: '0' }}>Dark Mode</label>
              </div>
            </div>
          </div>
        )}

        {/* Reset background selection button */}
        {isBackgroundSelected && (
          <div className="reset-background">
            <button onClick={resetBackgroundSelection}>
              Change Background
            </button>
          </div>
        )}

        <Routes>
          <Route path="/login" element={<Login selectedBackground={selectedBackground} 
                  selectedTheme={selectedTheme}/>} />
          
          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <ProductBacklogAdmin 
                  selectedBackground={selectedBackground} 
                  selectedTheme={selectedTheme} />
              </ProtectedRoute>
            } 
          />
          <Route
              path="/ProductBacklogUser" 
              element={
                <ProtectedRoute>
                  <ProductBacklogUser 
                  selectedBackground={selectedBackground} 
                  selectedTheme={selectedTheme} />
                </ProtectedRoute>
              } 
          />
          <Route 
            path="/create-task" 
            element={
              <ProtectedRoute>
                <CreateTask 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit-task/:id" 
            element={
              <ProtectedRoute>
                <EditTask 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/sprint-backlog" 
            element={
              <ProtectedRoute>
                <SprintBacklog 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/SprintBoardUser" 
            element={
              <ProtectedRoute>
                <SprintBoardUser 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-sprint" 
            element={
              <ProtectedRoute>
                <CreateSprint 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/history" 
            element={
              <ProtectedRoute>
                <History 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/KanbanBoard/:id"
            element={
              <ProtectedRoute>
                <KanbanBoard 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DragAndDrop/:id"
            element={
              <ProtectedRoute>
                <DragAndDrop 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/TeamBoardLogin"
            element={
              <ProtectedRoute>
                <TeamBoardLogin 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/TeamBoardAdminLogin"
            element={
              <ProtectedRoute>
                <TeamBoardAdminLogin 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            }
            />
          <Route
            path="/TeamBoardUserLogin"
            element={
              <ProtectedRoute>
                <TeamBoardUserLogin 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/TeamBoardAdmin" 
            element={
              <ProtectedRoute>
                <TeamBoardAdmin 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            } 
            />
            <Route 
              path="/TeamBoardUser" 
              element={
                <ProtectedRoute>
                  <TeamBoardUser 
                  selectedBackground={selectedBackground} 
                  selectedTheme={selectedTheme}
                  />
                </ProtectedRoute>
              } 
          />
          <Route 
            path="/CreateManageTeam" 
            element={
              <ProtectedRoute>
                <CreateManageTeam 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/AddMemberTeamBoard" 
            element={
              <ProtectedRoute>
                <AddMemberTeamBoard 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/RemoveMemberTeamBoard" 
            element={
              <ProtectedRoute>
                <RemoveMemberTeamBoard 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/TeamDashBoard" 
            element={
              <ProtectedRoute>
                <TeamDashBoard 
                selectedBackground={selectedBackground} 
                selectedTheme={selectedTheme}
                />
              </ProtectedRoute>
            }
            />
            <Route
              path="/MemberDashBoard" 
              element={
                <ProtectedRoute>
                  <MemberDashBoard 
                  selectedBackground={selectedBackground} 
                  selectedTheme={selectedTheme}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/UserResetPassword" 
              element={
                <ProtectedRoute>
                  <UserResetPassword 
                  selectedBackground={selectedBackground} 
                  selectedTheme={selectedTheme}
                  />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/MemberAverageWorkingHours" 
              element={
                <ProtectedRoute>
                  <MemberAverageWorkingHours 
                  selectedBackground={selectedBackground} 
                  selectedTheme={selectedTheme}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/BurnDownChart/:id" 
              element={
                <ProtectedRoute>
                  <BurnDownChart />
                </ProtectedRoute>
              }    
            />
          <Route path="/TeamAverageWorkingHours" element={<TeamAverageWorkingHours selectedBackground={selectedBackground} 
                  selectedTheme={selectedTheme}/>} />
          <Route path="/log-time/:sprintId" element={<LogTime theme={selectedTheme} selectedBackground={selectedBackground} 
                  selectedTheme={selectedTheme}/>} />
          <Route path="/team-chart" element={<TeamChart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
