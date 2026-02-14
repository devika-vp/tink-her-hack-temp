// backend.js - Safe way to handle Gemini API
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/generate-places", async (req, res) => {
    try {
        const { state, days, preferences } = req.body;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `You are a solo travel safety expert. Recommend exactly 5 best places to visit in ${state}, India for a ${days}-day trip. User preferences: ${preferences.join(", ") || "any type"}. 

For each place, provide:
- Place name
- Best season to visit
- Best time of day to visit
- Why it's safe for solo travelers

Format as JSON array with objects containing: name, season, time, safetyReason`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parse JSON from response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            res.json(JSON.parse(jsonMatch[0]));
        } else {
            res.status(400).json({ error: "Could not parse response" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
