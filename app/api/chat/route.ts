import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // 这里应该是实际的大模型 API 调用
    // 示例：使用 OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();
    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: '处理请求时出错' }, { status: 500 });
  }
} 