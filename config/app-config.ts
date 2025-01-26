export const AppConfig = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
  },
  images: {
    domains: ['localhost'],
    defaultQuality: 75,
  },
  product: {
    defaultModelPath: '/models/shirt.glb',
    maxCustomColors: 5,
    modelScale: 1.0,
    initialCameraPosition: [0, 0, 5],
  },
  cache: {
    maxAge: 3600,
  },
} as const; 