function saveLanguage() {
    const selectedLanguage = document.getElementById("languageSelector").value;
    // Save the selected language in localStorage
    localStorage.setItem("selectedLanguage", selectedLanguage);
    // Redirect to the home page
    window.location.href = "home.html";
  }

  // If a language is already selected, skip this page
//   const savedLanguage = localStorage.getItem("selectedLanguage");
//   if (savedLanguage) {
//     window.location.href = "1.ejs";
//   }
const translations = {
    english: {
        welcome: "Welcome to CROP-ERA!",
        enterDetails: "Please enter your details",
        location: "Location",
        crop: "Crop",
        language: "Language",
        submit: "Submit"
    },
    telugu: {
        welcome: "క్రాప్-ఈరా కి స్వాగతం!",
        enterDetails: "దయచేసి మీ వివరాలను నమోదు చేయండి",
        location: "స్థానం",
        crop: "పంట",
        language: "భాష",
        submit: "సమర్పించు"
    },
    hindi: {
        welcome: "CROP-ERA में आपका स्वागत है!",
        enterDetails: "कृपया अपना विवरण दर्ज करें",
        location: "स्थान",
        crop: "फसल",
        language: "भाषा",
        submit: "जमा करें"
    }
};
function updateLanguage(language) {
    const langData = translations[language];

    // Update text on the page dynamically
    document.getElementById("welcomeMessage").innerText = langData.welcome;
    document.getElementById("enterDetailsMessage").innerText = langData.enterDetails;
    document.getElementById("locationLabel").innerText = langData.location;
    document.getElementById("cropLabel").innerText = langData.crop;
    document.getElementById("languageLabel").innerText = langData.language;
    document.getElementById("submitButton").innerText = langData.submit;
}