import React from 'react';
import './Link.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Basket from '../Basket/basket';


// composant lien du panier de l'application de la barre de navigation
function ShoppingCart(props) {
    console.log(props.store);

    return (
        <a href="/basket" className='nav_action_notif'>
            {/* icone visuel du panier */}
            <ShoppingCartIcon >
                {/*composant Basket qui gére le panier */}
                <Basket store={props.store} />
            </ShoppingCartIcon>
        </a>

    )

}

export default ShoppingCart;