import { NextResponse } from 'next/server';
import { join } from 'path';
import { readFileSync, existsSync } from 'fs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const colors = Object.fromEntries(searchParams);
    
    // Basic validation
    if (typeof colors !== 'object') {
      return NextResponse.json(
        { error: 'Invalid color format' },
        { status: 400 }
      );
    }
    
    const imagePath = join(process.cwd(), 'public', 'products', 'default.png');
    
    // Add file existence check
    if (!existsSync(imagePath)) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    
    const imageBuffer = readFileSync(imagePath);
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error loading image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 