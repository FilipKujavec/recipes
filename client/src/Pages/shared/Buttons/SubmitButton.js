import React, { useEffect } from 'react';

//State to be used in Parent Component
// const [loading, setLoading] = useState(false);
// const [submitSuccess, setSubmitSuccess] = useState(false);
// const [submitError, setSubmitError] = useState(null);

//Needs loading, submitSuccess, submitError as props (onClickHandler optional)
export default function SubmitButton(props) {
    const { loading, submitSuccess, setSubmitSuccess, submitError, className } = props;

    //Customizeable through these props
    const btnColor = props.btnColor ?`bg-${props.btnColor}`:'bg-primary';
    const spinnerColor = props.spinnerColor ?`text-${props.spinnerColor}`:'text-white';
    const defaultText = props.defaultText ? props.defaultText:'Save';
    const successText = props.successText ? props.successText:'Saved';
    const failedText = props.failedText ? props.failedText:'Failed';

    //Reset's the button 5 seconds after a submit
    useEffect(() => {
        let timeout = null;

        if (submitSuccess === true) {
            timeout = setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [submitSuccess]);

    const onClick = () => {
        if (props.onClickHandler) {
            props.onClickHandler();
        }
        return;
    };

    if (submitSuccess === true && !submitError && !loading) {
        return (
            <button onClick={onClick} className={`${className} ${btnColor}`} >
               <svg className={`h-4 animate-bounce fill-current ${spinnerColor}`} xmlns="http://www.w3.org/2000/svg" viewBox="-5 -7 24 24"><path d="M5.486 9.73a.997.997 0 0 1-.707-.292L.537 5.195A1 1 0 1 1 1.95 3.78l3.535 3.535L11.85.952a1 1 0 0 1 1.415 1.414L6.193 9.438a.997.997 0 0 1-.707.292z"></path></svg>
                <p className={`ml-1`} > {successText} </p>
            </button> 
        );
    }else if (submitError) {
        return (
            <button onClick={onClick} className={`${className} bg-red-500`} >
                <svg className={`h-4 animate-ping fill-current ${spinnerColor}`} xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" ><path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg>
                <p className={`ml-1`} > {failedText} </p>
            </button> 
        );
    }else if (loading === true) {
        return (
            <button onClick={onClick} className={`${className} ${btnColor}`}>
                <svg className={`h-4 animate-spin fill-current ${spinnerColor}`} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                    <mask ><path d="M120 60C120 52.1207 118.448 44.3185 115.433 37.039C112.417 29.7595 107.998 23.1451 102.426 17.5736C96.8549 12.0021 90.2405 7.58251 82.961 4.56723C75.6815 1.55195 67.8793 -3.44416e-07 60 0L60 12C66.3034 12 72.5452 13.2416 78.3688 15.6538C84.1924 18.066 89.4839 21.6017 93.9411 26.0589C98.3983 30.5161 101.934 35.8076 104.346 41.6312C106.758 47.4548 108 53.6966 108 60H120Z" stroke="white" strokeWidth="10" /></mask><path d="M120 60C120 52.1207 118.448 44.3185 115.433 37.039C112.417 29.7595 107.998 23.1451 102.426 17.5736C96.8549 12.0021 90.2405 7.58251 82.961 4.56723C75.6815 1.55195 67.8793 -3.44416e-07 60 0L60 12C66.3034 12 72.5452 13.2416 78.3688 15.6538C84.1924 18.066 89.4839 21.6017 93.9411 26.0589C98.3983 30.5161 101.934 35.8076 104.346 41.6312C106.758 47.4548 108 53.6966 108 60H120Z" strokeWidth="10" />
                </svg>
                <p className={`ml-1`} > Loading </p>
            </button> 
        );
    }else {
        return (
            <button onClick={onClick} className={`${className} ${btnColor}`}>
                <p className={`ml-1`}> {defaultText} </p>
            </button> 
        );
    };
};