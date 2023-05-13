import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from "react";

// composant inutiliser pour le moment
function Favourite() {
    const [fav, setFav] =  useState(false);


        const handleClick = value => {
            setFav(!fav)
    };

}

export default Favourite;