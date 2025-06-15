// src/pages/LandingPage.js
import React from 'react';
import '../Styles/LandingPage.css'; // Import your CSS styles
import logoImg from '../assets/logo-pluma.png';
import letterA from '../assets/cartas1.png';
import letterB from '../assets/cartas2.png'; // Assuming you have a letter A image

import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing">
      <header className="landing-header">
        <img src={logoImg} alt="Cartas Vintage Logo" className="logo" />
        <Link to="/carta" className="cta-button">Escreva sua carta</Link>
      </header>

 <div className='intro-landing'>
        <div className='intro-images'>
        <div className='imageA'><img src={letterA} alt="Carta A" className="letter-image" /></div>
        <div className='imageB'><img src={letterB} alt="Carta B" className="letter-image" /></div>
        </div>
         <div className="hero">
        <h2>Transforme palavras em memórias eternas</h2>
        <p>Cartas escritas à mão, com alma, selo e papel especial. Feitas por alguém que entende o valor do sentimento.</p>
      </div>
 </div>

    <section className="como-funciona-container">
      <h2>Como funciona</h2>
      <div className="etapas">
        <div className="etapa">
          <span className="numero">1</span>
          <p>Você escreve sua mensagem com carinho no nosso site.</p>
        </div>
        <div className="etapa">
          <span className="numero">2</span>
          <p>Eu transcrevo à mão com papel, tinta e selo de verdade.</p>
        </div>
        <div className="etapa">
          <span className="numero">3</span>
          <p>Postamos sua carta com rastreio e cuidado até o destinatário.</p>
        </div>
      </div>
    </section>




      
    </div>
  );
};

export default LandingPage;
