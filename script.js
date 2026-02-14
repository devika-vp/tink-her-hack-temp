const form = document.getElementById("safetyForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const errorBox = document.getElementById("formError");
const successBox = document.getElementById("formSuccess");
const successOverlay = document.getElementById("successOverlay");
const startTripBtn = document.getElementById("startTrip");

function showMessage(box, message) {
    box.textContent = message;
    box.style.display = "block";
}

function clearMessages() {
    errorBox.style.display = "none";
    successBox.style.display = "none";
    errorBox.textContent = "";
    successBox.textContent = "";
}

// Add ripple effect to button
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = button.querySelector(".ripple");
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
}

startTripBtn.addEventListener("click", createRipple);

// Show success animation
function showSuccessAnimation() {
    successOverlay.style.display = "block";
    
    setTimeout(() => {
        successOverlay.style.display = "none";
    }, 2000);
}

// Real-time input validation with checkmarks
[fullNameInput, emailInput, phoneInput].forEach(input => {
    input.addEventListener("input", function() {
        if (this.id === "fullName" && this.value.trim()) {
            input.classList.add("valid-input");
        } else if (this.id === "email" && this.value.includes("@")) {
            input.classList.add("valid-input");
        } else if (this.id === "phone" && this.value.replace(/\D/g, "").length >= 7) {
            input.classList.add("valid-input");
        } else {
            input.classList.remove("valid-input");
        }
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearMessages();

    [fullNameInput, emailInput, phoneInput].forEach((input) =>
        input.classList.remove("error")
    );

    const nameVal = fullNameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const phoneVal = phoneInput.value.trim();

    const errors = [];

    if (!nameVal) {
        errors.push("Please enter your full name.");
        fullNameInput.classList.add("error");
    }

    if (!emailVal || !emailVal.includes("@")) {
        errors.push("Please enter a valid email address.");
        emailInput.classList.add("error");
    }

    if (!phoneVal || phoneVal.replace(/\D/g, "").length < 7) {
        errors.push("Please enter a valid phone number.");
        phoneInput.classList.add("error");
    }

    if (errors.length) {
        showMessage(errorBox, errors.join(" "));
        return;
    }

    // Show success message
    showMessage(
        successBox,
        "You're ready to plan. Redirecting to your safety itinerary..."
    );

    // Show success animation
    showSuccessAnimation();

    // Save data to localStorage for plan-trip.html
    localStorage.setItem("userName", nameVal);
    localStorage.setItem("userEmail", emailVal);
    localStorage.setItem("userPhone", phoneVal);

    // Disable button during redirect
    startTripBtn.disabled = true;
    startTripBtn.style.opacity = "0.7";

    // Redirect after animation completes
    setTimeout(() => {
        window.location.href = "plan-trip.html";
    }, 2000);
});