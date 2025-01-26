export function createApiResponse<T>(
  data?: T,
  error?: string,
  status: number = 200
) {
  const response = {
    success: !error,
    data,
    error,
    meta: {
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION || '1.0.0'
    }
  };

  return new Response(JSON.stringify(response), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
} 