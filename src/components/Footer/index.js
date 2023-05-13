import React from 'react';
import "./Footer.scss";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YoutubeIcon from "@material-ui/icons/YouTube";


// composant du footer de la page
function Footer() {
    return (
    <footer className='footer'>
        <div className='container'>
            <div className='footer__socials'>
                <a href="#" className='footer__link_facebook'>
                    <FacebookIcon />
                </a>
                <a href="#" className='footer__link_instagram'>
                <InstagramIcon />
                </a>
                <a href="#" className='footer__link_twitter'>
                <TwitterIcon />
                </a>
                <a href="#" className='footer__link_youtube'>
                <YoutubeIcon />
                </a>
            </div>
        </div>
        <ul className='footer__links'>
            <li className='footer__link'>
                <a href="#" className='link'>Lien footer</a>
            </li>
            <li className='footer__link'>
                <a href="#" className='link'>Lien footer</a>
            </li>
            <li className='footer__link'>
                <a href="#" className='link'>Lien footer</a>
            </li>
            <li className='footer__link'>
                <a href="#" className='link'>Lien footer</a>
            </li>
            <li className='footer__link'>
                <a href="#" className='link'>Lien footer</a>
            </li>
            <li className='footer__link'>
                <a href="#" className='link'>Lien footer</a>
            </li>
            <li className='footer__link'>
                <a href="#">Lien footer</a>
            </li>
            <li className='footer__link'>
                <a href="#">Lien footer</a>
            </li>
        </ul>
        <p>Dans le cadre de la réalisation de ce site je tenais à remercier l'aide précieuse de <a target="_blank" href='https://danielorchanian.fr/'>Daniel Orchanian</a> et Antoine Monesma pour la qualité de leur formation ainsi que leur conseils. </p>
        <p>Je donne mes differents liens pour me contacter <a target="_blank" href='https://github.com/mathieu-Glt'>vers mon Git Hub</a> <a target="_blank" href='http://mathieu.gillet-portfolio.surge.sh/'>Mon portfolio</a></p>

        <div className='footer__copy'>Oldix Tintin - tous droit réservés</div>
    </footer>
    );
}

export default Footer;