import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const logoMark = (
    <span className="nav__logo-mark" aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#00FF88" strokeWidth="1.4" opacity="0.6" transform="rotate(-25 16 16)"/>
        <path d="M16 8 C12 11, 11 15, 13 20 C14 17, 17 16, 18 13 C18 10, 17 9, 16 8 Z" fill="#22C55E"/>
        <circle cx="24" cy="10" r="2.5" fill="#00FF88"/>
      </svg>
    </span>
  )

  return (
    <nav className="nav" aria-label="Navegação principal">
      <div className="nav__inner">
        <NavLink to="/" className="nav__logo" aria-label="AgroOrb · Página inicial">
          {logoMark}
          Agro<em>Orb</em>
        </NavLink>

        <button
          className="nav__toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Fechar' : 'Menu'}
        </button>

        <ul className={`nav__links ${open ? 'open' : ''}`} id="nav-links">
          <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Início</NavLink></li>
          <li><NavLink to="/cadastro" className={({ isActive }) => isActive ? 'active' : ''}>Cadastro</NavLink></li>
          <li className="nav__cta"><NavLink to="/painel">Acessar painel</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}
