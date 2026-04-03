const products = [
  {
    id: 1,
    name: "Samsung Galaxy A55",
    brand: "Samsung",
    type: "Mobile",
    price: 45000,
    storage: ["128GB", "256GB"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Blue", hex: "#3b5fc0" }
    ],
    images: [
      "assets/Products_images/galaxy-a55-5g-1.jpg",
      "assets/Products_images/galaxy-a55-5g-2.jpg",
      "assets/Products_images/galaxy-a55-5g-3.jpg"
    ],
    specs: { ram: "8GB", battery: "5000mAh", screen: "6.6 inch", cpu: "Octa-core" },
    stock: 0
  },
  {
    id: 2,
    name: "iPhone 14",
    brand: "Apple",
    type: "Mobile",
    price: 160000,
    storage: ["128GB", "256GB"],
    colors: [
      { name: "Midnight", hex: "#1c1c1e" },
      { name: "Starlight", hex: "#f2e8d9" }
    ],
    images: [
      "assets/Products_images/apple-iphone-14-1.jpg",
      "assets/Products_images/apple-iphone-14-2.jpg",
      "assets/Products_images/apple-iphone-14-3.jpg"
    ],
    specs: { ram: "6GB", battery: "3279mAh", screen: "6.1 inch", cpu: "A15 Bionic" },
    stock: 8
  },
  {
    id: 3,
    name: "Xiaomi Redmi Note 13",
    brand: "Xiaomi",
    type: "Mobile",
    price: 38000,
    storage: ["128GB"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Green", hex: "#2d6a4f" }
    ],
    images: [
      "assets/Products_images/Xiaomi-Redmi-Note-13-1.jpg",
      "assets/Products_images/Xiaomi-Redmi-Note-13-2.jpg",
      "assets/Products_images/Xiaomi-Redmi-Note-13-3.jpg"
    ],
    specs: { ram: "8GB", battery: "5000mAh", screen: "6.7 inch", cpu: "Octa-core" },
    stock: 20
  },
  {
    id: 4,
    name: "Dell Inspiron 15",
    brand: "Dell",
    type: "Laptop",
    price: 95000,
    storage: ["512GB SSD"],
    colors: [
      { name: "Silver", hex: "#c0c0c0" }
    ],
    images: [
      "assets/Products_images/Dell-Inspiron-15-1.jpg",
      "assets/Products_images/Dell-Inspiron-15-2.jpg",
      "assets/Products_images/Dell-Inspiron-15-3.jpg"
    ],
    specs: { ram: "16GB", battery: "54Wh", screen: "15.6 inch", cpu: "Intel i5" },
    stock: 7
  },
  {
    id: 5,
    name: "HP Pavilion 14",
    brand: "HP",
    type: "Laptop",
    price: 110000,
    storage: ["512GB SSD"],
    colors: [
      { name: "Blue", hex: "#2d5fa6" }
    ],
    images: [
      "assets/Products_images/HP-Pavilion-14-1.jpg",
      "assets/Products_images/HP-Pavilion-14-2.jpg",
      "assets/Products_images/HP-Pavilion-14-3.jpg"
    ],
    specs: { ram: "16GB", battery: "43Wh", screen: "14 inch", cpu: "Intel i7" },
    stock: 5
  },
  {
    id: 6,
    name: "Lenovo IdeaPad 3",
    brand: "Lenovo",
    type: "Laptop",
    price: 78000,
    storage: ["256GB SSD"],
    colors: [
      { name: "Grey", hex: "#6b7280" }
    ],
    images: [
      "assets/Products_images/Lenovo-IdeaPad-3-1.jpg",
      "assets/Products_images/Lenovo-IdeaPad-3-2.jpg",
      "assets/Products_images/Lenovo-IdeaPad-3-3.jpg"
    ],
    specs: { ram: "8GB", battery: "38Wh", screen: "15.6 inch", cpu: "Ryzen 5" },
    stock: 10
  },
  {
    id: 7,
    name: "Samsung Galaxy Tab A9",
    brand: "Samsung",
    type: "Tablet",
    price: 52000,
    storage: ["64GB"],
    colors: [
      { name: "Gray", hex: "#9ca3af" }
    ],
    images: [
      "assets/Products_images/Samsung-Galaxy-Tab-A9-1.jpg",
      "assets/Products_images/Samsung-Galaxy-Tab-A9-2.jpg",
      "assets/Products_images/Samsung-Galaxy-Tab-A9-3.jpg"
    ],
    specs: { ram: "4GB", battery: "7040mAh", screen: "10.5 inch", cpu: "Octa-core" },
    stock: 9
  },
  {
    id: 8,
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    type: "Accessories",
    price: 18000,
    storage: [],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    images: [
      "assets/Products_images/Logitech-MX-Master-3S-1.jpg",
      "assets/Products_images/Logitech-MX-Master-3S-2.jpg",
      "assets/Products_images/Logitech-MX-Master-3S-3.jpg"
    ],
    specs: { type: "Mouse", connection: "Wireless", dpi: "8000dpi" },
    stock: 25
  },
  {
    id: 9,
    name: "Samsung Galaxy S23",
    brand: "Samsung",
    type: "Mobile",
    price: 135000,
    storage: ["128GB", "256GB"],
    colors: [
      { name: "Phantom Black", hex: "#1a1a2e" },
      { name: "Cream", hex: "#f5f0e8" }
    ],
    images: [
      "assets/Products_images/Samsung-Galaxy-S23-1.jpg",
      "assets/Products_images/Samsung-Galaxy-S23-2.jpg",
      "assets/Products_images/Samsung-Galaxy-S23-3.jpg"
    ],
    specs: { ram: "8GB", battery: "3900mAh", screen: "6.1 inch", cpu: "Snapdragon 8 Gen 2" },
    stock: 6
  },
  {
    id: 10,
    name: "iPhone 15 Pro",
    brand: "Apple",
    type: "Mobile",
    price: 215000,
    storage: ["256GB", "512GB"],
    colors: [
      { name: "Natural Titanium", hex: "#c8bfb0" },
      { name: "Black Titanium", hex: "#2c2c2e" }
    ],
    images: [
      "assets/Products_images/iPhone-15-Pro-1.jpg",
      "assets/Products_images/iPhone-15-Pro-2.jpg",
      "assets/Products_images/iPhone-15-Pro-3.jpg"
    ],
    specs: { ram: "8GB", battery: "3274mAh", screen: "6.1 inch", cpu: "A17 Pro" },
    stock: 4
  },
  {
    id: 11,
    name: "Xiaomi 13T",
    brand: "Xiaomi",
    type: "Mobile",
    price: 72000,
    storage: ["256GB"],
    colors: [
      { name: "Alpine Blue", hex: "#5b8db8" },
      { name: "Black", hex: "#1a1a1a" }
    ],
    images: [
      "assets/Products_images/xiaomi-13t-1.jpg",
      "assets/Products_images/xiaomi-13t-2.jpg",
      "assets/Products_images/xiaomi-13t-3.jpg"
    ],
    specs: { ram: "12GB", battery: "5000mAh", screen: "6.67 inch", cpu: "Dimensity 8200" },
    stock: 14
  },
  {
    id: 12,
    name: "Dell XPS 13",
    brand: "Dell",
    type: "Laptop",
    price: 185000,
    storage: ["512GB SSD"],
    colors: [
      { name: "Platinum Silver", hex: "#e2e2e2" }
    ],
    images: [
      "assets/Products_images/Dell-XPS-13-1.jpg",
      "assets/Products_images/Dell-XPS-13-2.jpg",
      "assets/Products_images/Dell-XPS-13-3.jpg"
    ],
    specs: { ram: "16GB", battery: "57Wh", screen: "13.4 inch", cpu: "Intel i7" },
    stock: 3
  },
  {
    id: 13,
    name: "Lenovo ThinkPad E14",
    brand: "Lenovo",
    type: "Laptop",
    price: 125000,
    storage: ["512GB SSD"],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    images: [
      "assets/Products_images/Lenovo-ThinkPad-E14-1.jpg",
      "assets/Products_images/Lenovo-ThinkPad-E14-2.jpg",
      "assets/Products_images/Lenovo-ThinkPad-E14-3.jpg"
    ],
    specs: { ram: "16GB", battery: "57Wh", screen: "14 inch", cpu: "Ryzen 7" },
    stock: 0
  },
  {
    id: 14,
    name: "iPad 10th Gen",
    brand: "Apple",
    type: "Tablet",
    price: 98000,
    storage: ["64GB", "256GB"],
    colors: [
      { name: "Silver", hex: "#e3e4e6" },
      { name: "Pink", hex: "#f4a7b9" },
      { name: "Blue", hex: "#4a90d9" }
    ],
    images: [
      "assets/Products_images/iPad-10th-Gen-1.jpg",
      "assets/Products_images/iPad-10th-Gen-2.jpg",
      "assets/Products_images/iPad-10th-Gen-3.jpg"
    ],
    specs: { ram: "4GB", battery: "28.65Wh", screen: "10.9 inch", cpu: "A14 Bionic" },
    stock: 11
  },
  {
    id: 15,
    name: "Xiaomi Pad 6",
    brand: "Xiaomi",
    type: "Tablet",
    price: 61000,
    storage: ["128GB", "256GB"],
    colors: [
      { name: "Blue", hex: "#7cb4c9" },
      { name: "Champagne", hex: "#d4a96a" }
    ],
    images: [
      "assets/Products_images/xiaomi-pad-6-1.jpg",
      "assets/Products_images/xiaomi-pad-6-2.jpg",
      "assets/Products_images/xiaomi-pad-6-3.jpg"
    ],
    specs: { ram: "6GB", battery: "8840mAh", screen: "11 inch", cpu: "Snapdragon 870" },
    stock: 7
  },
  {
    id: 16,
    name: "HP Wireless Keyboard & Mouse",
    brand: "HP",
    type: "Accessories",
    price: 6500,
    storage: [],
    colors: [
      { name: "Black", hex: "#1a1a1a" }
    ],
    images: [
      "assets/Products_images/HP-Wireless-Keyboard-Mouse-1.jpg",
      "assets/Products_images/HP-Wireless-Keyboard-Mouse-2.jpg",
      "assets/Products_images/HP-Wireless-Keyboard-Mouse-3.jpg"
    ],
    specs: { type: "Keyboard + Mouse", connection: "Wireless", battery: "AAA" },
    stock: 30
  }
];
