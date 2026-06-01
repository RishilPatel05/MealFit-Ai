import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 image uploads
  app.use(express.json({ limit: '50mb' }));

  app.post('/api/gen-meal-plan', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'Missing GEMINI_API_KEY environment variable.' });
      }
      const ai = new GoogleGenAI({ apiKey });
      const { prompt } = req.body;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are a nutrition API that returns only valid JSON objects. Never use markdown, backticks, or any text outside the JSON.',
          temperature: 0.2
        }
      });
      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message || 'Error generating plan' });
    }
  });

  app.post('/api/gen-schedule', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'Missing GEMINI_API_KEY environment variable.' });
      }
      const ai = new GoogleGenAI({ apiKey });
      const { prompt } = req.body;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are a nutrition API that returns only valid JSON objects. Never use markdown, backticks, or any text outside the JSON.',
          temperature: 0.2
        }
      });
      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message || 'Error generating schedule' });
    }
  });

  app.post('/api/analyze-food', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'Missing GEMINI_API_KEY environment variable.' });
      }
      const ai = new GoogleGenAI({ apiKey });
      const { imageBase64 } = req.body;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { inlineData: { data: imageBase64, mimeType: 'image/jpeg' } },
          'You are a nutrition analysis AI. Analyze food images and return JSON only. Expected JSON: { "foods": [{ "name": "...", "quantity": "...", "calories": 0, "protein": 0, "carbs": 0, "fat": 0 }], "totals": { "calories": 0, "protein": 0, "carbs": 0, "fat": 0 }, "confidence": 0.9, "notes": "..." }. No markdown. No backticks.'
        ],
        config: {
          temperature: 0.2
        }
      });
      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message || 'Error analyzing food' });
    }
  });

  app.post('/api/regen-meal', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'Missing GEMINI_API_KEY environment variable.' });
      }
      const ai = new GoogleGenAI({ apiKey });
      const { meal, instructions, preferences } = req.body;
      
      const prompt = `Rewrite this meal according to the instructions.
      Current Meal: ${JSON.stringify(meal)}
      User Instructions: ${instructions}
      User Dietary Preferences: ${JSON.stringify(preferences)}
      
      Return JSON only matching this schema:
      {
        "type": "${meal.type}",
        "name": "Recipe Name",
        "calories": 0,
        "protein": 0,
        "carbs": 0,
        "fat": 0,
        "prepTime": 0,
        "prepNote": "Actionable instructions"
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are a nutrition API that returns only valid JSON objects. Never use markdown, backticks, or any text outside the JSON.',
          temperature: 0.2
        }
      });
      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message || 'Error generating new meal' });
    }
  });

  app.post('/api/gen-recipe-details', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'Missing GEMINI_API_KEY environment variable.' });
      }
      const ai = new GoogleGenAI({ apiKey });
      const { meal, preferences } = req.body;
      
      const prompt = `Based on this meal, generate full cooking instructions and an ingredient list.
      Meal: ${JSON.stringify(meal)}
      User Dietary Preferences: ${JSON.stringify(preferences)}
      
      Return JSON only matching this schema:
      {
        "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity"],
        "instructions": ["Step 1...", "Step 2..."]
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are a nutrition API that returns only valid JSON objects. Never use markdown, backticks, or any text outside the JSON.',
          temperature: 0.2
        }
      });
      res.json({ text: response.text });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ error: e.message || 'Error generating recipe details' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve static files and handle SPA fallback
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
