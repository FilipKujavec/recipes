import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from "react-router-dom";
import { compose } from 'redux';

import Modal from '../shared/Modal';

const renderInput = ({label, input, meta, type}) => {
    const displayError = meta.touched && meta.error ? true:false;
   
    return (
        <>
        <label className='input' >{label}</label>
        <input className='input active' {...input} type={type} />
        <p className='error'>{displayError ? meta.error:null}</p>
        </>
    );
};

export const Login = (props) => {
    const { authIsEmpty, onEscape, loginError, handleSubmit } = props;
    const firebase = useFirebase();

    // Closes the Modal if the User is logged in
    useEffect(() => {
        if (!authIsEmpty) {
            onEscape();
        };
    }, [authIsEmpty]);

    //Signs the user in with email and password
    const onSubmit = (formValues) => {
        firebase.login(formValues);
    };

    return (
        <Modal onEscape={onEscape}>
            <div onClick={(e) => e.stopPropagation()} className='card wrap w-4/6 md:w-2/3 lg:w-1/3 mt-24 md:mt-48 mx-auto' >
                <div className='modal top'>
                    <h1 className='modal'>Login</h1>
                    <svg onClick={onEscape} className='modal' viewBox="-6 -6 24 24"><path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path></svg>
                </div>

                <div className='modal bottom'>
                    <div className='grid grid-rows-1'>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-rows-1' >
                            <Field name='email' component={renderInput} label='Enter your E-mail:' />
                            <br className='my-1'/>
                            <Field name='password' component={renderInput} label='Enter your Password:' type='password' />
                            <p className='text-red-500' > {loginError ? 'The password or the email is incorrect.':null} </p>
                            <button className={`btn ${loginError ? 'mt-4':'mt-8'} mb-1 bg-primary`}>Login</button>
                        </form>

                        <div onClick={props.onRegisterButton} className='btn bg-primary mt-4 md:mt-2 text-center'>
                            Register
                        </div>

                    </div>
                </div>

            </div>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    authIsEmpty: state.firebase.auth.isEmpty,
    loginError: state.firebase.authError
});

const mapDispatchToProps = {

};

//Validates the email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const validate = (formValues) => {
    const errors = {};

    if (!validateEmail(formValues.email)) {
        errors.email = 'You must enter a valid email!';
    };
    if (!formValues.password) {
        errors.password = 'You must enter a password!';
    };
    
    return errors;
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: 'loginForm', validate})
    )(Login);
