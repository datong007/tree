import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audio = formData.get('audio') as Blob;

    if (!audio) {
      return NextResponse.json({ error: '未找到音频文件' }, { status: 400 });
    }

    // 保存音频文件
    const buffer = Buffer.from(await audio.arrayBuffer());
    const filename = `speech-${Date.now()}.wav`;
    const filepath = join(process.cwd(), 'public', 'uploads', filename);
    await writeFile(filepath, buffer);

    // 这里应该是实际的语音识别 API 调用
    // 示例：使用 OpenAI Whisper API
    const formData2 = new FormData();
    formData2.append('file', audio);
    formData2.append('model', 'whisper-1');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData2,
    });

    const data = await response.json();

    // 获取语音识别结果后，发送到聊天 API
    const chatResponse = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: data.text }),
    });

    const chatData = await chatResponse.json();

    return NextResponse.json({
      text: data.text,
      response: chatData.response,
    });
  } catch (error) {
    console.error('Speech-to-text API error:', error);
    return NextResponse.json({ error: '处理语音时出错' }, { status: 500 });
  }
} 