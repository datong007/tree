import { useState } from 'react';

interface ProductColors {
  primary: string;
  secondary?: string;
}

interface CustomizationFormProps {
  selectedColors: ProductColors;
  selectedFilters: {
    category: string;
    style: string;
    size: string;
  };
}

export default function CustomizationForm({ selectedColors, selectedFilters }: CustomizationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 实现提交逻辑
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">定制信息</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">姓名</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">邮箱</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">备注</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        提交定制
      </button>
    </form>
  );
} 