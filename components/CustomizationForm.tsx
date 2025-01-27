'use client';

import { useState } from 'react';
import { ProductColors } from '@/types/global';
import toast from 'react-hot-toast';
import { AppConfig } from '@/config/app-config';

interface CustomizationFormProps {
  selectedColors: ProductColors;
  customPantones: Record<string, string>;
  onSubmit?: (data: any) => void;
  onCustomPantoneChange?: (newPantone: string) => void;
}

export default function CustomizationForm({ 
  selectedColors,
  customPantones,
  onSubmit,
}: CustomizationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo: formData,
          customization: {
            selectedColors,
            customPantones
          }
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`提交成功！订单号：${data.orderNumber}`);
        // 重置表单
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          message: ''
        });
        // 调用父组件的onSubmit
        onSubmit?.(data);
      } else {
        throw new Error(data.error || '提交失败');
      }
    } catch (error) {
      toast.error('提交失败，请稍后重试');
      console.error('提交失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        基本信息
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* 姓名 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入您的姓名"
          />
        </div>

        {/* 邮箱 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入您的邮箱地址"
          />
        </div>

        {/* 电话 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            电话 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入您的联系电话"
          />
        </div>

        {/* 国家 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            国家 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.country}
            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入您所在的国家"
          />
        </div>

        {/* 留言 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            留言
          </label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入您的其他要求或留言"
          />
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 
            text-white rounded-lg transition-all duration-300
            ${isSubmitting 
              ? 'opacity-70 cursor-not-allowed' 
              : 'hover:opacity-90 hover:shadow-lg'
            }
          `}
        >
          {isSubmitting ? '提交中...' : '提交'}
        </button>
      </form>
    </div>
  );
} 