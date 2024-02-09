const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, resp) => {
    resp.send("hii bro")
})
const arr = [ 
    { status: true, title: "abc1", description: "someDescription1", priority: "high"},
    { status: false, title: "abc2", description: "someDescription2", priority: "medium"},
    { status: false, title: "abc3", description: "someDescription3", priority: "low"},
    
]

app.get('/getTasks', (req, resp) => {
    setTimeout(() => {
        resp.json(arr);
    }, [2000])
    
})

app.get('/addTask', (req, res) => {
    setTimeout(() => {
        const encodedJson = req.query.json;
        const decodedJson = decodeURIComponent(encodedJson);
        const jsonData = JSON.parse(decodedJson);
        res.json(jsonData);
        }, [2000])
})


app.listen(PORT, () => {
    console.log("PORT listening");
})