import { PRODUCT_PARTS } from '@/config/product-parts';

interface ColorCustomizationProps {
  onColorChange: (partName: string, color: string) => void;
  selectedColors: Record<string, string>;
}

export default function ColorCustomization({ 
  onColorChange,
  selectedColors 
}: ColorCustomizationProps) {
  // 这里假设有一个产品部件列表
  const productParts = PRODUCT_PARTS;

  const availableColors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'
    // ... 更多颜色选项
  ];

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">颜色定制</h2>
      <div className="space-y-4">
        {productParts.map(part => (
          <div key={part.id} className="space-y-2">
            <h3 className="font-medium">{part.name}</h3>
            <div className="flex gap-2">
              {availableColors.map(color => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColors[part.id] === color 
                      ? 'border-black' 
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => onColorChange(part.id, color)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 