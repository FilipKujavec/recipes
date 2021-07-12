import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal(props) {
    return ReactDOM.createPortal(
        <div onClick={props.onEscape} className='fixed pin z-50 bg-gray-700 bg-opacity-50 overflow-auto w-screen h-screen'>
            {props.children}
        </div>,
        document.querySelector('#modal')
    );
};