import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';

import Modal from '../shared/Modal';
import { createUser } from '../../actions';

const renderInput = ({label, input, meta, type}) => {
    const displayError = meta.touched && meta.error ? true:false;
   
    return (
        <>
        <label className='font-bold mb-1' >{label}</label>
        <input className='input' {...input} type={type} />
        <p className='text-red-500'>{displayError ? meta.error:null}</p>
        </>
    );
};

export const Register = (props) => {
    const { authIsEmpty, onEscape, createUser } = props;
    const history = useHistory();

    const [registerError, setRegisterError] = useState(false);

    const onSubmit = async (formValues) => {
        const response = await createUser(formValues, setRegisterError);
        history.push('/profile')
    };

    useEffect(() => {
        if (!authIsEmpty){
        onEscape();
        };
    }, [authIsEmpty]);

    return (
    <Modal onEscape={onEscape}>
        <div onClick={(e) => e.stopPropagation()} className='modal wrap'>
            
            <div className='modal top'>
                <h1 className='modal'>Register</h1>
                <svg onClick={onEscape} className='modal' viewBox="-6 -6 24 24"><path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path></svg>
            </div>

            <div className='modal bottom'>
                <div className='grid grid-rows-1'>
                    <form onSubmit={props.handleSubmit(onSubmit)} className='grid grid-rows-1' >
                        <Field name='email' component={renderInput} label='Enter your email:' />
                        <br className='my-1'/>
                        <Field name='firstName' component={renderInput} label='Enter your first name:' />
                        <br className='my-1'/>
                        <Field name='lastName' component={renderInput} label='Enter your last name:' />
                        <br className='my-1'/>
                        <Field name='password' component={renderInput} label='Enter your password:' type='password' />
                        <br className='my-1'/>
                        <Field name='passwordConfirm' component={renderInput} label='Confirm your password:' type='password' />
                        <p className='text-red-500' > {registerError} </p>
                        <button className={`btn ${registerError ? 'mt-4':'mt-8'} mb-1 bg-primary`}>Register</button>
                    </form>
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
    createUser
};

//Validates the email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const validate = ({email, password, passwordConfirm, firstName, lastName}) => {
    const errors = {};

    if (!validateEmail(email)) {
        errors.email = 'You must enter a valid email!';
    };
    if (!password) {
        errors.password = 'You must enter a password!';
    };
    if (String(password).length < 7) {
        errors.password = 'Your password must be at least 8 characters long!';
    };
    if (password !== passwordConfirm) {
        errors.passwordConfirm = 'The passwords do not match!';
    };
    if (!firstName) {
        errors.firstName = 'You must enter a first name!'
    };
    if (!lastName) {
        errors.lastName = 'You must enter a last name!'
    };

    return errors;
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: 'registerForm', validate})
    )(Register);
