export interface ImageData {
  url: string;
  type: 'landscape' | 'portrait' | 'nature' | 'architecture' | 'abstract';
  title: string;
}

const imageTypes: ImageData[] = [
  { url: 'https://img.alllf.com/1.png', type: 'landscape', title: 'Mountain Vista' },
  { url: 'https://img.alllf.com/2.png', type: 'architecture', title: 'Modern Building' },
  { url: 'https://img.alllf.com/3.png', type: 'nature', title: 'Forest Path' },
  { url: 'https://img.alllf.com/4.png', type: 'abstract', title: 'Color Waves' },
  { url: 'https://img.alllf.com/5.png', type: 'portrait', title: 'City Life' },
  { url: 'https://img.alllf.com/6.png', type: 'landscape', title: 'Sunset Beach' }
];

export const images = {
  carousel: [
    'https://img.alllf.com/1.png',
    'https://img.alllf.com/2.png',
    'https://img.alllf.com/3.png',
    'https://img.alllf.com/4.png',
    'https://img.alllf.com/5.png',
    'https://img.alllf.com/6.png'
  ],
  gallery: Array.from({ length: 50 }, (_, i) => imageTypes[i % imageTypes.length])
};