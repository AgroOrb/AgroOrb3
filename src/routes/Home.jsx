import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const revealRefs = useRef([])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      revealRefs.current.forEach(el => el?.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
    )
    revealRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const addReveal = (el) => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el) }

  const arrow = (
    <svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7"/>
    </svg>
  )

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero container section--hero">
        <div className="hero__grid">
          <div>
            <span className="eyebrow">Global Solution · FIAP × Indústria Espacial</span>
            <h1 style={{ marginTop: '1.25rem' }}>
              O futuro da agricultura<br />vem do <em>espaço</em>.
            </h1>
            <p className="hero__lead">
              <strong style={{ color: 'var(--text)', fontWeight: 500 }}>AgroOrb</strong> transforma dados de satélites em
              decisões inteligentes para agricultores. Monitoramento por imagens orbitais, alertas
              automáticos e recomendações simples — para que cada hectare seja cuidado a tempo.
            </p>
            <div className="hero__cta">
              <Link to="/painel" className="btn btn--primary">
                Acessar painel {arrow}
              </Link>
              <a href="#problema" className="btn btn--ghost">Conhecer o problema</a>
            </div>

            <div className="hero__meta">
              <div className="hero__meta-item">
                <span className="hero__meta-num">24/7</span>
                <span className="hero__meta-label">Observação contínua</span>
              </div>
              <div className="hero__meta-item">
                <span className="hero__meta-num">3 ODS</span>
                <span className="hero__meta-label">Impacto global</span>
              </div>
            </div>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="scene">
              <div className="orbit orbit--1"><div className="orbit__sat"></div></div>
              <div className="orbit orbit--2"><div className="orbit__sat"></div></div>
              <div className="orbit orbit--3"><div className="orbit__sat"></div></div>
              <div className="earth"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VÍDEO PITCH ===== */}
      <section className="video-section container reveal" ref={addReveal} id="video-pitch">
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          <span className="eyebrow">Assista ao pitch</span>
          <h2 style={{ marginTop: '1rem' }}>
            3 minutos para entender o <em>AgroOrb</em>.
          </h2>
          <p style={{ marginTop: '0.875rem' }}>
            Veja como dados de satélites viram alertas e recomendações práticas
            para o pequeno produtor rural.
          </p>
        </div>

        <div className="video-wrap">
          <div className="video-frame">
            
          </div>

          
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            <div className="stat">
              <div className="stat__num">77%</div>
              <div className="stat__label">dos produtores rurais brasileiros<br/>são pequenos agricultores</div>
            </div>
            <div className="stat">
              <div className="stat__num">R$ 25bi</div>
              <div className="stat__label">perdas anuais por<br/>clima extremo no agro BR</div>
            </div>
            <div className="stat">
              <div className="stat__num">30%</div>
              <div className="stat__label">de água economizada<br/>com irrigação inteligente</div>
            </div>
            <div className="stat">
              <div className="stat__num">3+</div>
              <div className="stat__label">satélites consultados<br/>em cada análise</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEMA ===== */}
      <section id="problema" className="section container reveal" ref={addReveal}>
        <div className="section-header">
          <span className="eyebrow">O problema</span>
          <h2>Decisões cruciais,<br />tomadas no <em>escuro</em>.</h2>
          <p>
            Enquanto grandes produtores investem em monitoramento avançado, agricultores familiares
            dependem apenas da observação visual e da experiência. O resultado é uma série de
            decisões críticas tomadas sem dados — e perdas que poderiam ser evitadas.
          </p>
        </div>

        <div className="features">
          <article className="feature">
            <span className="feature__num">PERDA 01</span>
            <div className="feature__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12h2M5 12c0-4 3-7 7-7s7 3 7 7-3 7-7 7"/>
                <path d="M12 3v2M21 12h-2M12 21v-2M5.5 5.5l1.5 1.5M18.5 5.5l-1.5 1.5"/>
              </svg>
            </div>
            <h3>Estresse hídrico invisível</h3>
            <p>Sem sensores nem dados de satélite, sinais precoces de seca passam despercebidos
              até comprometerem a safra. A perda chega quando já é tarde.</p>
          </article>

          <article className="feature">
            <span className="feature__num">PERDA 02</span>
            <div className="feature__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 16l4-4 4 4 6-6 4 4"/>
                <circle cx="6" cy="6" r="2"/>
              </svg>
            </div>
            <h3>Mudanças climáticas</h3>
            <p>Eventos extremos (secas, geadas, ondas de calor) ficam mais frequentes. Sem previsão
              dirigida, o pequeno produtor é o mais vulnerável.</p>
          </article>

          <article className="feature">
            <span className="feature__num">PERDA 03</span>
            <div className="feature__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2v6M12 16v6"/>
                <circle cx="12" cy="12" r="3"/>
                <path d="M3 12h6M15 12h6"/>
              </svg>
            </div>
            <h3>Desperdício de recursos</h3>
            <p>Irrigação no horário errado, fertilizante onde não precisa, energia mal aplicada.
              Sem dados, gasta-se mais e produz-se menos.</p>
          </article>
        </div>
      </section>

      {/* ===== SOLUÇÃO ===== */}
      <section className="section container reveal" ref={addReveal}>
        <div className="section-header">
          <span className="eyebrow">A solução</span>
          <h2>Satélites observam, AgroOrb traduz.</h2>
          <p>
            Conectamos imagens e medições orbitais — temperatura, umidade, vegetação, alertas
            climáticos — a uma linguagem simples e visual. Cada setor da fazenda ganha cor,
            status e recomendação em tempo real.
          </p>
        </div>

        <div className="features">
          <article className="feature">
            <span className="feature__num">01 / OBSERVAR</span>
            <div className="feature__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9"/>
                <ellipse cx="12" cy="12" rx="9" ry="3.5"/>
                <ellipse cx="12" cy="12" rx="3.5" ry="9"/>
              </svg>
            </div>
            <h3>Dados orbitais</h3>
            <p>Integração com fontes públicas: CBERS-04A (INPE), Sentinel-2 (ESA), Landsat 9 (NASA),
              MODIS e Disaster Charter — atualizadas continuamente.</p>
          </article>

          <article className="feature">
            <span className="feature__num">02 / TRADUZIR</span>
            <div className="feature__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 3v18h18"/>
                <path d="m7 14 4-4 4 4 6-6"/>
              </svg>
            </div>
            <h3>Status visual</h3>
            <p>Cada setor tem cor e nível: <em style={{ color: 'var(--status-safe)', fontStyle: 'normal' }}>verde</em> saudável,
              <em style={{ color: 'var(--status-warn)', fontStyle: 'normal' }}> amarelo</em> atenção,
              <em style={{ color: 'var(--status-critical)', fontStyle: 'normal' }}> vermelho</em> risco. Nada de gráfico complexo.</p>
          </article>

          <article className="feature">
            <span className="feature__num">03 / AGIR</span>
            <div className="feature__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
              </svg>
            </div>
            <h3>Recomendações</h3>
            <p>Mensagens diretas e práticas: "iniciar irrigação", "monitorar 24h", "aplicar manejo
              preventivo". Toda decisão crítica vem com instrução clara.</p>
          </article>
        </div>
      </section>

      {/* ===== BENEFÍCIOS ===== */}
      <section className="section container reveal" ref={addReveal}>
        <div className="section-header">
          <span className="eyebrow">Benefícios diretos</span>
          <h2>Menos perda. Mais <em>produção</em>.</h2>
        </div>

        <div className="beneficios">
          <div className="beneficio">
            <span className="beneficio__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 22a7 7 0 0 0 7-7c0-3-1.5-5-3-7L12 3 8 8c-1.5 2-3 4-3 7a7 7 0 0 0 7 7z"/>
              </svg>
            </span>
            <strong>Economia de água</strong>
            <span>Irrigação na hora certa, com a quantidade exata para cada setor.</span>
          </div>

          <div className="beneficio">
            <span className="beneficio__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21V12h6v9"/>
              </svg>
            </span>
            <strong>Mais produtividade</strong>
            <span>Decisões antecipadas evitam perdas e melhoram o rendimento por hectare.</span>
          </div>

          <div className="beneficio">
            <span className="beneficio__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </span>
            <strong>Menos desperdício</strong>
            <span>Fertilizantes, energia e mão de obra direcionados onde realmente importa.</span>
          </div>

          <div className="beneficio">
            <span className="beneficio__icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>
              </svg>
            </span>
            <strong>Decisões inteligentes</strong>
            <span>Sem precisar virar especialista — a tecnologia traduz tudo em ação prática.</span>
          </div>
        </div>
      </section>

      {/* ===== ACESSIBILIDADE / LIBRAS ===== */}
      <section className="section--compact container reveal" ref={addReveal}>
        <div className="libras-card">
          <div className="libras-card__avatar" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="6" r="3"/>
              <path d="M8 14a4 4 0 0 1 8 0v8H8z"/>
              <path d="M5 12c1-1 2-1 3 0M19 12c-1-1-2-1-3 0"/>
            </svg>
          </div>
          <div className="libras-card__content">
            <h4>Acessibilidade em Libras</h4>
            <p>Este site usa o VLibras — widget oficial do governo brasileiro que traduz todo o conteúdo
              para a Língua Brasileira de Sinais. Clique no boneco azul no canto inferior direito da tela.</p>
          </div>
          <div className="libras-card__arrow" aria-hidden="true">
            ↘ Canto direito
          </div>
        </div>
      </section>

      {/* ===== ODS ===== */}
      <section className="section container reveal" ref={addReveal}>
        <div className="section-header">
          <span className="eyebrow">Impacto global</span>
          <h2>Conexão com os <em>ODS da ONU</em>.</h2>
          <p>
            O AgroOrb contribui diretamente para 3 dos 17 Objetivos de Desenvolvimento Sustentável
            da Agenda 2030, com foco em segurança alimentar, ação climática e infraestrutura digital
            no campo.
          </p>
        </div>

        <div className="ods-grid">
          <div className="ods" data-num="2">
            <span className="ods__num">ODS 2</span>
            <h4>Fome zero e agricultura sustentável</h4>
            <p>Mais produtividade no campo para garantir segurança alimentar para a população.</p>
          </div>
          <div className="ods" data-num="13">
            <span className="ods__num">ODS 13</span>
            <h4>Ação contra a mudança climática</h4>
            <p>Resposta ágil a eventos climáticos extremos no agronegócio brasileiro.</p>
          </div>
          <div className="ods" data-num="9">
            <span className="ods__num">ODS 9</span>
            <h4>Indústria, inovação e infraestrutura</h4>
            <p>Tecnologia espacial acessível ao pequeno produtor rural brasileiro.</p>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="section container">
        <div className="cta-final reveal" ref={addReveal}>
          <span className="eyebrow">Comece agora</span>
          <h2 style={{ marginTop: '1rem' }}>Cuide da sua plantação <em>pelo olhar do espaço</em>.</h2>
          <p>
            Abra o painel interativo e explore o status de cada setor monitorado, o tipo de risco
            e a recomendação atual em tempo real.
          </p>
          <div className="cta-final__btns">
            <Link to="/painel" className="btn btn--primary">
              Acessar painel {arrow}
            </Link>
            <Link to="/cadastro" className="btn btn--ghost">Cadastrar alertas</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
