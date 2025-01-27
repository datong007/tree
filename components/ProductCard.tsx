import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    title: string;
    model: string;
    imageUrl: string;
    features: string[];
    specifications: {
      size: string;
      weight?: string;
      material?: string;
      capacity?: string;
    };
    isNew?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/product-customization/${product.id}`}
      className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative aspect-video">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs rounded-full">
            新品
          </span>
        )}
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {product.title}
        </h3>
        
        <p className="text-sm text-gray-600">
          型号：{product.model}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {product.features.slice(0, 2).map((feature: string, index: number) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <div className="pt-2 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {product.specifications.size}
          </span>
          <span className="text-sm text-blue-600 font-medium">
            查看详情 →
          </span>
        </div>
      </div>
    </Link>
  );
} 