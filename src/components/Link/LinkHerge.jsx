import React from 'react';
import './Link.scss';

// composant lien HERGE de la barre de navigation
function LinkHerge(props) {

    return (
        <a href="/" className='nav_linkHerge'>
            {props.name}
        </a>

    )

}

export default LinkHerge;