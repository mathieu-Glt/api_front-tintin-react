import React from 'react';
import './PictureLogo.scss';
import pictureLogo from '../../assets/images/Tintin.jpg';

// composant qui à le chemin de l'image du logo
function PictureLogo() {

    return (
        
        <img src={pictureLogo} className='logoPicture' alt='netflix' />

    )

}

export default PictureLogo;