import express from 'express';

const imageProcessingRoute = express.Router();


imageProcessingRoute.get('/image-processing', (req, res) => { 
    res.status(201).send('Got to this route')
});

export default imageProcessingRoute;