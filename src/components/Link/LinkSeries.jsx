import React from 'react';
import './Link.scss';


// composant lien SERIES de la barre de navigation (les personnages de tintin)
function LinkSeries(props) {

    return (
        <a href="/" className='nav_linkSeries'>
            {props.name}
        </a>

    )

}

export default LinkSeries;