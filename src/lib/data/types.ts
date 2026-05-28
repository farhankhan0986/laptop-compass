export interface Laptop {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string[];
  os: "Windows" | "macOS" | "Linux" | "ChromeOS";
  priceINR: number;
  priceUSD: number;
  rating: number;
  processor: string;
  processorBrand: "Apple" | "Intel" | "AMD" | "Qualcomm";
  gpu: string;
  gpuBrand: "Apple" | "NVIDIA" | "AMD" | "Intel";
  ram: string;
  ramGB: number;
  storage: string;
  storageGB: number;
  display: string;
  displaySize: number;
  refreshRate: string;
  refreshRateHz: number;
  battery: string;
  batteryHours: number;
  weight: string;
  ports: string[];
  build: string;
  keyboard: string;
  webcam: string;
  cooling: string;
  aiFeatures: string;
  shortDescription: string;
  description: string;
  tags: string[];
  pros: string[];
  cons: string[];
  bestFor: string[];
  performance: {
    gaming: number;
    editing: number;
    coding: number;
    aiml: number;
  };
  images: string[];
  buyLinks: {
    amazon?: string;
    flipkart?: string;
    official?: string;
  };
}

export interface Brand {
  id: string;
  name: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
}

export interface TopList {
  slug: string;
  title: string;
  description: string;
  laptopIds: string[];
  notes: Record<string, string>;
}