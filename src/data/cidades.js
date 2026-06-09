// ============================================================================
//  AgroOrb · Dados climáticos e lógica de análise
//  Em produção viria de uma API meteorológica (INPE, OpenWeather, NASA POWER)
// ============================================================================

export const CIDADES = [
  {
    id: 'sao-paulo',
    nome: 'São Paulo',
    estado: 'SP',
    foto: 'Campinas-sp.jpg',
    cultura: 'Hortaliças e frutas',
    temperatura: 24,
    umidade: 62,
    precipitacao: 12,
    coord: { lat: -23.55, lng: -46.63 },
  },
  {
    id: 'palmas',
    nome: 'Palmas',
    estado: 'TO',
    foto: 'palmas-to.png',
    cultura: 'Soja e arroz',
    temperatura: 34,
    umidade: 38,
    precipitacao: 5,
    coord: { lat: -10.18, lng: -48.33 },
  },
  {
    id: 'rio-verde',
    nome: 'Rio Verde',
    estado: 'GO',
    foto: 'rioverde-go.jpg',
    cultura: 'Milho e soja',
    temperatura: 30,
    umidade: 55,
    precipitacao: 8,
    coord: { lat: -17.79, lng: -50.92 },
  },
  {
    id: 'sorriso',
    nome: 'Sorriso',
    estado: 'MT',
    foto: 'sorriso-mt.jpg',
    cultura: 'Soja',
    temperatura: 36,
    umidade: 28,
    precipitacao: 0,
    coord: { lat: -12.55, lng: -55.71 },
  },
  {
    id: 'lem',
    nome: 'Luís Eduardo Magalhães',
    estado: 'BA',
    foto: 'LuisEduardoMagalhaes-BA.png',
    cultura: 'Algodão e café',
    temperatura: 28,
    umidade: 68,
    precipitacao: 18,
    coord: { lat: -12.09, lng: -45.79 },
  },
]

// ============================================================================
//  CÁLCULO DO ÍNDICE AGROORB (0 a 100)
// ============================================================================
// Heurística baseada em:
//  • Temperatura ideal: 24-28°C (35 pts) · aceitável até 32°C
//  • Umidade ideal: 50-70% (35 pts) · aceitável 40-80%
//  • Precipitação ideal: 5-20mm (30 pts) · aceitável 2-30mm
// ============================================================================
export function calcularIndice(cidade) {
  let pTemp = 5
  if (cidade.temperatura >= 24 && cidade.temperatura <= 28) pTemp = 35
  else if (cidade.temperatura >= 20 && cidade.temperatura <= 32) pTemp = 25
  else if (cidade.temperatura >= 18 && cidade.temperatura <= 35) pTemp = 15

  let pUmid = 5
  if (cidade.umidade >= 50 && cidade.umidade <= 70) pUmid = 35
  else if (cidade.umidade >= 40 && cidade.umidade <= 80) pUmid = 25
  else if (cidade.umidade >= 30 && cidade.umidade <= 90) pUmid = 15

  let pPrec = 0
  if (cidade.precipitacao >= 5 && cidade.precipitacao <= 20) pPrec = 30
  else if (cidade.precipitacao >= 2 && cidade.precipitacao <= 30) pPrec = 20
  else if (cidade.precipitacao > 0 && cidade.precipitacao <= 40) pPrec = 10

  return pTemp + pUmid + pPrec
}

export function classificarIndice(indice) {
  if (indice >= 80) return { status: 'safe',     label: 'Favorável' }
  if (indice >= 60) return { status: 'warn',     label: 'Atenção'   }
  return                 { status: 'critical', label: 'Crítico'   }
}

// ============================================================================
//  RISCO CLIMÁTICO (Baixo / Moderado / Alto)
// ============================================================================
export function calcularRisco(cidade) {
  let r = 0
  if (cidade.umidade < 30)        r += 3
  else if (cidade.umidade < 40)   r += 2

  if (cidade.temperatura > 35)    r += 3
  else if (cidade.temperatura > 32) r += 2

  if (cidade.precipitacao === 0)  r += 2

  if (r >= 5) return { nivel: 'Alto',     status: 'critical' }
  if (r >= 2) return { nivel: 'Moderado', status: 'warn'     }
  return        { nivel: 'Baixo',    status: 'safe'     }
}

// ============================================================================
//  ALERTAS AUTOMÁTICOS (baseados nas regras de negócio do briefing)
// ============================================================================
export function gerarAlertas(cidade) {
  const alertas = []

  if (cidade.umidade < 30) {
    alertas.push({
      tipo: 'critical',
      texto: 'Baixa umidade detectada',
      justificativa: `Umidade do solo em ${cidade.umidade}% — abaixo do limite mínimo seguro (30%).`,
    })
  }

  if (cidade.temperatura > 35) {
    alertas.push({
      tipo: 'critical',
      texto: 'Possível estresse hídrico',
      justificativa: `Temperatura de ${cidade.temperatura}°C ultrapassa o limite seguro (35°C) para a maioria das culturas.`,
    })
  }

  if (cidade.precipitacao === 0 && cidade.umidade < 40) {
    alertas.push({
      tipo: 'critical',
      texto: 'Risco de seca',
      justificativa: 'Ausência de precipitação prevista combinada com umidade do solo abaixo de 40%.',
    })
  }

  if (cidade.temperatura > 32 && cidade.temperatura <= 35) {
    alertas.push({
      tipo: 'warn',
      texto: 'Temperatura acima do ideal',
      justificativa: `Temperatura em ${cidade.temperatura}°C exige monitoramento contínuo.`,
    })
  }

  if (cidade.temperatura < 32 && cidade.umidade > 60) {
    alertas.push({
      tipo: 'safe',
      texto: 'Condições favoráveis para cultivo',
      justificativa: `Temperatura amena (${cidade.temperatura}°C) e umidade adequada (${cidade.umidade}%) garantem ambiente ideal.`,
    })
  }

  if (alertas.length === 0) {
    alertas.push({
      tipo: 'warn',
      texto: 'Monitoramento recomendado',
      justificativa: 'Condições dentro de parâmetros aceitáveis. Manter observação contínua nas próximas 24 horas.',
    })
  }

  return alertas
}

// ============================================================================
//  RECOMENDAÇÕES AUTOMÁTICAS
// ============================================================================
export function gerarRecomendacoes(cidade, indice) {
  const recs = []

  if (cidade.umidade < 30) {
    recs.push('Iniciar irrigação imediatamente.')
  }

  if (cidade.temperatura > 35) {
    recs.push('Aplicar manejo preventivo contra estresse térmico.')
    recs.push('Aumentar monitoramento da lavoura.')
  }

  if (cidade.precipitacao === 0 && cidade.umidade < 40) {
    recs.push('Planejar atividades agrícolas para as próximas 48 horas.')
  }

  if (cidade.precipitacao > 15) {
    recs.push('Aguardar chuva prevista antes de irrigar.')
    recs.push('Reduzir irrigação para evitar desperdício.')
  }

  if (indice >= 80) {
    recs.push('Manter condições atuais.')
  }

  if (recs.length === 0) {
    recs.push('Manter monitoramento de rotina.')
  }

  return recs
}

// ============================================================================
//  HISTÓRICO RESUMIDO DOS ÚLTIMOS DIAS (simulado)
// ============================================================================
export function gerarHistorico(cidade) {
  const idxHoje = calcularIndice(cidade)
  const hist = []
  for (let i = 0; i < 5; i++) {
    const variacao = i === 0 ? 0 : -3 - i * 2 + (i % 2 === 0 ? 2 : 0)
    hist.push({
      label: i === 0 ? 'Hoje' : i === 1 ? 'Ontem' : `${i} dias atrás`,
      indice: Math.max(0, Math.min(100, idxHoje + variacao)),
      umidade: Math.max(0, Math.min(100, cidade.umidade + i * 2)),
      temperatura: Math.max(10, cidade.temperatura - i),
    })
  }
  return hist
}
