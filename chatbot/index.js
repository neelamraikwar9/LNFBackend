// const { initializeDB } = require("../db.connect");
// require('dotenv').config();
// const mongoose = require("mongoose");
import cors from 'cors';
import express from 'express';
import axios from 'axios';
import ChatMessage from '../models/chatMessage.model.js';

const router = express.Router();

const MODEL = 'x-ai/grok-4.1-fast:free'

router.post('/chat', async (req, res) => {
    try{
        const userId = req.user._id; 
        const { message } = req.body; 

        await ChatMessage.create({ userId, role: 'user', content: message});
    } catch(error){
        return res.status(502).json({error: "error"})
    }
})





                                                                    
