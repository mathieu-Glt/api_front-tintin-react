import React from 'react';
import './Link.css';

// composant lien TINTIN de la barre de navigation (le personnage de tintin)
function LinkTintin(props) {

    return (
        <a href="/" className='nav_linkTintin'>
            {props.name}
        </a>

    )

}

export default LinkTintin;