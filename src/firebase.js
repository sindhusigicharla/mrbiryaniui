import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  
};

// Initialize Firebase only if config has required fields
let app = null;
let auth = null;

const hasValidConfig = firebaseConfig && Object.keys(firebaseConfig).length > 0 && firebaseConfig.apiKey;

if (hasValidConfig) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
}

export { auth };
export default app;