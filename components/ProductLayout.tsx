import Image from 'next/image';
import { ProductColors } from '@/types/product';

interface ProductLayoutProps {
  children: React.ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {children}
    </div>
  );
}

ProductLayout.Expanded = function ExpandedView({ 
  className,
  selectedColors 
}: {
  className?: string;
  selectedColors: ProductColors;
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="relative w-full aspect-square">
        <Image 
          src="/api/product-expanded-view"
          alt="Product Expanded View"
          fill
          className={`object-contain ${className}`}
          priority
        />
      </div>
    </div>
  );
}; 