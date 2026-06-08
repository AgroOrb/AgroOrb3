import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="container">
      <div className="not-found">
        <div className="not-found__code">▸ ERRO 404 / SETOR NÃO ENCONTRADO</div>
        <h1>Esta órbita está <em style={{ color: 'var(--neon)', fontStyle: 'italic' }}>fora do mapa</em>.</h1>
        <p>
          A página que você tentou acessar não foi encontrada. Pode ter sido movida,
          ou nunca existiu nessa coordenada.
        </p>
        <Link to="/" className="btn btn--primary">
          Voltar ao início
          <svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </main>
  )
}
