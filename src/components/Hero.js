import { Clock, MapPin, Phone } from 'lucide-react';

const Hero = () => (
  <div className="relative h-[450px] flex items-center justify-center text-white overflow-hidden mb-12">
    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070"
        alt="Restaurant Interior"
        className="w-full h-full object-cover brightness-[0.4]"
      />
    </div>
    <div className="relative z-10 text-center px-4 max-w-3xl">
      <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
        Flavors of the <span className="text-orange-500">Modern Era.</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-200 mb-8 font-light">
        Experience culinary excellence with our curated selection of global cuisines and
        handcrafted mocktails
      </p>
      <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <Clock size={16} className="text-orange-500" /> 11 AM - 11 PM
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <MapPin size={16} className="text-orange-500" /> Downtown 5th Ave
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <Phone size={16} className="text-orange-500" /> +1 (555) 000-1234
        </div>
      </div>
    </div>
  </div>
);

export default Hero;
