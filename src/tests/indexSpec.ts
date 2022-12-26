import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Image Processing API', () => {
    it('should return a status code of 200 on successful image resizing request', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
        // done()
    });

    it('should return a status code of 200 on unsuccessful image resizing request', async () => { 
        const response = await request.get('/api/image-processing?filename=palmtunnel&width=350&height=500');
        expect(response.status).toBe(200);
    })
});

