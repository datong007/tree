import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFileSync } from 'fs';

export async function GET(request: Request) {
  try {
    // 从查询参数获取颜色信息
    const { searchParams } = new URL(request.url);
    const colors = Object.fromEntries(searchParams);
    
    // 这里可以根据 colors 参数选择不同的图片
    // 现在先返回默认图片
    const imagePath = join(process.cwd(), 'public', 'products', 'default.png');
    const imageBuffer = readFileSync(imagePath);
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error loading image:', error);
    return new NextResponse('Image not found', { status: 404 });
  }
} 