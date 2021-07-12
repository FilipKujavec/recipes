import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import _, { countBy } from 'lodash';
import sanitizeHtml from 'sanitize-html';
import { useHistory } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

function RecipeComponent(props) {
    const { uid, recipe, authorProfile } = props;
    const history = useHistory();
    const firestore = getFirestore();

    useEffect(() => {
        if (!recipe) return;
        firestore.get({ collection: 'users', doc: recipe.author.uid, storeAs: 'authorProfile'  })
    }, [recipe])

    //If recipe doesn't exist return
    if (!props.recipePage) return <div></div>;

    const createMarkup = () => {
        const recipePage = sanitizeHtml(props.recipePage.data);
        return { __html: recipePage};
    };

    const avatarUrl = authorProfile ? authorProfile.avatarUrl:'';


    return(
        <>
        <div className='relative flex place-items-end justify-between' >
            <div className=''>
                <h2> {recipe.title} </h2>
                <div className='flex'>
                    <p className='font-bold ml-4 flex-grow' > from {recipe.author.firstName} {recipe.author.lastName} </p>
                </div>
            </div>
            {recipe.author.uid === uid ?
                        <div onClick={() => history.push(`edit/${props.match.params.id }`)} className='absolute flex right-20 md:right-36 md:top-28 items-center cursor-pointer transform hover:scale-110'>
                            <svg className='w-5' viewBox="-2.5 -2.5 24 24"><path d="M16.318 6.11l-3.536-3.535 1.415-1.414c.63-.63 2.073-.755 2.828 0l.707.707c.755.755.631 2.198 0 2.829L16.318 6.11zm-1.414 1.415l-9.9 9.9-4.596 1.06 1.06-4.596 9.9-9.9 3.536 3.536z"></path></svg>
                            <p >Edit</p>
                        </div>
                    :null}
            <img className='object-cover h-16 w-16 md:h-32 md:w-32' src={avatarUrl} />

        </div>
            <hr/>

            <div className='unreset overflow-clip' id='display' dangerouslySetInnerHTML={createMarkup()}/>
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    recipePage: _.find(state.firestore.ordered.recipePages, function(o) { return o.id === ownProps.match.params.id }),
    recipe: _.find(state.firestore.ordered.recipes, function(o) { return o.id === ownProps.match.params.id }),
    uid: state.firebase.auth.uid,
    authorProfile: state.firestore.data.authorProfile,
});

const mapDispatchToProps = {
};

export const Recipe = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => ([{ collection: 'recipes', doc: props.match.params.id }, { collection: 'recipePages', doc: props.match.params.id }, { collection: 'recipes', doc: props.match.params.id }]) )
    )(RecipeComponent);
