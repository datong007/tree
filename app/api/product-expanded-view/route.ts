import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFileSync } from 'fs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const colors = Object.fromEntries(searchParams);
    
    // 返回展开视图的图片
    const imagePath = join(process.cwd(), 'public', 'products', 'expanded.png');
    const imageBuffer = readFileSync(imagePath);
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error loading expanded view:', error);
    return new NextResponse('Image not found', { status: 404 });
  }
} 