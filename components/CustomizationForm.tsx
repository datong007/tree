'use client';

import { useState } from 'react';
import { ProductColors } from '@/types/global';
import toast from 'react-hot-toast';
import { AppConfig } from '@/config/app-config';

interface CustomizationFormProps {
  selectedColors: ProductColors;
  onSubmit?: (formData: any) => void;
}

export default function CustomizationForm({ 
  selectedColors,
  onSubmit 
}: CustomizationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    quantity: 1,
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        ...formData,
        selectedColors,
        submitTime: new Date().toISOString()
      };

      const response = await fetch(`${AppConfig.api.baseUrl}/api/submit-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('定制信息提交成功！');
        onSubmit?.(orderData);
      } else {
        throw new Error(result.error || '提交失败');
      }
    } catch (error) {
      toast.error('提交失败，请稍后重试');
      console.error('提交定制信息失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">定制信息</h2>
      
      {/* 基本信息 */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            电话
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            国家/地区 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.country}
            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            数量 <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            required
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            备注信息
          </label>
          <textarea
            rows={4}
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="请输入任何额外的要求或说明"
          />
        </div>
      </div>

      {/* 提交按钮 */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {isSubmitting ? '提交中...' : '提交定制信息'}
        </button>
      </div>
    </form>
  );
} 