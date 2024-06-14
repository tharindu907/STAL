import React, { useState, useEffect } from 'react';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Dashboard from './Components/Dashboard/Dashboard';
import { UserProvider } from './Context/UserContext';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('login');
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      // Simulate fetching user data
      const userData = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            isLoggedIn: true,
            userType: 'Student',
            username: 'JohnDoe', // Replace with '' to test default username
            profilePic: '', // Replace with '' to test default profile picture
          });
        }, 1000);
      });

      setIsLoggedIn(userData.isLoggedIn);
      setUserType(userData.userType);
      setUsername(userData.username || 'User');
      setProfilePic(userData.profilePic || '/Assets/default-profile-pic.svg');
    };

    fetchUserData();
  }, []);

  return (
    <UserProvider value={{ isLoggedIn, userType, username, profilePic }}>
      <div className="app">
        <NavigationBar />
        {isLoggedIn && <Dashboard />}
        <div className={`content ${isLoggedIn ? 'logged-in' : ''}`}>
          {isLoggedIn ? (
            <h1>Welcome, {username}!</h1>
          ) : (
            <h1>Please log in</h1>
          )}
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
