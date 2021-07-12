import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';

import Avatar from './Avatar';
import SubmitButton from '../shared/Buttons/SubmitButton';
import { updateProfile } from '../../actions';
import UpdateEmailModal from './UpdateEmailModal';
import UpdatePasswordModal from './UpdatePasswordModal';

const renderInput = ({label, input, meta, type}) => {
    const displayError = meta.touched && meta.error ? true:false;
    const className = `input ${meta.visited ? 'active':'inactive'}`;
    
    return (
        <div className={`grid`}>
            <label className='input' >{label}</label>
            <input className={className} {...input} type={type} />
            <p className='text-red-500'>{displayError ? meta.error:null}</p>
        </div>
    );
};

export const ProfileComponent = (props) => {
    const { handleSubmit, profile, uid, updateProfile } = props;
    const firebase = useFirebase();

    const [loading, setLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const formRef = useRef(null);

    //update the profile
    const onSubmit = async ({firstName, lastName, email}) => {
        //If a submission is in process we return
        if (loading === true) return;
        console.log('HERERE');

        await updateProfile({email, firstName, lastName }, setLoading, setSubmitSuccess, setSubmitError);
    };
    
    return (
        <div>

            <h2> Your Profile </h2>

            <hr/>

            <div className='flex w-full'>

                <div className='md:flex w-full'>
                    <Avatar avatarUrl={profile.avatarUrl} uid={uid} />

                    <div className='grid flex-grow md:pl-6'>
                        <form className='md:grid gap-y-1 flex-grow mt-4 md:mt-0 ' onSubmit={handleSubmit(onSubmit)}>
                            <Field component={renderInput} name='firstName' label='First Name:' />
                            <Field component={renderInput} name='lastName' label='Last Name:' />
                            <button ref={formRef} className='hidden'></button>
                        </form>

                        <div className='grid lg:flex lg:w-5/6 lg:place-self-end gap-y-2 gap-x-2 mt-4'>
                            <button onClick={() => setShowPasswordModal(true)} className='btn w-full bg-primary'>Change Password</button>
                            <button onClick={() => setShowEmailModal(true)} className='btn w-full bg-primary'>Change Email</button>
                            <SubmitButton 
                                className='btn flex w-full justify-center md:justify-self-end' 
                                loading={loading} 
                                submitSuccess={submitSuccess}
                                setSubmitSuccess={setSubmitSuccess} 
                                submitError={submitError} 
                                onClickHandler={() => formRef.current.click()}
                            />
                        </div>
                    </div>
                    
                </div>

            </div>
            {showPasswordModal === true ? <UpdatePasswordModal onEscape={() => setShowPasswordModal(false)} />:null}
            {showEmailModal === true ? <UpdateEmailModal onEscape={() => setShowEmailModal(false)} />:null}
        </div>
    );
};

const mapStateToProps = (state) => ({
    uid: state.firebase.auth.uid,
    profile: state.firebase.profile,
    //initialValues for the Form
    initialValues: {
        ...state.firebase.profile,
        email: state.firebase.auth.email
    },
});

const mapDispatchToProps = {
    updateProfile
};

//Validates the email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const validate = ({email, firstName, lastName}) => {
    const errors = {};

    if (!validateEmail(email)) {
        errors.email = 'You must enter a valid email!';
    };
    if (!firstName) {
        errors.firstName = 'You must enter a first name!';
    };
    if (!lastName) {
        errors.lastName = 'You must enter a last name!';
    };
    
    
    return errors;
};

export const Profile = compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: 'profileForm', validate, enableReinitialize: true}),
    )(ProfileComponent);
