import { ArrowRight, Utensils } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-orange-600 p-2 rounded-lg">
            <Utensils className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tight">Mr biriyani</span>
        </div>
        <p className="text-gray-400 max-w-sm leading-relaxed">
          Elevating the culinary experience with a perfect blend of tradition and modern
          innovation. Join us for a journey of taste.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-orange-500 uppercase tracking-widest text-xs">Navigation</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 transition-all" />
            View Menu
          </li>
          <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 transition-all" />
            Reserve Table
          </li>
          {/* <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 transition-all" />
            Staff Portal
          </li> */}
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6 text-orange-500 uppercase tracking-widest text-xs">Stay Updated</h4>
        <p className="text-xs text-gray-500 mb-4">Join our list for exclusive offers and events.</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Email Address"
            className="bg-gray-800 border-none rounded-lg px-4 py-2 w-full text-sm focus:ring-1 focus:ring-orange-500"
          />
          <button className="bg-orange-600 px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm font-bold">
            Join
          </button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
      <span>© {new Date().getFullYear()} Mr Biriyani Restaurant Group</span>
      <div className="flex gap-6">
        <span className="hover:text-white cursor-pointer">Privacy Policy</span>
        <span className="hover:text-white cursor-pointer">Terms of Service</span>
      </div>
    </div>
  </footer>
);

export default Footer;
