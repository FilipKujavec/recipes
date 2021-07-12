import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';

import UploadModal from '../shared/UploadModal';
import { uploadAvatar } from '../../actions';

export const Avatar = (props) => {
    const { avatarUrl, uid, uploadProgress, uploadAvatar } = props;
    const firebase = useFirebase();

    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const imgSrc = avatarUrl ? avatarUrl:'https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg';

    const handleFile = async (fileUploaded) => {
        const response = await uploadAvatar(fileUploaded, setUploadError);

        setTimeout(() => {
            setShowUploadModal(false);
        }, 500);
    };

    return (
        <div>
            <div className='relative border-2 w-full h-64 md:w-64 border-primary rounded-lg overflow-hidden' >
                <div className='border-2 h-full w-full rounded-lg overflow-hidden border-white' >
                    <img className='object-cover h-full w-full' src={imgSrc} />
                    <svg onClick={() => setShowUploadModal(true)} className='absolute bottom-3 right-3 w-10 fill-current text-green-500 cursor-pointer shadow-lg transform hover:scale-125' xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" ><path d="M11 11h4a1 1 0 0 0 0-2h-4V5a1 1 0 0 0-2 0v4H5a1 1 0 1 0 0 2h4v4a1 1 0 0 0 2 0v-4zm-1 9C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path></svg>
                </div>
            </div>

            {showUploadModal ? 
            <UploadModal 
                handleFile={handleFile}
                fileName={uid} 
                label='Upload Avatar'
                acceptedFiles='*.png *.jpeg'
                onEscape={() => setShowUploadModal(false)} 
            />
            :null }
        </div>
    );
};

const mapStateToProps = (state) => ({
    uploadProgress: state.uploadProgress,
    state: state,
});

const mapDispatchToProps = {
    uploadAvatar
};

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
