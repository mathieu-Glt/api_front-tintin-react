import React from 'react';
import './Link.css';
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";




// composant situé dans la barre de navigation définitivement abandonné pour le moment
function LinkGift() {

    return (
        <button className='nav_link_gift'>
            <CardGiftcardIcon />
        </button>


    )

}

export default LinkGift;