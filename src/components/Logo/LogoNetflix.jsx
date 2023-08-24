import React from 'react';
import './Logo.css';
import netflixYellow from '../../assets/images/tintin.png';
// composant ou se trouve le logo de l'application dans la barre de navigation
function LogoNetflix() {

    return (
        
        <img src={netflixYellow} className='logo' alt='netflix' />

    )

}

export default LogoNetflix;