import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

// Define Order type directly since import is failing
interface Order {
  orderNumber: string;
  status: string;
  submitTime: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    country: string;
  };
  productInfo: {
    productId: string;
    quantity: number;
  };
  customization: {
    selectedColors: string[];
    customPantones: string[];
  };
  notes?: string;
}

// 模拟数据库存储
let orders: any[] = [];

// 生成订单号的函数
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
    
    // 生成订单号
    const orderNumber = generateOrderNumber();
    
    // 创建新订单
    const newOrder = {
      orderNumber,
      status: 'pending',
      submitTime: new Date().toISOString(),
      customerInfo: body.customerInfo,
      customization: body.customization,
    };
    
    // 保存订单到模拟数据库
    orders.push(newOrder);
    
    console.log('New order created:', newOrder); // 添加日志
    
    // 返回成功响应
    return NextResponse.json({
      success: true,
      orderNumber,
      message: '订单提交成功'
    });
    
  } catch (error) {
    console.error('提交订单失败:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '订单提交失败，请重试' 
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
