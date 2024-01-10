'use client'
import React, { useState } from 'react';
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
import MainPage from '@/components/MainPage';
import Background from '@/components/Background';


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };
  return (
    <div>
        {isLoggedIn ? (
                <Welcome username={username} />
            ) : (
                <MainPage onLoginSuccess={handleLoginSuccess} />
            )}
    </div>
  );
    
}
