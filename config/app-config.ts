export const AppConfig = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    timeout: 5000,
  },
  images: {
    domains: ['localhost'],
    defaultQuality: 75,
  },
  product: {
    defaultModelPath: '/models/default.glb',
    maxCustomColors: 5,
  },
  cache: {
    maxAge: 3600,
  },
} as const; 