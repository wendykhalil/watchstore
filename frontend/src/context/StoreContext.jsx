import { createContext, useContext, useState, useCallback } from 'react';
import { PRODUCTS, MOCK_ORDERS } from '../data/mockData';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [lastOrder, setLastOrder] = useState(null);

  const addToCart = useCallback((productId, color, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) => i.productId === productId ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { productId, quantity: qty, selectedColor: color }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQty = useCallback((productId, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.productId !== productId));
    } else {
      setCart((prev) => prev.map((i) => i.productId === productId ? { ...i, quantity: qty } : i));
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  }, []);

  const getProduct = useCallback((id) => products.find((p) => p.id === id), [products]);

  const featuredProducts = products.filter((p) => p.featured);

  const filteredProducts = products
    .filter((p) => {
      const matchCategory = filterCategory === 'All' || p.category === filterCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  const cartTotal = cart.reduce((sum, item) => {
    const p = getProduct(item.productId);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const createOrder = useCallback((customerData) => {
    // Generate unique order ID
    const orderNum = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    const orderId = `VT-2026-${orderNum}`;
    
    // Build order items
    const orderItems = cart.map((item) => {
      const product = getProduct(item.productId);
      return {
        productId: item.productId,
        productName: product?.name,
        quantity: item.quantity,
        price: product?.price || 0,
        color: item.selectedColor,
      };
    });

    // Create order object
    const newOrder = {
      id: orderId,
      customer: {
        name: customerData.fullName,
        phone: customerData.phone,
        address: customerData.address,
        city: customerData.city,
        note: customerData.note || '',
      },
      items: orderItems,
      total: cartTotal,
      paymentMethod: 'cash_on_delivery',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Add to orders list
    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);

    // Clear cart
    setCart([]);
    setCheckoutOpen(false);
    setCartOpen(false);

    return newOrder;
  }, [cart, getProduct, cartTotal]);

  return (
    <StoreContext.Provider
      value={{
        products, setProducts,
        cart, addToCart, removeFromCart, updateQty, clearCart,
        cartTotal, cartCount,
        favorites, toggleFavorite,
        cartOpen, setCartOpen,
        favoritesOpen, setFavoritesOpen,
        searchOpen, setSearchOpen,
        searchQuery, setSearchQuery,
        selectedProduct, setSelectedProduct,
        filterCategory, setFilterCategory,
        sortBy, setSortBy,
        filteredProducts, featuredProducts, getProduct,
        checkoutOpen, setCheckoutOpen,
        orders, createOrder, lastOrder, setLastOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
