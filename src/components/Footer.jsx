import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="nav__logo">
              <span className="nav__logo-mark" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#00FF88" strokeWidth="1.4" opacity="0.6" transform="rotate(-25 16 16)"/>
                  <path d="M16 8 C12 11, 11 15, 13 20 C14 17, 17 16, 18 13 C18 10, 17 9, 16 8 Z" fill="#22C55E"/>
                  <circle cx="24" cy="10" r="2.5" fill="#00FF88"/>
                </svg>
              </span>
              Agro<em>Orb</em>
            </Link>
            <p>Plataforma de monitoramento agrícola baseada em dados orbitais. Projeto acadêmico Global Solution 2026/1 · FIAP.</p>
          </div>

          <div className="footer__col">
            <h4>Plataforma</h4>
            <ul>
              <li><Link to="/">Início</Link></li>
              <li><Link to="/painel">Painel</Link></li>
              <li><Link to="/cadastro">Central de alertas</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Fontes orbitais</h4>
            <ul>
              <li><a href="https://www.nasa.gov" target="_blank" rel="noopener noreferrer">NASA</a></li>
              <li><a href="https://www.esa.int" target="_blank" rel="noopener noreferrer">ESA</a></li>
              <li><a href="https://www.gov.br/inpe" target="_blank" rel="noopener noreferrer">INPE</a></li>
              <li><a href="https://disasterscharter.org" target="_blank" rel="noopener noreferrer">Space Charter</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Acadêmico</h4>
            <ul>
              <li>FIAP · 1º ano</li>
              <li>Engenharia de Software</li>
              <li>Global Solution 2026/1</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} AgroOrb · Projeto acadêmico</span>
          <span>Dados do espaço, colheitas mais inteligentes.</span>
        </div>
      </div>
    </footer>
  )
}
