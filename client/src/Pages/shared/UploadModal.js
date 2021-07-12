import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';

import Modal from './Modal';

// <UploadModal onEscape={onEscape} handleFile={handleFile} fileName={id} label='Upload Recipe Image' acceptedFiles='*.png *.jpeg' />
// Üass onEscape, handleFile, fileName, label and acceptedFiles dow as props

export const UploadModal = (props) => {
    const { onEscape, label, handleFile, uploadProgress } = props;
    
    const [dragEnter, setDragEnter] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [loading, setLoading] = useState(false);

    const hiddenFileInput = useRef(null);

    const openFileInput = () => {
        hiddenFileInput.current.click();
    };

    const onUpload = async (files) => {
        const file = files[0];

        //Removes previous Errors and 
        setLoading(true);
        setUploadError(false);

        //Changes the file name to fileName provided by Parent Component if it exists
        // if (fileName) {
        //     Object.defineProperty(file, 'name', {
        //         writable: true,
        //         value: fileName
        //     });
        // };
        
        const response = await handleFile(file);
    }

    const onDragEnter = () => {
        setDragEnter(true);
    };

    const onDragLeave = () => {
        setDragEnter(false);
    };

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: 'image/*',
        maxSize: 10485760,
        mutiple: false,
        onDragEnter: onDragEnter,
        onDragLeave: onDragLeave,
        onDrop: onUpload,
    });

    const renderUpload = () => {
        if (uploadError) {
            return (
                <div className='error'>
                    <p className='error'>
                        File Upload failed, please try again later
                    </p>
                </div>
            );
        }else if (loading && uploadProgress === 100) {
            return(
                <>
                    <div className='flex justify-items-center mb-2'>
                        <svg className={`h-4 animate-bounce fill-current `} xmlns="http://www.w3.org/2000/svg" viewBox="-5 -7 24 24"><path d="M5.486 9.73a.997.997 0 0 1-.707-.292L.537 5.195A1 1 0 1 1 1.95 3.78l3.535 3.535L11.85.952a1 1 0 0 1 1.415 1.414L6.193 9.438a.997.997 0 0 1-.707.292z"></path></svg>
                        <p className='font-bold'>Upload Done!</p>
                    </div>
                    <progress className='shadow-lg w-full' value={uploadProgress} max='100'></progress>
                </>
            );
        }else if (loading) {
            return(
                <>
                    <p className='font-bold mb-2'>Upload in Progress</p>
                    <progress className='shadow-lg w-full' value={uploadProgress} max='100'></progress>
                </>
            );
        }else {
            return(
                <div className='flex flex-col justify-center border-2 border-primary rounded-xl w-full p-4 h-32 cursor-pointer' {...getRootProps()}>
                    <input {...getInputProps()} />
                    <svg className='fill-current self-center text-primary w-12' viewBox="-5 -5 24 24" ><path d="M8 3.414v5.642a1 1 0 1 1-2 0V3.414L4.879 4.536A1 1 0 0 1 3.464 3.12L6.293.293a1 1 0 0 1 1.414 0l2.829 2.828A1 1 0 1 1 9.12 4.536L8 3.414zM1 12h12a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2z"></path></svg>
                    <div className='self-center p-1 rounded-xl mt-2 text-xs' > Drag and Drop files to Upload </div>
                </div>
            );
        };
    };

    return (
        <Modal onEscape={onEscape}>
            <div onClick={(e) => e.stopPropagation()} className='modal wrap'>
                
                <div className='modal top'>
                    <h1 className='modal'> {label} </h1>
                        <svg onClick={onEscape} className='modal' viewBox="-6 -6 24 24"><path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path></svg>
                </div>

                <div className='modal bottom'>
                    <div className='grid place-items-center bg-bgc rounded p-4'>
                        {renderUpload()}
                    </div>
                </div>

            </div>
        </Modal>
    );
};

const mapStateToProps = (state) => ({
    uploadProgress: state.uploadProgress
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadModal);
