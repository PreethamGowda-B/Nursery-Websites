import React, { useState } from 'react';
import { plantCatalog, generateWhatsAppInquiryUrl, PlantItem } from '../../data/plants';
import { plantCategories as categoriesList } from '../../data/categories';
import { businessData } from '../../data/business';
import { Sun, Droplets, Shield, MessageSquare, Search, Leaf, X } from 'lucide-react';

export const PlantCatalogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalPlant, setActiveModalPlant] = useState<PlantItem | null>(null);

  const filteredPlants = plantCatalog.filter((plant) => {
    const matchesCategory = selectedCategory === 'all' || plant.categoryId === selectedCategory;
    const matchesSearch =
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="plant-catalog" className="relative z-30 bg-[#f4f1ea] py-24 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header matching Reference Image layout */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100/80 text-[#386641] text-[11px] font-bold uppercase tracking-widest">
            <Leaf className="w-3.5 h-3.5 text-[#386641]" />
            <span>EXPLORE OUR COLLECTION</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#0f2d21] tracking-wide">
            Shop by <span className="text-[#386641] italic font-playfair font-normal">Categories</span>
          </h2>
          <p className="text-[#3a5246] text-base sm:text-lg font-light leading-relaxed">
            Select from our curated variety of healthy indoor flora, outdoor landscaping palms, blooming perennials, and nursery care supplies.
          </p>
        </div>

        {/* Filter Tabs & Search Box */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#386641] text-white shadow-natural'
                  : 'bg-white text-[#0f2d21] hover:bg-emerald-50 border border-emerald-900/10'
              }`}
            >
              All Plants
            </button>

            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#386641] text-white shadow-natural'
                    : 'bg-white text-[#0f2d21] hover:bg-emerald-50 border border-emerald-900/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#386641] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search plant species..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-emerald-900/15 rounded-full text-xs text-[#0f2d21] placeholder-slate-400 focus:outline-none focus:border-[#386641] shadow-xs transition-colors"
            />
          </div>
        </div>

        {/* Plants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="group bg-white border border-emerald-900/10 hover:border-[#386641]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-natural flex flex-col"
            >
              {/* Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100 flex-shrink-0">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {plant.isPopular && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#386641] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Featured
                  </span>
                )}
                <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#386641] text-[10px] font-semibold shadow-xs">
                  {plant.categoryName}
                </span>
              </div>

              {/* Card Body — grows to fill available space */}
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-3">
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#0f2d21] group-hover:text-[#386641] transition-colors leading-tight">
                    {plant.name}
                  </h3>
                  <p className="font-playfair text-xs italic text-[#386641] mt-0.5">
                    {plant.botanicalName}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#3a5246] mb-3">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100">
                    <Sun className="w-3 h-3 text-amber-500" />
                    {plant.sunlight}
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-100">
                    <Droplets className="w-3 h-3 text-cyan-600" />
                    {plant.watering}
                  </span>
                </div>

                <p className="text-[#4a6055] text-xs line-clamp-2 font-light leading-relaxed mb-4">
                  {plant.description}
                </p>

                {/* Action strip — always pinned to bottom via mt-auto */}
                <div className="mt-auto pt-4 border-t border-emerald-900/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveModalPlant(plant)}
                    className="text-xs text-[#0f2d21] hover:text-[#386641] font-semibold underline underline-offset-4 transition-colors whitespace-nowrap"
                  >
                    View Details
                  </button>

                  <a
                    href={generateWhatsAppInquiryUrl(plant.name, businessData.whatsappNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-[#386641] hover:bg-[#2d5234] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 whitespace-nowrap flex-shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Enquire</span>
                  </a>
                </div>
              </div>
            </div>
          ))}

        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-16 bg-white border border-emerald-900/10 rounded-2xl">
            <p className="text-slate-500 text-sm">No plants matching your search criteria. Try selecting another category.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {activeModalPlant && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-emerald-900/10 rounded-3xl max-w-2xl w-full overflow-hidden shadow-natural-lg relative animate-in fade-in zoom-in-95 duration-200 text-[#0f2d21]">
            
            <button
              onClick={() => setActiveModalPlant(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 hover:text-black z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-full bg-slate-100">
                <img
                  src={activeModalPlant.image}
                  alt={activeModalPlant.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#386641]">
                    {activeModalPlant.categoryName}
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold text-[#0f2d21]">
                    {activeModalPlant.name}
                  </h3>
                  <p className="font-playfair text-sm italic text-[#386641]">
                    {activeModalPlant.botanicalName}
                  </p>
                </div>

                <p className="text-[#4a6055] text-xs md:text-sm leading-relaxed font-light">
                  {activeModalPlant.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-emerald-900/10 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Sun className="w-4 h-4 text-amber-500" /> Sunlight:
                    </span>
                    <span className="font-semibold text-[#0f2d21]">{activeModalPlant.sunlight}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Droplets className="w-4 h-4 text-cyan-600" /> Water Need:
                    </span>
                    <span className="font-semibold text-[#0f2d21]">{activeModalPlant.watering}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Shield className="w-4 h-4 text-[#386641]" /> Care Level:
                    </span>
                    <span className="font-semibold text-[#0f2d21]">{activeModalPlant.careLevel}</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 italic">
                    {activeModalPlant.priceEstimate}
                  </span>
                  <a
                    href={generateWhatsAppInquiryUrl(activeModalPlant.name, businessData.whatsappNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-[#386641] hover:bg-[#2d5234] text-white font-semibold text-xs flex items-center gap-2 shadow-natural transition-all hover:scale-105"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
