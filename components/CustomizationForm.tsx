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
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        定制信息
      </h2>

      <form className="space-y-6" onSubmit={onSubmit}>
        {/* 姓名 */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            姓名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
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
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入您的其他要求或留言"
          />
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          提交
        </button>
      </form>
    </div>
  );
} 