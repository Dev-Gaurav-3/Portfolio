import React, { useState } from 'react';
import { X, MapPin, ShieldCheck, Database, Layers, ExternalLink, Star, Compass, CheckCircle2 } from 'lucide-react';

export default function StayScapeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [selectedProperty, setSelectedProperty] = useState(0);

  const sampleListings = [
    {
      id: 1,
      title: 'Cosmic Mountain Chalet',
      location: 'Manali, Himachal Pradesh',
      coords: '32.2432° N, 77.1892° E',
      price: '₹4,500 / night',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
      specs: '3 Bedrooms • 2 Baths • Mountain View'
    },
    {
      id: 2,
      title: 'Sunset Beach Villa',
      location: 'Anjuna, Goa',
      coords: '15.5847° N, 73.7431° E',
      price: '₹6,200 / night',
      rating: 4.95,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      specs: '4 Bedrooms • Private Pool • Ocean Front'
    },
    {
      id: 3,
      title: 'Royal Heritage Haveli',
      location: 'Jaipur, Rajasthan',
      coords: '26.9124° N, 75.7873° E',
      price: '₹5,800 / night',
      rating: 4.88,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      specs: '2 Bedrooms • Courtyard • Traditional Architecture'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0d0f19] border border-[#ff6b0044] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#ff6b0020] overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1f2438]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#ff6b0020] text-[#ff8800] border border-[#ff6b0033]">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">StayScape Full-Stack Explorer</h3>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#ff6b001a] text-[#ff8800] border border-[#ff6b0033]">
                  Node.js + MongoDB + Mapbox
                </span>
              </div>
              <p className="text-xs text-slate-400">Interactive platform simulation by Gaurav Suryavanshi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#07080e] text-slate-400 hover:text-white hover:border-[#ff6b00] border border-[#1f2438]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 overflow-y-auto pr-1 flex-1">
          
          {/* Left Column: Interactive Mapbox Map Mock */}
          <div className="lg:col-span-7 bg-[#07080e] border border-[#1f2438] rounded-2xl p-4 flex flex-col justify-between space-y-4">
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#ff8800] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                Mapbox Geocoding API Engine
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-[#1f2438] px-2 py-0.5 rounded">
                Live Geocoded Coordinates
              </span>
            </div>

            {/* Simulated Map Visual */}
            <div className="relative w-full h-56 rounded-xl overflow-hidden border border-[#ff6b0033] group">
              <img
                src={sampleListings[selectedProperty].image}
                alt={sampleListings[selectedProperty].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080e] via-transparent to-transparent" />
              
              {/* Map pin overlay */}
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-[#07080e]/90 border border-[#ff6b0044] text-xs font-mono text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ff8800] animate-bounce" />
                <span>{sampleListings[selectedProperty].coords}</span>
              </div>

              <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#07080e]/90 border border-emerald-500/40 text-xs font-bold text-emerald-400">
                {sampleListings[selectedProperty].price}
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#0d0f19] border border-[#1f2438] flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-[#ff8800]" />
                <span>Passport.js Session Auth</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0d0f19] border border-[#1f2438] flex items-center gap-2 text-slate-300">
                <Database className="w-4 h-4 text-[#ff8800]" />
                <span>MongoDB Atlas & Mongoose</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0d0f19] border border-[#1f2438] flex items-center gap-2 text-slate-300">
                <Layers className="w-4 h-4 text-[#ff8800]" />
                <span>MVC Architecture & REST</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0d0f19] border border-[#1f2438] flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#ff8800]" />
                <span>Render Deployment</span>
              </div>
            </div>

          </div>

          {/* Right Column: Listing Selector */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Select Sample Property
            </h4>

            {sampleListings.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedProperty(idx)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedProperty === idx
                    ? 'bg-[#ff6b001a] border-[#ff6b00] shadow-md shadow-[#ff6b0020]'
                    : 'bg-[#07080e] border-[#1f2438] hover:border-[#ff6b0044]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-bold text-white">{item.title}</h5>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{item.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-1">{item.location}</p>
                <p className="text-[11px] text-slate-500 mt-1 font-mono">{item.specs}</p>
              </div>
            ))}

            <div className="pt-4 flex items-center gap-3">
              <a
                href="https://stayscape-nkjp.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 text-center text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-[#ff6b00] to-[#ff8800] hover:from-[#ff8800] hover:to-[#ff4500] shadow-md shadow-[#ff6b0033] flex items-center justify-center gap-1.5"
              >
                <span>Launch Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://github.com/Dev-Gaurav-3/StayScape"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 text-center text-xs font-semibold rounded-xl text-slate-300 bg-[#07080e] border border-[#1f2438] hover:border-[#ff6b00] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Repository</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
