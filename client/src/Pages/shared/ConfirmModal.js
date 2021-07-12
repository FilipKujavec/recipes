import React from 'react';
import Modal from './Modal';

export default function ConfirmModal(props) {
    const { onEscape, label, onConfirm } = props;

    //Customization
    const firstBtnText = props.firstBtnText ? props.firstBtnText:'Confirm';
    const secondBtnText = props.secondBtnText ? props.secondBtnText:'Cancel';
    const firstBtnColor = props.firstBtnColor ? props.firstBtnColor:'bg-primary';
    const secondBtnColor = props.secondBtnColor ? props.secondBtnColor:'bg-red-500';

    return (
        <Modal onEscape={onEscape}>
            <div onClick={(e) => e.stopPropagation()} className='modal wrap'>
                
                <div className='modal top'>
                    <h1 className='modal'> {label} </h1>
                        <svg onClick={onEscape} className='modal' viewBox="-6 -6 24 24"><path d="M7.314 5.9l3.535-3.536A1 1 0 1 0 9.435.95L5.899 4.485 2.364.95A1 1 0 1 0 .95 2.364l3.535 3.535L.95 9.435a1 1 0 1 0 1.414 1.414l3.535-3.535 3.536 3.535a1 1 0 1 0 1.414-1.414L7.314 5.899z"></path></svg>
                </div>

                <div className='modal bottom'>
                    <p className='font-bold text-center'> {props.confirmQuestion} </p>
                    <div className='flex justify-center mt-4 gap-x-2'>
                        <button onClick={onConfirm} className={`btn ${firstBtnColor}`} > {firstBtnText} </button>
                        <button onClick={onEscape} className={`btn ${secondBtnColor}`} > {secondBtnText} </button>
                    </div>
                </div>

            </div>
        </Modal>
    );
};
