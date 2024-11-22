const mongoose = require('mongoose');

// Define the schema
const pesticideSchema = new mongoose.Schema({
    name: String,
    diseaseDescription: String,
    precautions: String,
    preventions: String,
    image: String, // Path to image for each pesticide
});

// Create the model
const Pesticide = mongoose.model('Pesticide', pesticideSchema);
module.exports = Pesticide;

// Seed data for pesticides
async function seedPesticides() {
    const pesticides = [
        {
            name: "Blast Disease",
            diseaseDescription: "A fungal disease caused by Magnaporthe oryzae, affecting rice crops.",
            precautions: "Use fungicides like tricyclazole. Avoid over-fertilization with nitrogen.",
            preventions: "Grow resistant varieties and maintain field hygiene.",
            image: "/images/blast-disease.jpg"
        },
        {
            name: "Sheath Blight Disease",
            diseaseDescription: "A fungal disease caused by Rhizoctonia solani, affecting stems and leaves.",
            precautions: "Avoid overcrowding of plants. Apply fungicides like azoxystrobin.",
            preventions: "Ensure proper drainage and air circulation in fields.",
            image: "/images/sheath-blight.jpg"
        },
        {
            name: "Stem Rot Disease",
            diseaseDescription: "A fungal disease caused by Sclerotium oryzae, leading to wilting and rotting of stems.",
            precautions: "Apply carbendazim or mancozeb fungicides. Maintain balanced fertilizer use.",
            preventions: "Avoid waterlogging and keep fields weed-free.",
            image: "/images/stem-rot.jpg"
        },
        {
            name: "Sheath Rot and Grain Discoloration",
            diseaseDescription: "A fungal disease causing discoloration of grains and sheath blight.",
            precautions: "Use copper-based fungicides. Remove infected plants promptly.",
            preventions: "Adopt crop rotation and use disease-free seeds.",
            image: "/images/sheath-rot.jpg"
        },
    ];

    try {
        for (const pesticide of pesticides) {
            const exists = await Pesticide.findOne({ name: pesticide.name });
            if (!exists) {
                await Pesticide.create(pesticide);
                console.log(`${pesticide.name} added to database.`);
            } else {
                console.log(`${pesticide.name} already exists.`);
            }
        }
    } catch (err) {
        console.error("Error seeding data:", err);
    }
}

// Run seed function
seedPesticides();