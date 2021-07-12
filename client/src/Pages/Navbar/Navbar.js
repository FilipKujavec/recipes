import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from "react-router-dom";

import Sidebar from './Sidebar';
import Login from './Login';
import Register from './Register';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const NavbarComponent = (props) => {
    const { auth, RouteGuard } = props;
    const firebase = useFirebase();
    const history = useHistory();
    const { width } = useWindowDimensions();

    const [showSidebar, setShowSidebar] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    //Opens Login Modal when Route Guard takes effect
    useEffect(() => {
        if (RouteGuard === true) {
            openLogin();
        };
    }, [RouteGuard]);

    //Makes sure not to show the Sidebar on Screens bigger than 767px
    useEffect(() => {
        if (width > 767 && showSidebar === true) {
            onEscape();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    //Closes all possible Modals
    const onEscape = () => {
        setShowSidebar(false);
        setShowLogin(false);
        setShowRegister(false);
    };

    //Opens Login Modal and closes Sidebar
    const openLogin = () => {
        setShowSidebar(false);
        setShowLogin(true);
    };

    //Closes Sidebar&Login to show Register
    const openRegister = () => {
        setShowSidebar(false);
        setShowLogin(false);
        setShowRegister(true);
    };

    //Shows either the Login or Logout button
    const renderSignInButton = () => {
        if (auth.isEmpty) {
            return (
                <div onClick={() => setShowLogin(true)} className='btn hidden md:inline-block mr-14 bg-bgc hover:text-red-400'>
                        Login
                </div>
            );
        }else if (!auth.isEmpty) {
            return (
                <div onClick={() => firebase.logout()} className='btn hidden md:inline-block mr-14 bg-bgc hover:text-red-400'>
                        Logout
                </div>
            );
        };
    };

    return (
        <>
        <div className='bg-secondary py-2 md:py-5'>
            <div className='flex relative gap-x-96 justify-center'>

            <Link className='absolute top-1 md:top-auto font-bold text-3xl md:text-4xl font-ultra whitespace-nowrap' to='/'>
                    Velit tempor
            </Link>

            <div className='w-full'>
            <div className='flex w-full justify-end'>
                {renderSignInButton()}
            </div>
            <div className='flex w-full md:hidden items-center flex-grow justify-start'>
                <button onClick={() => setShowSidebar(true)}>
                    <svg className='w-12 ml-2 md:hidden' viewBox="-5 -7 24 24" ><path d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z"></path></svg>
                </button>
            </div>

            </div>
            </div>


        </div>
        
        <div className='hidden md:flex justify-center w-full'>
            <div className='relative'>

                <svg className='h-16' viewBox="0 0 638 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="60" width="518" height="66" fill="#86E6BE"/>
                    <path d="M578 66L482.737 -39.75H673.263L578 66Z" fill="#86E6BE"/>
                    <path d="M60 66L-35.2628 -39.75H155.263L60 66Z" fill="#86E6BE"/>
                </svg>

                <div className='absolute h-16 w-full top-0 font-bold flex-grow gap-x-8 text-xl'>
                    <div className='flex justify-center gap-x-6 mt-3'>
                        <Link to='/' className='navbar link'>
                            Home
                        </Link>
                        {auth.isEmpty !== true ?
                        <>
                            <Link to='/recipes/edit' className='navbar link'>
                                Your Recipes
                            </Link>
                            <Link to='/profile' className='navbar link'>
                                Profile
                            </Link>
                        </>
                        :null}
                        <Link to='/about' className='navbar link'>
                            About
                        </Link>
                    </div>
                </div>

            </div>
        </div>

        {showSidebar ? <Sidebar onEscape={onEscape} onLoginButton={openLogin} onRegisterButton={openRegister} />:null}
        {showLogin ? <Login onEscape={onEscape} onRegisterButton={openRegister} />:null}
        {showRegister ? <Register onEscape={onEscape} />:null}
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.firebase.auth,
    firebase: state.firebase
});

const mapDispatchToProps = {
    
};

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);