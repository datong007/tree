import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    
    // 记录订单数据
    console.log('新订单详情:', {
      提交时间: new Date().toLocaleString(),
      客户姓名: orderData.name,
      邮箱: orderData.email,
      国家: orderData.country,
      备注: orderData.note,
      选择颜色: orderData.colors
    });
    
    // 这里可以添加发送邮件通知的逻辑
    
    return NextResponse.json({ 
      success: true, 
      message: '订单提交成功' 
    });
    
  } catch (error) {
    console.error('处理订单失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: '订单提交失败' 
      },
      { status: 500 }
    );
  }
} 