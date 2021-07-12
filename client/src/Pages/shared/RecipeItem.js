import React from 'react';
import { useHistory } from "react-router-dom";

export default function RecipeItem(props) {
    const { title, imageUrl, cookTime, id, inactive, author } = props;
    const history = useHistory();

    return (
        <div onClick={() => inactive === true ? null:history.push(`/recipes/${id}`)} className='w-full md:p-2 lg:p-3'>
            <div className={`relative overflow-hidden mb-6 md:mb-2 w-full h-64 rounded-2xl bg-gray-100 shadow-md ${inactive === true ? null:'hover:shadow-lg cursor-pointer'}`}>
                <img className='h-4/6 w-full object-cover' src={imageUrl} alt={title} />
                <div className='mt-1 h-2/6 ml-2 lg:mt-3 lg:ml-4'>
                    <div onClick={() => history.push(`/recipes/${id}`)} className='font-bold text-2xl md:text-xl lg:text-2xl cursor-pointer'>{title}</div>
                    <p className='text-xl md:text-lg lg:text-xl'>From {author.firstName} {author.lastName}</p>
                </div>
                <div className='flex absolute h-1/6 items-center mt-3 ml-4 top-1 left-1 bg-bgc rounded-full p-1 border-secondary border-2'>
                    <svg className='w-6' viewBox="-2 -2 24 24" ><path d="M11 9h4a1 1 0 0 1 0 2h-5a1 1 0 0 1-1-1V4a1 1 0 1 1 2 0v5zm-1 11C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path></svg>
                    <span className='ml-1'>{cookTime} min</span>
                </div>
            </div>
        </div>
    );
};