import React from 'react';
import './Link.css';

// composant lien ACCEUIL de la barre de navigation
function LinkAcceuil(props) {

    return (
        <a href="/acceuil" className='nav_linkAcceuil'>
            {props.name}
        </a>

    )

}

export default LinkAcceuil;