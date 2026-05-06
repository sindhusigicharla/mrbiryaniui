import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuPage from './components/MenuPage';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { INITIAL_MENU } from './constants/menuData';
import { auth } from './firebase';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [menu, setMenu] = useState(INITIAL_MENU);

  const handleLogout = async () => {
    if (auth) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    setCurrentPage('home');
  };

  useEffect(() => {
    const savedMenu = localStorage.getItem('urban-bite-menu-v2');
    if (savedMenu) setMenu(JSON.parse(savedMenu));
  }, []);

  useEffect(() => {
    localStorage.setItem('urban-bite-menu-v2', JSON.stringify(menu));
  }, [menu]);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(Boolean(user));
      if (!user) {
        setCurrentPage((prevPage) => (prevPage === 'admin' ? 'home' : prevPage));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-200 text-gray-900">
      <Navbar
        isAdmin={isAdmin}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
      />

      <main className="pb-20">
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-500">
            <Hero />
            <MenuPage menu={menu} />
          </div>
        )}

        {currentPage === 'login' && (
          <LoginPage setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'admin' && isAdmin && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AdminDashboard menu={menu} setMenu={setMenu} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
