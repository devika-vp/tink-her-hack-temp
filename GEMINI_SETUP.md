# Gemini Integration Guide for SafeRoute

## What This Does
Automatically generates personalized place recommendations using Google's Gemini AI based on:
- Selected state/city
- Trip duration
- User preferences (beaches, mountains, historical sites, etc.)

---

## Setup Instructions

### Step 1: Get Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### Step 2: Choose Integration Method

#### **Method A: Quick Demo (Frontend Only)**
✅ Easiest to try | ⚠️ API key visible in code

1. Open `plan-trip.js`
2. Find line 59 with `const apiKey = "YOUR_GEMINI_API_KEY_HERE"`
3. Replace with your actual API key: `const apiKey = "YOUR_ACTUAL_KEY"`
4. Visit `index.html` in browser
5. Fill form → Select state & preferences → Click "Generate" → Gemini recommends places! 🎉

#### **Method B: Secure Backend (Production)**
✅ Secure | ✅ API key hidden | 📦 Requires Node.js

**Installation:**
```bash
npm install express @google/generative-ai dotenv
```

**Setup:**
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and add your API key:
   ```
   GEMINI_API_KEY=paste_your_actual_key_here
   ```
3. Start backend:
   ```bash
   node backend.js
   ```
4. Server runs at `http://localhost:3000`

**Update Frontend:**
Replace the `getAIPlaceRecommendations` function in `plan-trip.js` with:
```javascript
async function getAIPlaceRecommendations(state, days, preferences) {
    try {
        const response = await fetch("http://localhost:3000/api/generate-places", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ state, days, preferences })
        });
        const places = await response.json();
        return places;
    } catch (error) {
        console.log("AI recommendation error:", error);
        return null;
    }
}
```

---

## How It Works

### User Flow:
1. User fills form: **Name, Email, Phone**
2. Redirected to trip planner
3. Selects: **State, Duration, Preferences**
4. Clicks **"Generate Safe Itinerary"**
5. ✨ Gemini AI analyzes preferences
6. Recommends **5 best places** with:
   - Season to visit
   - Best time of day
   - Safety information
7. User sees places with **flip-card animations**

### Data Flow:
```
User Input → Gemini AI → JSON Places → localStorage → city-places.js → Display
```

---

## Features

✅ AI picks places matching user preferences  
✅ Personalized best times to visit  
✅ Safety-focused recommendations  
✅ Fallback to default places if API fails  
✅ Works across all states (Kerala, Goa, Karnataka, Tamil Nadu)  

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "No places found" | Check if Gemini API key is valid |
| API key error | Ensure `.env` file has correct key |
| CORS error | Use Method B (backend) instead |
| Places not changing | Clear browser localStorage |

**Clear localStorage:**
```javascript
// Open browser console (F12) and run:
localStorage.clear();
```

---

## Example Gemini Response

When user selects: **Kerala, 5 days, Beaches + Mountains**

Gemini generates:
```json
[
  {
    "name": "Munnar",
    "season": "Oct-Feb",
    "time": "6-9 AM",
    "safetyReason": "Well-developed hill station with good infrastructure, frequent tourists, and safe trekking routes for solo travelers"
  },
  {
    "name": "Alleppey",
    "season": "Oct-Feb", 
    "time": "4-6:30 PM",
    "safetyReason": "Popular backwater destination with reliable boat operators, established tourism framework, and well-lit areas"
  }
  // ... 3 more places
]
```

---

## Next Steps

1. Choose Method A or B above
2. Test with different preferences
3. Customize Gemini prompt for your brand voice
4. Add image search integration for better photos
5. Store recommendations in database for analytics

