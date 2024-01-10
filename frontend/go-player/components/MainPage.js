import React from 'react';
import Login from '@/components/Login'
import Background from '@/components/Background';
import Logo from '@/components/Logo';


const MainPage = ({onLoginSuccess}) => {

    const loginHandler = (username)=>{
       onLoginSuccess(username);
    }
 
    return(
        <Background>
            <div className="flex flex-col justify-center items-center min-h-screen">
                <Logo />
                <Login onLogin={loginHandler} />
            </div>
        </Background>
    );

    };
export default MainPage;