'use client';

import { useState } from 'react';
import { CustomizationOrder } from '@/types/order';
import { ProductColors } from '@/types/product';

interface OrderFormProps {
  selectedColors: ProductColors;
  onSubmit: (order: CustomizationOrder) => Promise<void>;
}

export default function OrderForm({
  selectedColors,
  onSubmit
}: OrderFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      selectedColors,
      quantity,
      customerNote: note,
      contactInfo: {
        name,
        email
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-xl font-semibold">提交定制信息</h2>

      {/* 数量选择 */}
      <div className="space-y-2">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          数量 <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 border rounded-md hover:bg-gray-50"
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 text-center border rounded-md"
            min="1"
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 border rounded-md hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      {/* 联系信息 */}
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            邮箱 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* 备注信息 */}
      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700">
          备注
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* 提交按钮 */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        提交定制需求
      </button>
    </form>
  );
} 