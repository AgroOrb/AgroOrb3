// Dados dos 4 setores monitorados pela fazenda
// Em produção, viriam de uma API conectada a satélites (CBERS, Sentinel, MODIS)
export const SETORES = [
  {
    id: 'norte',
    nome: 'Setor Norte',
    cultura: 'Soja · 14 hectares',
    latitude: -15.7801,
    longitude: -47.9292,
    status: 'safe',
    statusLabel: 'Saudável',
    indiceFazenda: 92,
    temperatura: 26,
    umidade: 71,
    mensagem: 'Níveis ideais de umidade detectados por satélite.',
    recomendacao: 'Manter o ciclo de irrigação programado. Próxima checagem em 24 horas.',
    fontes: 'CBERS-04A · Sentinel-2',
    atualizacao: 'há 8 minutos',
    indiceVegetacao: 0.87
  },
  {
    id: 'sul',
    nome: 'Setor Sul',
    cultura: 'Milho · 22 hectares',
    latitude: -15.8204,
    longitude: -47.9438,
    status: 'critical',
    statusLabel: 'Crítico',
    indiceFazenda: 65,
    temperatura: 34,
    umidade: 28,
    mensagem: 'Baixa umidade detectada por satélite. Sinais de estresse hídrico.',
    recomendacao: 'Iniciar irrigação imediatamente. Risco elevado de perda parcial da safra nas próximas 48h.',
    fontes: 'Sentinel-2 · MODIS',
    atualizacao: 'há 3 minutos',
    indiceVegetacao: 0.52
  },
  {
    id: 'leste',
    nome: 'Setor Leste',
    cultura: 'Café · 8 hectares',
    latitude: -15.8028,
    longitude: -47.9035,
    status: 'warn',
    statusLabel: 'Atenção',
    indiceFazenda: 78,
    temperatura: 31,
    umidade: 54,
    mensagem: 'Temperatura acima do ideal para a cultura.',
    recomendacao: 'Monitorar nas próximas 24 horas. Considerar irrigação preventiva se temperatura subir.',
    fontes: 'Landsat 9 · Sentinel-3',
    atualizacao: 'há 15 minutos',
    indiceVegetacao: 0.74
  },
  {
    id: 'oeste',
    nome: 'Setor Oeste',
    cultura: 'Cana-de-açúcar · 18 hectares',
    latitude: -15.7947,
    longitude: -47.9631,
    status: 'safe',
    statusLabel: 'Saudável',
    indiceFazenda: 89,
    temperatura: 28,
    umidade: 68,
    mensagem: 'Vegetação em pleno desenvolvimento. Índice NDVI ótimo.',
    recomendacao: 'Nenhuma ação necessária. Continuar monitoramento de rotina.',
    fontes: 'CBERS-04A · Sentinel-2',
    atualizacao: 'há 11 minutos',
    indiceVegetacao: 0.85
  }
]

// Alertas exibidos no widget lateral
export const ALERTAS_RECENTES = [
  { tipo: 'critical', texto: 'Setor Sul: estresse hídrico detectado', tempo: 'há 3 min' },
  { tipo: 'warn',     texto: 'Setor Leste: temperatura subindo', tempo: 'há 15 min' },
  { tipo: 'safe',     texto: 'Setor Norte: irrigação concluída com êxito', tempo: 'há 1 h' },
  { tipo: 'safe',     texto: 'Setor Oeste: NDVI ótimo confirmado', tempo: 'há 2 h' },
  { tipo: 'warn',     texto: 'Previsão climática atualizada via NASA', tempo: 'há 4 h' }
]
