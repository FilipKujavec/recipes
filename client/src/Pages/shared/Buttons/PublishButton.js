import React, { useState } from 'react';
import { connect } from 'react-redux'

import SubmitButton from './SubmitButton';
import { publishRecipe } from '../../../actions';

export const PublishButton = (props) => {
    const {isPublished, id, publishRecipe} = props;
    
    const [loading, setLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const onClickHandler = async () => {
        const publishValue = isPublished === true ? false:true

        const response = await publishRecipe(id, publishValue, setLoading, setSubmitSuccess, setSubmitError);
    };

    return (
        <SubmitButton 
        className='btn flex'
        btnColor={props.btnColor}
        spinnerColor={props.spinnerColor}
        defaultText={isPublished === true ? 'Hide':'Publish'}
        successText={isPublished === false ? 'Hidden':'Published'}
        loading={loading}
        submitSuccess={submitSuccess}
        submitError={submitError}
        onClickHandler={onClickHandler}
        setSubmitSuccess={setSubmitSuccess}
        />
    );
};

const mapStateToProps = (state) => ({
    
});

const mapDispatchToProps = {
    publishRecipe
};

export default connect(mapStateToProps, mapDispatchToProps)(PublishButton);
