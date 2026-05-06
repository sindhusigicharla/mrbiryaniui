import { useState } from 'react';
import { BrainCircuit, MessageSquare } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { fetchGemini } from '../services/gemini';

const AISmartPlate = ({ menu }) => {
  const [query, setQuery] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    if (!query.trim()) return;
    setLoading(true);

    const menuContext = menu
      .map((m) => `${m.name} (${m.category}, ${m.type}, $${m.price}): ${m.description}`)
      .join('\n');
    const prompt = `User's Mood/Request: "${query}"\n\nAvailable Menu:\n${menuContext}\n\nRecommend 1-2 dishes and explain why they fit the user's mood. Keep it under 60 words. Be appetizing!`;
    const system = 'You are an expert restaurant sommelier. Be friendly, concise, and persuasive.';

    try {
      const text = await fetchGemini(prompt, system);
      setRecommendation(text);
    } catch (e) {
      setRecommendation("I'm having trouble thinking of a dish right now. Try our Butter Chicken!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-16 px-4">
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BrainCircuit className="text-white" size={20} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">AI Smart Plate</h3>
        </div>
        <p className="text-gray-600 mb-6 text-sm">
          Tell us how you're feeling or what you're craving, and our AI will pick the perfect dish
          for you!
        </p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="e.g., I want something spicy but light for a summer afternoon..."
            className="flex-1 px-4 py-2 rounded-lg border border-indigo-100 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && getRecommendation()}
          />
          <Button variant="ai" onClick={getRecommendation} loading={loading}>
            Suggest
          </Button>
        </div>

        {recommendation && (
          <div className="bg-white p-4 rounded-lg border border-indigo-50 shadow-sm animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-3">
              <MessageSquare className="text-indigo-400 mt-1 shrink-0" size={18} />
              <p className="text-indigo-900 italic text-sm leading-relaxed">{recommendation}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AISmartPlate;
