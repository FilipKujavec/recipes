import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import Modal from '../shared/Modal';
import { reauthenticateUser } from '../../actions';
import SubmitButton from '../shared/Buttons/SubmitButton';

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

export const Reauthenticate = (props) => {
    const { handleSubmit, reauthenticateUser, submitSuccess, setSubmitSuccess } = props;

    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const onSubmit = async(formValues) => {
        const response = await reauthenticateUser(formValues, setLoading, setSubmitSuccess, setSubmitError);

    };

    return (
        <form className='grid' onSubmit={handleSubmit(onSubmit)}>
            <Field type='password' name='password' label='Enter your Password:' component={renderInput} />
            <SubmitButton 
            className='btn flex justify-items-center place-self-end mt-4' 
            loading={loading} 
            submitSuccess={submitSuccess}
            setSubmitSuccess={setSubmitSuccess}
            submitError={submitError}
            defaultText='Submit'
            failedText='Invalid Password'
            />
        </form>
);
};

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    reauthenticateUser 
};

const validate = ({password}) => {
    const errors = {};

    if (!password) {
        errors.password = 'You must enter a password!';
    };
    
    return errors;
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: 'reauthenticateForm', validate})
    )(Reauthenticate);

