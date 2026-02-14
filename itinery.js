function generateSchedule() {

    // Display selected city and state
    const selectedCity = localStorage.getItem("selectedCityForTrip");
    const selectedState = localStorage.getItem("selectedStateForTrip");
    
    if (selectedCity) {
        document.getElementById("selectedCity").textContent = selectedCity;
    }
    if (selectedState) {
        document.getElementById("selectedState").textContent = selectedState;
    }

    let days = localStorage.getItem("tripDays") || 3;
    days = parseInt(days);

    document.getElementById("displayDays").innerText = days;

    // Fetch hotel, restaurant, and itinerary recommendations from Gemini API
    if (selectedCity) {
        fetchHotelsFromAPI(selectedCity, selectedState);
        fetchRestaurantsFromAPI(selectedCity, selectedState);
        fetchItineraryFromAPI(selectedCity, selectedState, days);
    } else {
        generateDefaultItinerary(days);
    }

    calculateTotal();
}

function calculateTotal() {

    let days = parseInt(localStorage.getItem("tripDays")) || 3;

    let hotelPerNight = parseInt(document.getElementById("hotelPerNight").value) || 0;
    let foodPerDay = parseInt(document.getElementById("foodPerDay").value) || 0;
    let travel = parseInt(document.getElementById("travelCost").value) || 0;
    let tickets = parseInt(document.getElementById("ticketsCost").value) || 0;

    let hotelTotal = hotelPerNight * days;
    let foodTotal = foodPerDay * days;

    let total = hotelTotal + foodTotal + travel + tickets;

    document.getElementById("totalDisplay").innerText =
        "Total Estimated Cost: ₹" + total.toLocaleString();
}

function downloadPDF() {
    window.print();
}

// Fetch personalized itinerary from Gemini API
async function fetchItineraryFromAPI(city, state, days) {
    const apiKey = "AIzaSyBdO0RDuPEAnh1QArC6ZrPjiI5PcQfYj64";
    
    if (!apiKey || apiKey.includes("YOUR_")) {
        generateDefaultItinerary(days);
        return;
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a travel expert. Create a detailed ${days}-day itinerary for ${city}, ${state}, India. Each day must have unique activities based on the city's features and attractions. Format your response as a JSON array with this exact structure:
[
  {
    "day": 1,
    "title": "Arrival & City Orientation",
    "activities": [
      "Arrive at the city/airport",
      "Check in to hotel",
      "Explore local market/neighborhood",
      "Evening street food experience"
    ]
  },
  {
    "day": 2,
    "title": "Main Attractions",
    "activities": [
      "Visit famous landmark/temple",
      "Local guide tour",
      "Photography session",
      "Sunset viewing at scenic spot"
    ]
  }
]

Make sure:
- Each day is unique and specific to ${city}
- Include 4-5 activities per day
- First day focuses on arrival and orientation
- Last day focuses on shopping/local experience before departure
- Activities are realistic and achievable in a day
- Include specific landmarks/attractions of ${city}

Only respond with valid JSON, no additional text.`
                        }]
                    }]
                })
            }
        );

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        // Parse JSON from response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            try {
                const itinerary = JSON.parse(jsonMatch[0]);
                displayItinerary(itinerary);
                return;
            } catch (e) {
                console.error("Error parsing itinerary JSON:", e);
            }
        }
    } catch (error) {
        console.error("Error fetching itinerary from Gemini:", error);
    }
    
    generateDefaultItinerary(days);
}

// Display itinerary from API
function displayItinerary(itinerary) {
    const container = document.getElementById("dayContainer");
    container.innerHTML = "";
    
    itinerary.forEach(dayPlan => {
        const activities = dayPlan.activities.map(activity => `<li>${activity}</li>`).join("");
        
        const dayCard = `
        <div class="card day-card">
            <div class="day-header">
                <h2>Day ${dayPlan.day}</h2>
                <span class="day-title">${dayPlan.title}</span>
            </div>
            <ul class="activities-list">${activities}</ul>
        </div>
        `;
        
        container.innerHTML += dayCard;
    });
}

// Generate default itinerary if API fails
function generateDefaultItinerary(days) {
    let container = document.getElementById("dayContainer");
    container.innerHTML = "";

    for (let i = 1; i <= days; i++) {

        let dayContent = "";
        let dayTitle = "";

        if (i === 1) {
            dayTitle = "Arrival & Orientation";
            dayContent = `
                <li>Arrive at destination/airport</li>
                <li>Hotel check-in & rest</li>
                <li>Explore nearby attractions</li>
                <li>Evening relaxation & local food</li>
            `;
        } 
        else if (i === days) {
            dayTitle = "Shopping & Departure";
            dayContent = `
                <li>Morning sightseeing</li>
                <li>Shopping & local souvenirs</li>
                <li>Local food tasting</li>
                <li>Prepare for return journey</li>
            `;
        } 
        else {
            dayTitle = "Adventure & Exploration";
            dayContent = `
                <li>Main tourist attraction visit</li>
                <li>Adventure / Cultural activity</li>
                <li>Photography & scenic viewpoint</li>
                <li>Evening leisure & local cuisine</li>
            `;
        }

        let dayCard = `
        <div class="card day-card">
            <div class="day-header">
                <h2>Day ${i}</h2>
                <span class="day-title">${dayTitle}</span>
            </div>
            <ul class="activities-list">${dayContent}</ul>
        </div>
        `;

        container.innerHTML += dayCard;
    }
}

// Fetch hotel recommendations from Gemini API
async function fetchHotelsFromAPI(city, state) {
    const apiKey = "AIzaSyBdO0RDuPEAnh1QArC6ZrPjiI5PcQfYj64";
    
    if (!apiKey || apiKey.includes("YOUR_")) {
        displayDefaultHotels();
        return;
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a travel expert. Provide 3 recommended hotels in ${city}, ${state}, India suitable for solo travelers. Format your response as a JSON array with exactly this structure:
[
  {
    "name": "Hotel Name",
    "stars": 4,
    "pricePerNight": 3500,
    "features": "AC, WiFi, 24-hour reception, restaurant",
    "safetyRating": "Very Safe",
    "bestFor": "Solo travelers"
  }
]

Only respond with valid JSON, no additional text.`
                        }]
                    }]
                })
            }
        );

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        // Parse JSON from response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const hotels = JSON.parse(jsonMatch[0]);
            displayHotels(hotels);
            return;
        }
    } catch (error) {
        console.error("Error fetching hotels from Gemini:", error);
    }
    
    displayDefaultHotels();
}

// Fetch restaurant recommendations from Gemini API
async function fetchRestaurantsFromAPI(city, state) {
    const apiKey = "AIzaSyBdO0RDuPEAnh1QArC6ZrPjiI5PcQfYj64";
    
    if (!apiKey || apiKey.includes("YOUR_")) {
        displayDefaultRestaurants();
        return;
    }

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a travel expert. Provide 3 recommended restaurants in ${city}, ${state}, India. Format your response as a JSON array with exactly this structure:
[
  {
    "name": "Restaurant Name",
    "cuisine": "North Indian / Italian / Continental",
    "avgCost": 300,
    "highlights": "Must-try dish or specialty"
  }
]

Only respond with valid JSON, no additional text.`
                        }]
                    }]
                })
            }
        );

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        // Parse JSON from response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const restaurants = JSON.parse(jsonMatch[0]);
            displayRestaurants(restaurants);
            return;
        }
    } catch (error) {
        console.error("Error fetching restaurants from Gemini:", error);
    }
    
    displayDefaultRestaurants();
}

// Display hotels in the UI
function displayHotels(hotels) {
    const container = document.getElementById("hotelContainer");
    container.innerHTML = "";
    
    hotels.forEach(hotel => {
        const hotelCard = document.createElement("div");
        hotelCard.className = "hotel-item";
        hotelCard.innerHTML = `
            <div class="hotel-header">
                <h3>${hotel.name}</h3>
                <span class="hotel-rating">${"⭐".repeat(hotel.stars)}</span>
            </div>
            <p><strong>Price:</strong> ₹${hotel.pricePerNight}/night</p>
            <p><strong>Features:</strong> ${hotel.features}</p>
            <p><strong>Safety Rating:</strong> <span style="color: #10b981; font-weight: bold;">${hotel.safetyRating}</span></p>
            <p><strong>Best For:</strong> ${hotel.bestFor}</p>
        `;
        container.appendChild(hotelCard);
    });
}

// Display restaurants in the UI
function displayRestaurants(restaurants) {
    const container = document.getElementById("restaurantContainer");
    container.innerHTML = "";
    
    restaurants.forEach(restaurant => {
        const restaurantItem = document.createElement("div");
        restaurantItem.className = "restaurant-item";
        restaurantItem.innerHTML = `
            <div class="restaurant-header">
                <h3>${restaurant.name}</h3>
                <span class="cuisine-tag">${restaurant.cuisine}</span>
            </div>
            <p><strong>Average Cost:</strong> ₹${restaurant.avgCost} per person</p>
            <p><strong>Highlights:</strong> ${restaurant.highlights}</p>
        `;
        container.appendChild(restaurantItem);
    });
}

// Display default hotels if API fails
function displayDefaultHotels() {
    const container = document.getElementById("hotelContainer");
    container.innerHTML = `
        <div class="hotel-item">
            <div class="hotel-header">
                <h3>Hotel Comfort Stay</h3>
                <span class="hotel-rating">⭐⭐⭐⭐</span>
            </div>
            <p><strong>Price:</strong> ₹2500/night</p>
            <p><strong>Features:</strong> AC, WiFi, 24-hour reception, restaurant</p>
            <p><strong>Safety Rating:</strong> <span style="color: #10b981; font-weight: bold;">Very Safe</span></p>
        </div>
        <div class="hotel-item">
            <div class="hotel-header">
                <h3>Business Hotel Plus</h3>
                <span class="hotel-rating">⭐⭐⭐⭐⭐</span>
            </div>
            <p><strong>Price:</strong> ₹4000/night</p>
            <p><strong>Features:</strong> Gym, spa, premium rooms, conference hall</p>
            <p><strong>Safety Rating:</strong> <span style="color: #10b981; font-weight: bold;">Very Safe</span></p>
        </div>
    `;
}

// Display default restaurants if API fails
function displayDefaultRestaurants() {
    const container = document.getElementById("restaurantContainer");
    container.innerHTML = `
        <div class="restaurant-item">
            <div class="restaurant-header">
                <h3>Spice Garden</h3>
                <span class="cuisine-tag">North Indian</span>
            </div>
            <p><strong>Average Cost:</strong> ₹350 per person</p>
            <p><strong>Highlights:</strong> Authentic North Indian cuisine, butter paneer masala</p>
        </div>
        <div class="restaurant-item">
            <div class="restaurant-header">
                <h3>Mountain View Café</h3>
                <span class="cuisine-tag">Continental</span>
            </div>
            <p><strong>Average Cost:</strong> ₹500 per person</p>
            <p><strong>Highlights:</strong> Scenic views, vegetarian options, great for coffee</p>
        </div>
        <div class="restaurant-item">
            <div class="restaurant-header">
                <h3>Royal Dine</h3>
                <span class="cuisine-tag">Multi-Cuisine</span>
            </div>
            <p><strong>Average Cost:</strong> ₹400 per person</p>
            <p><strong>Highlights:</strong> Family-friendly, local and international dishes</p>
        </div>
    `;
}

window.onload = generateSchedule;