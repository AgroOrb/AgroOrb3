import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  CIDADES,
  calcularIndice,
  classificarIndice,
  calcularRisco,
  gerarAlertas,
  gerarRecomendacoes,
  gerarHistorico,
} from '../data/cidades.js'

export default function Painel() {
  const [cidadeId, setCidadeId] = useState(CIDADES[0].id)

  const cidade = useMemo(() => CIDADES.find(c => c.id === cidadeId), [cidadeId])
  const indice = useMemo(() => calcularIndice(cidade), [cidade])
  const classificacao = useMemo(() => classificarIndice(indice), [indice])
  const risco = useMemo(() => calcularRisco(cidade), [cidade])
  const alertas = useMemo(() => gerarAlertas(cidade), [cidade])
  const recomendacoes = useMemo(() => gerarRecomendacoes(cidade, indice), [cidade, indice])
  const historico = useMemo(() => gerarHistorico(cidade), [cidade])

  return (
    <main className="container">

      {/* ============ HERO DA PÁGINA ============ */}
      <section className="page-hero">
        <span className="eyebrow">Painel · Monitoramento climático</span>
        <h1>Centro de Monitoramento<br /><em>AgroOrb</em>.</h1>
        <p>
          Selecione uma cidade para visualizar dados climáticos, índice de favorabilidade
          e recomendações automáticas baseadas em análises orbitais.
        </p>
      </section>

      {/* ============ SELETOR DE CIDADE ============ */}
      <section className="city-selector">
        <label htmlFor="cidade-select" className="city-selector__label">
          ▸ Cidade monitorada
        </label>
        <div className="city-selector__chips" role="radiogroup" aria-label="Selecione a cidade">
          {CIDADES.map((c) => (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={cidadeId === c.id}
              className={`city-chip ${cidadeId === c.id ? 'active' : ''}`}
              onClick={() => setCidadeId(c.id)}
            >
              <span className="city-chip__nome">{c.nome}</span>
              <span className="city-chip__uf">{c.estado}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ============ KPIs PRINCIPAIS ============ */}
      <section aria-label="Indicadores climáticos">
        <div className="kpi-grid">
          <div className="kpi">
            <div className="kpi__label">Temperatura média</div>
            <div className="kpi__value">{cidade.temperatura}<span className="kpi__unit">°C</span></div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Umidade do solo</div>
            <div className="kpi__value">{cidade.umidade}<span className="kpi__unit">%</span></div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Precipitação prevista</div>
            <div className="kpi__value">{cidade.precipitacao}<span className="kpi__unit">mm</span></div>
          </div>
          <div className={`kpi kpi--${classificacao.status}`}>
            <div className="kpi__label">Índice AgroOrb</div>
            <div className="kpi__value">{indice}<span className="kpi__unit">/100</span></div>
          </div>
        </div>
      </section>

      {/* ============ DASHBOARD PRINCIPAL: SATÉLITE + SEMÁFORO + SIDEBAR ============ */}
      <section className="dashboard section--compact">

        {/* Card principal: imagem de satélite + semáforo */}
        <article className="farm-card">
          <div className="farm-card__head">
            <div>
              <h3>{cidade.nome} <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-mute)', letterSpacing: '0.05em' }}>· {cidade.estado}</span></h3>
              <p className="farm-card__sub">{cidade.cultura}</p>
            </div>
            <span className="live">
              <span className="live__dot"></span>
              Sinal orbital ativo
            </span>
          </div>

          {/* Imagem de satélite estilizada da cidade */}
          <div className="satellite-view" aria-label={`Vista de satélite de ${cidade.nome}`}>
            <div className="satellite-view__inner">
              {/* Grid pattern */}
              <div className="satellite-view__grid" aria-hidden="true"></div>
              {/* Marcador da cidade */}
              <div className="satellite-view__pin">
                <div className="satellite-view__pin-dot"></div>
                <div className="satellite-view__pin-ring"></div>
                <div className="satellite-view__pin-label">
                  {cidade.coord.lat.toFixed(2)}°S · {Math.abs(cidade.coord.lng).toFixed(2)}°W
                </div>
              </div>
              {/* Manchas verdes simulando vegetação/lavoura */}
              <div className="satellite-view__patch satellite-view__patch--1" aria-hidden="true"></div>
              <div className="satellite-view__patch satellite-view__patch--2" aria-hidden="true"></div>
              <div className="satellite-view__patch satellite-view__patch--3" aria-hidden="true"></div>
              <div className="satellite-view__patch satellite-view__patch--4" aria-hidden="true"></div>
              {/* Scanner orbital */}
              <div className="satellite-view__scan" aria-hidden="true"></div>
              {/* Label canto inferior */}
              <div className="satellite-view__meta">
                <span>▸ FONTE: CBERS-04A · Sentinel-2</span>
                <span>▸ NDVI 0.{Math.round(indice * 0.9)}</span>
              </div>
            </div>
          </div>

          {/* Semáforo AgroOrb */}
          <div className="semaforo" aria-label="Semáforo AgroOrb">
            <div className="semaforo__label">▸ Semáforo AgroOrb</div>
            <div className="semaforo__lights">
              <div className={`semaforo__light semaforo__light--safe ${classificacao.status === 'safe' ? 'on' : ''}`}>
                <span>Favorável</span>
              </div>
              <div className={`semaforo__light semaforo__light--warn ${classificacao.status === 'warn' ? 'on' : ''}`}>
                <span>Atenção</span>
              </div>
              <div className={`semaforo__light semaforo__light--critical ${classificacao.status === 'critical' ? 'on' : ''}`}>
                <span>Crítico</span>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar: análise + alertas + recomendações */}
        <aside className="sidebar">

          {/* Card de análise */}
          <div className="info-card">
            <h3>Análise climática</h3>
            <div className="info-card__sub">▸ Avaliação automática</div>

            <span className={`status-pill status-pill--${classificacao.status}`}>
              ● {classificacao.label}
            </span>

            <div className="info-card__data" style={{ marginTop: '1rem' }}>
              <div className="info-card__data-item">
                <div className="info-card__data-label">Risco climático</div>
                <div className="info-card__data-value" style={{ color: `var(--status-${risco.status})` }}>
                  {risco.nivel}
                </div>
              </div>
              <div className="info-card__data-item">
                <div className="info-card__data-label">Índice</div>
                <div className="info-card__data-value">{indice}/100</div>
              </div>
            </div>

            <div className="info-card__rec" style={{ marginTop: '1.25rem' }}>
              <div className="info-card__rec-label">▸ Recomendações ({recomendacoes.length})</div>
              <ul className="rec-list">
                {recomendacoes.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Alertas gerados */}
          <div className="alerts-widget">
            <h3>Alertas detectados ({alertas.length})</h3>
            {alertas.map((a, i) => (
              <div key={i} className={`alert-item alert-item--${a.tipo} alert-item--detailed`}>
                <span className="alert-item__dot" aria-hidden="true"></span>
                <div>
                  <div className="alert-item__text">{a.texto}</div>
                  <div className="alert-item__just">{a.justificativa}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* ============ HISTÓRICO DOS ÚLTIMOS DIAS ============ */}
      <section className="section--compact">
        <div className="historico-card">
          <div className="historico-head">
            <h3>Histórico resumido</h3>
            <span className="historico-sub">Últimos 5 dias de monitoramento</span>
          </div>

          <div className="historico-grid">
            {historico.map((h, i) => {
              const c = classificarIndice(h.indice)
              return (
                <div key={i} className={`historico-day historico-day--${c.status}`}>
                  <div className="historico-day__label">{h.label}</div>
                  <div className="historico-day__value">{h.indice}</div>
                  <div className="historico-day__meta">
                    {h.temperatura}°C · {h.umidade}%
                  </div>
                  <div className="historico-day__bar">
                    <div className="historico-day__bar-fill" style={{ width: `${h.indice}%` }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section--compact" style={{ paddingBottom: '4rem' }}>
        <div className="cta-final" style={{ padding: '2.5rem 2rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
            Quer receber esses alertas no seu telefone?
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Cadastre-se na Central de Alertas e seja avisado quando sua cidade entrar
            em estado crítico.
          </p>
          <Link to="/cadastro" className="btn btn--primary">
            Cadastrar alertas
            <svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
