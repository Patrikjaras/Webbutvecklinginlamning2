const { default: axios, Axios } = require("axios");// obs!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/allBooks", async (req, res) => {
    try {
        let response = await axios.get("https://minimalapi220240116121754.azurewebsites.net/book", {
          params: {
              title: req.body.title,
              author: req.body.author
            }
        });
        console.log("api response:", response.data)
        const books = response.data;
        res.json({message: "Here is all the books", data: books})
    } catch (error){
        res.status(500).json({error: "internal server error"});
    }
});


app.get("/allBooks1", async(req, res) => {
    const response = await axios.get("https://minimalapi220240116121754.azurewebsites.net/book");
    const AllBooks = response.data;
    res.json(response.data);
})

app.post("/create", async (req, res) => {
    try {
        let newBook = req.body;
        let response = await axios.post("https://minimalapi220240116121754.azurewebsites.net/book", newBook);
        res.json(newBook.data.title, "Has been added.");
    }catch{
        res.status(500).send("något gick fel")
    }
});

app.get("/book/:id", async (req, res) => {
    try{
        let input = parseInt(req.params.id)
        let response = await axios.get(`https://minimalapi220240116121754.azurewebsites.net/book/${input}`);
        res.json(response.data)
    }catch{
        res.status(500).send("något gick fel")
    }
})

app.put("/update/:id", async (req, res) => {
    try{
        let inputBook = parseInt(req.params.id);
        let newBookData = req.body;
        let response = await axios.put(`https://minimalapi220240116121754.azurewebsites.net/book/${inputBook}`, newBookData);
        res.json({title: newBookData.title, author: newBookData.author})
    }catch{
        res.status(500).send("något gick fel")
    }
})

app.delete("/delete/:id", async (req, res) => {
    try{
        let input = parseInt(req.params.id)
        await axios.delete((`https://minimalapi220240116121754.azurewebsites.net/book/${input}`));
        res.status(200).send(`Book with ID:${input} has been deleted `)
        
    }catch{
        res.status(500).send("Något gick fel.")
    }
})



app.listen(PORT, ()=> {
    console.log("listening to " + " " + PORT);
});