//entry point
import React, { useState } from 'react';

const Login = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'goplayadm' && password === 'goplay') {
            onLogin(username);
           // alert('Logged in successfully!');
            // Handle successful login
        } else {
            alert('Invalid credentials!');
            // Handle login failure
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-8">
            <div className="mb-4">
                <label htmlFor="username" className="block text-white text-sm font-bold mb-2">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-white text-sm font-bold mb-2">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
};

export default Login;
