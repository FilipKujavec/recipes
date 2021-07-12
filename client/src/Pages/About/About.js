import React from 'react';

//TODO Redesign
export function About() {
    return (
        <>
            <h2>About us</h2>

            <hr/>

            <div className='flex-rows xl:w-4/6 md:gap-x-2 mx-auto mt-0'>
                <div className=''>
                    <img className='about img right' src='https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' />
                    <p className='about title'> Sint aute </p>
                    <p className='about text'> Occaecat non esse nisi quis eu occaecat excepteur minim dolore culpa sint. Est dolor culpa veniam deserunt irure enim incididunt ipsum. Elit do aliquip cillum tempor nulla sit enim tempor excepteur minim sit laborum non. Pariatur proident irure irure nulla aliquip aliquip veniam. Pariatur quis amet aute commodo cupidatat magna laborum adipisicing exercitation labore pariatur eiusmod officia.</p>
                </div>
                <div className='mt-4 md:mt-8' >
                    <img className='about img left' src='https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'></img>
                    <p className='about title right'> Sint aute </p>
                    <p className='about text right'> Occaecat non esse nisi quis eu occaecat excepteur minim dolore culpa sint. Est dolor culpa veniam deserunt irure enim incididunt ipsum. Elit do aliquip cillum tempor nulla sit enim tempor excepteur minim sit laborum non. Pariatur proident irure irure nulla aliquip aliquip veniam. Pariatur quis amet aute commodo cupidatat magna laborum adipisicing exercitation labore pariatur eiusmod officia. </p>
                </div>
                <div className='mt-4 md:mt-8'>
                    <img className='about img right' src='https://images.unsplash.com/photo-1492739159057-7d1896b3c63f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'></img>
                    <p className='about title left'> Sint aute </p>
                    <p className='about text left'> Occaecat non esse nisi quis eu occaecat excepteur minim dolore culpa sint. Est dolor culpa veniam deserunt irure enim incididunt ipsum. Elit do aliquip cillum tempor nulla sit enim tempor excepteur minim sit laborum non. Pariatur proident irure irure nulla aliquip aliquip veniam. Pariatur quis amet aute commodo cupidatat magna laborum adipisicing exercitation labore pariatur eiusmod officia. </p>
                </div>
        </div>
       </>
    );
};