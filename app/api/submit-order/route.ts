import { NextResponse } from 'next/server';
import type { CustomizationOrder } from '@/types/order';

export async function POST(request: Request) {
  try {
    const order: CustomizationOrder = await request.json();

    // 这里添加实际的订单处理逻辑
    // 例如：保存到数据库、发送邮件通知等

    // 模拟API处理延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      message: '订单提交成功',
      orderId: `ORD${Date.now()}` // 生成订单号
    });
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json(
      { success: false, message: '订单提交失败，请稍后重试' },
      { status: 500 }
    );
  }
} 