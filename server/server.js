const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;
const cors = require('cors');
// const router = require('./controllers/userController.js')
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, resp) => {
    resp.send("hii bro")
    // res.send(arr);
})
const arr = [ 
    { status: true, title: "abc1", description: "someDescription1", priority: "high"},
    { status: false, title: "abc2", description: "someDescription2", priority: "medium"},
    { status: false, title: "abc3", description: "someDescription3", priority: "low"},
    
]

app.get('/getTasks', (req, resp) => {
    // resp.send("hii bro")
    setTimeout(() => {
        resp.json(arr);
    }, [2000])
    
})

app.get('/addTask', (req, res) => {
    setTimeout(() => {
        const encodedJson = req.query.json;
  
  // Decode the JSON string
  const decodedJson = decodeURIComponent(encodedJson);
  
  // Parse the JSON string to JavaScript object
  const jsonData = JSON.parse(decodedJson);
  
  // Log the decoded JSON
  console.log('Decoded JSON:', jsonData);
  
  // Send response
  res.json(jsonData);// resp.json(req);// resp.json(req);
    }, [2000])
})


app.listen(PORT, () => {
    console.log("PORT listening");
})