const express = require('express');
const app = express();
const port = process.env.PORT||8090;
const mongoose = require('mongoose');
const path = require("path");
const axios = require("axios");
require('ejs');

const API_KEY = 'cdc69ab4dd63d2de2353679abfb07ecf';

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));

const translations = {
  en: {
    waterLevel: "Water Level",
    pesticides: "Pesticides",
    fertilizers: "Fertilizers",
    recommendations: "Agricultural Recommendations:"
  },
  te: {
    waterLevel: "నీటి స్థాయి",
    pesticides: "పేస్టిసైడ్స్",
    fertilizers: "గిట్టయాలపట్రలు",
    recommendations: "వ్యవసాయ సిఫారసులు:"
  },
  hi: {
    waterLevel: "जल स्तर",
    pesticides: "कीटनाशक",
    fertilizers: "खाद",
    recommendations: "कृषि सिफारिशें:"
  }
};

app.get("/",(req,res)=>{
  res.render('2');
})
app.get("/3",(req,res)=>{
  res.render('3',{ agriculture:null});
});


app.get('/api/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const weatherData = weatherResponse.data;
        const description = weatherData.weather[0].description;

        // Fetch agricultural recommendations
        const agriculturalData = getAgriculturalRecommendations(description);

        // Send combined data to the client-side
        const combinedData = {
            weather: weatherData,
            agriculture: agriculturalData
        };

        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

function getAgriculturalRecommendations(description) {
    const recommendations = {
        
            "lightRain": {
              waterLevel: "Keep water around 2-3 cm; rain can be sufficient but may need supplemental irrigation if needed.",
              pesticides: "Light rain can increase humidity, which is favorable for fungal growth. Apply fungicides if fungal disease risk increases.",
              fertilizers: "Reduce nitrogen fertilizers, as they can leach with rain. Use slow-release or organic fertilizers instead."
            },
            "moderateRain": {
              waterLevel: "Maintain around 3-4 cm. Ensure proper drainage to avoid waterlogging.",
              pesticides: "Consider pesticides with rain-resistant properties if pest pressure is high.",
              fertilizers: "Delay application if rain is persistent to avoid leaching. Resume when rain subsides."
            },
            "lightSnow": {
              waterLevel: "Not applicable as fields may freeze. Ensure any irrigation systems are drained to avoid damage.",
              pesticides: "Avoid applications until the temperature rises, as they may not be effective.",
              fertilizers: "Wait until snow melts and temperatures rise to prevent waste and frost damage."
            },
            "heavySnow": {
              waterLevel: "Not suitable for rice cultivation. Delay any farming activities.",
              pesticides: "Avoid pesticide application during heavy snow.",
              fertilizers: "Avoid fertilizer application until snow melts and conditions stabilize."
            },
            "few clouds": {
              waterLevel: "Maintain at a steady level around 3-4 cm.",
              pesticides: "Continue regular pest control if needed.",
              fertilizers: "Regular application as needed, with a focus on nitrogen fertilizers to support growth."
            },
            "overcast clouds": {
              waterLevel: "Monitor, but no major adjustments. Consider 3-4 cm for young plants.",
              pesticides: "Fungal diseases may be more likely in humid conditions; consider preventive fungicides.",
              fertilizers: "Apply nitrogen carefully, as growth may be slower. Adjust based on the crop's health."
            },
            "clear sky": {
              waterLevel: "Maintain steady at 4-5 cm for young plants, adjusting slightly for growth stages.",
              pesticides: "Regular monitoring; apply pesticides if pest populations rise.",
              fertilizers: "Apply nitrogen fertilizers to support healthy growth. Use phosphorus and potassium to support root and grain development."
            },
            "thunderstormWithLightRain": {
              waterLevel: "Check drainage, as waterlogging can harm rice plants. Ensure a stable 2-3 cm after storm subsides.",
              pesticides: "Apply only if necessary; wait until after the storm.",
              fertilizers: "Avoid during stormy conditions; resume applications after storm subsides to avoid runoff."
            },
            "thunderstormWithHeavyRain": {
              waterLevel: "Drain excess water to avoid prolonged waterlogging.",
              pesticides: "Avoid pesticide application during heavy rain.",
              fertilizers: "Postpone application until the field stabilizes. Assess for potential nutrient loss after rain."
            },
            "lightIntensityDrizzle": {
              waterLevel: "Minimal adjustment; maintain at a stable level.",
              pesticides: "Humidity can increase pest risk; apply protective fungicides if necessary.",
              fertilizers: "Small doses as needed; avoid excessive nitrogen as it may leach."
            },
            "heavyIntensityDrizzle": {
              waterLevel: "Maintain around 2-3 cm.",
              pesticides: "Apply after drizzle subsides if pest risk rises.",
              fertilizers: "Reduce nitrogen applications to prevent leaching."
            },
            "mist": {
              waterLevel: "No major changes required. Maintain 2-4 cm.",
              pesticides: "Consider fungicides to protect against mold and mildew.",
              fertilizers: "Regular application as needed; nitrogen, potassium, and phosphorus are safe to use in regular doses."
            },
            "haze": {
              waterLevel: "No major changes required. Maintain 2-4 cm.",
              pesticides: "Consider fungicides to protect against mold and mildew.",
              fertilizers: "Regular application as needed; nitrogen, potassium, and phosphorus are safe to use in regular doses."
            },
            "fog": {
              waterLevel: "No major changes required. Maintain 2-4 cm.",
              pesticides: "Consider fungicides to protect against mold and mildew.",
              fertilizers: "Regular application as needed; nitrogen, potassium, and phosphorus are safe to use in regular doses."
            },
            "sand": {
              waterLevel: "Monitor water level carefully as dust can affect plant health.",
              pesticides: "Ensure pesticides are safe and effective under dusty conditions.",
              fertilizers: "Wash plants if dust accumulation is significant, and apply fertilizers after clearing dust."
            },
            "dust": {
              waterLevel: "Monitor water level carefully as dust can affect plant health.",
              pesticides: "Ensure pesticides are safe and effective under dusty conditions.",
              fertilizers: "Wash plants if dust accumulation is significant, and apply fertilizers after clearing dust."
            },
            "volcanicAsh": {
              waterLevel: "For heavy ash, clear water if contamination occurs. For other events, manage water as conditions allow.",
              pesticides: "Delay until conditions improve, as they may be washed or blown away.",
              fertilizers: "With volcanic ash, soil pH may change. Wait to adjust fertilizer until assessing soil condition."
            },
            "squalls": {
              waterLevel: "For heavy ash, clear water if contamination occurs. For other events, manage water as conditions allow.",
              pesticides: "Delay until conditions improve, as they may be washed or blown away.",
              fertilizers: "With volcanic ash, soil pH may change. Wait to adjust fertilizer until assessing soil condition."
            },
            "tornado": {
              waterLevel: "For heavy ash, clear water if contamination occurs. For other events, manage water as conditions allow.",
              pesticides: "Delay until conditions improve, as they may be washed or blown away.",
              fertilizers: "With volcanic ash, soil pH may change. Wait to adjust fertilizer until assessing soil condition."
            },
            "scattered clouds":{
              waterLevel: "No major changes required. Maintain 2-4 cm.",
              pesticides: "Consider fungicides to protect against mold and mildew.",
              fertilizers: "Regular application as needed; nitrogen, potassium, and phosphorus are safe to use in regular doses."
   }
          
 }

    const weatherKey = description.toLowerCase();
    // If no match is found, return a default recommendation
    return recommendations[weatherKey] || {
        waterLevel: "Conditions are normal, no specific adjustments needed.",
        pesticides: "Monitor pest levels and apply treatments as needed.",
        fertilizers: "Apply fertilizers based on crop needs."
    };
}
app.listen(port,(req,res)=>{
    console.log(`server is listening at the http://localhost:${port}`);
});

// 2 Technologies

const { name } = require('ejs');
;
mongoose.connect("mongodb+srv://ramreddy07007:ramreddy07@cluster0.jnbkc.mongodb.net/New_Technologies?retryWrites=true&w=majority&appName=Cluster0",
).then(()=>{
    console.log("connected to Mongodb")
}).catch((err)=>{
     console.log(err);
})

// Define the schema
const technologySchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    detailedInfo: String,
    TechnologyName : String,
    Overview : String,
    Benefits : String,
    HowItWorks : String,
    KeyFeatures : String,
    Applications : String,
    Challenges : String
});

const Technology = mongoose.model('Technology', technologySchema);

async function addTech() {
    const technologies = [{
        name : "Drone Technology",
        description : "The drones are  equipped with high-resolution cameras, sensors, and GPS technology, offer farmers a bird’s-eyeview of their fields, providing critical insights into crop health, soil conditions, and environmental factors",
        image : "/images/Tech-1.jpg",
    }];
    try{
        for(let tech of technologies){
            const existingTech = await Technology.findOne({name:tech.name});
            if(!existingTech){
                await Technology.create(tech);
                console.log("technologies added success");
            }
            else{
                console.log("technology already exists");
            }
        }
    }
    catch(err){
        console.log(err);
    }
}
addTech();

// app.set('view engine', 'ejs');
// app.use(express.static('public'));

// Homepage route - list of technologies
app.get('/4', async (req, res) => {
    try{
    const technologies = await Technology.find();
    res.render('4',{technologies});
    }catch(err){
        console.error(err);
    }
});

// Individual technology route
app.get('/technology/:id', async (req, res) => {
    try {
        const tech = await Technology.findById(req.params.id);
        res.render('technology', { tech });
    } catch (error) {
        console.error(error);
        res.status(404).send('Technology not found');
    }
});

app.get('/6',(req,res)=>{
  res.render('6');
});


// Array to store pesticides data

const pesticides = [

    {

        name: "Blast Disease",

        diseaseDescription: "A fungal disease caused by Magnaporthe oryzae, affecting rice crops.",

        precautions: "Use fungicides like tricyclazole. Avoid over-fertilization with nitrogen.",

        preventions: "Grow resistant varieties and maintain field hygiene.",

        image: "/images/blast-disease.jpg",

    },

    {

        name: "Sheath Blight Disease",

        diseaseDescription: "A fungal disease caused by Rhizoctonia solani, affecting stems and leaves.",

        precautions: "Avoid overcrowding of plants. Apply fungicides like azoxystrobin.",

        preventions: "Ensure proper drainage and air circulation in fields.",

        image: "/images/sheath-blight.jpg",

    },

    {

        name: "Stem Rot Disease",

        diseaseDescription: "A fungal disease caused by Sclerotium oryzae, leading to wilting and rotting of stems.",

        precautions: "Apply carbendazim or mancozeb fungicides. Maintain balanced fertilizer use.",

        preventions: "Avoid waterlogging and keep fields weed-free.",

        image: "/images/stem-rot.jpg",

    },

    {

        name: "Sheath Rot and Grain Discoloration",

        diseaseDescription: "A fungal disease causing discoloration of grains and sheath blight.",

        precautions: "Use copper-based fungicides. Remove infected plants promptly.",

        preventions: "Adopt crop rotation and use disease-free seeds.",

        image: "/images/sheath-rot.jpg",

    },

];



// Routes

app.get('/5', (req, res) => {

    try {

        res.render('5', { pesticides });

    } catch (err) {

        console.error(err);

        res.status(500).send("Error fetching pesticides.");

    }

});
