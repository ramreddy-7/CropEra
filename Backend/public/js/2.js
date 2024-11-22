// translations.js

const translations = {
  en: { 
    weather: "Weather", 
    newTechnologies: "New Technologies", 
    diseases: "Diseases", 
    about: "About" 
  },
  te: { 
    weather: "వాతావరణం", 
    newTechnologies: "కొత్త సాంకేతికతలు", 
    diseases: "రోగాలు", 
    about: "గురించి" 
  },
  hi: { 
    weather: "मौसम", 
    newTechnologies: "नई तकनीक", 
    diseases: "बीमारियाँ", 
    about: "के बारे में" 
  },
};

// Function to apply the selected language to the page
const setLanguage = (lang) => {
  document.getElementById("weather").textContent = translations[lang].weather;
  document.getElementById("newTechnologies").textContent = translations[lang].newTechnologies;
  document.getElementById("diseases").textContent = translations[lang].diseases;
  document.getElementById("about").textContent = translations[lang].about;
};