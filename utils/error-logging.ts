export const logError = (error: Error, errorInfo?: any) => {
  // 添加错误级别
  const errorLevel = error.name === 'ValidationError' ? 'warning' : 'error';
  
  // 结构化错误日志
  const errorLog = {
    timestamp: new Date().toISOString(),
    level: errorLevel,
    message: error.message,
    stack: error.stack,
    additionalInfo: errorInfo,
    environment: process.env.NODE_ENV
  };

  // 开发环境日志
  if (process.env.NODE_ENV === 'development') {
    console.error('错误:', errorLog);
  }

  // 生产环境错误上报
  if (process.env.NODE_ENV === 'production') {
    try {
      // 示例：Sentry 集成
      if (process.env.SENTRY_DSN) {
        // Sentry.captureException(error, { extra: errorInfo });
      }
    } catch (reportError) {
      console.error('错误上报失败:', reportError);
    }
  }

  return errorLog;
}; 