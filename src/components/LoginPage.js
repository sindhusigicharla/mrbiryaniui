import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ChefHat } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { auth } from '../firebase';

const LoginPage = ({ setCurrentPage }) => {
  const [credentials, setCredentials] = useState({ email: '', pass: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!auth) {
      setError('Firebase is not configured. Please add your credentials.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.pass);
      setCurrentPage('admin');
    } catch (firebaseError) {
      setError('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-orange-100 rounded-2xl mb-4">
            <ChefHat size={40} className="text-orange-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Admin Login</h2>
          <p className="text-gray-500 text-sm">Secure access for restaurant management</p>
        </div>
        {!auth && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-300 rounded-lg">
            <p className="text-xs font-semibold text-amber-800">
              ⚠️ Firebase credentials not configured. Admin features are unavailable.
            </p>
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Username</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              placeholder="admin@yourdomain.com"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              placeholder="........"
              value={credentials.pass}
              onChange={(e) => setCredentials({ ...credentials, pass: e.target.value })}
            />
          </div>
          {error && (
            <p className="text-red-500 text-xs font-medium bg-red-50 py-2 rounded text-center border border-red-100">
              {error}
            </p>
          )}
          <Button
            type="submit"
            loading={isLoading}
            disabled={!credentials.email || !credentials.pass}
            className="w-full py-4 text-md font-bold mt-4 shadow-lg shadow-orange-100"
          >
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
