import React, { useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { filter } from 'lodash';

import CreateRecipeModal from './CreateRecipeModal'
import RecipeItem from '../shared/RecipeItem';
import PublishButton from '../shared/Buttons/PublishButton';
import DeleteButton from '../shared/Buttons/DeleteButton';

export const ManageRecipesComponent = (props) => {
    const { recipes } = props;

    const [showCreateRecipeModal, setShowCreateRecipeModal] = useState(false);

    // if (!props.recipes) return <div></div>;

    const renderRecipeItem = () => {
        return (props.userRecipes.map(recipe => {
            return (
                <div className='card wrap w-full' key={recipe.id} >
                    <RecipeItem {...recipe} inactive />
                    <div className='flex justify-center mb-4 gap-x-2'>
                        <Link to={`edit/${recipe.id}`} className='btn bg-bgc'>Edit</Link>
                        <PublishButton id={recipe.id} btnColor='bgc' spinnerColor='black' isPublished={recipe.published} />
                        <DeleteButton id={recipe.id} title={recipe.title} />
                    </div>
                </div>
            );
        }));
    };

    return (
        <>  
            <div className='md:flex'>
                <h2 className='flex-grow'>Edit your Recipes</h2>

                <div onClick={() => setShowCreateRecipeModal(true)} className='flex self-end ml-2 md:ml-0 mt-2 md:mt-0 mr-4 transform hover:scale-110 cursor-pointer' >
                    <svg className='w-6 fill-current' viewBox="-4.5 -4.5 24 24"><path d="M8.9 6.9v-5a1 1 0 1 0-2 0v5h-5a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5z"></path></svg>
                    <p className='font-bold self-center' >Create new</p>
                </div>

            </div>

            <hr/>
            
            <div className='card bottom w-full px-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-4 gap-y-4 justify-items-center '>
                    {props.userRecipes ? renderRecipeItem():null}
                </div>
            </div>

            {showCreateRecipeModal === true ? <CreateRecipeModal onEscape={() => setShowCreateRecipeModal(false)} />:null}
        </>
    );
};

const mapStateToProps = (state) => ({
    uid: state.firebase.auth.uid,
    //Returns Array of Recipes with authour.uid === uid
    userRecipes: filter(state.firestore.ordered.recipes, function(o) { return o.author.uid === state.firebase.auth.uid })
});

const mapDispatchToProps = {
    
};

export const ManageRecipes = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect( props => ([ { collection: 'recipes', where: ['author.uid', '==', props.uid ] } ]) ),
    )(ManageRecipesComponent);
