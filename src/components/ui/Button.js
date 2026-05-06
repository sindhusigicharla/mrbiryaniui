import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  icon: Icon,
  loading = false,
  disabled = false,
  type = 'button',
}) => {
  const variants = {
    primary: 'bg-orange-600 text-white hover:bg-orange-700 disabled:bg-orange-300',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:bg-gray-50',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200',
    outline: 'border-2 border-orange-600 text-orange-600 hover:bg-orange-50',
    ai: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 shadow-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
