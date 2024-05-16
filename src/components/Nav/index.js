import React, { useEffect } from 'react';
import './nav.css';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'; 
import SearchBar from '../SearchBar/index';
import LinkGift from '../Link/LinkGift';
import LinkNotif from '../Link/LinkNotif';
import LogoNetflix from '../Logo/LogoNetflix';
import PictureLogo from '../Picture/PictureLogo';
import LinkAvatarIcon from '../Link/LinkAvatarIcon';
import LinkAcceuil from '../Link/LinkAcceuil';
import LinkFavories from '../Link/LinkFavories';
import LinkSeries from '../Link/LinkSeries';
import LinkTintin from '../Link/LinkTintin';
import LinkHerge from '../Link/LinkHerge';
import LinkTrendies from '../Link/LinkTrendies';
import Cart from '../Cart/cart';
import {
    BrowserRouter as Router,
    Routes,
    Switch,
    Route,
    Redirect,
    Link,
} from "react-router-dom"
import { color } from '@mui/system';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import Oclock from '../Clock/clock';

// composant de la barre de navigation de l'application
function Nav(props) {
    console.log("🚀 ~ Nav ~ props:", props.userStorage)
    console.log(props.todos);

    // booléen gestion affichage de la barre de navigation
    const [navBlack, setNavBlack] = useState(false);

    // booléen gestion affichage du menu dans le cas de petit écran menu burger
    const [toggleMenu, setToggleMenu] = useState(false);

    // booléen gestion affichage du logo de la barre de navigation
    const [toggleLogo, setToggleLogo] = useState(true);

    // booléen gestion affichage du l'icone avatar de la barre de navigation
    const [isLogged, setIsLogged] = useState(false);

    // stockage de la valeur de recherche de l'input barre de recherche
    const inpRef = useRef();

    // si détection de scrool barre de navigation s'affiche
    // const transitionNav = () => {
    //     window.scrollY > 100 ? setNavBlack(true) : setNavBlack(false)
    // };

    // useState(() => {
    //     document.addEventListener("scroll", transitionNav);

    // });

    const displayNav = () => {
        setToggleLogo(true)
    };


    useState(() => {
        document.addEventListener("scroll", displayNav);
    });
    // si clique sur le menu burger les liens apparaitront
    const handleClickNav = () => {
        console.log('click nav')
        toggleMenu ? setToggleMenu(false) : setToggleMenu(true);
        console.log({ toggleMenu });
    };

    const colorRgbAcceuil = {
        color: "244, 188, 47"
    };

    const colorRgbFavories = {
        color: "238, 161, 36"
    };

    const colorRgbSeries = {
        color: "235, 133, 37"
    };

    const colorRgbTintin = {
        color: "244, 95, 15"
    };

    const colorRgbHerge = {
        color: "254, 64, 17"
    };

    const colorRgbToprated = {
        color: "243, 10, 10"
    };

    const colorRgbToRegister = {
        color: "34, 131, 233"
    };

    const colorRgbToLogin = {
        color: "0, 182, 255"
    };



    return (
        <div className='container'>
            {/* <div className='nav_logo'>
                <LogoNetflix />
            </div> */}
            {/* <button className='menu_burger' onClick={handleClick}>
                <MenuIcon />
            </button> */}
            <div class="btn-round-menu" onClick={handleClickNav}>
                <div class="cont-line">
                    <div class="line-unique">
                    </div>
                </div>
            </div>



            <Oclock />
            <nav className={`${toggleMenu ? "navigation" : "navigation-none"}`}>

                <div className='nav_linka'>
                    <a className="link-logo" href='/'><LogoNetflix /></a>
                    <Link className="link_nav" style={{ color: `rgb(${colorRgbAcceuil.color})` }} to="/acceuil">ACCUEIL</Link>
                    <Link className="link_nav" style={{ color: `rgb(${colorRgbFavories.color})` }} to="/favories">FAVORIS</Link>
                    <Link className="link_nav" style={{ color: `rgb(${colorRgbSeries.color})` }} to="/characters">PERSO SERIES</Link>
                    <Link className="link_nav" style={{ color: `rgb(${colorRgbTintin.color})` }} to="/tintin">TINTIN</Link>
                    <Link className="link_nav" style={{ color: `rgb(${colorRgbHerge.color})` }} to="/herge">HERGE</Link>
                    <Link className="link_nav" style={{ color: `rgb(${colorRgbToprated.color})` }} to="/toprated">TOP RATED</Link>
                    { !props.userStorage ? <Link className="link_nav" style={{ color: `rgb(${colorRgbToRegister.color})` }} to="/register">REGISTER</Link>:  null }
                    { !props.userStorage ? <Link className="link_nav" style={{ color: `rgb(${colorRgbToLogin.color})` }} to="/login">LOGIN</Link>: null }
                    <Link className="link_nav" style={{ color: `rgb(${colorRgbToLogin.color})` }} to="/basket"><LinkNotif store={props.todos} /></Link>
                    <Cart className="link_nav" style={{ backgroundColor: `rgb(${colorRgbToLogin.color})` }} props={props.todos} />
                    { /* Le link LinkGift apparait uniquement si l'utilisateur est connecté */}
                    <div className="link_nav_avatar">
                        {isLogged ? <LinkGift /> : null}
                    <LinkAvatarIcon />

                    </div>




                    {/* utilisation de la librairie  styled components pour les styles  */}
                    {/* composant de la barre de recherche du menu de navigation
                                ou se trouve les props de App du formulaire de la barre de 
                                recherche */}

                    <div className='searchbar'>

                        <SearchBar
                            handleInput={props.handleInput}
                            handleForm={props.handleForm}
                            value={props.data}
                            inRef={props.inpRef}
                        />

                    </div>


                </div>
            </nav>

        </div>
    );
}

export default Nav;