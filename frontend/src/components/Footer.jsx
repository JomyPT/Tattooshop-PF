import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Footer.css';
import { studioInfo } from '../config/studioConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-brand-content">
              <img src="/logo.png" alt="Vilares Vintage Tattoos Logo" className="footer-logo-icon" />
              <div>
                <h2 className="footer-logo">Vilares Vintage Tattoos</h2>
                <p className="footer-tagline">Arte permanente, memórias eternas</p>
              </div>
            </div>
            <div className="footer-social">
              <a 
                href={studioInfo.instagram && studioInfo.instagram.trim().length > 0 ? studioInfo.instagram : "https://instagram.com"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Navegação</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/artistas">Artistas</Link></li>
              <li><Link to="/trabalhos">Trabalhos</Link></li>
              <li><Link to="/agendamento">Agendamento</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3>Contacto</h3>
            <div className="footer-contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Rua da Ponte 420, 4435-402 Rio Tinto, Gondomar, Portugal</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:vilaresvintagetattoos@gmail.com">vilaresvintagetattoos@gmail.com</a>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <a href="tel:+351915288751">+351 915 288 751</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>© {currentYear} Vilares Vintage Tattoos</span>
            <span className="footer-separator">|</span>
            <span>Todos os direitos reservados</span>
          </div>
          <div className="footer-credits">
            Desenvolvido com paixão pela arte
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
