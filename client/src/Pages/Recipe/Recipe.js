import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import _ from 'lodash';
import sanitizeHtml from 'sanitize-html';
import { useHistory } from 'react-router-dom';

function RecipeComponent(props) {
    const { uid, recipe } = props;
    const history = useHistory();

    //If recipe doesn't exist return
    if (!props.recipePage) return <div></div>;

    const createMarkup = () => {
        const recipePage = sanitizeHtml(props.recipePage.data);
        return { __html: recipePage};
    };

    return(
        <>
            <h2> {recipe.title} </h2>

            <div className='flex'>
                <p className='font-bold ml-4 flex-grow' > from {recipe.author.firstName} {recipe.author.lastName} </p>
                {recipe.author.uid === uid ?
                    <div onClick={() => history.push(`edit/${props.match.params.id }`)} className='flex items-center mr-4 cursor-pointer transform hover:scale-110'>
                        <svg className='w-5' viewBox="-2.5 -2.5 24 24"><path d="M16.318 6.11l-3.536-3.535 1.415-1.414c.63-.63 2.073-.755 2.828 0l.707.707c.755.755.631 2.198 0 2.829L16.318 6.11zm-1.414 1.415l-9.9 9.9-4.596 1.06 1.06-4.596 9.9-9.9 3.536 3.536z"></path></svg>
                        <p >Edit</p>
                    </div>
                :null}
            </div>

            <hr/>

            <div className='unreset overflow-clip' id='display' dangerouslySetInnerHTML={createMarkup()}/>
        </>
    );
};

const mapStateToProps = (state, ownProps) => ({
    recipePage: _.find(state.firestore.ordered.recipePages, function(o) { return o.id === ownProps.match.params.id }),
    recipe: _.find(state.firestore.ordered.recipes, function(o) { return o.id === ownProps.match.params.id }),
    uid: state.firebase.auth.uid
});

const mapDispatchToProps = {
    
};

export const Recipe = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => ([{ collection: 'recipes', doc: props.match.params.id }, { collection: 'recipePages', doc: props.match.params.id }]) )
    )(RecipeComponent);
