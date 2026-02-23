import "./Contact.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaStar } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="contact-section">
      <h2>Contactos</h2>
      <p className="contact-subtitle">Visite-nos ou entre em contacto para marcar a sua sessão</p>

      <div className="contact-cards">
        <div className="contact-info">
          <div className="info-block">
            <h3 className="info-title"><FaMapMarkerAlt className="icon"/> Morada</h3>
            <p>Rua da Ponte 420</p>
            <p>4435-402 Rio Tinto, Gondomar</p>
            <p>Portugal</p>
          </div>

          <div className="info-block">
            <h3 className="info-title"><FaPhoneAlt className="icon"/> Telefone</h3>
            <a href="tel:+351915288751" className="phone-link" aria-label="Ligar para +351 915 288 751">
              +351 915 288 751
            </a>
            <p className="phone-note">Clique para ligar e fazer a sua reserva</p>
          </div>

          <div className="info-block">
            <h3 className="info-title"><FaClock className="icon"/> Horário de Funcionamento</h3>
            <ul className="schedule">
              <li>
                <span className="day">Segunda-feira:</span>
                <span className="hours">09:00 – 18:00</span>
              </li>
              <li>
                <span className="day">Terça-feira:</span>
                <span className="hours">09:00 – 18:00</span>
              </li>
              <li>
                <span className="day">Quarta-feira:</span>
                <span className="hours">09:00 – 18:00</span>
              </li>
              <li>
                <span className="day">Quinta-feira:</span>
                <span className="hours">09:00 – 18:00</span>
              </li>
              <li>
                <span className="day">Sexta-feira:</span>
                <span className="hours">09:00 – 18:00</span>
              </li>
              <li>
                <span className="day">Sábado:</span>
                <span className="hours">09:00 – 18:00</span>
              </li>
              <li className="closed">
                <span className="day">Domingo:</span>
                <span className="hours">Encerrado</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="contact-map">
          <iframe
            title="Mapa Vilares Vintage Tattoos"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.5!2d-8.5697!3d41.1801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41c4b5b5b5b5b5b%3A0x0!2sRua%20da%20Ponte%20420%2C%204435-402%20Rio%20Tinto%2C%20Gondomar!5e0!3m2!1spt-PT!2spt!4v1704835200000"
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="about-studio">
        <h3>Sobre o Estúdio</h3>
        <p>
          Vilares Vintage Tattoos é um estúdio de tatuagens e piercings em Rio Tinto, 
          conhecido por oferecer serviços personalizados de tatuagem artística e body piercing. 
          O foco está na criatividade e na qualidade do trabalho manual, adaptado à história 
          e estilo de cada cliente.
        </p>
      </div>

      <div className="testimonials">
        <h3><FaStar /> O que dizem os nossos clientes</h3>
        <p className="testimonial-subtitle">Avaliações reais de clientes satisfeitos</p>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="testimonial-meta">
              <span className="stars">★★★★★</span>
              <span className="review-date">Há 2 meses</span>
            </div>
            <h4 className="testimonial-title">Experiência Fantástica</h4>
            <p className="testimonial-text">
              "Adorei! O João foi incrivelmente profissional e criativo. Consultou-me sobre cada detalhe
              da minha tatuagem. A qualidade do trabalho é excecional e o ambiente é muito acolhedor."
            </p>
            <p className="testimonial-author">– Ana Silva</p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-meta">
              <span className="stars">★★★★★</span>
              <span className="review-date">Há 1 mês</span>
            </div>
            <h4 className="testimonial-title">Definitivamente Voltarei</h4>
            <p className="testimonial-text">
              "Estava nervosa pela primeira vez, mas o João e a equipa foram super compreensivos.
              A dor foi mínima, a higiene é impecável e o resultado superou todas as minhas expectativas!"
            </p>
            <p className="testimonial-author">– Mariana Santos</p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-meta">
              <span className="stars">★★★★★</span>
              <span className="review-date">Há 3 semanas</span>
            </div>
            <h4 className="testimonial-title">Artista Talentoso</h4>
            <p className="testimonial-text">
              "Procurei um artista que compreendesse a minha visão e encontrei em Rio Tinto.
              O trabalho é arte pura. Recomendo vivamente a todos que querem uma tatuagem de qualidade."
            </p>
            <p className="testimonial-author">– Pedro Costa</p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-meta">
              <span className="stars">★★★★★</span>
              <span className="review-date">Há 1 semana</span>
            </div>
            <h4 className="testimonial-title">Melhor Estúdio da Zona</h4>
            <p className="testimonial-text">
              "Já tenho 3 tatuagens do João. Cada uma é uma obra-prima. O design, a técnica, a esterilização...
              tudo é perfeito. É impossível não recomendar!"
            </p>
            <p className="testimonial-author">– Miguel Ferreira</p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-meta">
              <span className="stars">★★★★★</span>
              <span className="review-date">Há 10 dias</span>
            </div>
            <h4 className="testimonial-title">Vale Totalmente a Pena</h4>
            <p className="testimonial-text">
              "Viajei de propósito para fazer uma tatuagem aqui. Compreenderam perfeitamente o que queria
              e criaram algo extraordinário. O preço é justo pela qualidade oferecida."
            </p>
            <p className="testimonial-author">– Catarina Oliveira</p>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-meta">
              <span className="stars">★★★★★</span>
              <span className="review-date">Há 5 dias</span>
            </div>
            <h4 className="testimonial-title">Profissionalismo de Topo</h4>
            <p className="testimonial-text">
              "Desde o primeiro contacto até ao resultado final, tudo foi impecável.
              Ambiente limpo, artista atencioso e uma tatuagem que fica para a vida. Obrigado!"
            </p>
            <p className="testimonial-author">– Ricardo Teixeira</p>
          </div>
        </div>
      </div>
    </section>
  );
}
