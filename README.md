# 🛰 AgroOrb

> **Dados do espaço, colheitas mais inteligentes.**

Plataforma de monitoramento agrícola baseada em **dados orbitais**, voltada para pequenos produtores rurais brasileiros. Conecta a economia espacial (satélites NASA, ESA, INPE) a problemas reais no campo: estresse hídrico, eventos climáticos extremos, desperdício de recursos.

Projeto desenvolvido para a **Global Solution 2026/1** da FIAP — Engenharia de Software · 1º ano.

---

## 🌍 O problema

Pequenos agricultores no Brasil tomam decisões cruciais a partir da observação visual e da experiência. Sem dados precisos sobre umidade, temperatura, índice de vegetação e riscos climáticos, ficam expostos a:

- **Perdas de produtividade** por irrigação inadequada
- **Desperdício de recursos** (água, fertilizantes, energia)
- **Risco amplificado** por eventos climáticos extremos
- **Perda parcial ou total da safra** por estresse hídrico não detectado

## 💡 A solução

O AgroOrb é uma plataforma web que traduz dados orbitais complexos em recomendações simples e visuais para qualquer agricultor:

| Camada       | O que faz                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------ |
| **Observar** | Integra dados de satélites públicos: CBERS-04A (INPE), Sentinel-2 (ESA), Landsat 9 (NASA), MODIS |
| **Traduzir** | Status visual por cores: 🟢 verde (saudável), 🟡 amarelo (atenção), 🔴 vermelho (risco)          |
| **Agir**     | Recomendações práticas: "iniciar irrigação", "monitorar 24h", "aplicar manejo preventivo"        |

---

## 🚀 Como rodar

### Pré-requisitos

- **Node.js ≥ 20.19**
- npm (já vem com Node)

### Comandos

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento (http://localhost:5173)
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

## 📁 Estrutura

```
agroorb/
├── index.html              # Entry HTML
├── package.json
├── vite.config.js
├── vercel.json             # SPA routing para deploy
├── grupo.txt               # Entrega FIAP — integrantes + link pitch
├── README.md
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # Entry point React
    ├── App.jsx             # Rotas
    ├── styles/
    │   └── global.css      # Design system completo
    ├── components/
    │   ├── Header.jsx      # Nav sticky + mobile menu
    │   └── Footer.jsx      # Rodapé
    ├── routes/
    │   ├── Home.jsx        # Página inicial
    │   ├── Painel.jsx      # Dashboard interativo
    │   ├── Alertas.jsx     # Cadastro + localStorage
    │   └── NotFound.jsx    # 404
    └── data/
        └── setores.js      # Dados simulados dos 4 setores
```

---

## 🎯 Páginas

| Página     | Rota       | Destaque                                                                                               |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| Home       | `/`        | Hero animado (satélites + folha), stats, problema, solução, benefícios, ODS                            |
| **Painel** | `/painel`  | **Mapa interativo da fazenda** com 4 setores clicáveis, KPIs dinâmicos, sidebar com detalhes e alertas |
| Alertas    | `/alertas` | Cadastro com validação, **persistência via localStorage**, lista de cadastros, toast de sucesso        |

---

## 🧪 Interatividade (JavaScript / React)

- **Mapa de setores clicável** — clica em um setor e atualiza KPIs, sidebar e recomendação
- **KPIs dinâmicos** — saúde, temperatura e umidade mudam conforme setor selecionado (ou média se nenhum)
- **Cores dinâmicas** — KPI de saúde geral muda de verde para amarelo/vermelho conforme o número
- **Formulário com validação** — nome, região, telefone (com máscara), tipos de alerta
- **Máscara automática de telefone** — `(11) 99999-9999`
- **Persistência via localStorage** — cadastros sobrevivem ao refresh
- **"Bem-vindo de volta"** — saudação personalizada se houver cadastros prévios
- **Toast notification** — confirmação visual ao cadastrar
- **Menu mobile** — toggle responsivo no header
- **Reveal on scroll** — IntersectionObserver para animações suaves
- **404 customizado** — página de erro com identidade visual

---

## 🛠 Stack técnica

- **React 19** + **React Router 7** — SPA com rotas
- **Vite 8** — bundler e dev server
- **CSS3 moderno** — Grid, Flexbox, custom properties, animações
- **SVG inline** — logo, ícones, decoração orbital
- **localStorage API** — persistência local
- **IntersectionObserver API** — animações on-scroll

---

## 🎨 Design

- **Tema:** Espaço (dark navy) + Agro (verde)
- **Paleta:** `#060B1A` background, `#00FF88` neon, `#22C55E` verde agrícola, branco, cinzas
- **Tipografia:** Inter (sans), Instrument Serif (display itálico), JetBrains Mono (mono)
- **Status de risco:** 🟢 Saudável · 🟡 Atenção · 🔴 Crítico

---

## 🌐 ODS atendidos

| ODS                                              | Como contribuímos                                      |
| ------------------------------------------------ | ------------------------------------------------------ |
| **ODS 2** — Fome zero e agricultura sustentável  | Mais produtividade no campo, menos perdas de safra     |
| **ODS 13** — Ação contra mudança climática       | Resposta antecipada a eventos climáticos extremos      |
| **ODS 9** — Indústria, inovação e infraestrutura | Tecnologia espacial acessível para pequenos produtores |

---

## 📡 Fontes orbitais que inspiraram

- [INPE](https://www.gov.br/inpe) — CBERS-04A, DETER
- [NASA](https://www.nasa.gov) — Landsat 9, MODIS
- [ESA](https://www.esa.int) — Copernicus, Sentinel-1/2/3
- [Space Charter](https://disasterscharter.org) — Resposta internacional a desastres

---

## 👥 Equipe

| Nome                             | RM     |
| -------------------------------- | ------ |
| Luis Fernando Santos Araujo      | 567998 |
| José Inácio Freitas da Silva     | 566678 |
| Jefferson Wrasek Galhardo Júnior | 567687 |
| Nícolas Codognotto               | 559852 |
| Lucas Murta Vargas               | 568099 |

---

## 📺 Vídeo Pitch

Link no arquivo `grupo.txt`.

---

**FIAP · Engenharia de Software · Global Solution 2026/1**
