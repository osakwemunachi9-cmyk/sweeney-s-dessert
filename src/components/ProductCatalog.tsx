import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, TOPPING_OPTIONS } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatNaira } from '../utils/format';

export const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'parfaits' | 'tubs' | 'drinks' | 'granola'
  >('all');
  const { addToCart, activeProductModal, setActiveProductModal } = useCart();

  const [modalTopping, setModalTopping] = useState<string>(TOPPING_OPTIONS[0]);
  const [modalSweetness, setModalSweetness] = useState<'Low' | 'Medium' | 'Rich'>('Medium');
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  const [modalNotes, setModalNotes] = useState<string>('');

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleOpenModal = (product: Product) => {
    setActiveProductModal(product);
    setModalTopping(TOPPING_OPTIONS[0]);
    setModalSweetness('Medium');
    setModalQuantity(1);
    setModalNotes('');
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, 1, TOPPING_OPTIONS[0], 'Medium', '');
  };

  const handleModalAddToCart = () => {
    if (!activeProductModal) return;
    addToCart(activeProductModal, modalQuantity, modalTopping, modalSweetness, modalNotes);
    setActiveProductModal(null);
  };

  const getModalPrice = () => {
    if (!activeProductModal) return 0;
    let extra = 0;
    if (modalTopping.includes('+₦200')) extra = 200;
    else if (modalTopping.includes('+₦150')) extra = 150;
    else if (modalTopping.includes('+₦100')) extra = 100;
    return (activeProductModal.price + extra) * modalQuantity;
  };

  return (
    <section id="menu-catalog" className="py-12 md:py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-rose-200/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#881337] uppercase">
              <span>Fresh Menu</span>
              <span aria-hidden="true">·</span>
              <span>Enugu Daily Batch</span>
              <span aria-hidden="true">·</span>
              <span>Whole Milk & Granola</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#33111b] mt-1 [text-wrap:balance]">
              Handcrafted Yogurt & Granola
            </h2>
            <p className="text-xs text-rose-800 font-medium mt-1">
              Eat healthy, Drink healthy · WhatsApp Orders: 0810 244 6805 · TikTok: @ssweeneysdesserts
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white/70 rounded-xl border border-rose-200/70 overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#5c1d2e] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Items ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setSelectedCategory('parfaits')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'parfaits'
                  ? 'bg-[#5c1d2e] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Parfait Cups
            </button>
            <button
              onClick={() => setSelectedCategory('tubs')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'tubs'
                  ? 'bg-[#5c1d2e] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Strained Tubs
            </button>
            <button
              onClick={() => setSelectedCategory('drinks')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'drinks'
                  ? 'bg-[#5c1d2e] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Drinking Yogurt
            </button>
            <button
              onClick={() => setSelectedCategory('granola')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'granola'
                  ? 'bg-[#5c1d2e] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Crunchy Granola
            </button>
          </div>
        </div>

        {/* 4 Real Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleOpenModal(product)}
              className="group bg-white rounded-2xl overflow-hidden border border-rose-200/80 hover:border-rose-300 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col"
            >
              {/* Product Image with Sweeney's Sticker */}
              <div className="relative aspect-4/3 overflow-hidden bg-rose-50/70">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />

                {/* SWEENEY'S DESSERT Badge */}
                <div className="absolute top-3 left-3 bg-[#fdf2f4]/95 text-[#881337] px-2.5 py-1 rounded-full border border-rose-300 shadow-sm backdrop-blur-xs flex items-center gap-1.5">
                  <span className="text-xs leading-none">🧁</span>
                  <span className="font-serif font-bold text-[10px] tracking-wider uppercase">
                    SWEENEY'S DESSERT
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 bg-white/95 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-800 border border-emerald-200 shadow-2xs">
                  Enugu Fresh Batch
                </div>

                {/* Quick Add Button */}
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="absolute bottom-3 right-3 p-2 bg-white text-stone-900 rounded-full shadow-md hover:bg-[#5c1d2e] hover:text-white transition-colors cursor-pointer"
                  title="Quick Add"
                  aria-label={`Quick add ${product.name}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="uppercase tracking-wider font-semibold text-[#881337]">
                      {product.volume}
                    </span>
                    <span>{product.dietary[0]}</span>
                  </div>

                  <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-[#5c1d2e] transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price (All <= 2000 Naira) */}
                <div className="pt-2 border-t border-rose-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-stone-500 block">Price</span>
                    <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
                      {formatNaira(product.price)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(product);
                    }}
                    className="text-xs font-semibold text-[#5c1d2e] hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Order</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div
            className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-rose-200 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveProductModal(null)}
              className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-800 bg-white/80 rounded-full transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-4/3 md:aspect-auto md:h-full bg-rose-50 min-h-[300px]">
                <img
                  src={activeProductModal.image}
                  alt={activeProductModal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 left-4 bg-[#fdf2f4]/95 text-[#881337] px-3.5 py-1.5 rounded-full border-2 border-rose-300 shadow-md backdrop-blur-xs flex items-center gap-2">
                  <span className="text-sm">🧁</span>
                  <span className="font-serif font-bold text-xs tracking-wider uppercase">
                    SWEENEY'S DESSERT
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-1 rounded-md text-xs font-semibold text-stone-800 shadow-xs">
                  {activeProductModal.volume} · Handcrafted in Enugu
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-[#881337] uppercase">{activeProductModal.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>Chilled at 4°C in Enugu</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-stone-900 leading-tight">
                    {activeProductModal.name}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {activeProductModal.detailedDescription}
                  </p>

                  <div>
                    <span className="text-xs font-semibold text-stone-800 block mb-1">Taste Profile</span>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600">
                      {activeProductModal.tasteNotes.map((note, idx) => (
                        <React.Fragment key={note}>
                          <span>{note}</span>
                          {idx < activeProductModal.tasteNotes.length - 1 && (
                            <span aria-hidden="true" className="text-rose-300">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-800 block">
                      Add-on Topping
                    </label>
                    <select
                      value={modalTopping}
                      onChange={(e) => setModalTopping(e.target.value)}
                      className="w-full text-xs font-medium bg-[#fcf5f6] border border-rose-200 rounded-xl px-3.5 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#881337]"
                    >
                      {TOPPING_OPTIONS.map((top) => (
                        <option key={top} value={top}>
                          {top}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-800 block">
                      Sweetness Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Low', 'Medium', 'Rich'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setModalSweetness(lvl)}
                          className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                            modalSweetness === lvl
                              ? 'bg-[#5c1d2e] text-white border-[#5c1d2e]'
                              : 'bg-white text-stone-700 border-rose-200 hover:border-rose-300'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 block">
                      Order note (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Extra cold packing"
                      value={modalNotes}
                      onChange={(e) => setModalNotes(e.target.value)}
                      className="w-full text-xs bg-[#fcf5f6] border border-rose-200 rounded-xl px-3 py-2 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#881337]"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-rose-100 flex items-center gap-4">
                  <div className="flex items-center border border-rose-200 rounded-xl overflow-hidden bg-[#fcf5f6]">
                    <button
                      onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                      className="px-3.5 py-2.5 text-stone-600 hover:text-stone-900 text-sm font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 font-mono text-sm font-bold text-stone-900 tabular-nums">
                      {modalQuantity}
                    </span>
                    <button
                      onClick={() => setModalQuantity(modalQuantity + 1)}
                      className="px-3.5 py-2.5 text-stone-600 hover:text-stone-900 text-sm font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleModalAddToCart}
                    className="flex-1 py-3 px-5 bg-[#5c1d2e] hover:bg-[#431422] text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <span>Add to Cart</span>
                    <span className="font-mono tabular-nums font-bold">
                      {formatNaira(getModalPrice())}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
