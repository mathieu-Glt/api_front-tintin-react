import React from 'react';
import './error404.css';

// composant d'affichage de la page catSanCat
export default function Error404() {
  return (
    <div className='blink-bg'>
      <p className='bg-dark text-danger text-center p-4 mt-3 font-weight-bold'>Woops 404 ERROR ! Are you lost ?</p>
      <img className=" m-4 rounded mx-auto d-block" src={process.env.PUBLIC_URL + '/assets/Haddock404.PNG'} alt="image_404" width="450" height="550" />

  </div>

  )
}
