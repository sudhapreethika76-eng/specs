import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/style/Home.css';
import { useSmoothScroll } from './SmoothScroll.jsx';

// Local high-res product photography from assets
import heroImg from '../assets/images/hero.png';
import p1Img from '../assets/images/p1.png';
import p2Img from '../assets/images/p2.png';
import p3Img from '../assets/images/p3.png';
import p4Img from '../assets/images/p4.png';
import p6Img from '../assets/images/p6.png';
import p7Img from '../assets/images/p7.png';
import p8Img from '../assets/images/p8.png';
import p9Img from '../assets/images/p9.png';
import p10Img from '../assets/images/p10.png';
import p11Img from '../assets/images/p11.png';
import p13Img from '../assets/images/p13.png';
import s1Img from '../assets/images/s1.png';
import s2Img from '../assets/images/s2.jpg';
import b1Img from '../assets/images/b1.jpg';
import campaignHeroImg from '../assets/images/campaign_hero.png';

// Fallback high-res editorial visual of fashion model wearing sunglasses
const EDITORIAL_MODEL_IMG = 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1600&q=85';
const LEATHER_CASE_IMG = 'https://images.unsplash.com/photo-1589782183750-6a75168e3f42?auto=format&fit=crop&w=1000&q=85';

export default function Home() {
  const lenis = useSmoothScroll();

  // Navigation & Scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // E-commerce interactive states
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'The Heritage Tortoise',
      category: 'Acetate Classics',
      price: 6499,
      image: p6Img,
      color: 'Dark Tortoise',
      quantity: 1,
    }
  ]);
  const [wishlist, setWishlist] = useState([2, 6]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeDeckIndex, setActiveDeckIndex] = useState(0);
  const [selectedFinishes, setSelectedFinishes] = useState({});
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedQuickView, setSelectedQuickView] = useState(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [newsletterFeedback, setNewsletterFeedback] = useState('');

  // Initializing AOS scroll animations
  useEffect(() => {
    AOS.init({
      duration: 850,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      once: false,
      offset: 70,
      delay: 50,
    });
  }, []);

  // Listen for scroll to toggle navbar ivory background and sync animations
  useEffect(() => {
    if (lenis) {
      const handleLenisScroll = (e) => {
        setIsScrolled(e.scroll > 40);
        AOS.refresh();
      };
      lenis.on('scroll', handleLenisScroll);
      return () => {
        lenis.off('scroll', handleLenisScroll);
      };
    } else {
      const handleScroll = () => {
        if (window.scrollY > 40) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [lenis]);

  // Refresh AOS when filters or toggles change
  useEffect(() => {
    AOS.refresh();
  }, [activeCategoryFilter, showAllProducts]);

  // Trigger brief toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3200);
  };

  // Product Data
  // Product Data with Studio Lighting Tones & Ratings matching reference
  const products = [
    {
      id: 8,
      name: 'The Havana Sun – Spotted Acetate',
      category: 'Polarized Sunglasses',
      type: 'sunglasses',
      price: 6499,
      rating: 4.8,
      image: p11Img,
      badge: 'Best Seller',
      studioTone: 'Warm Cognac',
      bgGradient: 'linear-gradient(145deg, #DE9C68 0%, #C47F4C 50%, #9F5F32 100%)',
      description: 'Upgrade your signature style with our best-selling curved round silhouette in rich spotted Havana acetate, paired with gradient G-15 polarized sun lenses. Crafted for all-day comfort and distinction.',
      dimensions: '49-22-145 mm',
      colors: [
        { name: 'Spotted Havana', hex: '#5E3A1A' },
        { name: 'Honey Blond', hex: '#C1883F' },
        { name: 'Olive Acetate', hex: '#484A3B' }
      ],
      selectedColor: 'Spotted Havana'
    },
    {
      id: 1,
      name: 'The Heritage Tortoise – Forest Lens',
      category: 'Acetate Classics',
      type: 'sunglasses',
      price: 6499,
      rating: 4.9,
      image: p6Img,
      badge: 'Popular',
      studioTone: 'Muted Olive',
      bgGradient: 'linear-gradient(145deg, #B2BCAC 0%, #98A392 50%, #7D8877 100%)',
      description: 'Hand-polished Italian cellulose acetate with mineral glass polarized lenses in dark forest green. Tailored for all-day comfort and timeless distinction.',
      dimensions: '50-21-145 mm',
      colors: [
        { name: 'Dark Tortoise', hex: '#4A2E18' },
        { name: 'Honey Amber', hex: '#A86C32' },
        { name: 'Piano Black', hex: '#1B1B19' }
      ],
      selectedColor: 'Dark Tortoise'
    },
    {
      id: 2,
      name: 'The Minimal Titanium – Champagne',
      category: 'Titanium Frames',
      type: 'titanium',
      price: 7999,
      rating: 4.9,
      image: p2Img,
      badge: 'New Arrival',
      studioTone: 'Travertine Ivory',
      bgGradient: 'linear-gradient(145deg, #EBE6DC 0%, #DDD5C7 50%, #C7BCAB 100%)',
      description: 'Sculpted from ultra-pure Japanese beta-titanium. Ultra featherlight weight with an architectural geometric crown and brushed rose gold finish.',
      dimensions: '51-18-142 mm',
      colors: [
        { name: 'Champagne Rose Gold', hex: '#D4AF8B' },
        { name: 'Brushed Silver', hex: '#D6D6D6' },
        { name: 'Matte Charcoal', hex: '#2A2A28' }
      ],
      selectedColor: 'Champagne Rose Gold'
    },
    {
      id: 3,
      name: 'The Classic Aviator – Brushed Gold',
      category: 'Signature Classics',
      type: 'optical',
      price: 6499,
      rating: 4.8,
      image: p3Img,
      badge: 'Timeless',
      studioTone: 'Warm Terracotta',
      bgGradient: 'linear-gradient(145deg, #D49079 0%, #BA735D 50%, #9E5642 100%)',
      description: 'A refined double-bridge aviator crafted in warm brushed gold with handcrafted acetate temple tips. Designed for effortless comfort and distinguished appeal.',
      dimensions: '54-16-145 mm',
      colors: [
        { name: 'Polished Gold', hex: '#B49A78' },
        { name: 'Antique Bronze', hex: '#7D6A52' },
        { name: 'Obsidian Black', hex: '#1B1B19' }
      ],
      selectedColor: 'Polished Gold'
    },
    {
      id: 7,
      name: 'The Noir Polarized – Onyx Black',
      category: 'Polarized Sunglasses',
      type: 'sunglasses',
      price: 6999,
      rating: 4.9,
      image: p10Img,
      badge: 'Best Seller',
      studioTone: 'Cool Slate',
      bgGradient: 'linear-gradient(145deg, #CBD5DC 0%, #ACB9C2 50%, #8D9BA6 100%)',
      description: 'Monochromatic black silhouette with UV400 category 3 polarized lenses for maximum glare protection. Crisp, bold profile suited for every occasion.',
      dimensions: '51-20-145 mm',
      colors: [
        { name: 'Charcoal Black', hex: '#1B1B19' },
        { name: 'Matte Espresso', hex: '#2F2620' }
      ],
      selectedColor: 'Charcoal Black'
    },
    {
      id: 4,
      name: 'The Modern Square – Gloss Charcoal',
      category: 'Acetate Classics',
      type: 'optical',
      price: 4999,
      rating: 4.7,
      image: p4Img,
      badge: 'Signature',
      studioTone: 'Modern Sand',
      bgGradient: 'linear-gradient(145deg, #E2DAD0 0%, #CFC4B7 50%, #B8AC9D 100%)',
      description: 'Clean architectural lines in custom-cast black acetate with silver-plated five-barrel hinges for effortless balance and durability.',
      dimensions: '52-19-145 mm',
      colors: [
        { name: 'Gloss Charcoal', hex: '#1B1B19' },
        { name: 'Deep Tortoise', hex: '#3B271A' },
        { name: 'Smoky Slate', hex: '#4F5357' }
      ],
      selectedColor: 'Gloss Charcoal'
    },
    {
      id: 5,
      name: 'The Everyday Optical – Clear Crystal',
      category: 'Blue-light Lenses',
      type: 'optical',
      price: 5499,
      rating: 4.8,
      image: p7Img,
      badge: 'Top Rated',
      studioTone: 'Crystal Atelier',
      bgGradient: 'linear-gradient(145deg, #F3F1EC 0%, #E5E1D8 50%, #D1CBC0 100%)',
      description: 'Luminous crystal-clear acetate frame fitted with premium zero-glare blue-light filtering lenses. Ideal for everyday digital work and reading.',
      dimensions: '49-20-145 mm',
      colors: [
        { name: 'Clear Crystal', hex: '#ECEAE4' },
        { name: 'Champagne Tint', hex: '#E2D7C5' },
        { name: 'Smoked Quartz', hex: '#6D675E' }
      ],
      selectedColor: 'Clear Crystal'
    },
    {
      id: 6,
      name: 'The Signature Round – Brushed Gold',
      category: 'Titanium Frames',
      type: 'titanium',
      price: 7999,
      rating: 4.9,
      image: p9Img,
      badge: 'Iconic',
      studioTone: 'Desert Amber',
      bgGradient: 'linear-gradient(145deg, #E8D2B7 0%, #D5BC9D 50%, #BEA07E 100%)',
      description: 'Timeless circular silhouette in featherlight Japanese titanium with delicate filigree bridge detailing and warm gold luster.',
      dimensions: '48-21-140 mm',
      colors: [
        { name: 'Champagne Gold', hex: '#B49A78' },
        { name: 'Brushed Ruthenium', hex: '#88847C' },
        { name: 'Rose Gold', hex: '#C99E82' }
      ],
      selectedColor: 'Champagne Gold'
    }
  ];

  // Category cards data (5 categories matching prompt specifications)
  const categories = [
    {
      id: 'cat-1',
      title: 'Acetate Classics',
      description: 'Bold style. Lasting quality.',
      image: p1Img,
      filter: 'all',
      tag: 'Cured Italian Acetate',
      gridSpan: 'editorial-large'
    },
    {
      id: 'cat-2',
      title: 'Titanium Frames',
      description: 'Lightweight. Strong. Timeless.',
      image: p2Img,
      filter: 'titanium',
      tag: 'Japanese Beta-Titanium',
      gridSpan: 'editorial-large'
    },
    {
      id: 'cat-3',
      title: 'Polarized Sunglasses',
      description: 'Clarity for brighter days.',
      image: p10Img,
      filter: 'sunglasses',
      tag: '100% UV400 Glare Reduction',
      gridSpan: 'editorial-standard'
    },
    {
      id: 'cat-4',
      title: 'Blue-light Lenses',
      description: 'Modern eyewear for everyday screen use.',
      image: p7Img,
      filter: 'optical',
      tag: 'Digital Screen Defense',
      gridSpan: 'editorial-standard'
    },
    {
      id: 'cat-5',
      title: 'Havana Sunglasses',
      description: 'Classic round silhouette in rich spotted Havana acetate.',
      image: p11Img,
      filter: 'sunglasses',
      tag: 'Spotted Havana Acetate',
      gridSpan: 'editorial-standard'
    }
  ];

  // Client testimonials (3 simple clients as requested)
  const testimonials = [
    {
      id: 1,
      name: 'Arjun R',
      city: 'Chennai',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      rating: 5,
      review: 'Lightweight titanium frames and crystal-clear lenses. Very comfortable for all-day daily wear.'
    },
    {
      id: 2,
      name: 'Meena S',
      city: 'Hyderabad',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
      rating: 5,
      review: 'The polarized lenses cut all glare and the fit is perfect. Elegant style with true premium quality.'
    },
    {
      id: 3,
      name: 'Vikram M',
      city: 'Bangalore',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
      rating: 5,
      review: 'Sturdy, comfortable acetate glasses with remarkable craftsmanship. Smooth delivery and lovely case.'
    }
  ];

  // Wishlist toggle
  const toggleWishlist = (productId, productName) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast(`Removed ${productName} from your wishlist`);
    } else {
      setWishlist([...wishlist, productId]);
      showToast(`Saved ${productName} to your wishlist`);
    }
  };

  // Add to cart
  const addToCart = (product, customColor = null) => {
    const chosenColor = customColor || product.selectedColor || product.colors[0].name;
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id && item.color === chosenColor);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id && item.color === chosenColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            color: chosenColor,
            quantity: 1
          }
        ];
      }
    });
    showToast(`Added ${product.name} to shopping bag`);
    setIsCartOpen(true);
  };

  // Update quantity in cart
  const updateCartQuantity = (productId, color, delta) => {
    setCart(prevCart =>
      prevCart
        .map(item => {
          if (item.id === productId && item.color === color) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Cart Subtotal
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 7500;
  const freeShippingDifference = freeShippingThreshold - cartSubtotal;

  // Newsletter submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setNewsletterStatus('error');
      setNewsletterFeedback('Please enter a valid email address.');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterFeedback('Welcome to FRAME HOUSE. You are now subscribed to our private salon updates.');
    setNewsletterEmail('');
    showToast('Subscription confirmed. Welcome to FRAME HOUSE.');
  };

  // Filtering products
  const filteredProducts = products.filter(product => {
    const matchesFilter =
      activeCategoryFilter === 'all' ||
      (activeCategoryFilter === 'sunglasses' && product.type === 'sunglasses') ||
      (activeCategoryFilter === 'optical' && product.type === 'optical') ||
      (activeCategoryFilter === 'titanium' && product.type === 'titanium') ||
      (activeCategoryFilter === 'acetate' && product.category.toLowerCase().includes('acetate'));

    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesFilter && matchesSearch;
  });

  // Calculate safe deck index & active product for 3D showcase
  const safeDeckIndex = filteredProducts.length > 0
    ? ((activeDeckIndex % filteredProducts.length) + filteredProducts.length) % filteredProducts.length
    : 0;

  const activeProduct = filteredProducts[safeDeckIndex] || products[0];
  const currentFinish = selectedFinishes[activeProduct.id] || activeProduct.selectedColor || (activeProduct.colors && activeProduct.colors[0]?.name) || '';

  // Simple, elegant 1-line product summaries for clean spotlight display
  const getSimpleSummary = (product) => {
    if (!product) return 'Handcrafted designer eyewear.';
    const summaries = {
      8: 'Curved round silhouette in rich Italian acetate with polarized sun lenses.',
      1: 'Hand-polished cellulose acetate with mineral glass polarized lenses.',
      2: 'Sculpted from Japanese beta-titanium with featherlight all-day comfort.',
      3: 'Refined double-bridge aviator in warm brushed gold with acetate tips.',
      7: 'Monochromatic black profile with UV400 polarized clarity for every sunny day.',
      4: 'Clean architectural lines in custom acetate with five-barrel hinges.',
      5: 'Crystal-clear acetate frame with zero-glare blue-light filtering lenses.',
      6: 'Circular silhouette in featherlight titanium with delicate bridge filigree.'
    };
    return summaries[product.id] || (product.description ? product.description.split('.')[0] + '.' : 'Handcrafted designer eyewear.');
  };
  // 5 slots for cascading 3D fan-out deck (slot 0 is active front card, -1, -2, -3, -4 fan out behind to the left)
  const deckSlots = [-4, -3, -2, -1, 0].map(slot => {
    if (filteredProducts.length === 0) return null;
    const itemIndex = ((safeDeckIndex + slot) % filteredProducts.length + filteredProducts.length) % filteredProducts.length;
    return {
      slot,
      itemIndex,
      product: filteredProducts[itemIndex]
    };
  }).filter(Boolean);

  const displayedProducts = showAllProducts ? filteredProducts : filteredProducts.slice(0, 6);

  // Smooth scroll helper using Lenis with native fallback
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      if (lenis) {
        lenis.scrollTo(element, {
          offset: -80,
          duration: 1.2,
        });
      } else {
        const navOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Category selection handler
  const handleCategorySelect = (category, index) => {
    setActiveCategoryIndex(index);
    if (category.filter) {
      setActiveCategoryFilter(category.filter);
    }
    scrollToSection('signature-collection');
    showToast(`Viewing ${category.title} collection`);
  };

  return (
    <div className="framehouse-page">
      {/* =========================================================================
          3. NAVIGATION BAR
      ========================================================================= */}
      <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
        <div className="navbar-container">
          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open-1' : ''}`}></span>
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open-2' : ''}`}></span>
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open-3' : ''}`}></span>
          </button>

          {/* Left: Brand Logo */}
          <div className="navbar-brand">
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
              <span className="brand-logo-text">FRAME HOUSE</span>
            </a>
          </div>

          {/* Center: Navigation Links */}
          <nav className={`navbar-nav ${mobileMenuOpen ? 'nav-mobile-active' : ''}`}>
            <ul className="nav-links">
              <li>
                <button
                  type="button"
                  className="nav-link-btn"
                  onClick={() => scrollToSection('hero')}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-link-btn"
                  onClick={() => {
                    setActiveCategoryFilter('optical');
                    scrollToSection('signature-collection');
                  }}
                >
                  Eyeglasses
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-link-btn"
                  onClick={() => {
                    setActiveCategoryFilter('sunglasses');
                    scrollToSection('signature-collection');
                  }}
                >
                  Sunglasses
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-link-btn"
                  onClick={() => scrollToSection('shop-by-category')}
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-link-btn"
                  onClick={() => scrollToSection('shop-by-category')}
                >
                  Accessories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-link-btn"
                  onClick={() => scrollToSection('our-story')}
                >
                  Our Story
                </button>
              </li>
            </ul>

            {mobileMenuOpen && (
              <div className="mobile-menu-footer">
                <div className="mobile-menu-info">
                  <p>Maison Flagship Salon</p>
                  <span>Atelier Mumbai & New Delhi</span>
                </div>
                <div className="mobile-menu-lang">
                  <span>INR (₹) · India</span>
                </div>
              </div>
            )}
          </nav>

          {/* Right: Interactive Utility Icons */}
          <div className="navbar-actions">
            {/* Search Icon */}
            <button
              type="button"
              className="action-icon-btn"
              aria-label="Search collection"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Wishlist Icon with count */}
            <button
              type="button"
              className="action-icon-btn wishlist-btn"
              aria-label="Wishlist"
              onClick={() => setIsWishlistOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlist.length > 0 && (
                <span className="badge-count wishlist-count">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Bag Icon with count */}
            <button
              type="button"
              className="action-icon-btn bag-btn"
              aria-label="Shopping bag"
              onClick={() => setIsCartOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartTotalItems > 0 && (
                <span className="badge-count bag-count">{cartTotalItems}</span>
              )}
            </button>
          </div>
        </div>

        {/* Slide-down Search Bar Overlay */}
        {isSearchOpen && (
          <div className="search-overlay-bar">
            <div className="search-bar-inner">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Search styles, acetate, polarized lenses, titanium..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                className="search-close-btn"
                onClick={() => setIsSearchOpen(false)}
              >
                ✕
              </button>
            </div>
            {searchQuery && (
              <div className="search-hint">
                Showing results in Signature Collection below ({filteredProducts.length} frames found)
              </div>
            )}
          </div>
        )}
      </header>

      <main>
        {/* =========================================================================
            4. HERO SECTION
        ========================================================================= */}
        {/* =========================================================================
            4. HERO SECTION (FULL DESKTOP CANVAS BACKGROUND)
        ========================================================================= */}
        <section id="hero" className="hero-section hero-full-canvas">
          {/* Full Desktop Hero Background Image */}
          <div className="hero-bg-layer">
            <img
              src={heroImg}
              alt="FRAME HOUSE Luxury Eyewear on Travertine Pedestals"
              className="hero-bg-image"
              loading="eager"
            />
            <div className="hero-bg-overlay"></div>
          </div>

          <div className="hero-full-container">
            {/* Left Content Overlay */}
            <div className="hero-left-editorial" data-aos="fade-right" data-aos-duration="1000">
              <h1 className="hero-full-heading">
                See More<br />
                Live <span className="handwritten-word">Brighter</span>
              </h1>

              <p className="hero-full-description">
                Simple frames. Everyday comfort.<br />
                Made for wherever life takes you.
              </p>

              <div className="hero-full-actions">
                <button
                  type="button"
                  className="btn-hero-pill"
                  onClick={() => scrollToSection('signature-collection')}
                >
                  Shop the Collection <span className="pill-arrow">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Minimalist scroll down indicator */}
          <div className="scroll-indicator" onClick={() => scrollToSection('shop-by-category')}>
            <span className="scroll-indicator-text">EXPLORE ATELIER</span>
            <div className="scroll-indicator-line"></div>
          </div>
        </section>

        {/* =========================================================================
            5. CATEGORY SECTION (SHOP BY CATEGORY - ARCHED SHOWCASE MODEL)
        ========================================================================= */}
        <section id="shop-by-category" className="section-padding category-section">
          <div className="container category-container">
            <div className="section-header text-center" data-aos="fade-up">
              <span className="section-sub-label">
                <span className="handwritten-badge">curated</span> · Shop By Category
              </span>
              <h2 className="section-title">
                Find Your <span className="handwritten-word">Style</span>
              </h2>
              <div className="title-gold-divider"></div>
              <p className="section-subtitle">
                Simple, lightweight frames picked for your daily look.
              </p>
            </div>

            {/* Arched 5-Card Showcase Model (Matching Reference Image) */}
            <div className="category-arch-showcase-wrapper" data-aos="fade-up" data-aos-delay="100">
              {/* Previous Category Chevron */}
              <button
                type="button"
                className="category-nav-arrow category-nav-prev"
                onClick={() => setActiveCategoryIndex((prev) => (prev - 1 + categories.length) % categories.length)}
                aria-label="Previous category"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              {/* 5-Card Arched Row */}
              <div className="category-arch-cards-row">
                {categories.map((cat, idx) => {
                  // Arch curve height & offset levels:
                  // Card 0: level-outer (lowest)
                  // Card 1: level-mid (medium)
                  // Card 2: level-center (tallest peak)
                  // Card 3: level-mid (medium)
                  // Card 4: level-outer (lowest)
                  const archLevel = idx === 2 ? 'level-center' : (idx === 1 || idx === 3) ? 'level-mid' : 'level-outer';
                  const isActive = idx === activeCategoryIndex;

                  return (
                    <div
                      key={cat.id}
                      className={`category-arch-card ${archLevel} ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleCategorySelect(cat, idx)}
                    >
                      {/* Squircle Rounded Image Box */}
                      <div className="category-arch-img-box">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="category-arch-img"
                          loading="lazy"
                        />
                      </div>

                      {/* Content Outside and Below the Image */}
                      <div className="category-arch-info">
                        <h3 className="category-arch-title">{cat.title}</h3>
                        <button
                          type="button"
                          className="category-arch-see-more"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCategorySelect(cat, idx);
                          }}
                        >
                          See More
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Next Category Chevron */}
              <button
                type="button"
                className="category-nav-arrow category-nav-next"
                onClick={() => setActiveCategoryIndex((prev) => (prev + 1) % categories.length)}
                aria-label="Next category"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* Pagination Dots at Bottom */}
            <div className="category-arch-pagination" data-aos="fade-up" data-aos-delay="200">
              {categories.map((cat, idx) => (
                <button
                  key={`dot-${cat.id}`}
                  type="button"
                  className={`category-arch-dot ${idx === activeCategoryIndex ? 'is-active' : ''}`}
                  onClick={() => setActiveCategoryIndex(idx)}
                  aria-label={`Select ${cat.title}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            OUR STORY SECTION (WHY CHOOSE US? - OVERLAPPING S1 & S2 VISUAL COLLAGE)
        ========================================================================= */}
        <section id="our-story" className="section-padding our-story-section">
          <div className="container our-story-container">
            <div className="our-story-grid">
              {/* Left Column: Narrative & Value Propositions */}
              <div className="our-story-content-col" data-aos="fade-right">
                <span className="our-story-eyebrow">
                  <span className="handwritten-badge">our promise</span> · Simple & Honest
                </span>
                <h2 className="our-story-title">
                  Why Choose <span className="handwritten-word">Us?</span>
                </h2>
                <p className="our-story-description">
                  Finding glasses should be simple and fun. We help you choose pairs that fit comfortably, feel light, and look great on you every day.
                </p>

                {/* 3 Benefit Feature Points matching the reference image */}
                <div className="our-story-features">
                  <div className="story-feature-item" data-aos="fade-up" data-aos-delay="100">
                    <div className="story-feature-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                      </svg>
                    </div>
                    <div className="story-feature-text">
                      <h4 className="story-feature-name">Free Styling Consultation</h4>
                      <p className="story-feature-desc">Get expert help to find frames suited to your face shape.</p>
                    </div>
                  </div>

                  <div className="story-feature-item" data-aos="fade-up" data-aos-delay="200">
                    <div className="story-feature-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h12l4 6-10 12L2 9l4-6z"></path>
                        <path d="M2 9h20"></path>
                        <path d="M10 21l-3-12 5-6 5 6-3 12"></path>
                      </svg>
                    </div>
                    <div className="story-feature-text">
                      <h4 className="story-feature-name">Custom-Made Eyewear</h4>
                      <p className="story-feature-desc">Tailored to your taste, prescription, and facial anatomy.</p>
                    </div>
                  </div>

                  <div className="story-feature-item" data-aos="fade-up" data-aos-delay="300">
                    <div className="story-feature-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                      </svg>
                    </div>
                    <div className="story-feature-text">
                      <h4 className="story-feature-name">Fast & Reliable Delivery</h4>
                      <p className="story-feature-desc">Right to your doorstep with luxury case protection, hassle-free.</p>
                    </div>
                  </div>
                </div>

                {/* Explore Pill Button */}
                <div className="our-story-action" data-aos="fade-up" data-aos-delay="400">
                  <button
                    type="button"
                    className="btn-story-pill"
                    onClick={() => scrollToSection('signature-collection')}
                  >
                    Explore Frames <span className="pill-arrow">→</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Overlapping s1 & s2 Asymmetric Collage */}
              <div className="our-story-images-col" data-aos="fade-left" data-aos-duration="1000">
                <div className="our-story-collage-wrap">
                  {/* Background / Main Vertical Image (s2.jpg) */}
                  <div className="story-img-main-box">
                    <img
                      src={s2Img}
                      alt="FRAME HOUSE Atelier Luxury Collection on Display Pedestals"
                      className="story-collage-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlapping Foreground Image (s1.png) */}
                  <div className="story-img-overlap-box">
                    <img
                      src={s1Img}
                      alt="Models wearing FRAME HOUSE handcrafted eyewear"
                      className="story-collage-img"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. FEATURED PRODUCTS SECTION (THE SIGNATURE COLLECTION)
        ========================================================================= */}
        <section id="signature-collection" className="section-padding products-section signature-section-format">
          <div className="container signature-container">
            {/* Top Collections Section Header matching reference image format */}
            <div className="signature-header-row" data-aos="fade-up">
              <div className="signature-header-left">
                <span className="signature-eyebrow">
                  Curated Atelier · Daily Wear
                </span>
                <h2 className="signature-main-title">
                  Top <span className="handwritten-word">Collections</span>
                </h2>
              </div>

              {/* Horizontal Filter Pill Tabs on the Right */}
              <div className="signature-filter-pills" role="tablist" aria-label="Eyewear Categories">
                <button
                  type="button"
                  className={`collection-pill-btn ${activeCategoryFilter === 'all' ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveCategoryFilter('all');
                    setActiveDeckIndex(0);
                  }}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`collection-pill-btn ${activeCategoryFilter === 'acetate' ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveCategoryFilter('acetate');
                    setActiveDeckIndex(0);
                  }}
                >
                  Acetate
                </button>
                <button
                  type="button"
                  className={`collection-pill-btn ${activeCategoryFilter === 'titanium' ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveCategoryFilter('titanium');
                    setActiveDeckIndex(0);
                  }}
                >
                  Titanium
                </button>
                <button
                  type="button"
                  className={`collection-pill-btn ${activeCategoryFilter === 'sunglasses' ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveCategoryFilter('sunglasses');
                    setActiveDeckIndex(0);
                  }}
                >
                  Polarized
                </button>
                <button
                  type="button"
                  className={`collection-pill-btn ${activeCategoryFilter === 'optical' ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveCategoryFilter('optical');
                    setActiveDeckIndex(0);
                  }}
                >
                  Optical
                </button>
                <button
                  type="button"
                  className={`collection-pill-btn pill-view-all ${showAllProducts ? 'is-active' : ''}`}
                  onClick={() => setShowAllProducts(!showAllProducts)}
                >
                  {showAllProducts ? 'Hide All' : 'View All'}
                </button>
              </div>
            </div>

            {/* Main Interactive Showcase: 3D Cascading Card Stack (Left) + Product Spotlight Details (Right) */}
            <div className="signature-showcase-grid">
              {/* Left Column: 3D Card Stack (Fanned out to left, active card in front right) */}
              <div className="signature-deck-col" data-aos="fade-right">
                <div className="deck-stage-wrapper">
                  <div className="deck-cards-container">
                    {deckSlots.map((slot) => {
                      const isFrontActive = slot.slot === 0;
                      return (
                        <div
                          key={`${slot.product.id}-${slot.slot}`}
                          className={`deck-card slot-pos-${slot.slot} ${isFrontActive ? 'is-front-active' : 'is-stacked-behind'}`}
                          style={{
                            background: slot.product.bgGradient,
                            transform: `translateX(${slot.slot * 68}px) scale(${1 + slot.slot * 0.055})`,
                            zIndex: 10 + slot.slot,
                            opacity: isFrontActive ? 1 : Math.max(0.68, 1 + slot.slot * 0.08),
                          }}
                          onClick={() => {
                            if (!isFrontActive) {
                              setActiveDeckIndex(slot.itemIndex);
                            }
                          }}
                          title={isFrontActive ? slot.product.name : `Click to view ${slot.product.name}`}
                        >
                          {/* Card Top Header: Badge only visible on the front active card */}
                          <div className="deck-card-top-bar">
                            {isFrontActive && slot.product.badge && (
                              <span className="deck-card-badge">
                                {slot.product.badge}
                              </span>
                            )}
                          </div>

                          {/* Card Photo Showcase Window - Fully visible product photography */}
                          <div className="deck-card-photo-frame">
                            <img
                              src={slot.product.image}
                              alt={slot.product.name}
                              className="deck-product-display-img"
                              loading="lazy"
                            />
                          </div>

                          {/* Card Subtle Bottom Tag */}
                          <div className="deck-card-caption">
                            <span className="deck-caption-title">{slot.product.name.split('–')[0]}</span>
                            <span className="deck-caption-price">₹{slot.product.price.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Deck Navigation Controls (Arrows + Dots) */}
                <div className="deck-navigation-bar">
                  <button
                    type="button"
                    className="deck-nav-btn"
                    onClick={() => setActiveDeckIndex(prev => prev - 1)}
                    aria-label="Previous model in deck"
                  >
                    ←
                  </button>
                  <div className="deck-nav-dots">
                    {filteredProducts.map((p, pIdx) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`deck-dot-indicator ${pIdx === safeDeckIndex ? 'is-active-dot' : ''}`}
                        onClick={() => setActiveDeckIndex(pIdx)}
                        aria-label={`Select model ${p.name}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="deck-nav-btn"
                    onClick={() => setActiveDeckIndex(prev => prev + 1)}
                    aria-label="Next model in deck"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Right Column: Product Spotlight Details (Simple, elegant layout) */}
              <div className="signature-details-col" data-aos="fade-left">
                <div className="spotlight-card-content">
                  {/* Clean Eyebrow Category */}
                  <div className="spotlight-badge-row">
                    <span className="spotlight-category-chip">{activeProduct.category}</span>
                    <span className="spotlight-divider-dot">·</span>
                    <span className="spotlight-series-tag">Frame {activeProduct.dimensions}</span>
                  </div>

                  {/* Clean Main Title */}
                  <h3 className="spotlight-title">
                    {activeProduct.name.split('–')[0].trim()}
                  </h3>

                  {/* Elegant Handwritten Finish Subtitle */}
                  {activeProduct.name.includes('–') && (
                    <div className="spotlight-edition-tag">
                      <span className="handwritten-word">{activeProduct.name.split('–')[1].trim()}</span> Edition
                    </div>
                  )}

                  {/* Clean Rating Row */}
                  <div className="spotlight-rating-wrap">
                    <div className="spotlight-star-icons" aria-label={`${activeProduct.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, sIdx) => (
                        <span key={sIdx} className="rating-star">★</span>
                      ))}
                    </div>
                    <span className="spotlight-rating-score">
                      <strong className="rating-num">{activeProduct.rating}</strong>
                      <span className="rating-dot">·</span>
                      <span className="rating-tag">Handcrafted Atelier</span>
                    </span>
                  </div>

                  {/* Simple 1-Sentence Summary */}
                  <p className="spotlight-description">
                    {getSimpleSummary(activeProduct)}
                  </p>

                  {/* Clean Price Line with perk note */}
                  <div className="spotlight-price-row">
                    <span className="spotlight-main-price">₹{activeProduct.price.toLocaleString('en-IN')}</span>
                    <span className="spotlight-vat-note">
                      <span className="perk-check">✓</span> Free express delivery & 30-day home trial
                    </span>
                  </div>

                  {/* Action Buttons: Order Now & Wishlist */}
                  <div className="spotlight-actions-group">
                    <button
                      type="button"
                      className="btn-order-now"
                      onClick={() => {
                        addToCart(activeProduct, currentFinish);
                        setIsCartOpen(true);
                      }}
                    >
                      Order Now <span className="order-arrow">→</span>
                    </button>

                    <button
                      type="button"
                      className={`spotlight-fav-toggle ${wishlist.includes(activeProduct.id) ? 'is-favorited' : ''}`}
                      onClick={() => toggleWishlist(activeProduct.id, activeProduct.name)}
                      aria-label="Add to wishlist"
                      title="Save to Wishlist"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.includes(activeProduct.id) ? '#B49A78' : 'none'} stroke={wishlist.includes(activeProduct.id) ? '#B49A78' : '#1B1B19'} strokeWidth="1.8">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </button>
                  </div>

                  {/* Minimalist Interactive Finishes Swatches */}
                  {activeProduct.colors && (
                    <div className="spotlight-colors-minimal">
                      <div className="spotlight-colors-label-wrap">
                        <span className="spotlight-colors-heading">Finish:</span>
                        <span className="spotlight-current-finish-name">{currentFinish}</span>
                      </div>
                      <div className="spotlight-swatches-row" role="radiogroup" aria-label="Select frame finish">
                        {activeProduct.colors.map((clr, clrIdx) => {
                          const isSelected = clr.name === currentFinish;
                          return (
                            <button
                              key={clrIdx}
                              type="button"
                              className={`spotlight-color-swatch-btn ${isSelected ? 'is-selected' : ''}`}
                              onClick={() => {
                                setSelectedFinishes(prev => ({
                                  ...prev,
                                  [activeProduct.id]: clr.name
                                }));
                              }}
                              title={`Select ${clr.name}`}
                              aria-label={clr.name}
                              aria-checked={isSelected}
                              role="radio"
                            >
                              <span
                                className="spotlight-color-dot"
                                style={{ backgroundColor: clr.hex }}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Optional Full Grid when "View All" is toggled */}
            {showAllProducts && (
              <div className="signature-expanded-catalog" data-aos="fade-up">
                <div className="expanded-catalog-header">
                  <h4 className="expanded-title">All Atelier Styles ({filteredProducts.length})</h4>
                  <div className="title-gold-divider divider-left"></div>
                </div>

                <div className="products-grid">
                  {filteredProducts.map((product, idx) => {
                    const isFavorited = wishlist.includes(product.id);
                    return (
                      <div
                        key={product.id}
                        className="product-card"
                        data-aos="fade-up"
                        data-aos-delay={(idx % 3) * 100}
                      >
                        <div className="product-image-box">
                          {product.badge && (
                            <span className={`product-badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>
                              {product.badge}
                            </span>
                          )}

                          <button
                            type="button"
                            className={`product-wishlist-toggle ${isFavorited ? 'is-active' : ''}`}
                            aria-label={`Save ${product.name} to wishlist`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(product.id, product.name);
                            }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorited ? '#B49A78' : 'none'} stroke={isFavorited ? '#B49A78' : '#1B1B19'} strokeWidth="1.8">
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                          </button>

                          <img
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                            loading="lazy"
                            onClick={() => setSelectedQuickView(product)}
                          />

                          <div className="product-card-quick-actions">
                            <button
                              type="button"
                              className="quick-view-btn"
                              onClick={() => setSelectedQuickView(product)}
                            >
                              Quick View
                            </button>
                          </div>
                        </div>

                        <div className="product-info-box">
                          <span className="product-category-label">{product.category}</span>
                          <h3
                            className="product-title"
                            onClick={() => setSelectedQuickView(product)}
                          >
                            {product.name}
                          </h3>

                          <div className="product-colors-row">
                            {product.colors.map((colorItem, cIdx) => (
                              <span
                                key={cIdx}
                                className="color-swatch-circle"
                                style={{ backgroundColor: colorItem.hex }}
                                title={colorItem.name}
                              ></span>
                            ))}
                            <span className="colors-count-label">
                              {product.colors.length} finishes
                            </span>
                          </div>

                          <div className="product-pricing-row">
                            <span className="product-price">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            <span className="tax-inclusive-tag">Taxes Included</span>
                          </div>

                          <button
                            type="button"
                            className="btn-quick-add"
                            onClick={() => addToCart(product)}
                          >
                            <span className="plus-icon">+</span> QUICK ADD TO BAG
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            7. EDITORIAL CAMPAIGN SECTION (FULLSCREEN CINEMATIC HERO BANNER)
        ========================================================================= */}
        <section id="editorial-campaign" className="hero-fullscreen-campaign-section">
          {/* Background Fullscreen Visual (New uploaded sunny eyewear campaign photo) */}
          <img
            src={campaignHeroImg}
            alt="FRAME HOUSE Summer Sunwear Collection"
            className="hero-fullscreen-bg-img"
            loading="lazy"
          />

          {/* Warm Editorial Gradient Overlay (Softly balances right side for high-contrast text) */}
          <div className="hero-fullscreen-overlay"></div>

          {/* Right-Side Simple Content Container */}
          <div className="container hero-fullscreen-container">
            <div className="hero-fullscreen-content" data-aos="fade-left" data-aos-duration="950">
              <span className="hero-fullscreen-eyebrow">
                Summer Edit · Polarized Sun
              </span>
              
              <h2 className="hero-fullscreen-title">
                Golden Sunlight,<br />
                <span className="handwritten-word">Gentle</span> on Eyes
              </h2>

              <p className="hero-fullscreen-desc">
                Featherlight frames with UV400 polarized clarity. Hand-finished for sunny days, everyday comfort, and effortless style.
              </p>

              <div className="hero-fullscreen-action">
                <button
                  type="button"
                  className="btn btn-hero-cinema"
                  onClick={() => {
                    setActiveCategoryFilter('sunglasses');
                    scrollToSection('signature-collection');
                    showToast('Viewing Polarized Sunglasses');
                  }}
                >
                  SHOP SUNGLASSES
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. RECENT GALLERY SECTION (PARABOLIC ARCHED SHOWCASE WITH B1 CENTER)
        ========================================================================= */}
        <section id="recent-gallery" className="section-padding recent-gallery-section">
          <div className="container recent-gallery-container">
            {/* Section Header matching reference image */}
            <div className="recent-gallery-header text-center" data-aos="fade-up">
              
                
              <h2 className="recent-gallery-title">
                Recent <span className="handwritten-word">Gallery</span>
              </h2>
            </div>

            {/* 5-Column Parabolic Arched Gallery */}
            <div className="recent-gallery-stage" data-aos="fade-up" data-aos-delay="150">
              {/* Column 1: Far Left (Single Squircle Card) */}
              <div className="gallery-col gallery-col-outer" data-aos="fade-right" data-aos-delay="100">
                <div
                  className="gallery-card card-outer bg-tone-sand"
                  onClick={() => setSelectedQuickView(products.find(p => p.image === p1Img) || products[0])}
                  title="View The Heritage Acetate"
                >
                  <div className="gallery-card-pedestal-shadow"></div>
                  <img
                    src={p1Img}
                    alt="FRAME HOUSE Heritage Acetate Frame"
                    className="gallery-product-img"
                    loading="lazy"
                  />
                  <div className="gallery-card-hover-info">
                    <span className="gallery-item-name">The Heritage Acetate</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Mid Left (2 Stacked Squircle Cards) */}
              <div className="gallery-col gallery-col-stacked" data-aos="fade-right" data-aos-delay="200">
                {/* Top Card */}
                <div
                  className="gallery-card card-stacked bg-tone-cream"
                  onClick={() => setSelectedQuickView(products.find(p => p.image === p3Img) || products[2])}
                  title="View The Classic Aviator"
                >
                  <div className="gallery-card-pedestal-shadow"></div>
                  <img
                    src={p3Img}
                    alt="The Classic Aviator"
                    className="gallery-product-img"
                    loading="lazy"
                  />
                  <div className="gallery-card-hover-info">
                    <span className="gallery-item-name">The Classic Aviator</span>
                  </div>
                </div>

                {/* Bottom Card */}
                <div
                  className="gallery-card card-stacked bg-tone-olive"
                  onClick={() => setSelectedQuickView(products.find(p => p.image === p4Img) || products[4])}
                  title="View The Modern Square"
                >
                  <div className="gallery-card-pedestal-shadow"></div>
                  <img
                    src={p4Img}
                    alt="The Modern Square"
                    className="gallery-product-img"
                    loading="lazy"
                  />
                  <div className="gallery-card-hover-info">
                    <span className="gallery-item-name">The Modern Square</span>
                  </div>
                </div>
              </div>

              {/* Column 3: Center Stage (BIG HERO TALL SQUIRCLE CARD WITH B1.JPG) */}
              <div className="gallery-col gallery-col-center" data-aos="zoom-in" data-aos-duration="1000">
                <div className="gallery-card card-hero-center">
                  <img
                    src={b1Img}
                    alt="FRAME HOUSE Editorial - Oversized Sculptural Sunglasses Showcase"
                    className="gallery-hero-center-img"
                    loading="lazy"
                  />
                  <div className="gallery-hero-badge-tag">
                    <span className="hero-badge-dot"></span>
                    <span>Atelier Spotlight · b1 Edition</span>
                  </div>
                </div>
              </div>

              {/* Column 4: Mid Right (2 Stacked Squircle Cards) */}
              <div className="gallery-col gallery-col-stacked" data-aos="fade-left" data-aos-delay="200">
                {/* Top Card */}
                <div
                  className="gallery-card card-stacked bg-tone-travertine"
                  onClick={() => setSelectedQuickView(products.find(p => p.image === p7Img) || products[5])}
                  title="View The Everyday Optical"
                >
                  <div className="gallery-card-pedestal-shadow"></div>
                  <img
                    src={p7Img}
                    alt="The Everyday Optical"
                    className="gallery-product-img"
                    loading="lazy"
                  />
                  <div className="gallery-card-hover-info">
                    <span className="gallery-item-name">The Everyday Optical</span>
                  </div>
                </div>

                {/* Bottom Card */}
                <div
                  className="gallery-card card-stacked bg-tone-terracotta"
                  onClick={() => setSelectedQuickView(products.find(p => p.image === p10Img) || products[3])}
                  title="View The Noir Polarized"
                >
                  <div className="gallery-card-pedestal-shadow"></div>
                  <img
                    src={p10Img}
                    alt="The Noir Polarized"
                    className="gallery-product-img"
                    loading="lazy"
                  />
                  <div className="gallery-card-hover-info">
                    <span className="gallery-item-name">The Noir Polarized</span>
                  </div>
                </div>
              </div>

              {/* Column 5: Far Right (Single Squircle Card) */}
              <div className="gallery-col gallery-col-outer" data-aos="fade-left" data-aos-delay="100">
                <div
                  className="gallery-card card-outer bg-tone-slate"
                  onClick={() => setSelectedQuickView(products.find(p => p.image === p11Img) || products[0])}
                  title="View The Havana Sun"
                >
                  <div className="gallery-card-pedestal-shadow"></div>
                  <img
                    src={p11Img}
                    alt="The Havana Sun"
                    className="gallery-product-img"
                    loading="lazy"
                  />
                  <div className="gallery-card-hover-info">
                    <span className="gallery-item-name">The Havana Sun</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. CLIENT TESTIMONIALS SECTION (SIMPLE 3 CLIENTS)
        ========================================================================= */}
        <section id="testimonials" className="section-padding testimonials-section">
          <div className="container testimonials-container">
            {/* Header matching reference image */}
            <div className="testimonials-header text-center" data-aos="fade-up">
              <span className="testimonials-eyebrow">
                Feedback From Happy Clients
              </span>
              <h2 className="testimonials-title">
                Client Testimonials
              </h2>
            </div>

            {/* Testimonials 3-Card Grid */}
            <div className="testimonials-cards-wrapper" data-aos="fade-up" data-aos-delay="100">
              <div className="testimonials-cards-grid">
                {testimonials.map((item) => (
                  <div key={item.id} className="testimonial-card">
                    {/* Top Row: Author Avatar + Name & City + 5 Stars */}
                    <div className="testimonial-card-top">
                      <div className="testimonial-author-box">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="testimonial-avatar"
                          loading="lazy"
                        />
                        <div className="testimonial-author-info">
                          <h4 className="testimonial-author-name">{item.name}</h4>
                          <span className="testimonial-author-city">{item.city}</span>
                        </div>
                      </div>

                      {/* 5 Rating Stars */}
                      <div className="testimonial-stars" aria-label="5 out of 5 stars">
                        {[...Array(item.rating)].map((_, sIdx) => (
                          <span key={sIdx} className="testimonial-star">★</span>
                        ))}
                      </div>
                    </div>

                    {/* Review Quote Body (Simple & clean) */}
                    <p className="testimonial-quote-text">
                      "{item.review}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. NEWSLETTER SECTION
        ========================================================================= */}
        <section className="section-padding newsletter-section">
          <div className="container">
            <div className="newsletter-card" data-aos="fade-up">
              <div className="newsletter-inner text-center">
                <span className="section-sub-label">
                  <span className="handwritten-badge">stay in touch</span> · Join Our Circle
                </span>
                <h2 className="newsletter-heading">
                  Good Vision, <span className="handwritten-word">Made Simple</span>
                </h2>
                <div className="title-gold-divider"></div>
                <p className="newsletter-description">
                  Sign up for new styles, simple care tips, and exclusive offers.
                </p>

                {/* Newsletter Form */}
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <div className="newsletter-input-group">
                    <input
                      type="email"
                      className={`newsletter-input ${newsletterStatus === 'error' ? 'input-error' : ''}`}
                      placeholder="Enter your email address..."
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
                      }}
                      aria-label="Email address for newsletter"
                    />
                    <button type="submit" className="newsletter-submit-btn">
                      SUBSCRIBE
                    </button>
                  </div>

                  {/* Feedback Message */}
                  {newsletterStatus === 'error' && (
                    <div className="newsletter-message message-error">
                      <span className="msg-icon">!</span> {newsletterFeedback}
                    </div>
                  )}
                  {newsletterStatus === 'success' && (
                    <div className="newsletter-message message-success">
                      <span className="msg-icon">✓</span> {newsletterFeedback}
                    </div>
                  )}
                </form>

                <p className="newsletter-disclaimer">
                  By joining, you respect our privacy standards. We never share your data. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          11. FOOTER
      ========================================================================= */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-simple-wrap">
            {/* Centered Brand & Tagline */}
            <div className="footer-simple-brand" data-aos="fade-up">
              <div className="footer-logo">FRAME HOUSE</div>
              <p className="footer-simple-tagline">
                Pure Italian acetate & Japanese titanium. Handcrafted for <span className="handwritten-word">everyday clarity</span>.
              </p>
            </div>

            {/* Simple Horizontal Navigation Bar */}
            <nav className="footer-simple-nav" data-aos="fade-up" data-aos-delay="100" aria-label="Footer Navigation">
              <button type="button" onClick={() => scrollToSection('signature-collection')}>
                Collection
              </button>
              <button type="button" onClick={() => { setActiveCategoryFilter('acetate'); scrollToSection('signature-collection'); }}>
                Acetate Classics
              </button>
              <button type="button" onClick={() => { setActiveCategoryFilter('titanium'); scrollToSection('signature-collection'); }}>
                Titanium Series
              </button>
              <button type="button" onClick={() => { setActiveCategoryFilter('sunglasses'); scrollToSection('signature-collection'); }}>
                Polarized Sun
              </button>
              <button type="button" onClick={() => scrollToSection('our-story')}>
                Our Story
              </button>
              <button type="button" onClick={() => scrollToSection('recent-gallery')}>
                Gallery
              </button>
              <button type="button" onClick={() => scrollToSection('testimonials')}>
                Reviews
              </button>
              <button type="button" onClick={() => showToast('Concierge: concierge@framehouse.com · Mumbai & New Delhi')}>
                Contact
              </button>
            </nav>

            {/* Subtle Divider */}
            <div className="footer-simple-divider"></div>

            {/* Simple Bottom Row */}
            <div className="footer-simple-bottom">
              <div className="footer-simple-copy">
                © {new Date().getFullYear()} FRAME HOUSE. All rights reserved.
              </div>

              <div className="footer-simple-socials">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">Instagram</a>
                <span className="social-sep">·</span>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">Pinterest</a>
                <span className="social-sep">·</span>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">Twitter</a>
              </div>

              <div className="footer-simple-locale">
                Atelier: Mumbai · New Delhi
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          SLIDE-OVER SHOPPING BAG DRAWER
      ========================================================================= */}
      {isCartOpen && (
        <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer-panel" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title-group">
                <h3 className="drawer-title">YOUR SHOPPING BAG</h3>
                <span className="drawer-count">({cartTotalItems} items)</span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close bag"
              >
                ✕
              </button>
            </div>

            {/* Free shipping banner */}
            <div className="drawer-shipping-status">
              {cartSubtotal >= freeShippingThreshold ? (
                <div className="shipping-unlocked">
                  
                </div>
              ) : (
                <div className="shipping-progress-text">
                  Add <strong>₹{freeShippingDifference.toLocaleString('en-IN')}</strong> more for Complimentary Express Delivery
                </div>
              )}
              <div className="shipping-bar">
                <div
                  className="shipping-bar-fill"
                  style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="drawer-items-list">
              {cart.length === 0 ? (
                <div className="drawer-empty-state">
                  <div className="empty-cart-icon">🛍️</div>
                  <h4>Your shopping bag is empty</h4>
                  <p>Discover our signature collection of handcrafted eyewear.</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setIsCartOpen(false);
                      scrollToSection('signature-collection');
                    }}
                  >
                    EXPLORE COLLECTION
                  </button>
                </div>
              ) : (
                cart.map((item, cIndex) => (
                  <div key={`${item.id}-${item.color}-${cIndex}`} className="cart-item-row">
                    <div className="cart-item-thumbnail">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <span className="cart-item-category">{item.category}</span>
                      <h4 className="cart-item-title">{item.name}</h4>
                      <span className="cart-item-finish">Finish: {item.color}</span>
                      <div className="cart-item-price">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>

                      <div className="cart-item-quantity-controls">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.id, item.color, -1)}
                        >
                          -
                        </button>
                        <span className="qty-value">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => updateCartQuantity(item.id, item.color, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="cart-item-remove"
                      onClick={() => updateCartQuantity(item.id, item.color, -item.quantity)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer Checkout */}
            {cart.length > 0 && (
              <div className="drawer-footer">
                <div className="drawer-subtotal-row">
                 
                  <span className="subtotal-val">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="drawer-tax-note">
                  Inclusive of all taxes and bespoke hard case
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    showToast('Proceeding to Secure Luxury Checkout...');
                  }}
                >
                  PROCEED TO CHECKOUT · ₹{cartSubtotal.toLocaleString('en-IN')}
                </button>
                <div className="checkout-trust-icons">
                  <span>🔒 256-bit Encrypted Checkout</span>
                  <span>•</span>
                  <span>Express Courier</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE-OVER WISHLIST DRAWER
      ========================================================================= */}
      {isWishlistOpen && (
        <div className="drawer-overlay" onClick={() => setIsWishlistOpen(false)}>
          <div className="cart-drawer-panel" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title-group">
                <h3 className="drawer-title">SAVED FAVORITES</h3>
                <span className="drawer-count">({wishlist.length} frames)</span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setIsWishlistOpen(false)}
                aria-label="Close wishlist"
              >
                ✕
              </button>
            </div>

            <div className="drawer-items-list">
              {wishlist.length === 0 ? (
                <div className="drawer-empty-state">
                  <div className="empty-cart-icon">♡</div>
                  <h4>No saved frames yet</h4>
                  <p>Click the heart icon on any frame in our collection to save for later.</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      scrollToSection('signature-collection');
                    }}
                  >
                    EXPLORE COLLECTION
                  </button>
                </div>
              ) : (
                products
                  .filter(prod => wishlist.includes(prod.id))
                  .map((item) => (
                    <div key={item.id} className="cart-item-row">
                      <div className="cart-item-thumbnail">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-details">
                        <span className="cart-item-category">{item.category}</span>
                        <h4 className="cart-item-title">{item.name}</h4>
                        <div className="cart-item-price">
                          ₹{item.price.toLocaleString('en-IN')}
                        </div>
                        <button
                          type="button"
                          className="btn-add-from-wishlist"
                          onClick={() => {
                            addToCart(item);
                            toggleWishlist(item.id, item.name);
                          }}
                        >
                          MOVE TO BAG
                        </button>
                      </div>
                      <button
                        type="button"
                        className="cart-item-remove"
                        onClick={() => toggleWishlist(item.id, item.name)}
                        title="Remove from saved"
                      >
                        ✕
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PRODUCT QUICK VIEW MODAL
      ========================================================================= */}
      {selectedQuickView && (
        <div className="modal-overlay" onClick={() => setSelectedQuickView(null)}>
          <div className="modal-content-card" data-lenis-prevent onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedQuickView(null)}
              aria-label="Close details"
            >
              ✕
            </button>

            <div className="quickview-grid">
              <div className="quickview-image-col">
                <img src={selectedQuickView.image} alt={selectedQuickView.name} />
              </div>

              <div className="quickview-info-col">
                <span className="quickview-cat">{selectedQuickView.category}</span>
                <h3 className="quickview-title">{selectedQuickView.name}</h3>
                
                <div className="quickview-price">
                  ₹{selectedQuickView.price.toLocaleString('en-IN')}
                  <span className="tax-inclusive-tag">Inclusive of all taxes</span>
                </div>

                <p className="quickview-desc">{selectedQuickView.description}</p>

                <div className="quickview-spec-box">
                  <div className="spec-row">
                    <span className="spec-name">Frame Dimensions:</span>
                    <span className="spec-val">{selectedQuickView.dimensions}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Hardware:</span>
                    <span className="spec-val">Five-barrel custom hinges</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Lenses:</span>
                    <span className="spec-val">Zeiss Vision UV400 Clarity</span>
                  </div>
                </div>

                <div className="quickview-colors">
                  <span className="quickview-color-label">Available Finishes:</span>
                  <div className="color-pills-row">
                    {selectedQuickView.colors.map((c, idx) => (
                      <span key={idx} className="color-pill-tag">
                        <span className="pill-dot" style={{ backgroundColor: c.hex }}></span>
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="quickview-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={() => {
                      addToCart(selectedQuickView);
                      setSelectedQuickView(null);
                    }}
                  >
                    ADD TO BAG · ₹{selectedQuickView.price.toLocaleString('en-IN')}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={() => {
                      toggleWishlist(selectedQuickView.id, selectedQuickView.name);
                    }}
                  >
                    {wishlist.includes(selectedQuickView.id) ? '♥ REMOVE FROM WISHLIST' : '♡ SAVE TO WISHLIST'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          GLOBAL TOAST NOTIFICATION
      ========================================================================= */}
      <div className={`toast-notification ${toastVisible ? 'toast-show' : ''}`}>
        <span className="toast-dot"></span>
        <span className="toast-text">{toastMessage}</span>
      </div>
    </div>
  );
}
