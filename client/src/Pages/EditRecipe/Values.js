import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

import PublishButton from '../shared/Buttons/PublishButton';
import SubmitButton from '../shared/Buttons/SubmitButton';
import { updateRecipe } from '../../actions';

const renderInput = ({label, input, meta, type, unit}) => {
    const displayError = meta.touched && meta.error ? true:false;

    //Shows the input as inactive until visited
    const className = `input unit ${meta.visited ? 'active':'inactive'}`;
    const classNameParagraph = `absolute right-5 bottom-2 font-bold ${meta.visited ? 'cursor-none':'cursor-pointer'} actual-appearance-none`;
    
    return (
        <div className={`grid`}>
        <label className='input mr-6' >{label}</label>
        <div className='relative flex'>
            <input className={className} { ...input } type={type} />
            <p className='unit absolute right-5 bottom-2 font-bold' >{unit}</p>
        </div>
        <p className='text-red-500'>{displayError ? meta.error:null}</p>
        </div>
    );
};

export const RecipeEditValues = (props) => {
    const { recipe, updateRecipe } = props;
    const formRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    console.log('here', recipe.title);
    if (recipe.title === '') return <div></div>;

    //Compares the formValues to the recipe and updates the recipe accordingly
    const onSubmit = async (formValues) => {
        //If a submission is in process we return
        if (loading === true) return;

        updateRecipe(formValues, setLoading, setSubmitSuccess, setSubmitError);
    };

    
    return (
        <>
            <form onSubmit={props.handleSubmit(onSubmit)}>
                <Field component={renderInput} name='title' label='Title:' />
                <Field type="number" component={renderInput} name='cookTime' label='Cook time:' unit='minutes' parse={(val) => parseInt(val, 10)} />
                <button ref={formRef} className='hidden'></button>
            </form>

            <div className='flex mt-6 justify-end space-x-2'>
                {/* Sumbits the form through the button with formRef*/}
                <PublishButton id={recipe.id} isPublished={recipe.published} />
                <SubmitButton 
                className='btn flex justify-items-center' 
                loading={loading} 
                submitSuccess={submitSuccess}
                setSubmitSuccess={setSubmitSuccess}
                submitError={submitError} 
                onClickHandler={() => formRef.current.click()} 
                />
            </div>
        </>
    );
};

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    updateRecipe
};

const validate = ({title, cookTime}) => {
    const errors = {};
    
    if (!title) {
        errors.title = 'You must enter a Recipe Title!';
    };
    if (String(title).length < 3) {
        errors.title = 'The Recipe Title must be at least 3 characters long!';
    };
    if (String(title).length > 40) {
        errors.title = 'The recipe title must no exceed 40 characters!';
    };
    if (!cookTime) {
        errors.cookTime = 'You must enter a cook time!';
    };
    if (cookTime) {
        if (parseInt(cookTime) < 0) {
            errors.cookTime = 'You must enter a valid number!'
        };
    };
    

    return errors;
};

export default compose(
    reduxForm({form: 'recipeForm', validate, enableReinitialize: true}),
    connect(mapStateToProps, mapDispatchToProps)
    )(RecipeEditValues);
