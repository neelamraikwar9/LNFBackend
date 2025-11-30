const { initializeDB } = require("./db.connect");
const Form = require("./models/form.model");
const Usser = require("./models/usser.model");
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



app.use(cors());

app.use(express.json()); //this is middleware 

const corsOptions = {
    origin: "*",
    credential: true
};

initializeDB();


// api to signup the app;
const SECRET  = "MONGODB";

app.post("/api/signup", async(req, res) => {
    try{
        const { name, email, password } = req.body; 

        //hash password; 
        const hashed = await bcrypt.hash(password, 10);
        //bcrypt :- A popular library specifically designed to hash passwords securely.

        //.hash() :- The function that actually performs the hashing.

        //10 :- The cost factor (also called "rounds" or "salt rounds"). It controls how much work is required to compute the hash.

        const user = new Usser({ name, email, password: hashed });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch(error){
        res.status(400).json({ error: "User creation failed" });
    }
});


// middleware for json web token;
const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];

    if(!token){
    return response.status(401).json({ message: "No token provided" });
    }


    try {
        const decodeToken = jwt.verify(token, SECRET);
        req.user = decodeToken;
        next();
    } catch (error) {
    res.status(402).json({ message: "Invalid token." });
    }
};

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body; 

    const user = await Usser.findOne({ email });

    if(!user){
    res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = bcrypt.compare(password, user.password);
    
    if(!isMatch) {
    res.status(401).json({ error: "Invalid credentials" });
    }


    //Create JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET, {expiresIn: '6h'});
    res.json({ token });
});


// Protected Route Example
app.get("/api/private", verifyJWT, (req, res) => {
  res.json({ message: `Welcome to the private route ${Usser}!`, user: req.user });
});




// const formData = {
//     name: "Demo",
//     city: "Delhi",
//     contactNumber: "5678345678",
//     occupation: "Student",
//     qualification: "BA",
//     purpose: "Improve English",
//     duration:"Other"
// }


const formData = {
    name: "Demo4",
    city: "Noida",
    contactNumber: "56787345678",
    occupation: "Worker",
    qualification: "Graduation",
    purpose: " Improve speaking skills",
    duration:"Five month"
}


const addForm = async () => {
    try{
        const newData= new Form(formData);  
        await newData.save();
        console.log(newData, "Form Data added successfully.")
    } catch(error){
        console.log("Error", error);
    }
};

// addForm();


// api to get formData;
//It is query to get all formData from the db first.
async function getAllFormData(){
    try{
        const allForm = await Form.find()
        // console.log(allForm, "allForm");
        return allForm;
    } catch(error){
        throw error;
    }
}
// getAllFormData();


//now, here is api to fetch all Form data. 
app.get("/forms", async(req, res) => {
    try{
        const allForms = await getAllFormData();
        // console.log(allForms);
        if(allForms){
            res.json(allForms);
        } else{
            res.status(404).json({error: "Form Data not found."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch Form Data."})
    }
})



// api to get form Data by form's Id;

const getFormDataById = async (dataId) => {
    try{
        getData = await Form.findById(dataId);
        console.log(getData, "getForm");
        return getData;
    } catch(error){
        throw error;
    }
}
// getFormDataById("6902edb76f1cffdb4217af78");


app.get("/forms/:dataId", async(req, res) => {
    try{
        const formById = await getFormDataById(req.params.dataId);
        console.log(formById, 'formbyid')
        if(formById){
            res.json(formById);
        } else{
            res.status(404).json({error: "Data by id not found."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch data."})
    }
})


// api to post form data;

// const newData = {
//     name: "Demo6",
//     city: "Noida",
//     contactNumber: "56787345678",
//     occupation: "Worker",
//     qualification: "Graduation",
//     purpose: " Improve speaking skills",
//     duration:"Five month"
// }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
async function postForm(newData){
    try{
    const data = new Form(newData);
    const saveData = await data.save();
    console.log(saveData);
    return saveData;
    } catch(error){
        throw error;
    }
};
// postForm(newData);

app.post("/forms", async(req, res) => {
    try{
        const newData = req.body;
        const addDataa = await postForm(newData);
        console.log(addDataa);
        res.status(201).json({message: "Data added successfully", data: newData})

    } catch(error){
        res.status(500).json({error: "Failed to add Data."})
    }
})



                                                                                      

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})
                                                                                                                                                                                                                                                                                                                                              



// open-router-key = "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"