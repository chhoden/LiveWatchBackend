
const express = require('express');
const fetch = require('node-fetch');

//Creating express app to serve request and send response
const app = express();

// GET /api/login
// Declaring endpoint for Nest to send user code(pin)
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
        body,
    }
    //Api call to get access_token from Nest
    fetch('https://api.home.nest.com/oauth2/access_token', options)
        .then(res => res.json())
        .then(json => {
            res.redirect(`http://localhost:3000/home?code=${json.access_token}`);
        });
});

//Starting app
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Ok listening on port ${port}..`);
});


