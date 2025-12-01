const { initializeDB } = require("../db.connect");
require('dotenv').config();
import cors from 'cors';
import express from 'express';
import axios from 'axios';
import ChatMessage from '../models/chatMessage.model.js';


app.use(express.json()); //this is middleware 


// const router = express.Router();

const MODEL = 'x-ai/grok-4.1-fast:free'

// router.post('/chat', async (req, res) => {
    app.post('/chat', async (req, res) => {
    try{
        const userId = req.user._id; 
        const { message } = req.body; 

        await ChatMessage.create({ userId, role: 'user', content: message});

        const aiRes = await axios.post(
            OPENROUTER_API_KEY, {
                model: MODEL,
                message: [
                    {role: 'system', content: 'You are a helpful assistant.'},
                    {role: 'user', content: message}
                ]
            },

            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type" : "application/json"
                }
            }
        );


        const reply = aiRes.data.choices[0].message.content;

         const aiMessage = await ChatMessage.create({
            userId,
            role: 'assistant',
            content: reply
    });

    res.json({ reply: aiMessage.content });

    } catch(error){
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Chat failed' });
    }
});


// export default router; 





                                                                    
