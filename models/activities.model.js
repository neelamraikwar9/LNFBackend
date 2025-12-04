const mongoose = require("mongoose");

const activitiesSchema = new mongoose.Schema({
    weekDay: {
        type: String, 
        required: true
    },

    activityName: {
        type: String, 
        required: true
    },

    activityDescription: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model("Activities", activitiesSchema);
