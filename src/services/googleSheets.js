import Papa from 'papaparse';

// Helper to fetch and parse CSV
const fetchCSV = async (url) => {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

// MOCK DATA FOR DEVELOPMENT (Fallback)
const MOCK_SHOPS = [
  {
    id: '1',
    name: 'Tech Store',
    slug: 'tech-store',
    logo_url: 'https://placehold.co/100x100/3b82f6/white?text=Tech',
    contact_info: 'contact@tech.com',
    phone_number: '9944513415',
    theme_color: '#3b82f6',
    product_sheet_id: 'mock-sheet-1',
  },
  {
    id: '2',
    name: 'Home Decor',
    slug: 'home-decor',
    logo_url: 'https://placehold.co/100x100/ef4444/white?text=Home',
    contact_info: 'hello@homedecor.com',
    phone_number: '9788545102',
    theme_color: '#ef4444',
    product_sheet_id: 'mock-sheet-2',
  },
];

const MOCK_PRODUCTS = {
  'mock-sheet-1': [
    { id: '101', name: 'Wireless Mouse', price: '25.00', category: 'Electronics', image_url: 'https://placehold.co/300x300?text=Mouse', stock: '50' },
    { id: '102', name: 'Mechanical Keyboard', price: '120.00', category: 'Electronics', image_url: 'https://placehold.co/300x300?text=Keyboard', stock: '20' },
    { id: '103', name: 'Monitor 27"', price: '300.00', category: 'Electronics', image_url: 'https://placehold.co/300x300?text=Monitor', stock: '10' },
  ],
  'mock-sheet-2': [
    { id: '201', name: 'Modern Lamp', price: '45.00', category: 'Lighting', image_url: 'https://placehold.co/300x300?text=Lamp', stock: '15' },
    { id: '202', name: 'Vase', price: '20.00', category: 'Decor', image_url: 'https://placehold.co/300x300?text=Vase', stock: '30' },
  ]
};

export const getShops = async () => {
  const sheetUrl = import.meta.env.VITE_MASTER_SHEET_URL;
  
  if (sheetUrl) {
    try {
      return await fetchCSV(sheetUrl);
    } catch (error) {
      console.error("Error fetching master sheet:", error);
      return [];
    }
  }
  
  // Fallback to mock data if no URL is provided
  console.warn("No VITE_MASTER_SHEET_URL found, using mock data.");
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_SHOPS;
};

export const getShopProducts = async (sheetId) => {
  if (!sheetId) return [];

  // Check if it's a mock ID
  if (sheetId.startsWith('mock-sheet-')) {
     await new Promise(resolve => setTimeout(resolve, 500));
     return MOCK_PRODUCTS[sheetId] || [];
  }

  // Assuming sheetId is a full URL or a Google Sheet ID. 
  // If it's just an ID, we need to construct the URL.
  // For simplicity, let's assume the Master Sheet contains the FULL CSV URL for each shop's product sheet.
  // OR, if it's just the ID, we construct it:
  
  let url = sheetId;
  if (!url.startsWith('http')) {
      url = `https://docs.google.com/spreadsheets/d/${sheetId}/pub?output=csv`;
  }

  try {
    return await fetchCSV(url);
  } catch (error) {
    console.error("Error fetching product sheet:", error);
    return [];
  }
};
