import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  country: string;
  message?: string;
}

interface OrderData {
  orderNumber: any;
  submitTime: any;
  status: any;
  customerInfo: CustomerInfo;
  customization: {
    selectedColors: Record<string, string>;
    customPantones: Record<string, string>;
  };
}

// 模拟数据库存储
let orders: OrderData[] = [];

// 生成订单号
function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `ORDER${year}${month}${day}${random}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 验证必填字段
    const { customerInfo, customization } = body as OrderData;
    
    if (!customerInfo?.name || !customerInfo?.email || !customerInfo?.phone || !customerInfo?.country) {
      return NextResponse.json(
        { success: false, error: '请填写所有必填信息' },
        { status: 400 }
      );
    }

    // 生成订单号
    const orderNumber = generateOrderNumber();
    
    // 创建新订单
    const newOrder = {
      orderNumber,
      status: 'pending',
      submitTime: new Date().toISOString(),
      ...body,
    };
    
    // 保存订单
    orders.push(newOrder);
    
    // 这里可以添加发送邮件通知等功能
    
    console.log('New order created:', newOrder);
    
    return NextResponse.json({
      success: true,
      orderNumber,
      message: '获取报价成功'
    });
    
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '获取报价失败，请重试' 
      },
      { status: 500 }
    );
  }
}

// 获取所有订单（供后台管理使用）
export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      orders: orders.map(order => ({
        orderNumber: order.orderNumber,
        customerName: order.customerInfo.name,
        email: order.customerInfo.email,
        phone: order.customerInfo.phone,
        submitTime: order.submitTime,
        status: order.status,
        customization: {
          colors: order.customization.selectedColors,
          pantones: order.customization.customPantones
        }
      }))
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '获取订单列表失败' },
      { status: 500 }
    );
  }
} 

function uuidv4() {
  throw new Error('Function not implemented.');
}
