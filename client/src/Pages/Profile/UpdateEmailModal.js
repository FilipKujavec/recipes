import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import Modal from '../shared/Modal';
import { updateEmail } from '../../actions';
import SubmitButton from '../shared/Buttons/SubmitButton';
import Reauthenticate from './Reauthenticate';

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

export const UpdateEmailModal = (props) => {
    const { onEscape, handleSubmit, updateEmail } = props;

    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [reauthenticateSubmitSuccess, setReauthenticateSubmitSuccess] = useState(false);

    const onSubmit = async(formValues) => {
        const response = await updateEmail(formValues, setLoading, setSubmitSuccess, setSubmitError);
    };

    useEffect(() => {
        if (submitSuccess === true) {
            setTimeout(() => {
                onEscape()
            }, 1000);
        };
    }, [submitSuccess]);

    return (
        <Modal onEscape={onEscape}>
            <div onClick={(e) => e.stopPropagation()} className='card wrap w-4/6 md:w-2/3 lg:w-1/3 mt-24 md:mt-48 mx-auto' >
                <div className='modal top'>
                    <h1 className='modal'>Change Email</h1>
                    <svg onClick={onEscape} className='modal' viewBox="-6 -6 24 24"><path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path></svg>
                </div>

                <div className='modal bottom'>
                    <div className='grid grid-rows-1'>

                    {/* Show either Change Email or Reathnaticate form */}
                    {reauthenticateSubmitSuccess === true ?
                    <form className='grid' onSubmit={handleSubmit(onSubmit)}>
                        <Field type='email' name='email' label='Your new Email:' component={renderInput} />
                        <SubmitButton 
                        className='btn flex justify-items-center place-self-end mt-4' 
                        loading={loading} 
                        submitSuccess={submitSuccess}
                        setSubmitSuccess={setSubmitSuccess}
                        submitError={submitError}
                        defaultText='Change Email'
                        failedText='Failed'
                        />
                    </form>
                    :
                    <Reauthenticate submitSuccess={reauthenticateSubmitSuccess} setSubmitSuccess={setReauthenticateSubmitSuccess} />
                    }

                    </div>
                </div>

            </div>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    updateEmail 
};

//Validates the email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const validate = ({email}) => {
    const errors = {};

    if (!validateEmail(email)) {
        errors.email = 'You must enter a valid email!';
    };

    return errors;
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: 'updateEmailForm', validate})
    )(UpdateEmailModal);

