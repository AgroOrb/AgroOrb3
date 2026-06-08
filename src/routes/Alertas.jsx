import { useState, useEffect } from 'react'

const TIPOS_ALERTA = [
  { id: 'seca',          label: 'Seca / estiagem' },
  { id: 'chuvas',        label: 'Chuvas intensas' },
  { id: 'temperatura',   label: 'Temperatura extrema' },
  { id: 'pragas',        label: 'Pragas e doenças' },
]

const ESTADOS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

const STORAGE_KEY = 'agroorb-cadastros'

export default function Alertas() {
  const [form, setForm] = useState({
    nome: '',
    estado: '',
    cidade: '',
    telefone: '',
    tipos: [],
  })
  const [errors, setErrors] = useState({})
  const [cadastros, setCadastros] = useState([])
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        if (Array.isArray(data)) setCadastros(data)
      }
    } catch (e) {
      console.warn('Não foi possível ler cadastros do localStorage', e)
    }
  }, [])

  const ultimoNome = cadastros.length > 0 ? cadastros[cadastros.length - 1].nome : null

  function toggleTipo(tipoId) {
    setForm((f) => ({
      ...f,
      tipos: f.tipos.includes(tipoId)
        ? f.tipos.filter(t => t !== tipoId)
        : [...f.tipos, tipoId],
    }))
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: null }))
  }

  function validate() {
    const er = {}
    if (!form.nome.trim() || form.nome.trim().length < 2) er.nome = 'Informe seu nome (mínimo 2 caracteres).'
    if (!form.estado) er.estado = 'Selecione seu estado.'
    if (!form.cidade.trim() || form.cidade.trim().length < 2) er.cidade = 'Informe sua cidade.'
    if (!form.telefone.trim() || form.telefone.replace(/\D/g, '').length < 10) er.telefone = 'Telefone inválido (mínimo 10 dígitos).'
    if (form.tipos.length === 0) er.tipos = 'Escolha pelo menos um tipo de alerta.'
    return er
  }

  function handleSubmit(e) {
    e.preventDefault()
    const er = validate()
    if (Object.keys(er).length > 0) {
      setErrors(er)
      return
    }

    const novo = {
      ...form,
      nome: form.nome.trim(),
      cidade: form.cidade.trim(),
      telefone: form.telefone.trim(),
      criadoEm: new Date().toISOString(),
    }

    const novos = [...cadastros, novo]
    setCadastros(novos)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novos))
    } catch (e) {
      console.warn('Não foi possível salvar no localStorage', e)
    }

    setForm({ nome: '', estado: '', cidade: '', telefone: '', tipos: [] })
    setErrors({})

    setToastMsg(`Cadastro realizado com sucesso, ${novo.nome.split(' ')[0]}!`)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 4000)
  }

  function formatTelefone(v) {
    const d = v.replace(/\D/g, '').slice(0, 11)
    if (d.length <= 2) return d
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  }

  function handleTelefone(e) {
    const formatted = formatTelefone(e.target.value)
    setForm((f) => ({ ...f, telefone: formatted }))
    if (errors.telefone) setErrors((er) => ({ ...er, telefone: null }))
  }

  return (
    <main className="container">
      {/* ===== Hero ===== */}
      <section className="page-hero">
        <span className="eyebrow">Central de Alertas</span>
        <h1>Receba <em>antes</em><br />de virar problema.</h1>
        <p>
          Cadastre suas preferências e receba alertas no celular quando algum risco for detectado
          pelos satélites na sua região. Sem custo, sem complicação.
        </p>
      </section>

      {/* ===== Layout: form + lista ===== */}
      <section className="alerts-page section--compact">
        {/* FORM */}
        <div className="form-card">
          {ultimoNome && (
            <div className="welcome-back">
              <span className="welcome-back__icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <p>
                Bem-vindo novamente, <strong>{ultimoNome.split(' ')[0]}</strong>!{' '}
                Você já tem {cadastros.length} cadastro{cadastros.length > 1 ? 's' : ''} salvo{cadastros.length > 1 ? 's' : ''}.
              </p>
            </div>
          )}

          <h3>Novo cadastro</h3>
          <p className="form-card__sub">Preencha os campos para começar a receber alertas.</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Nome */}
            <div className="field">
              <label className="field__label" htmlFor="nome">Nome completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                placeholder="Ex: José da Silva"
                className={errors.nome ? 'error' : ''}
                aria-invalid={!!errors.nome}
                aria-describedby={errors.nome ? 'err-nome' : undefined}
              />
              {errors.nome && <div id="err-nome" className="field__error">▸ {errors.nome}</div>}
            </div>

            {/* Estado e Cidade (lado a lado) */}
            <div className="field-row">
              <div className="field" style={{ flex: '0 0 130px' }}>
                <label className="field__label" htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  className={errors.estado ? 'error' : ''}
                  aria-invalid={!!errors.estado}
                  aria-describedby={errors.estado ? 'err-estado' : undefined}
                >
                  <option value="">UF</option>
                  {ESTADOS.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
                {errors.estado && <div id="err-estado" className="field__error">▸ {errors.estado}</div>}
              </div>

              <div className="field" style={{ flex: 1 }}>
                <label className="field__label" htmlFor="cidade">Cidade</label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={form.cidade}
                  onChange={handleChange}
                  placeholder="Ex: Rio Verde"
                  className={errors.cidade ? 'error' : ''}
                  aria-invalid={!!errors.cidade}
                  aria-describedby={errors.cidade ? 'err-cidade' : undefined}
                />
                {errors.cidade && <div id="err-cidade" className="field__error">▸ {errors.cidade}</div>}
              </div>
            </div>

            {/* Telefone */}
            <div className="field">
              <label className="field__label" htmlFor="telefone">Telefone (com DDD)</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={form.telefone}
                onChange={handleTelefone}
                placeholder="(11) 99999-9999"
                className={errors.telefone ? 'error' : ''}
                aria-invalid={!!errors.telefone}
                aria-describedby={errors.telefone ? 'err-tel' : undefined}
              />
              {errors.telefone && <div id="err-tel" className="field__error">▸ {errors.telefone}</div>}
            </div>

            {/* Tipos de alerta */}
            <div className="field">
              <label className="field__label">Tipos de alerta</label>
              <div className="checkbox-group" role="group" aria-label="Tipos de alerta">
                {TIPOS_ALERTA.map((tipo) => (
                  <label
                    key={tipo.id}
                    className={`checkbox-item ${form.tipos.includes(tipo.id) ? 'checked' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={form.tipos.includes(tipo.id)}
                      onChange={() => toggleTipo(tipo.id)}
                    />
                    <span className="checkbox-item__box" aria-hidden="true"></span>
                    {tipo.label}
                  </label>
                ))}
              </div>
              {errors.tipos && <div className="field__error" style={{ marginTop: '0.5rem' }}>▸ {errors.tipos}</div>}
            </div>

            <button type="submit" className="btn btn--primary form-submit">
              Cadastrar
              <svg className="btn__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>

        {/* LISTA */}
        <aside className="saved-list">
          <h3>Cadastros salvos</h3>
          <p className="saved-list__sub">{cadastros.length} cadastro{cadastros.length !== 1 ? 's' : ''} no dispositivo</p>

          {cadastros.length === 0 && (
            <p className="empty-state">
              Nenhum cadastro ainda.<br />
              Preencha o formulário ao lado para começar.
            </p>
          )}

          {cadastros.slice().reverse().map((c, i) => (
            <div key={i} className="saved-item">
              <div className="saved-item__name">{c.nome}</div>
              <div className="saved-item__details">
                ▸ {c.cidade} · {c.estado} · {c.telefone}
              </div>
              <div className="saved-item__alerts">
                {c.tipos.map((tipoId) => {
                  const tipo = TIPOS_ALERTA.find(t => t.id === tipoId)
                  return tipo ? (
                    <span key={tipoId} className="saved-item__tag">{tipo.label}</span>
                  ) : null
                })}
              </div>
            </div>
          ))}

          {cadastros.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (confirm('Tem certeza que quer apagar todos os cadastros?')) {
                  setCadastros([])
                  try { localStorage.removeItem(STORAGE_KEY) } catch {}
                }
              }}
              style={{
                marginTop: '1.5rem',
                width: '100%',
                padding: '0.75rem',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: 'var(--text-faint)',
                cursor: 'pointer',
              }}
            >
              ▸ APAGAR CADASTROS
            </button>
          )}
        </aside>
      </section>

      {/* Toast */}
      <div className={`toast ${toastVisible ? 'show' : ''}`} role="status" aria-live="polite">
        <span className="toast__icon" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <span>{toastMsg}</span>
      </div>
    </main>
  )
}
