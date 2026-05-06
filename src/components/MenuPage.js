import { useMemo, useState } from 'react';
import { ChevronRight, ChefHat, Search, Utensils } from 'lucide-react';
import AISmartPlate from './AISmartPlate';
import Badge from './ui/Badge';
import Card from './ui/Card';
import { CATEGORIES } from '../constants/menuData';

const MenuPage = ({ menu }) => {
  const [filter, setFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return menu.filter((item) => {
      const matchesCategory = filter === 'All' || item.category === filter;
      const matchesType = typeFilter === 'All' || item.type === typeFilter;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesType && matchesSearch;
    });
  }, [menu, filter, typeFilter, searchQuery]);

  console.log('Filtered Items:', filteredItems);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <AISmartPlate menu={menu} />

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <ChefHat className="text-orange-600" /> Explore Our Menu
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                    filter === cat
                      ? 'bg-orange-600 text-white shadow-md'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search dishes..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-64 bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-100/50 p-2 rounded-xl w-fit">
            <span className="text-xs font-bold text-gray-400 uppercase ml-2">Dietary:</span>
            <div className="flex gap-1">
              {['All', 'Veg', 'Non-Veg'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    typeFilter === t
                      ? 'bg-white shadow-sm text-gray-900 ring-1 ring-black/5'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>


      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-100 overflow-hidden relative">
                <img
                  src={
                    item.image
                      ? `${process.env.PUBLIC_URL || ''}${item.image}`
                      : `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800&id=${item.id}`
                  }
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge type={item.type} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  <span className="text-lg font-black text-orange-600">${item.price}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-[10px] font-bold px-2 py-1 bg-orange-50 text-orange-700 rounded uppercase tracking-wider">
                    {item.category}
                  </span>
                  <button className="text-orange-600 font-bold text-sm flex items-center gap-1 hover:translate-x-1 transition-transform">
                    Order Now <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <Utensils className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-400 font-medium italic">No delicious matches found.</p>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
