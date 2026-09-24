import { createContext, useContext, useState } from 'react';
import { PRODUCTS, MOCK_ORDERS, MOCK_CUSTOMERS } from '../data/mockData';

const AdminContext = createContext(null);

const DEFAULT_HERO = {
  headline: 'Time, Reimagined.',
  subline: 'Where Swiss precision meets contemporary design. Each Verdant Time piece is crafted for those who understand that time is everything.',
  ctaPrimary: 'Explore Collection',
  ctaSecondary: 'Discover Our Story',
  bgImage: 'https://images.unsplash.com/photo-1670177257750-9b47927f68eb?w=900&h=1100&fit=crop&auto=format',
};

export function AdminProvider({ children }) {
  const [view, setView] = useState('dashboard');
  const [products, setProducts] = useState(PRODUCTS);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [customers] = useState(MOCK_CUSTOMERS);
  const [heroSettings, setHeroSettings] = useState(DEFAULT_HERO);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addProduct = (p) => setProducts((prev) => [p, ...prev]);

  const updateProduct = (id, updates) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));

  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const toggleFeatured = (id) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p)));

  const updateOrderStatus = (id, status) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));

  return (
    <AdminContext.Provider
      value={{
        view, setView,
        products, addProduct, updateProduct, deleteProduct, toggleFeatured,
        orders, updateOrderStatus,
        customers,
        heroSettings, setHeroSettings,
        sidebarOpen, setSidebarOpen,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
