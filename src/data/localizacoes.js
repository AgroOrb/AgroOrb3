export const LOCALIZACOES_BR = [
  {
    uf: 'SP',
    estado: 'São Paulo',
    cidades: [
      { cidade: 'Campinas', latitude: -22.9056, longitude: -47.0608 },
      { cidade: 'Ribeirão Preto', latitude: -21.1775, longitude: -47.8103 },
      { cidade: 'Bauru', latitude: -22.3148, longitude: -49.0600 },
      { cidade: 'Sorocaba', latitude: -23.5015, longitude: -47.4526 },
    ],
  },
  {
    uf: 'MG',
    estado: 'Minas Gerais',
    cidades: [
      { cidade: 'Uberlândia', latitude: -18.9186, longitude: -48.2772 },
      { cidade: 'Uberaba', latitude: -19.7486, longitude: -47.9317 },
      { cidade: 'Lavras', latitude: -21.2474, longitude: -44.9990 },
      { cidade: 'Patos de Minas', latitude: -18.5789, longitude: -46.5186 },
    ],
  },
  {
    uf: 'PR',
    estado: 'Paraná',
    cidades: [
      { cidade: 'Londrina', latitude: -23.3045, longitude: -51.1696 },
      { cidade: 'Maringá', latitude: -23.4209, longitude: -51.9331 },
      { cidade: 'Cascavel', latitude: -24.9570, longitude: -53.4590 },
      { cidade: 'Guarapuava', latitude: -25.3904, longitude: -51.4629 },
    ],
  },
  {
    uf: 'RS',
    estado: 'Rio Grande do Sul',
    cidades: [
      { cidade: 'Santa Maria', latitude: -29.6868, longitude: -53.8149 },
      { cidade: 'Pelotas', latitude: -31.7654, longitude: -52.3376 },
      { cidade: 'Passo Fundo', latitude: -28.2620, longitude: -52.4064 },
      { cidade: 'Alegrete', latitude: -29.7838, longitude: -55.7910 },
    ],
  },
  {
    uf: 'SC',
    estado: 'Santa Catarina',
    cidades: [
      { cidade: 'Chapecó', latitude: -27.1006, longitude: -52.6152 },
      { cidade: 'Lages', latitude: -27.8152, longitude: -50.3263 },
      { cidade: 'Rio do Sul', latitude: -27.2146, longitude: -49.6430 },
      { cidade: 'Joinville', latitude: -26.3044, longitude: -48.8487 },
    ],
  },
  {
    uf: 'GO',
    estado: 'Goiás',
    cidades: [
      { cidade: 'Rio Verde', latitude: -17.7926, longitude: -50.9195 },
      { cidade: 'Jataí', latitude: -17.8813, longitude: -51.7144 },
      { cidade: 'Anápolis', latitude: -16.3281, longitude: -48.9534 },
      { cidade: 'Catalão', latitude: -18.1659, longitude: -47.9448 },
    ],
  },
  {
    uf: 'MT',
    estado: 'Mato Grosso',
    cidades: [
      { cidade: 'Sorriso', latitude: -12.5426, longitude: -55.7211 },
      { cidade: 'Sinop', latitude: -11.8604, longitude: -55.5091 },
      { cidade: 'Rondonópolis', latitude: -16.4673, longitude: -54.6355 },
      { cidade: 'Lucas do Rio Verde', latitude: -13.0706, longitude: -55.9281 },
    ],
  },
  {
    uf: 'BA',
    estado: 'Bahia',
    cidades: [
      { cidade: 'Barreiras', latitude: -12.1434, longitude: -44.9970 },
      { cidade: 'Luís Eduardo Magalhães', latitude: -12.0884, longitude: -45.7899 },
      { cidade: 'Juazeiro', latitude: -9.4169, longitude: -40.5033 },
      { cidade: 'Vitória da Conquista', latitude: -14.8615, longitude: -40.8442 },
    ],
  },
  {
    uf: 'PE',
    estado: 'Pernambuco',
    cidades: [
      { cidade: 'Petrolina', latitude: -9.3891, longitude: -40.5039 },
      { cidade: 'Garanhuns', latitude: -8.8900, longitude: -36.4960 },
      { cidade: 'Caruaru', latitude: -8.2848, longitude: -35.9709 },
      { cidade: 'Arcoverde', latitude: -8.4180, longitude: -37.0534 },
    ],
  },
  {
    uf: 'PA',
    estado: 'Pará',
    cidades: [
      { cidade: 'Santarém', latitude: -2.4385, longitude: -54.6996 },
      { cidade: 'Marabá', latitude: -5.3816, longitude: -49.1334 },
      { cidade: 'Paragominas', latitude: -3.0027, longitude: -47.3520 },
      { cidade: 'Altamira', latitude: -3.2041, longitude: -52.2069 },
    ],
  },
]

export const ESTADOS_BR = LOCALIZACOES_BR.map((item) => ({
  uf: item.uf,
  estado: item.estado,
}))

export const LOCALIZACAO_PADRAO = {
  uf: 'SP',
  estado: 'São Paulo',
  cidade: 'Campinas',
  latitude: -22.9056,
  longitude: -47.0608,
}

export function getCidadesPorUf(uf) {
  const estado = LOCALIZACOES_BR.find((item) => item.uf === uf)
  return estado ? estado.cidades : []
}

export function getLocalizacaoPorUfCidade(uf, cidade) {
  const estado = LOCALIZACOES_BR.find((item) => item.uf === uf)
  const local = estado?.cidades.find((item) => item.cidade === cidade)

  if (!estado || !local) {
    return null
  }

  return {
    uf: estado.uf,
    estado: estado.estado,
    cidade: local.cidade,
    latitude: local.latitude,
    longitude: local.longitude,
  }
}
