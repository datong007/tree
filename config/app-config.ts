const environmentConfig = {
  development: {
    api: {
      baseUrl: 'http://localhost:3000/api',
      timeout: 5000
    }
  },
  production: {
    api: {
      baseUrl: '/api',
      timeout: 3000
    }
  }
};

export const AppConfig = {
  version: '3.0.0',
  api: environmentConfig[process.env.NODE_ENV as 'development' | 'production'].api,
  images: {
    domains: process.env.IMAGE_DOMAINS?.split(',') || ['localhost'],
    defaultQuality: 75,
  },
  product: {
    defaultModelPath: '/models/default-box.glb',
    defaultImagePath: '/images/placeholder.png',
    defaultTitle: '塑料工具箱',
    maxCustomColors: 5,
    modelScale: 1.0,
    initialCameraPosition: [0, 0, 5],
  },
  cache: {
    maxAge: parseInt(process.env.CACHE_MAX_AGE || '3600'),
  },
} as const; 