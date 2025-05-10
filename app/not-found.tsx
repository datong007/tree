export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-bold border-r border-gray-300 pr-4">404</h1>
        <p className="text-xl">找不到此页面。</p>
      </div>
    </div>
  )
} 

export interface ProductColors {
  [key: string]: string;
} 

export interface CustomizationOrder {
  selectedColors: ProductColors;
  size: string;
  quantity: number;
  customerNote?: string;
  contactInfo: {
    name: string;
    email: string;
  };
} 