import { LayoutDashboard, LogIn, LogOut, Utensils } from 'lucide-react';
import Button from './ui/Button';

const Navbar = ({ isAdmin, currentPage, setCurrentPage, onLogout }) => (
  <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <div className="bg-orange-600 p-2 rounded-lg">
            <Utensils className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900 underline decoration-orange-500 decoration-4 underline-offset-4">
            Mr Biryani
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('home')}
            className={`text-sm font-semibold transition-colors ${
              currentPage === 'home' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
            }`}
          >
            Menu
          </button>
          {isAdmin ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage('admin')}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                  currentPage === 'admin' ? 'text-orange-600' : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <LayoutDashboard size={16} /> Admin
              </button>
              <Button variant="secondary" icon={LogOut} onClick={onLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button icon={LogIn} onClick={() => setCurrentPage('login')}>
              Staff Login
            </Button>
          )}
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
