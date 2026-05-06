import { useState } from 'react';
import { Edit2, Plus, Sparkles, Trash2 } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { CATEGORIES } from '../constants/menuData';
import { fetchGemini } from '../services/gemini';

const AdminDashboard = ({ menu, setMenu }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Starters',
    price: '',
    type: 'Veg',
    description: '',
  });

  const resetForm = () => {
    setFormData({ name: '', category: 'Starters', price: '', type: 'Veg', description: '' });
    setIsAdding(false);
    setEditingId(null);
  };

  const generateAIDescription = async () => {
    if (!formData.name) return;
    setAiLoading(true);

    const prompt = `Generate a appetizing restaurant menu description for a dish named "${formData.name}".\n    Category: ${formData.category}. Type: ${formData.type}.\n    Format response as a JSON object with "description" (string, max 120 chars) and "price" (number, realistic USD price).`;

    try {
      const response = await fetchGemini(
        prompt,
        'You are a professional menu writer. Output ONLY valid JSON.'
      );
      const cleanedJson = response.replace(/```json|```/g, '').trim();
      const result = JSON.parse(cleanedJson);
      setFormData((prev) => ({
        ...prev,
        description: result.description,
        price: result.price,
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setMenu((prev) =>
        prev.map((item) => (item.id === editingId ? { ...formData, id: editingId } : item))
      );
    } else {
      setMenu((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenu((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Inventory Management</h2>
          <p className="text-gray-500">Manage your menu items and prices</p>
        </div>
        {!isAdding && (
          <Button icon={Plus} onClick={() => setIsAdding(true)}>
            Add New Item
          </Button>
        )}
      </div>

      {isAdding && (
        <Card className="mb-12 p-8 border-2 border-orange-100 bg-white shadow-xl ring-4 ring-orange-50/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">{editingId ? 'Edit Dish' : 'Add New Dish'}</h3>
            <Button
              variant="ai"
              icon={Sparkles}
              onClick={generateAIDescription}
              loading={aiLoading}
              disabled={!formData.name}
            >
              Autofill with AI
            </Button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Item Name</label>
              <input
                required
                placeholder="e.g. Truffle Mushroom Risotto"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Category</label>
              <select
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Price ($)</label>
              <input
                required
                type="number"
                step="0.01"
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Type</label>
              <div className="flex gap-4 p-2 bg-gray-50 rounded-lg border">
                {['Veg', 'Non-Veg'].map((t) => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer flex-1 justify-center">
                    <input
                      type="radio"
                      name="type"
                      className="accent-orange-600"
                      checked={formData.type === t}
                      onChange={() => setFormData({ ...formData, type: t })}
                    />
                    <span className="text-sm font-medium">{t}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-gray-700">Description</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 outline-none"
                rows="3"
                placeholder="Describe the flavors..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t">
              <Button variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit">{editingId ? 'Update Item' : 'Create Item'}</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="px-6 py-4">Dish</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {menu.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-400 max-w-xs truncate">{item.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-gray-500">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge type={item.type} />
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-orange-600">${item.price}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
