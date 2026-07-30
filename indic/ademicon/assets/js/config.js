window.UW_CONFIG = Object.freeze({
  appName: 'Central Inteligente de Pré-Atendimento UW',
  version: '1.0.0-sprint1',
  selectionDelay: 520,
  toastDuration: 1600,
  defaultLanguage: 'pt-BR',
  routes: {
    imoveis: 'imoveis/',
    veiculos: 'veiculos/',
    investimentos: 'investimentos/',
    descobrir: 'descobrir/'
  },
  translations: {
    'pt-BR': {
      'route.imoveis': 'Abrir pré-atendimento de imóveis',
      'route.veiculos': 'Abrir pré-atendimento de veículos',
      'route.investimentos': 'Abrir pré-atendimento de investimentos',
      'route.descobrir': 'Receber ajuda para descobrir a melhor opção',
      opening: 'Abrindo {name}…',
      names: { imoveis: 'Imóveis', veiculos: 'Veículos', investimentos: 'Investimentos', descobrir: 'Ainda não sei' }
    },
    en: {
      'route.imoveis': 'Open real estate pre-service',
      'route.veiculos': 'Open vehicle pre-service',
      'route.investimentos': 'Open investment pre-service',
      'route.descobrir': 'Get help choosing the best option',
      opening: 'Opening {name}…',
      names: { imoveis: 'Real estate', veiculos: 'Vehicles', investimentos: 'Investments', descobrir: 'I am not sure' }
    },
    'zh-CN': {
      'route.imoveis': '打开房地产预服务',
      'route.veiculos': '打开车辆预服务',
      'route.investimentos': '打开投资预服务',
      'route.descobrir': '获取帮助以选择最佳方案',
      opening: '正在打开{name}…',
      names: { imoveis: '房地产', veiculos: '车辆', investimentos: '投资', descobrir: '我还不确定' }
    }
  }
});
