const apiKey = '';
const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025';

export const fetchGemini = async (prompt, systemInstruction = '') => {
  let retries = 0;
  const maxRetries = 5;
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  while (retries <= maxRetries) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemInstruction }] },
          }),
        }
      );
      const result = await response.json();
      return result.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (err) {
      if (retries === maxRetries) throw err;
      await delay(Math.pow(2, retries) * 1000);
      retries += 1;
    }
  }

  return '';
};
