// Elements
const userNameSpan = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");
const resultDiv = document.getElementById("result");
const generateBtn = document.getElementById("generateBtn");

// Step tracking
let currentStep = 1;
let userAnswers = {
    travelStyle: null,
    experience: null,
    state: null,
    days: null,
    preferences: []
};

// Get user info from localStorage
const name = localStorage.getItem("userName");
const email = localStorage.getItem("userEmail");

// Redirect to index if not logged in
if (!name || !email) {
    window.location.href = "index.html";
} else {
    if (userNameSpan) userNameSpan.textContent = name;
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html";
    });
}

// Comprehensive State Details for All India (28 States)
const stateDetails = {
    "Andhra Pradesh": {
        highlights: "Temples, beaches, ancient sites",
        safety: "Safe",
        bestFor: "Culture & history lovers",
        weather: "Hot, 25-35°C",
        matches: { adventure: 3, beach: 3, culture: 5, nature: 3, mix: 4 }
    },
    "Arunachal Pradesh": {
        highlights: "Mountain monasteries, trekking, tribal culture",
        safety: "Safe",
        bestFor: "Adventure seekers",
        weather: "Cool, 10-25°C",
        matches: { adventure: 5, beach: 0, culture: 4, nature: 5, mix: 4 }
    },
    "Assam": {
        highlights: "Tea gardens, wildlife, one-horned rhinos",
        safety: "Very Safe",
        bestFor: "Nature enthusiasts",
        weather: "Warm, 20-30°C",
        matches: { adventure: 4, beach: 0, culture: 3, nature: 5, mix: 4 }
    },
    "Bihar": {
        highlights: "Bodh Gaya, Nalanda, pilgrimage sites",
        safety: "Safe",
        bestFor: "Spiritual travelers",
        weather: "Hot, 25-35°C",
        matches: { adventure: 2, beach: 0, culture: 5, nature: 2, mix: 3 }
    },
    "Chhattisgarh": {
        highlights: "Forests, tribal culture, waterfalls",
        safety: "Safe",
        bestFor: "Nature lovers",
        weather: "Hot, 25-35°C",
        matches: { adventure: 4, beach: 0, culture: 3, nature: 5, mix: 3 }
    },
    "Goa": {
        highlights: "Beaches, forts, nightlife, Portuguese heritage",
        safety: "Safe",
        bestFor: "Beach & relaxation lovers",
        weather: "Tropical, 25-30°C",
        matches: { adventure: 3, beach: 5, culture: 3, nature: 2, mix: 4 }
    },
    "Gujarat": {
        highlights: "Deserts, temples, heritage sites, textile culture",
        safety: "Very Safe",
        bestFor: "Cultural explorers",
        weather: "Hot, 25-35°C",
        matches: { adventure: 4, beach: 3, culture: 5, nature: 3, mix: 4 }
    },
    "Haryana": {
        highlights: "Spiritual sites, forests, adventure sports",
        safety: "Very Safe",
        bestFor: "Adventure seekers",
        weather: "Moderate, 15-32°C",
        matches: { adventure: 5, beach: 0, culture: 3, nature: 3, mix: 3 }
    },
    "Himachal Pradesh": {
        highlights: "Mountains, trekking, adventure, temples",
        safety: "Very Safe",
        bestFor: "Adventure & nature lovers",
        weather: "Cool, 5-25°C",
        matches: { adventure: 5, beach: 0, culture: 3, nature: 5, mix: 5 }
    },
    "Jharkhand": {
        highlights: "Waterfalls, tribes, forests, mineral wealth",
        safety: "Safe",
        bestFor: "Adventure & nature seekers",
        weather: "Hot, 20-32°C",
        matches: { adventure: 4, beach: 0, culture: 3, nature: 5, mix: 3 }
    },
    "Karnataka": {
        highlights: "Hampi, palaces, coffee plantations, beaches",
        safety: "Safe",
        bestFor: "Adventure & history enthusiasts",
        weather: "Temperate, 20-28°C",
        matches: { adventure: 5, beach: 2, culture: 5, nature: 4, mix: 4 }
    },
    "Kerala": {
        highlights: "Beaches, backwaters, mountains, tea gardens",
        safety: "Very Safe",
        bestFor: "Beach lovers & culture seekers",
        weather: "Tropical, 24-28°C",
        matches: { adventure: 4, beach: 5, culture: 4, nature: 5, mix: 5 }
    },
    "Madhya Pradesh": {
        highlights: "Ancient temples, palaces, diamond mines",
        safety: "Safe",
        bestFor: "History & culture travelers",
        weather: "Hot, 25-35°C",
        matches: { adventure: 3, beach: 0, culture: 5, nature: 3, mix: 3 }
    },
    "Maharashtra": {
        highlights: "Forts, beaches, Bollywood, temples",
        safety: "Very Safe",
        bestFor: "Culture & beach lovers",
        weather: "Warm, 20-35°C",
        matches: { adventure: 4, beach: 4, culture: 5, nature: 3, mix: 5 }
    },
    "Manipur": {
        highlights: "Floating lakes, mountains, ancient temples",
        safety: "Safe",
        bestFor: "Nature & culture explorers",
        weather: "Cool, 15-28°C",
        matches: { adventure: 4, beach: 0, culture: 4, nature: 4, mix: 4 }
    },
    "Meghalaya": {
        highlights: "Waterfalls, caves, clouds, tribal heritage",
        safety: "Very Safe",
        bestFor: "Adventure & nature seekers",
        weather: "Cool & wet, 15-25°C",
        matches: { adventure: 5, beach: 0, culture: 3, nature: 5, mix: 4 }
    },
    "Mizoram": {
        highlights: "Mountains, bamboo forests, tribal culture",
        safety: "Very Safe",
        bestFor: "Nature & trekking lovers",
        weather: "Cool, 10-28°C",
        matches: { adventure: 5, beach: 0, culture: 4, nature: 5, mix: 4 }
    },
    "Nagaland": {
        highlights: "Tribal villages, festivals, mountains",
        safety: "Safe",
        bestFor: "Cultural adventurers",
        weather: "Cool, 10-28°C",
        matches: { adventure: 4, beach: 0, culture: 5, nature: 4, mix: 4 }
    },
    "Odisha": {
        highlights: "Beaches, temples, tribal villages, museums",
        safety: "Safe",
        bestFor: "Religion & history explorers",
        weather: "Warm, 20-35°C",
        matches: { adventure: 3, beach: 4, culture: 5, nature: 3, mix: 4 }
    },
    "Punjab": {
        highlights: "Golden Temple, farms, heritage, Bollywood",
        safety: "Very Safe",
        bestFor: "Spiritual travelers",
        weather: "Moderate, 10-35°C",
        matches: { adventure: 2, beach: 0, culture: 4, nature: 2, mix: 3 }
    },
    "Rajasthan": {
        highlights: "Palaces, deserts, forts, colorful culture",
        safety: "Very Safe",
        bestFor: "Adventure & culture seekers",
        weather: "Hot, 20-40°C",
        matches: { adventure: 5, beach: 1, culture: 5, nature: 3, mix: 5 }
    },
    "Sikkim": {
        highlights: "Mountains, monasteries, alpine beauty, organic farming",
        safety: "Very Safe",
        bestFor: "Nature & adventure lovers",
        weather: "Cool, 0-20°C",
        matches: { adventure: 5, beach: 0, culture: 3, nature: 5, mix: 4 }
    },
    "Tamil Nadu": {
        highlights: "Temples, beaches, art, backwaters",
        safety: "Very Safe",
        bestFor: "Culture adventurers",
        weather: "Hot, 25-35°C",
        matches: { adventure: 3, beach: 4, culture: 5, nature: 3, mix: 4 }
    },
    "Telangana": {
        highlights: "Biryani culture, temples, Hyderabad tech hub",
        safety: "Very Safe",
        bestFor: "City & culture lovers",
        weather: "Hot, 25-35°C",
        matches: { adventure: 2, beach: 0, culture: 4, nature: 2, mix: 3 }
    },
    "Tripura": {
        highlights: "Temples, lakes, markets, tribal crafts",
        safety: "Very Safe",
        bestFor: "Cultural explorers",
        weather: "Warm, 20-32°C",
        matches: { adventure: 3, beach: 0, culture: 4, nature: 3, mix: 3 }
    },
    "Uttar Pradesh": {
        highlights: "Taj Mahal, Varanasi, temples, history",
        safety: "Safe",
        bestFor: "Spiritual & history travelers",
        weather: "Hot, 20-40°C",
        matches: { adventure: 3, beach: 0, culture: 5, nature: 2, mix: 3 }
    },
    "Uttarakhand": {
        highlights: "Mountains, temples, adventure, trekking",
        safety: "Very Safe",
        bestFor: "Adventure & nature seekers",
        weather: "Cool, 5-28°C",
        matches: { adventure: 5, beach: 0, culture: 3, nature: 5, mix: 5 }
    },
    "West Bengal": {
        highlights: "Darjeeling tea, mountains, Sundarbans tigers",
        safety: "Very Safe",
        bestFor: "Nature & culture explorers",
        weather: "Moderate, 10-32°C",
        matches: { adventure: 4, beach: 2, culture: 4, nature: 5, mix: 4 }
    },
    "Jammu & Kashmir": {
        highlights: "Lakes, mountains, houseboats, adventure",
        safety: "Safe",
        bestFor: "Adventure seekers",
        weather: "Cool, -5 to 25°C",
        matches: { adventure: 5, beach: 0, culture: 3, nature: 5, mix: 5 }
    },
    "Ladakh": {
        highlights: "High altitude deserts, monasteries, trekking",
        safety: "Very Safe",
        bestFor: "Adventure enthusiasts",
        weather: "Very cold, -10 to 15°C",
        matches: { adventure: 5, beach: 0, culture: 4, nature: 5, mix: 5 }
    }
};

// Recommendation logic
function getRecommendations(style, experience) {
    const recommendations = [];
    
    for (let state in stateDetails) {
        let score = stateDetails[state].matches[style] || 3;
        
        // Adjust score based on experience level
        if (experience === "beginner") {
            // Boost very safe destinations for beginners
            if (stateDetails[state].safety === "Very Safe") score += 2;
            else if (stateDetails[state].safety === "Safe") score += 1;
        } else if (experience === "advanced") {
            // Advanced travelers can go anywhere, no penalty
            score = Math.max(score, 3);
        }
        
        recommendations.push({
            state: state,
            score: score,
            reason: stateDetails[state].matches[style]
        });
    }
    
    return recommendations.sort((a, b) => b.score - a.score);
}

// Travel style selection
document.querySelectorAll(".style-option").forEach(btn => {
    btn.addEventListener("click", function() {
        document.querySelectorAll(".style-option").forEach(b => b.classList.remove("selected"));
        this.classList.add("selected");
        userAnswers.travelStyle = this.dataset.style;
        document.getElementById("nextBtn1").style.display = "inline-block";
    });
});

// Experience level selection
document.querySelectorAll(".exp-input").forEach(input => {
    input.addEventListener("change", function() {
        if (this.checked) {
            userAnswers.experience = this.value;
            document.getElementById("nextBtn2").style.display = "inline-block";
        }
    });
});

// Populate state cards
function populateStateCards() {
    const container = document.getElementById("stateCardsContainer");
    const recommendations = getRecommendations(userAnswers.travelStyle, userAnswers.experience);
    
    container.innerHTML = '';
    
    recommendations.forEach((rec, index) => {
        const state = rec.state;
        const details = stateDetails[state];
        
        let badge, badgeClass;
        if (index < 5) {
            badge = "⭐ Top Pick";
            badgeClass = "recommended";
        } else if (index < 15) {
            badge = "👍 Great Fit";
            badgeClass = "great-fit";
        } else {
            badge = "✓ Good Option";
            badgeClass = "good-option";
        }
        
        const card = document.createElement("div");
        card.className = "state-card";
        card.innerHTML = `
            <div class="state-card-content">
                <div class="state-info">
                    <h3>${state}</h3>
                    <div class="state-highlights">${details.highlights}</div>
                    <div class="state-safety">🛡️ ${details.safety}</div>
                    <div class="state-badge ${badgeClass}">${badge}</div>
                </div>
            </div>
        `;
        
        card.addEventListener("click", () => {
            document.querySelectorAll(".state-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            userAnswers.state = state;
            document.getElementById("nextBtn3").style.display = "inline-block";
            updateRecommendationMsg(state, details);
        });
        
        container.appendChild(card);
    });
    
    // Show recommendation message
    const msg = `✨ Based on your ${userAnswers.travelStyle} travel style and ${userAnswers.experience} experience, here are all Indian states ranked for you!`;
    document.getElementById("recommendationMsg").textContent = msg;
}

function updateRecommendationMsg(state, details) {
    const msg = `🎯 Perfect! ${state} is ideal for you. ${details.bestFor}. Perfect for ${userAnswers.experience === 'beginner' ? 'first-timers' : userAnswers.experience === 'intermediate' ? 'experienced explorers' : 'seasoned adventurers'}!`;
    document.getElementById("recommendationMsg").textContent = msg;
}

// Step navigation
function nextStep(step) {
    if (step === 1 && !userAnswers.travelStyle) {
        alert("Please select a travel style");
        return;
    }
    if (step === 2 && !userAnswers.experience) {
        alert("Please select experience level");
        return;
    }
    if (step === 3 && !userAnswers.state) {
        alert("Please select a destination");
        return;
    }
    if (step === 4 && !document.getElementById("days").value) {
        alert("Please enter number of days");
        return;
    }
    
    // Collect preferences on step 4
    if (step === 4) {
        userAnswers.days = document.getElementById("days").value;
        userAnswers.preferences = [];
        document.querySelectorAll(".pref-option input:checked").forEach(cb => {
            userAnswers.preferences.push(cb.value);
        });
    }
    
    // Show review on step 5
    if (step === 4) {
        showReview();
    }
    
    goToStep(step + 1);
}

function prevStep(step) {
    goToStep(step - 1);
}

function goToStep(step) {
    // Hide all steps
    document.querySelectorAll(".trip-step").forEach(s => s.classList.remove("active-step"));
    
    // Show new step
    const element = document.getElementById(`step${step}`);
    if (element) {
        element.classList.add("active-step");
    }
    
    // Update progress
    updateProgress(step);
    
    // Populate state cards on step 3
    if (step === 3) {
        populateStateCards();
    }
    
    currentStep = step;
}

function updateProgress(step) {
    const percentage = (step / 5) * 100;
    document.getElementById("progressFill").style.width = percentage + "%";
    document.getElementById("progressText").textContent = `Step ${step} of 5`;
}

function showReview() {
    const reviewHTML = `
        <div class="review-item">
            <div class="review-label">🎯 Travel Style</div>
            <div class="review-value">${userAnswers.travelStyle.charAt(0).toUpperCase() + userAnswers.travelStyle.slice(1)} Explorer</div>
        </div>
        <div class="review-item">
            <div class="review-label">👤 Experience Level</div>
            <div class="review-value">${userAnswers.experience.charAt(0).toUpperCase() + userAnswers.experience.slice(1)}</div>
        </div>
        <div class="review-item">
            <div class="review-label">📍 Destination</div>
            <div class="review-value">${userAnswers.state}</div>
        </div>
        <div class="review-item">
            <div class="review-label">🗓️ Duration</div>
            <div class="review-value">${userAnswers.days} Days</div>
        </div>
        <div class="review-item">
            <div class="review-label">🎯 Activities</div>
            <div class="review-value">${userAnswers.preferences.length > 0 ? userAnswers.preferences.join(', ') : 'Mix of everything'}</div>
        </div>
    `;
    document.getElementById("reviewCards").innerHTML = reviewHTML;
}

// Generate itinerary with Gemini AI
async function generateItinerary() {
    // Disable button
    generateBtn.disabled = true;
    generateBtn.textContent = "⏳ Generating...";
    
    // Save to localStorage
    localStorage.setItem("selectedCity", userAnswers.state);
    localStorage.setItem("tripDays", userAnswers.days);
    localStorage.setItem("tripPreferences", JSON.stringify(userAnswers.preferences));
    
    try {
        // Try to get AI recommendations
        const aiPlaces = await getAIPlaceRecommendations(
            userAnswers.state, 
            userAnswers.days, 
            userAnswers.preferences
        );
        
        if (aiPlaces) {
            localStorage.setItem("aiGeneratedPlaces", JSON.stringify(aiPlaces));
        }
    } catch (error) {
        console.log("AI recommendation skipped, using default places");
    }
    
    // Show message
    setTimeout(() => {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `
            <h3>✨ Your Safe Itinerary for ${userAnswers.state}</h3>
            <p>Duration: ${userAnswers.days} days</p>
            <p>Preferences: ${userAnswers.preferences.join(', ') || 'All attractions'}</p>
            <p style="margin-top: 20px; color: #10b981; font-weight: 600;">Redirecting to explore top places...</p>
        `;
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = "city-places.html";
        }, 2000);
    }, 500);
}

// Get AI place recommendations using Gemini
async function getAIPlaceRecommendations(state, days, preferences) {
    const apiKey = "AIzaSyBdO0RDuPEAnh1QArC6ZrPjiI5PcQfYj64";
    
    if (!apiKey || apiKey.includes("YOUR_")) {
        console.log("Gemini API key not configured.");
        return null;
    }

    try {
        const { GoogleGenerativeAI } = await import("https://cdn.jsdelivr.net/npm/@google/generative-ai@0.11.4/dist/index.min.js");
        const genAI = new GoogleGenerativeAI(apiKey);
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
        
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return null;
    } catch (error) {
        console.log("Gemini error:", error);
        return null;
    }
}

// Attach generate button listener
if (generateBtn) {
    generateBtn.addEventListener("click", generateItinerary);
}

// Initialize on first step
document.addEventListener("DOMContentLoaded", () => {
    goToStep(1);
});
