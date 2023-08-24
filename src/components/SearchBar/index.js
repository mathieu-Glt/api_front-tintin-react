import React, { useEffect } from 'react';
import './searchBar.css';
import { useState } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import { useRef } from 'react';
//import { SearchMoviesWithKeyWord } from '../MovieSearch/moviedb'
import { createSearchParams, Navigate, useNavigate } from 'react-router-dom'


// composant de la barre de recherche 
function SearchBar(props) {
    //console.log(props);

    // constante pour récupérer un erreur
    const [error, setError] = useState(null);
    // booléen gestion affichage bouton validation barre de recherche
    const [toggleSearch, setToggleSearch] = useState(false);
    // constante qui stocke la valeur de l'input de la barre de recherche
    const [searchValue, setSearchValue] = useState('');

    // recuperation des props de App valeur de la barre de recherche
    const inpRef = useRef(props.inputValue)
    const ref = inpRef
    // console.log(inpRef);

    // fonction soumission formulaire se trouvant dans App
    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleForm(e, searchValue);
        setSearchValue('');
    };

    // fonction qui se déclenche au changement intervenant sur le champs input barre de recherche
    const handleInput = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    };


    // fonction qui active l'affichage du bouton barre de recherche
    const searchClick = (e) => {
        e.preventDefault();
        setToggleSearch(!toggleSearch);

    };

    return (
        <div className='loop_search_container'>

            <a href="#" className='nav_action_link' onClick={searchClick}>
                <SearchIcon />
            </a>
            <form
                onSubmit={handleSubmit}
                className='form_search'
            >
                <div className='form_search_input'>
                    <input
                        ref={props.inpRef}
                        className={`${toggleSearch ? 'search_form' : 'nav-transparent_link'}`}
                        type="search" name="name" id="search"
                        value={searchValue}
                        onChange={handleInput}
                        placeholder="Search movie tintin here"
                    />

                    <button
                        className={`${toggleSearch ? 'button_submit' : 'button_submit_transparent'}`}
                    >
                        Search
                    </button>
                </div>
            </form>

        </div>

    );

}

export default SearchBar;
