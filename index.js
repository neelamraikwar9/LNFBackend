const { initializeDB } = require("./db.connect");
const Form = require("./models/form.model");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json()); //this is middleware 

const corsOptions = {
    origin: "*",
    credential: true
};

initializeDB();


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
                                                                                                                                                                                                                                                                                                                                              