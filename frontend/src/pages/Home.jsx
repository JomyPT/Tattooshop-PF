import { useState } from "react";
import Hero from "../components/Hero";
import "./Home.css";

const reviews = [
  {
    title: "Experiência Fantástica",
    text:
      "Adorei! O Sérgio foi incrivelmente profissional e criativo. Consultou-me sobre cada detalhe da minha tatuagem. A qualidade do trabalho é excepcional e o ambiente é muito acolhedor.",
    author: "Ana Silva",
    date: "Há 2 meses",
  },
  {
    title: "Definitivamente Voltarei",
    text:
      "Estava nervosa pela primeira vez, mas o Sérgio e a equipa foram super compreensivos. A dor foi mínima, a higiene é impecável e o resultado superou todas as minhas expectativas!",
    author: "Mariana Santos",
    date: "Há 1 mês",
  },
  {
    title: "Artista Talentoso",
    text:
      "Procurei um artista que compreendesse a minha visão e encontrei em Rio Tinto. O trabalho é arte pura. Recomendo vivamente a todos que querem uma tatuagem de qualidade.",
    author: "Pedro Costa",
    date: "Há 3 semanas",
  },
  {
    title: "Melhor Estúdio da Zona",
    text:
      "Já tenho 3 tatuagens do Sérgio. Cada uma é uma obra-prima. O design, a técnica, a esterilização... tudo é perfeito. É impossível não recomendar!",
    author: "Miguel Ferreira",
    date: "Há 1 semana",
  },
  {
    title: "Vale Totalmente a Pena",
    text:
      "Viajei de propósito para fazer uma tatuagem aqui. Compreenderam perfeitamente o que queria e criaram algo extraordinário. O preço é justo pela qualidade oferecida.",
    author: "Catarina Oliveira",
    date: "Há 10 dias",
  },
  {
    title: "Profissionalismo de Topo",
    text:
      "Desde o primeiro contacto até ao resultado final, tudo foi impecável. Ambiente limpo, artista atencioso e uma tatuagem que fica para a vida. Obrigado!",
    author: "Ricardo Teixeira",
    date: "Há 5 dias",
  },
];

export default function Home() {
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <>
      <Hero />
      
      {/* Sobre Nós */}
      <section className="about-section">
        <div className="about-container">
          <h2>Sobre Nós</h2>
          <p className="about-subtitle">A História da Vilares Vintage Tattoos</p>
          
          <div className="about-content">
            <p>
              Vilares Vintage Tattoos é um estúdio de tatuagens artístico localizado em Rio Tinto, Gondomar, 
              dedicado a criar tatuagens únicas e personalizadas que refletem a identidade e história de cada cliente.
            </p>
            <p>
              Com uma abordagem vintage e clássica, combinamos técnicas tradicionais com criatividade moderna. 
              Acreditamos que uma tatuagem é mais do que tinta na pele – é uma expressão permanente de quem tu és.
            </p>
            <p>
              Cada design é pensado meticulosamente, respeitando as suas ideias e transformando-as em obras de arte 
              que durará toda a vida. O nosso ambiente acolhedor e profissional garante uma experiência confortável 
              e segura do início ao fim.
            </p>
            
            <div className="about-values">
              <div className="value-card">
                <h3>Criatividade</h3>
                <p>Designs personalizados que refletem sua identidade</p>
              </div>
              <div className="value-card">
                <h3>Qualidade</h3>
                <p>Trabalho impecável e atenção ao detalhe em cada traço</p>
              </div>
              <div className="value-card">
                <h3>Segurança</h3>
                <p>Materiais estéreis e protocolos de higiene rigorosos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avaliações */}
      <section className="reviews-section">
        <div className="reviews-container">
          <h2>O que Dizem os Nossos Clientes</h2>
          <p className="reviews-subtitle">Avaliações verificadas de clientes satisfeitos</p>
          
          <div className="reviews-grid">
            {visibleReviews.map((review) => (
              <div className="review-card" key={review.title}>
                <div className="review-header">
                  <div className="stars">★★★★★</div>
                  <span className="review-date">{review.date}</span>
                </div>
                <h4>{review.title}</h4>
                <p>"{review.text}"</p>
                <p className="review-author">– {review.author}</p>
              </div>
            ))}
          </div>

          <div className="reviews-actions">
            <button
              className="reviews-toggle"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
            >
              {showAll ? "Ver menos" : "Ver mais"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
