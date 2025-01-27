'use client';

import { useState } from 'react';
import { ProductColors } from '@/types/product';

interface OrderFormProps {
  selectedColors: ProductColors;
  onSubmit: (data: OrderFormData) => void;
}

interface OrderFormData {
  name: string;
  email: string;
  country: string;
  note: string;
}

export default function OrderForm({
  selectedColors,
  onSubmit
}: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    note: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      onSubmit(formData);
      setSubmitStatus('success');
      // 重置表单
      setFormData({
        name: '',
        email: '',
        country: '',
        note: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // 3秒后重置状态
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">提交定制信息</h2>
      
      <div className="space-y-4">
        {/* 姓名 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 邮箱 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 国家 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            国家 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.country}
            onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 备注 */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            备注信息
          </label>
          <textarea
            rows={4}
            value={formData.note}
            onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入任何额外的要求或说明"
          />
        </div>
      </div>

      {/* 提交状态提示 */}
      {submitStatus === 'success' && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
          订单已提交成功！我们会尽快与您联系。
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
          提交失败，请稍后重试或联系客服。
        </div>
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-md text-white 
            ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          {isSubmitting ? '提交中...' : '提交定制需求'}
        </button>
      </div>
    </form>
  );
} 