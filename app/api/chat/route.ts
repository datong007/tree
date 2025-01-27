import { API_CONFIG } from '@/app/config/api-config';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await fetch(API_CONFIG.SILICONFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SILICONFLOW_API_KEY}`,
      },
      body: JSON.stringify({
        model: API_CONFIG.SILICONFLOW_MODEL,
        messages: [{ role: 'user', content: message }],
        stream: false,
        ...API_CONFIG.DEFAULT_PARAMS
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      response: data.choices[0].message.content,
      usage: data.usage
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: '处理请求时出错' }, 
      { status: 500 }
    );
  }
} 