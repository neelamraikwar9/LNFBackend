const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    }, 

    email: {
        type: String,
        required: [true, "email is required"], 
        unique: true
    },

    city: {
        type: String,
        required: [true, "City is required"]
    },

    contactNumber: {
        type: String,
        required: [true, "Contact number is required"],
        unique: true
    },


    occupation : {
        type: String,
        required:[true, "Occupation is required"]

    },


    qualification: {
        type: String,
        required:[true, "Qualification is required"]

    },


    purpose: {
        type: String,
        required:[true, "Purpose is required"]
    },


    duration: {
        type: String,
        required:[true, "Duration is required"],
        enum: [
            "One month", "Two month", "Three month", "Four month", "Five month", "Other"
        ]
    }

})

formSchema.pre("save", function (next){
    this.updateAt = Date.now();
    next();
});


module.exports = mongoose.model("Form", formSchema);