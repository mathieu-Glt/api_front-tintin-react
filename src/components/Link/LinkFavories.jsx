import React from 'react';
import './Link.css';

// composant lien FAVORIES de la barre de navigation
function LinkFavories(props) {

    return (
        <a href="/" className='nav_linkFavories'>
            {props.name}
        </a>

    )

}

export default LinkFavories;