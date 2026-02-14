// Get selected state from localStorage
const selectedState = localStorage.getItem("selectedCity");

// Redirect if nothing selected
if (!selectedState) {
    alert("No state selected! Redirecting to Trip Planner.");
    window.location.href = "plan-trip.html";
}

// Back button functionality
const backBtn = document.getElementById("backBtn");
if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.location.href = "plan-trip.html";
    });
}

// City Data - Comprehensive Database for All 28 Indian States
const cityData = {
    "Andhra Pradesh": [
        { name: "Tirupati", season: "Oct–Mar", time: "Morning", lat: 13.1939, lng: 79.1941, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Sri_Venkateshwara_Temple%2C_Tirupati_02.JPG/800px-Sri_Venkateshwara_Temple%2C_Tirupati_02.JPG" },
        { name: "Vijayawada", season: "Oct–Mar", time: "Morning", lat: 16.5062, lng: 80.6480, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Kanaka_Durga_temple%2C_Vijayawada.jpg/800px-Kanaka_Durga_temple%2C_Vijayawada.jpg" },
        { name: "Visakhapatnam", season: "Nov–Feb", time: "Morning", lat: 17.6869, lng: 83.2185, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Simhachalam_Temple%2C_Visakhapatnam.jpg/800px-Simhachalam_Temple%2C_Visakhapatnam.jpg" }
    ],
    "Arunachal Pradesh": [
        { name: "Tawang", season: "Mar–May, Sep–Oct", time: "Morning", lat: 27.5844, lng: 91.8915, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Tawang_Monastery2.jpg/800px-Tawang_Monastery2.jpg" },
        { name: "Itanagar", season: "Oct–Mar", time: "Morning", lat: 28.0674, lng: 93.6101, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Itanagar_Citadel.jpg/800px-Itanagar_Citadel.jpg" },
        { name: "Dibrugarh", season: "Oct–Mar", time: "Morning", lat: 27.4891, lng: 94.9142, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Dibrugarh_Refinery.jpg/800px-Dibrugarh_Refinery.jpg" }
    ],
    "Assam": [
        { name: "Guwahati", season: "Oct–Mar", time: "Morning", lat: 26.1445, lng: 91.7362, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Kamakhya_Temple%2C_Guwahati.jpg/800px-Kamakhya_Temple%2C_Guwahati.jpg" },
        { name: "Kaziranga", season: "Nov–Feb", time: "Early Morning", lat: 26.5928, lng: 93.1654, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Kaziranga_National_Park.jpg/800px-Kaziranga_National_Park.jpg" },
        { name: "Jorhat", season: "Oct–Mar", time: "Morning", lat: 26.7509, lng: 94.2037, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Jorhat_Tea_gardens.jpg/800px-Jorhat_Tea_gardens.jpg" }
    ],
    "Bihar": [
        { name: "Bodh Gaya", season: "Oct–Mar", time: "Morning", lat: 24.6958, lng: 84.9882, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bodh_Gaya_Temple.jpg/800px-Bodh_Gaya_Temple.jpg" },
        { name: "Nalanda", season: "Oct–Feb", time: "Morning", lat: 25.1456, lng: 85.4747, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Nalanda_remains.jpg/800px-Nalanda_remains.jpg" },
        { name: "Patna", season: "Oct–Mar", time: "Morning", lat: 25.5941, lng: 85.1376, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Patna_Ghat.jpg/800px-Patna_Ghat.jpg" }
    ],
    "Chhattisgarh": [
        { name: "Raipur", season: "Oct–Mar", time: "Morning", lat: 21.2514, lng: 81.6296, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Raipur_City.jpg/800px-Raipur_City.jpg" },
        { name: "Jagdalpur", season: "Oct–Mar", time: "Morning", lat: 19.0760, lng: 82.0091, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Jagdalpur_Bastar.jpg/800px-Jagdalpur_Bastar.jpg" },
        { name: "Dantewada", season: "Oct–Feb", time: "Morning", lat: 19.3000, lng: 81.3667, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Dantewada_Fort.jpg/800px-Dantewada_Fort.jpg" }
    ],
    "Goa": [
        { name: "Aguada Fort", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aguada_Fort_Goa.jpg/800px-Aguada_Fort_Goa.jpg", season: "Nov–Feb", time: "Morning/Sunset", lat: 15.4909, lng: 73.7618 },
        { name: "Dudhsagar Falls", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Dudhsagar_Falls.jpg/800px-Dudhsagar_Falls.jpg", season: "Jun–Sep", time: "Morning", lat: 15.3185, lng: 73.9842 },
        { name: "Basilica of Bom Jesus", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Basilica_of_Bom_Jesus%2C_Goa.jpg/800px-Basilica_of_Bom_Jesus%2C_Goa.jpg", season: "Year-round", time: "Morning/Evening", lat: 15.4937, lng: 73.8266 },
        { name: "Palolem Beach", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Palolem_Beach_Goa.jpg/800px-Palolem_Beach_Goa.jpg", season: "Nov–Feb", time: "Evening", lat: 14.0344, lng: 73.9838 },
        { name: "Fontainhas", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Fontainhas_old_town_Goa.jpg/800px-Fontainhas_old_town_Goa.jpg", season: "Oct–Mar", time: "Afternoon", lat: 15.4970, lng: 73.8284 }
    ],
    "Gujarat": [
        { name: "Ahmedabad", season: "Oct–Mar", time: "Morning", lat: 23.0225, lng: 72.5714, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ahmedabad_City.jpg/800px-Ahmedabad_City.jpg" },
        { name: "Vadodara", season: "Oct–Mar", time: "Morning", lat: 22.3072, lng: 73.1812, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Vadodara_Palace.jpg/800px-Vadodara_Palace.jpg" },
        { name: "Jamnagar", season: "Nov–Feb", time: "Morning", lat: 22.4707, lng: 70.0883, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Jamnagar_City.jpg/800px-Jamnagar_City.jpg" },
        { name: "Dwarka", season: "Oct–Mar", time: "Morning", lat: 22.2391, lng: 68.9680, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Dwarka_Temple.jpg/800px-Dwarka_Temple.jpg" }
    ],
    "Haryana": [
        { name: "Gurugram", season: "Oct–Mar", time: "Morning", lat: 28.4595, lng: 77.0266, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Gurugram_Skyline.jpg/800px-Gurugram_Skyline.jpg" },
        { name: "Faridabad", season: "Oct–Mar", time: "Morning", lat: 28.4089, lng: 77.3178, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Faridabad_City.jpg/800px-Faridabad_City.jpg" },
        { name: "Panipat", season: "Oct–Mar", time: "Morning", lat: 29.3899, lng: 77.2787, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Panipat_historical.jpg/800px-Panipat_historical.jpg" }
    ],
    "Himachal Pradesh": [
        { name: "Shimla", season: "Oct–Feb", time: "Morning", lat: 31.7724, lng: 77.1839, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Shimla_Ridge.jpg/800px-Shimla_Ridge.jpg" },
        { name: "Manali", season: "Mar–Jun, Sep–Oct", time: "Morning", lat: 32.2396, lng: 77.1887, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Manali_Valley.jpg/800px-Manali_Valley.jpg" },
        { name: "Dalhousie", season: "Mar–Jun, Sep–Nov", time: "Morning", lat: 32.5425, lng: 75.9370, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Dalhousie_Himachal.jpg/800px-Dalhousie_Himachal.jpg" },
        { name: "Kasauli", season: "Mar–Jun, Sep–Nov", time: "Morning", lat: 30.9211, lng: 76.7628, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Kasauli_Hill_Station.jpg/800px-Kasauli_Hill_Station.jpg" }
    ],
    "Jharkhand": [
        { name: "Ranchi", season: "Oct–Mar", time: "Morning", lat: 23.3441, lng: 85.3096, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Ranchi_waterfall.jpg/800px-Ranchi_waterfall.jpg" },
        { name: "Jamshedpur", season: "Oct–Mar", time: "Morning", lat: 22.8046, lng: 86.1824, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Jamshedpur_City.jpg/800px-Jamshedpur_City.jpg" },
        { name: "Jamsai", season: "Oct–Mar", time: "Morning", lat: 24.2155, lng: 85.2789, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Jamshedpur_landscape.jpg/800px-Jamshedpur_landscape.jpg" }
    ],
    "Karnataka": [
        { name: "Hampi", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Hampi_monuments.jpg/800px-Hampi_monuments.jpg", season: "Oct–Mar", time: "Sunrise", lat: 15.3350, lng: 76.4636 },
        { name: "Mysore Palace", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Mysore_Palace_front.jpg/800px-Mysore_Palace_front.jpg", season: "Oct–Mar", time: "7 PM illumination", lat: 12.3051, lng: 76.6551 },
        { name: "Madikeri", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Madikeri_Fort.jpg/800px-Madikeri_Fort.jpg", season: "Oct–Mar", time: "Morning", lat: 12.4386, lng: 75.7304 },
        { name: "Gokarna", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Gokarna_beach.jpg/800px-Gokarna_beach.jpg", season: "Oct–Mar", time: "Evening", lat: 14.5516, lng: 74.3149 },
        { name: "Jog Falls", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Jog_Falls.jpg/800px-Jog_Falls.jpg", season: "Jun–Sep", time: "Morning", lat: 13.8411, lng: 75.2143 }
    ],
    "Kerala": [
        { name: "Munnar", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Munnar_tea_hills.jpg/800px-Munnar_tea_hills.jpg", season: "Oct–Feb (Winter), Mar–May", time: "6–9 AM", lat: 10.5869, lng: 77.0595 },
        { name: "Alleppey", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Alleppey_backwaters.jpg/800px-Alleppey_backwaters.jpg", season: "Oct–Feb", time: "4–6:30 PM", lat: 9.4981, lng: 76.3355 },
        { name: "Wayanad", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Wayanad_landscape.jpg/800px-Wayanad_landscape.jpg", season: "Oct–May", time: "7–10 AM", lat: 11.5967, lng: 76.0674 },
        { name: "Thekkady", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Thekkady_Lake.jpg/800px-Thekkady_Lake.jpg", season: "Oct–Feb", time: "7:30 AM", lat: 9.8789, lng: 77.1680 },
        { name: "Varkala", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Varkala_cliff.jpg/800px-Varkala_cliff.jpg", season: "Oct–Mar", time: "After 5 PM", lat: 8.7379, lng: 76.7260 }
    ],
    "Madhya Pradesh": [
        { name: "Indore", season: "Oct–Mar", time: "Morning", lat: 22.7196, lng: 75.8577, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Indore_City.jpg/800px-Indore_City.jpg" },
        { name: "Bhopal", season: "Oct–Mar", time: "Morning", lat: 23.1815, lng: 77.4104, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Bhopal_Lakes.jpg/800px-Bhopal_Lakes.jpg" },
        { name: "Gwalior", season: "Oct–Mar", time: "Morning", lat: 26.2183, lng: 78.1914, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Gwalior_Fort.jpg/800px-Gwalior_Fort.jpg" },
        { name: "Khajuraho", season: "Oct–Mar", time: "Morning", lat: 25.0050, lng: 79.6670, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Khajuraho_Temples.jpg/800px-Khajuraho_Temples.jpg" }
    ],
    "Maharashtra": [
        { name: "Mumbai", season: "Nov–Feb", time: "Evening", lat: 19.0760, lng: 72.8777, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Gateway_of_India.jpg/800px-Gateway_of_India.jpg" },
        { name: "Pune", season: "Oct–Feb", time: "Morning", lat: 18.5204, lng: 73.8567, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Pune_skyline.jpg/800px-Pune_skyline.jpg" },
        { name: "Aurangabad", season: "Oct–Mar", time: "Morning", lat: 19.8762, lng: 75.3433, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Ajanta_Caves.jpg/800px-Ajanta_Caves.jpg" },
        { name: "Nashik", season: "Oct–Feb", time: "Morning", lat: 19.9975, lng: 73.7898, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Nashik_City.jpg/800px-Nashik_City.jpg" }
    ],
    "Manipur": [
        { name: "Imphal", season: "Oct–Mar", time: "Morning", lat: 24.8170, lng: 94.9062, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Imphal_City.jpg/800px-Imphal_City.jpg" },
        { name: "Loktak Lake", season: "Oct–Mar", time: "Morning", lat: 24.5500, lng: 94.1200, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Loktak_Lake.jpg/800px-Loktak_Lake.jpg" },
        { name: "Ukhrul", season: "Oct–Mar", time: "Morning", lat: 24.7500, lng: 94.6667, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Ukhrul_hills.jpg/800px-Ukhrul_hills.jpg" }
    ],
    "Meghalaya": [
        { name: "Shillong", season: "Oct–Mar", time: "Morning", lat: 25.5788, lng: 91.8933, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Shillong_City.jpg/800px-Shillong_City.jpg" },
        { name: "Cherrapunji", season: "Jun–Sep", time: "Afternoon", lat: 25.2733, lng: 91.7368, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Cherrapunji_falls.jpg/800px-Cherrapunji_falls.jpg" },
        { name: "Mawlynnong", season: "Oct–Mar", time: "Morning", lat: 25.2917, lng: 92.0183, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Mawlynnong_village.jpg/800px-Mawlynnong_village.jpg" }
    ],
    "Mizoram": [
        { name: "Aizawl", season: "Oct–Mar", time: "Morning", lat: 23.1815, lng: 92.7879, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Aizawl_City.jpg/800px-Aizawl_City.jpg" },
        { name: "Lunglei", season: "Oct–Mar", time: "Morning", lat: 22.8833, lng: 93.1167, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Lunglei_Mizoram.jpg/800px-Lunglei_Mizoram.jpg" },
        { name: "Champhai", season: "Oct–Mar", time: "Morning", lat: 23.4500, lng: 93.3167, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Champhai_city.jpg/800px-Champhai_city.jpg" }
    ],
    "Nagaland": [
        { name: "Kohima", season: "Oct–Mar", time: "Morning", lat: 25.6114, lng: 94.1080, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Kohima_City.jpg/800px-Kohima_City.jpg" },
        { name: "Dimapur", season: "Oct–Mar", time: "Morning", lat: 25.9063, lng: 93.7367, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Dimapur_Nagaland.jpg/800px-Dimapur_Nagaland.jpg" },
        { name: "Mokokchung", season: "Oct–Mar", time: "Morning", lat: 26.0417, lng: 94.5289, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mokokchung_Nagaland.jpg/800px-Mokokchung_Nagaland.jpg" }
    ],
    "Odisha": [
        { name: "Bhubaneswar", season: "Oct–Mar", time: "Morning", lat: 20.2961, lng: 85.8245, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Lingaraj_Temple.jpg/800px-Lingaraj_Temple.jpg" },
        { name: "Puri", season: "Oct–Mar", time: "Morning", lat: 19.8136, lng: 85.8349, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Jagannath_Temple_Puri.jpg/800px-Jagannath_Temple_Puri.jpg" },
        { name: "Cuttack", season: "Oct–Mar", time: "Morning", lat: 20.4625, lng: 85.8913, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Cuttack_City.jpg/800px-Cuttack_City.jpg" }
    ],
    "Punjab": [
        { name: "Amritsar", season: "Oct–Mar", time: "Early Morning", lat: 31.6340, lng: 74.8711, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Golden_Temple_Amritsar.jpg/800px-Golden_Temple_Amritsar.jpg" },
        { name: "Jaipur", season: "Oct–Mar", time: "Morning", lat: 26.9124, lng: 75.7873, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Hawa_Mahal_Jaipur.jpg/800px-Hawa_Mahal_Jaipur.jpg" },
        { name: "Chandigarh", season: "Oct–Mar", time: "Morning", lat: 30.7333, lng: 76.7794, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Chandigarh_City.jpg/800px-Chandigarh_City.jpg" }
    ],
    "Rajasthan": [
        { name: "Jaipur", season: "Oct–Mar", time: "Morning", lat: 26.9124, lng: 75.7873, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Hawa_Mahal_Jaipur.jpg/800px-Hawa_Mahal_Jaipur.jpg" },
        { name: "Udaipur", season: "Oct–Mar", time: "Sunset", lat: 24.5854, lng: 73.7125, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Lake_Palace_Udaipur.jpg/800px-Lake_Palace_Udaipur.jpg" },
        { name: "Jodhpur", season: "Oct–Mar", time: "Morning", lat: 26.2389, lng: 73.0243, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Mehrangarh_Fort_Jodhpur.jpg/800px-Mehrangarh_Fort_Jodhpur.jpg" },
        { name: "Jaisalmer", season: "Oct–Mar", time: "Sunset", lat: 26.9124, lng: 70.9142, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Jaisalmer_Fort.jpg/800px-Jaisalmer_Fort.jpg" }
    ],
    "Sikkim": [
        { name: "Gangtok", season: "Mar–May, Sep–Nov", time: "Morning", lat: 27.5330, lng: 88.6119, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Gangtok_City.jpg/800px-Gangtok_City.jpg" },
        { name: "Darjeeling", season: "Sep–Nov, Mar–May", time: "Sunrise", lat: 27.0410, lng: 88.2663, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Darjeeling_tea_gardens.jpg/800px-Darjeeling_tea_gardens.jpg" },
        { name: "Pelling", season: "Oct–May", time: "Morning", lat: 27.8974, lng: 88.2505, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pelling_Sikkim.jpg/800px-Pelling_Sikkim.jpg" }
    ],
    "Tamil Nadu": [
        { name: "Meenakshi Temple", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Meenakshi_Temple_Madurai.jpg/800px-Meenakshi_Temple_Madurai.jpg", season: "Oct–Mar", time: "5 AM rituals", lat: 9.9252, lng: 78.1198 },
        { name: "Ooty", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ooty_Tea_Plantations.jpg/800px-Ooty_Tea_Plantations.jpg", season: "Oct–Feb", time: "Morning", lat: 11.4102, lng: 76.6950 },
        { name: "Mahabalipuram", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Mahabalipuram_Shore_Temple.jpg/800px-Mahabalipuram_Shore_Temple.jpg", season: "Nov–Feb", time: "Sunrise", lat: 12.5631, lng: 80.1924 },
        { name: "Rameswaram", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Rameswaram_Temple.jpg/800px-Rameswaram_Temple.jpg", season: "Oct–Mar", time: "Morning dip", lat: 9.2876, lng: 79.2689 },
        { name: "Kanyakumari", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Kanyakumari_Thiruvalluvar_statue.jpg/800px-Kanyakumari_Thiruvalluvar_statue.jpg", season: "Oct–Mar", time: "Sunrise/Sunset", lat: 8.0883, lng: 77.5385 }
    ],
    "Telangana": [
        { name: "Hyderabad", season: "Oct–Mar", time: "Evening", lat: 17.3850, lng: 78.4867, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Charminar_Hyderabad.jpg/800px-Charminar_Hyderabad.jpg" },
        { name: "Warangal", season: "Oct–Mar", time: "Morning", lat: 17.9689, lng: 79.5941, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Warangal_Fort.jpg/800px-Warangal_Fort.jpg" },
        { name: "Khammam", season: "Oct–Mar", time: "Morning", lat: 17.2627, lng: 80.4530, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Khammam_City.jpg/800px-Khammam_City.jpg" }
    ],
    "Tripura": [
        { name: "Agartala", season: "Oct–Mar", time: "Morning", lat: 23.8103, lng: 91.2789, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Agartala_Palace.jpg/800px-Agartala_Palace.jpg" },
        { name: "Udaipur", season: "Oct–Mar", time: "Morning", lat: 23.4330, lng: 91.4667, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Ujjayanta_Palace_Agartala.jpg/800px-Ujjayanta_Palace_Agartala.jpg" },
        { name: "Ambassa", season: "Oct–Mar", time: "Morning", lat: 23.8667, lng: 91.3500, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Ambassa_Tripura.jpg/800px-Ambassa_Tripura.jpg" }
    ],
    "Uttar Pradesh": [
        { name: "Varanasi", season: "Oct–Mar", time: "Sunrise", lat: 25.3201, lng: 82.9856, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Varanasi_Ghats.jpg/800px-Varanasi_Ghats.jpg" },
        { name: "Agra", season: "Oct–Mar", time: "Sunrise", lat: 27.1767, lng: 78.0081, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Taj_Mahal_Agra.jpg/800px-Taj_Mahal_Agra.jpg" },
        { name: "Lucknow", season: "Oct–Mar", time: "Morning", lat: 26.8467, lng: 80.9462, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bara_Imambara_Lucknow.jpg/800px-Bara_Imambara_Lucknow.jpg" },
        { name: "Ayodhya", season: "Oct–Mar", time: "Morning", lat: 26.8047, lng: 82.0009, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Ram_Mandir_Ayodhya.jpg/800px-Ram_Mandir_Ayodhya.jpg" }
    ],
    "Uttarakhand": [
        { name: "Rishikesh", season: "Oct–Mar", time: "Morning", lat: 30.0888, lng: 78.2679, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Rishikesh_Yoga_Capital.jpg/800px-Rishikesh_Yoga_Capital.jpg" },
        { name: "Nainital", season: "Mar–Jun, Sep–Nov", time: "Morning", lat: 29.3919, lng: 79.4504, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Nainital_Lake.jpg/800px-Nainital_Lake.jpg" },
        { name: "Auli", season: "Dec–Mar", time: "Morning", lat: 30.0272, lng: 79.2433, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Auli_Skiing.jpg/800px-Auli_Skiing.jpg" },
        { name: "Mussoorie", season: "Mar–Jun, Sep–Nov", time: "Morning", lat: 30.4606, lng: 78.7597, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Mussoorie_Hill_Station.jpg/800px-Mussoorie_Hill_Station.jpg" }
    ],
    "West Bengal": [
        { name: "Kolkata", season: "Oct–Mar", time: "Morning", lat: 22.5726, lng: 88.3639, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Victoria_Memorial_Kolkata.jpg/800px-Victoria_Memorial_Kolkata.jpg" },
        { name: "Darjeeling", season: "Sep–Nov, Mar–May", time: "Sunrise", lat: 27.0410, lng: 88.2663, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Darjeeling_tea_gardens.jpg/800px-Darjeeling_tea_gardens.jpg" },
        { name: "Sundarbans", season: "Nov–Mar", time: "Morning safari", lat: 21.9497, lng: 89.1833, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Sundarbans_mangrove_forest.jpg/800px-Sundarbans_mangrove_forest.jpg" }
    ],
    "Jammu & Kashmir": [
        { name: "Srinagar", season: "Apr–Oct", time: "Morning", lat: 34.0837, lng: 74.7973, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Srinagar_Dal_Lake.jpg/800px-Srinagar_Dal_Lake.jpg" },
        { name: "Gulmarg", season: "Dec–Mar", time: "Morning", lat: 34.6500, lng: 74.3899, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Gulmarg_Meadows.jpg/800px-Gulmarg_Meadows.jpg" },
        { name: "Pahalgam", season: "Jun–Sep", time: "Morning", lat: 33.9424, lng: 75.3243, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Pahalgam_Valley.jpg/800px-Pahalgam_Valley.jpg" }
    ],
    "Ladakh": [
        { name: "Leh", season: "Jun–Sep", time: "Morning", lat: 34.1526, lng: 77.5770, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Leh_Palace.jpg/800px-Leh_Palace.jpg" },
        { name: "Ladakh Monasteries", season: "Jun–Sep", time: "Morning", lat: 33.9838, lng: 77.5880, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Thiksey_Monastery_Ladakh.jpg/800px-Thiksey_Monastery_Ladakh.jpg" },
        { name: "Nubra Valley", season: "Jun–Sep", time: "Morning", lat: 35.2333, lng: 77.7167, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Nubra_Valley_Ladakh.jpg/800px-Nubra_Valley_Ladakh.jpg" }
    ]
};

// Set title
const title = document.getElementById("cityTitle");
if (title) {
    title.textContent = "Top Places in " + selectedState;
}

// Generate cards
const container = document.querySelector(".cards-container");

// Check if AI-generated places are available
const aiPlaces = localStorage.getItem("aiGeneratedPlaces");
const placesToDisplay = aiPlaces ? JSON.parse(aiPlaces) : (cityData[selectedState] || []);

if (placesToDisplay && container) {

    // Load images from API
    placesToDisplay.forEach(async (place) => {

        const flipCard = document.createElement("div");
        flipCard.classList.add("flip-card");
        flipCard.style.cursor = "pointer";

        // Fetch image from Unsplash API
        let imageUrl = "https://via.placeholder.com/400x300?text=Loading...";
        
        try {
            const apiImage = await fetchImageFromAPI(place.name);
            if (apiImage) {
                imageUrl = apiImage;
            }
        } catch (error) {
            console.log("Using fallback image for", place.name);
            // Fall back to stored image if API fails
            imageUrl = place.img || "https://via.placeholder.com/400x300?text=" + encodeURIComponent(place.name);
        }

        const safetyInfo = place.safetyReason || place.safety || "Great for solo travelers";

        flipCard.innerHTML = `
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${imageUrl}" alt="${place.name}" style="object-fit: cover; width: 100%; height: 100%;">
                    <h3>${place.name}</h3>
                </div>
                <div class="flip-card-back">
                    <h3>${place.name}</h3>
                    <p><strong>Best Season:</strong> ${place.season}</p>
                    <p><strong>Best Time:</strong> ${place.time}</p>
                    <p style="color: #10b981; font-weight: bold;">👆 Click for details!</p>
                </div>
            </div>
        `;

        // Add click event to show detailed modal
        flipCard.addEventListener("click", () => {
            showPlaceDetails(place, selectedState);
        });

        container.appendChild(flipCard);
    });
    
    // Show badge if AI-generated
    if (aiPlaces && title) {
        title.textContent += " (✨ AI-Selected)";
    }

} else {
    container.innerHTML = "<p>No places found.</p>";
}
// Fetch images from Unsplash API
async function fetchImageFromAPI(placeName) {
    const UNSPLASH_ACCESS_KEY = "YOUR_ACCESS_KEY"; // Move to backend in production

    try {
        const query = encodeURIComponent(`${placeName} india travel`);

        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&per_page=1`,
            {
                headers: {
                    "Authorization": `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                    "Accept-Version": "v1"
                }
            }
        );

        // ✅ Check if request succeeded
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // ✅ Safe optional chaining
        return data.results?.[0]?.urls?.regular || null;

    } catch (error) {
        console.error("Error fetching image from Unsplash:", error);
        return null;
    }
}

// Fetch detailed info from Gemini
async function getDetailedPlaceInfo(placeName, state) {
    const apiKey = "AIzaSyBdO0RDuPEAnh1QArC6ZrPjiI5PcQfYj64";
    
    if (!apiKey || apiKey.includes("YOUR_")) {
        return null;
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
                            text: `You are a solo travel expert. Provide detailed information about ${placeName} in ${state}, India. Format your response as JSON with these exact fields:
{
  "specialities": "List main attractions and activities (2-3 sentences)",
  "safetyScore": 85,
  "safetyTips": "3-4 safety tips for solo travelers (bullet points or short sentences)"
}

Be concise and focus on solo travel safety.`
                        }]
                    }]
                })
            }
        );

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        // Parse JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return null;
    } catch (error) {
        console.error("Error fetching place details:", error);
        return null;
    }
}

// Display place details in modal
async function showPlaceDetails(place, state) {
    const modal = document.getElementById("placeModal");
    const mapContainer = document.getElementById("mapContainer");
    
    // Set basic info
    document.getElementById("modalPlaceName").textContent = place.name;
    
    // Fetch image from API
    try {
        const apiImage = await fetchImageFromAPI(place.name);
        if (apiImage) {
            document.getElementById("modalPlaceImage").src = apiImage;
        } else {
            document.getElementById("modalPlaceImage").src = place.img || "https://via.placeholder.com/400x300";
        }
    } catch (error) {
        document.getElementById("modalPlaceImage").src = place.img || "https://via.placeholder.com/400x300";
    }
    
    document.getElementById("modalSeason").textContent = place.season;
    document.getElementById("modalTime").textContent = place.time;

    // Show loading message
    document.getElementById("modalSpecialities").textContent = "Loading details...";
    document.getElementById("modalSafetyScore").textContent = "Fetching...";
    document.getElementById("modalSafetyTips").textContent = "Loading...";

    // Show modal
    modal.style.display = "block";

    // Initialize map if coordinates available
    if (place.lat && place.lng) {
        setTimeout(() => {
            const map = new google.maps.Map(mapContainer, {
                zoom: 13,
                center: { lat: place.lat, lng: place.lng }
            });

            new google.maps.Marker({
                position: { lat: place.lat, lng: place.lng },
                map: map,
                title: place.name
            });
        }, 100);
    }

    // Fetch detailed info from Gemini
    const details = await getDetailedPlaceInfo(place.name, state);
    
    if (details) {
        document.getElementById("modalSpecialities").textContent = details.specialities;
        document.getElementById("modalSafetyTips").textContent = details.safetyTips;
        
        const score = details.safetyScore || 75;
        document.getElementById("modalSafetyScore").textContent = `${score}/100 - ${score >= 80 ? 'Very Safe' : score >= 70 ? 'Safe' : 'Moderate'}`;
        
        // Set safety bar color
        const safetyBar = document.getElementById("safetyBar");
        safetyBar.className = "safety-bar score-" + Math.round(score / 10) * 10;
    } else {
        // Default info if API fails
        document.getElementById("modalSpecialities").textContent = "A wonderful destination with unique attractions. Click on safety tips for more information.";
        document.getElementById("modalSafetyTips").textContent = "Travel with a group when possible, stay in well-known hotels, keep valuables secure, and inform someone of your daily itinerary.";
        document.getElementById("modalSafetyScore").textContent = "75/100 - Safe";
        document.getElementById("safetyBar").className = "safety-bar score-70";
    }

    // Set up the itinerary button
    const itineraryBtn = document.getElementById("createItineraryBtn");
    if (itineraryBtn) {
        itineraryBtn.onclick = () => {
            // Store selected city and state for itinerary page
            localStorage.setItem("selectedCityForTrip", place.name);
            localStorage.setItem("selectedStateForTrip", state);
            // Navigate to itinerary page
            window.location.href = "itinery.html";
        };
    }
}

// Close modal
const modal = document.getElementById("placeModal");
const closeBtn = document.querySelector(".close");

if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});