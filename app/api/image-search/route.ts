import { NextResponse } from 'next/server';
import { searchProductImages, PRODUCT_IMAGES } from '@/config/product-images';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const series = searchParams.get('series') || '';

    let results = [];
    
    if (query) {
      results = searchProductImages(query);
    } else if (category) {
      results = PRODUCT_IMAGES.filter(image => 
        image.category === category &&
        (!series || image.series === series)
      );
    } else {
      results = PRODUCT_IMAGES;
    }

    return NextResponse.json({
      success: true,
      results
    });

  } catch (error) {
    console.error('Image search error:', error);
    return NextResponse.json(
      { error: '搜索失败' },
      { status: 500 }
    );
  }
} 