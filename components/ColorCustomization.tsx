import { PRODUCT_PARTS } from '@/config/product-parts';
import { AVAILABLE_COLORS } from '@/config/colors';
import { ProductColors } from '@/types/product';

interface ColorCustomizationProps {
  onColorChange: (partId: string, color: string) => void;
  selectedColors: ProductColors;
  customPantones: Record<string, string>;
  onCustomPantoneChange: (partId: string, value: string) => void;
}

export default function ColorCustomization({
  onColorChange,
  selectedColors,
  customPantones,
  onCustomPantoneChange
}: ColorCustomizationProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">颜色定制</h2>
      <div className="space-y-6">
        {PRODUCT_PARTS.map(part => (
          <div key={part.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {part.name}
            </label>
            <div className="mt-2 p-2 bg-gray-50 rounded-md">
              <input
                type="text"
                placeholder="输入潘通色号"
                value={customPantones[part.id] || ''}
                onChange={(e) => onCustomPantoneChange(part.id, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 