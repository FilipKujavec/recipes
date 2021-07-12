import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { reduxForm, Field } from 'redux-form';
import { useHistory } from "react-router-dom";
import { compose } from 'redux';

import SubmitButton from '../shared/Buttons/SubmitButton'
import { createRecipe } from '../../actions';
import Modal from '../shared/Modal';

const RenderInput = ({label, input, meta, type}) => {
    const displayError = meta.touched && meta.error ? true:false;
    const inputRef = useRef(null);

    return (
        <>
        <label className='font-bold mb-1' >{label}</label>
        <input ref={inputRef} className='input active' {...input} type={type} />
        <p className='error'>{displayError ? meta.error:null}</p>
        </>
    );
};

export const CreateRecipeModal = (props) => {
    const { createRecipe, onEscape } = props;
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const formRef = useRef(null);

    //Creates the recipe in firestore, then navigates to /edit/id
    const onSubmit = async (formValues) => {
        setLoading(true)
        setSubmitError(null)
        
        const response = await createRecipe(formValues, setLoading, setSubmitSuccess, setSubmitError)

        if (!submitError) {
            history.push(`/recipes/edit/${response.id}`)
        }
    };

    //Focus on the input upon entering the page
    useEffect(() => {
        document.getElementById('form').children[1].focus();
    }, []);

    return (
        <Modal onEscape={onEscape}>
            <div onClick={(e) => e.stopPropagation()} className='card wrap w-4/6 md:w-2/3 lg:w-1/3 mt-24 md:mt-48 mx-auto' >
                <div className='modal top'>
                    <h1 className='modal'>Create Recipe</h1>
                    <svg onClick={onEscape} className='modal' viewBox="-6 -6 24 24"><path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path></svg>
                </div>

                <div className='modal bottom'>
                    <div className='grid grid-rows-1'>
                        
                        <form id='form' onSubmit={props.handleSubmit(onSubmit)} className='grid grid-cols-1 p-3'>
                            <Field name='title' label='Recipe Name:' component={RenderInput} />
                            <button ref={formRef} className='hidden'></button>
                            <SubmitButton 
                            className='btn flex justify-items-center place-self-end bg-primary mt-4' 
                            defaultText='Create Recipe'
                            loading={loading} 
                            submitSuccess={submitSuccess}
                            setSubmitSuccess={setSubmitSuccess}
                            submitError={submitError} 
                            />  
                        </form>

                    </div>
                </div>

            </div>
        </Modal>
    );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
    createRecipe
};

const validate = ({title}) => {
    const errors = {};

    if (!title) {
        errors.title = 'You must enter a Recipe Name!';
    };
    if (String(title).length < 3) {
        errors.title = 'The Recipe name must be at least 3 characters long';
    };
    if (String(title).length > 40) {
        errors.title = 'The Recipe name must no exceed 40 characters';
    };
    
    return errors;
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({form: 'recipeForm', validate})
    )(CreateRecipeModal);
