const express = require('express');
const routes = express.Router();
const axios = require('axios').default;


// TODO Exercise 1: Implement healthcheck path GET /healthz
routes.get('/healthz', async (req, res) => {
    // Send a response back to the client
    res.status(200).send('Successful health check response with status 200\n');

});

// TODO Exercise 2 "Resiliency": Simulate service failure
// ...

routes.post('/content-request', async (req, res) => {
    const contentRequest = req.body;

    // Simple validation - check for existence of languaeg and fields
    if (!contentRequest.language || !contentRequest.fields) {
        return res.status(400).send('Invalid content request.');
    }

    // TODO Exercise 2: Use axios to send the content request to the content service
    // -- replace the dummy response below
    try {
        const response
            = await axios({
                method: 'POST',
                url: 'http://content/request',
                data: contentRequest,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        const request
            = response.data;

        console.log(`RequestId received from Content Service: '${request.id}'`);

        res.send(request);
    } catch (error) {
        console.error('Error storing contentRequest', error);
        res.status(500).send('Error storing contentRequest');
    }


    // TODO Exercise 4: Send messages to SNS via the AWS SDK for SNS (according to example in exercise description)
    // ...

});

routes.get('/content-request/:id', async (req, res) => {

    // TODO Exercise 3: Fetch an existing request
    // -- replace the dummy response below
    // ...
    res.status(404).send("Call to content service needs to be implemented.")

});

module.exports = routes;