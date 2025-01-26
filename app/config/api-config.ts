export const API_CONFIG = {
  SILICONFLOW_API_URL: 'https://api.siliconflow.cn/v1/chat/completions',
  SILICONFLOW_MODEL: 'Qwen/Qwen2.5-7B-Instruct', // 使用文档中推荐的模型
  DEFAULT_PARAMS: {
    temperature: 0.7,
    top_p: 0.7,
    top_k: 50,
    frequency_penalty: 0.5,
    max_tokens: 512,
  }
}; 