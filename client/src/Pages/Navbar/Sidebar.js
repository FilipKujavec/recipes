import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import Modal from '../shared/Modal';


export const Sidebar = (props) => {
    const { onLoginButton, authIsEmpty, onRegisterButton, onEscape } = props;
    const firebase = useFirebase();

    const [margin, setMargin] = useState('-ml-4/6');

    useEffect(() => {
        setMargin('ml-0');
    }, []);

    const closeSidebar = () => {
        setMargin('-ml-4/6');

        setTimeout(() => {
            onEscape();
        }, 300);
    };

    //Shows either Login&SignUp or Logout
    const renderSignInButtons = () => {
        if (authIsEmpty) {
            return (
                <>
                    <div onClick={onLoginButton} className='sidebar btn flex-grow'>
                        Login
                    </div>
                    <div onClick={onRegisterButton} className='sidebar btn flex-grow-0'>
                        Sign Up
                    </div>
                </>
            );
        }else {
            return(
                <div onClick={firebase.logout} className='sidebar btn flex-grow'>
                    Logout
                </div>
            );
        };
    };

    const renderLinks = () => {
        if (authIsEmpty) {
            return null;
        }else {
            return(
                <>
                <Link to='/profile' onClick={onEscape} className='sidebar link'>
                    Profile
                </Link>
                <Link to='/recipes/edit' onClick={onEscape} className='sidebar link'>
                    Your Recipes
                </Link>
                </>
            );
        };
    };

    return (
        <Modal onEscape={closeSidebar}>
            <div onClick={(e) => e.stopPropagation()} className={`h-screen ${margin} w-4/6 bg-gray-100 transition-margin delay-200 ease-in-out`} >
                <div className='flex justify-start font-ultra bg-secondary h-16'>
                    <p className='place-self-center ml-6 text-lg'>Velit tempor</p>
                </div>

                <div className='flex flex-col text-center'>
                    <div className='flex justify-center mt-6 mb-6'>
                        {renderSignInButtons()}
                    </div>

                    <div className='flex flex-col justify-items-center h-32'>
                        <Link to='/' onClick={onEscape} className='sidebar link'>
                            Home
                        </Link>
                        {renderLinks()}
                        <Link to='/about' onClick={onEscape} className='sidebar link'>
                            About
                        </Link>
                    </div>

                </div>

            </div>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    authIsEmpty: state.firebase.auth.isEmpty    
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
