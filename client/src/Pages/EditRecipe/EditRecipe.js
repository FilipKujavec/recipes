import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, useFirebase, useFirestore } from 'react-redux-firebase';
import { compose } from 'redux';
import { find } from 'lodash';

import Editor from '../shared/Editor';
import RecipeValues from './Values';
import RecipeImage from './Image';

export const EditRecipeComponent = (props) => {
    const { recipe } = props;
    const firebase = useFirebase();

    // Renders empty div when recipe isn't loaded
    if (!recipe) return <div></div>;
    if (!props.initialValues.title) return <div></div>;

    //Shows Placeholder image if no image is available
    const imageUrl = recipe.imageUrl ? recipe.imageUrl:'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg';

    console.log('HERE', props.initialValues);

    return (
        <div>
            <div className='grid md:grid-cols-2 md:space-x-4 space-y-4 md:space-y-0 h-2/6 '>

                <div className='relative rounded-xl h-80 overflow-hidden'>
                    <RecipeImage firebase={firebase} id={recipe.id} imageUrl={imageUrl} />
                </div>  

                <div className='card wrap '>  
                    <div className='card top'>
                        <p className='card'>Edit Recipe</p>
                    </div> 
                    <div className='card bottom'>
                        <RecipeValues recipe={recipe} initialValues={props.initialValues}  />
                    </div>
                </div>

            </div>

            <div className='card wrap mt-4' >
                <div className='card top'>
                    <p className='card'>Edit Recipe Page</p>
                </div>
                <Editor recipeId={recipe.id} auth={props.auth} initialValue={props.recipePage} docId={recipe.id} />
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    //Assigns recipe to props.recipe by id
    recipe: find(state.firestore.ordered.recipes, function(o) { return o.id === ownProps.match.params.id }),
    //Assigns recipePage to props.recipePage by id
    recipePage: find(state.firestore.ordered.recipePages, function(o) { return o.id === ownProps.match.params.id }),
    //Assigns initialValues(recipes, recipeId) to props.initialValues by id
    initialValues: {...find(state.firestore.ordered.recipes, function(o) { return o.id === ownProps.match.params.id })}
});

const mapDispatchToProps = {
    
};

export const EditRecipe = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect( props => ([ `recipes/${props.match.params.id}`, `recipePages/${props.match.params.id}` ]) )
    )(EditRecipeComponent);