const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Usser", required: true //refferd to user schema.
    },

    role: {
        type: String, 
        enum: ['user', 'assistant'], default: "user", required: true
    },

    content: {
        type: String,
        required: true
    },
},
{timestamps: true}
);

export default mongoose.model('ChatMessage', chatMessageSchema);