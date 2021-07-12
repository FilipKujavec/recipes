import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import UploadModal from '../shared/UploadModal';
import { uploadRecipeImage } from '../../actions';

export const RecipeImage = (props) => {
    const { imageUrl, id, uploadRecipeImage } = props;

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const onEscape = () => {
        setShowUploadModal(false);
    };

    const handleFile = async (fileUploaded) => {
        const response = await uploadRecipeImage(fileUploaded, id, setUploadError);

        setTimeout(() => {
            onEscape(false);
        }, 500);
    };


    return (
        <>
        <img className='object-cover h-full w-full' src={imageUrl} />
        <svg onClick={() => setShowUploadModal(true)} className='absolute bottom-2 right-2 w-10 fill-current text-green-500 cursor-pointer shadow-lg transform hover:scale-125' xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" ><path d="M11 11h4a1 1 0 0 0 0-2h-4V5a1 1 0 0 0-2 0v4H5a1 1 0 1 0 0 2h4v4a1 1 0 0 0 2 0v-4zm-1 9C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path></svg>
        {showUploadModal ? <UploadModal onEscape={onEscape} handleFile={handleFile} fileName={id} label='Upload Recipe Image' acceptedFiles='*.png *.jpeg' />:null}
        </>
    );
};

const mapStateToProps = (state) => ({
    uploadProgress: state.uploadProgress,
});

const mapDispatchToProps = {
    uploadRecipeImage
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeImage);