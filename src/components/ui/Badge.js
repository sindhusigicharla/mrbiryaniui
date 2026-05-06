const Badge = ({ type }) => (
  <span
    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
      type === 'Veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`}
  >
    <span
      className={`w-2 h-2 rounded-full ${type === 'Veg' ? 'bg-green-600' : 'bg-red-600'}`}
    />
    {type}
  </span>
);

export default Badge;
