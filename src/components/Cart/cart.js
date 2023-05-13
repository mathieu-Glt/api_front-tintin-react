import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import store from '../../store';

// composant qui affiche l'incrémentation ou décrémentation du panier
export default function Cart(props) {

    let index = 0;

    // içi récupération des datas du state management de redux
    const displayCharacter = useSelector((state) => state)
    console.log(displayCharacter.todosReducer);
    for (let i = 0; i < displayCharacter.todosReducer.length + 1; i++) {
        // si film ajouté incrémentation de +1 
        // si film supprimé décrémentation de -1
        console.log(i);
        index = i;
    }

    // içi connexion au store de redux
    useEffect(() => {
        store.subscribe(() => syncStore())
    }, []);

    // récupération des datas du store
    const syncStore = () => {
        // setTodos(store.getState());
        console.log(store.getState());
    };


    return (
        <div><h1 className='bg-white border rounded-circle p-1 text-dark'>{index}</h1></div>
    )
}
