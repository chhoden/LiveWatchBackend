const express = require('express');
const fetch = require('node-fetch');
var bodyParser = require('body-parser');
var cors = require('cors')


//Creating express app/API to serve request and send response
const app = express();
app.use(cors())
app.use(bodyParser.json()); //for parsing application/json


// GET /api/login
// Declaring endpoint/route for Nest to send user code(pin)
app.get('/api/login', (req, res) => {
    const body = new URLSearchParams({
        client_id: '13bd706a-14a9-4718-b8b5-b4d881008010',
        client_secret: '619lXCDJIcAEbedwTzLup2OJO',
        grant_type: 'authorization_code',
        code: req.query.code, 
    });
    
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body, //Consist of client_id, client_secret, grant_type and code
    }

    //Api call to get access_token from Nest
    fetch('https://api.home.nest.com/oauth2/access_token', options)
    .then(res => res.json())
    .then(json => {
        res.redirect(`http://localhost:3000/home?accessToken=${json.access_token}`); //Redirecting access_token to home page
    });
});

//Storage for events history
const history = [];
 function getHistory(req, res) {
    res.send(history);
 }

 function updateHistory(req, res) {
    const newEvent = req.body;
    const found = history.find((event) => {
        return (
            newEvent.start_time === event.start_time
        );
    });
      
    if(found) {
        res.send(history);
    } else {
        if(history.length === 12){
            history.pop();
        }
        history.unshift(newEvent);
        res.send(history);
    }
 }

//Http GET request route/endpoint declaration
app.get('/api/history', getHistory);

//Http POST request route declaration
app.post('/api/history', updateHistory);


//Starting app
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Ok listening on port ${port}..`);
});


