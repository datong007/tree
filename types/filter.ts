export interface Category {
  id: string;
  name: string;
}

export interface FilterOption {
  id: string;
  name: string;
}

export interface Filter {
  id: string;
  name: string;
  options: FilterOption[];
} 