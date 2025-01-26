export interface ColorOption {
  id: string;
  value: string;
  name: string;
  pantone: string;
}

const STANDARD_COLORS: ColorOption[] = [
  { id: 'red', value: '#FF0000', name: '红色', pantone: 'PMS 185 C' },
  { id: 'orange', value: '#FFA500', name: '橙色', pantone: 'PMS 151 C' },
  { id: 'yellow', value: '#FFFF00', name: '黄色', pantone: 'PMS 108 C' },
  { id: 'green', value: '#008000', name: '绿色', pantone: 'PMS 348 C' },
  { id: 'cyan', value: '#00FFFF', name: '青色', pantone: 'PMS 306 C' },
  { id: 'blue', value: '#0000FF', name: '蓝色', pantone: 'PMS 286 C' },
  { id: 'purple', value: '#800080', name: '紫色', pantone: 'PMS 2592 C' },
  { id: 'custom', value: 'custom', name: '自定义色号', pantone: '' },
];

export const AVAILABLE_COLORS = {
  frontButton: STANDARD_COLORS,
  cover: STANDARD_COLORS,
  mainBody: STANDARD_COLORS,
  insert: STANDARD_COLORS,
  logo: STANDARD_COLORS,
} as const; 