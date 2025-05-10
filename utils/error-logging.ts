export const logError = (error: Error, errorInfo?: any) => {
  // 在开发环境下打印错误
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', error);
    if (errorInfo) {
      console.error('Error Info:', errorInfo);
    }
  }

  // 这里可以添加错误上报逻辑
  // 例如发送到错误监控服务
  try {
    // 可以集成 Sentry、LogRocket 等服务
    // 或者发送到自己的错误收集接口
  } catch (reportError) {
    console.error('Error reporting failed:', reportError);
  }
}; 