import React ,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { filter } from 'lodash';

import RecipeItem from '../shared/RecipeItem';
import PageComponent from '../shared/PageSelector';
import { search, searchClear } from '../../actions';

export const HomeComponent = (props) => {
    const { maxPages, searchResult } = props;
    console.log(searchResult);

    const [searchInput, setSearchInput] = useState('');
    const [searchPage, setSearchPage] = useState(0);
    // const inputRef = useRef(null);

    
    const renderRecipeItem = (recipes) => {
        return (recipes.map(recipe => {
            return <RecipeItem key={recipe.id ? recipe.id:recipe.title} {...recipe} />;
        }));
    };

    //Debouncing for the Search
    useEffect(() => {
        if (searchInput === '') {
            props.searchClear()
            return
        }

        const timeout = setTimeout(() => {
            props.search(searchInput, searchPage)
        }, 500);

        return () => {
            clearTimeout(timeout);
        };

        // eslint-disable-next-line
    }, [searchInput, searchPage]);

    return (
        <div>
        <h2>Search Recipes</h2>

        <div className='relative mt-2' >
            <input onChange={ e => setSearchInput(e.target.value) } value={searchInput} className='py-1 pl-8 w-full focus:outline-none' />
            <svg className='absolute top-1 left-1 w-6' viewBox="-2.5 -2.5 24 24"><path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z"></path></svg>
        </div>
        <hr/>

        <div className='recipeList'>
            {props.recipes && searchInput === '' ? renderRecipeItem(props.recipes):null}
            {searchResult ? renderRecipeItem(searchResult):null}
        </div>

        {searchResult ?
        <PageComponent maxPages={maxPages} setSearchPage={setSearchPage} searchPage={searchPage} />
        :null}

    </div>
    );
};

const mapStateToProps = (state) => ({
    recipes: filter(state.firestore.ordered.recipes, function(o) { return o.published === true; }),
    state: state,
    searchResult: state.searchResult.hits,
    maxPages: state.searchResult.nbPages
});

const mapDispatchToProps = {
    search,
    searchClear
};

export const Home = compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([ { collection: 'recipes', where: ['published', '==', true] } ])
    )(HomeComponent);
