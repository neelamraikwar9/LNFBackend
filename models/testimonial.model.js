const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },

    testimonial: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model("Testimonial", testimonialSchema);
