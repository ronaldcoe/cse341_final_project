const request = require('supertest');
const express = require('express');
const router = require('./routes/coaches'); 
const coachesController = require('./controllers/coaches'); 

jest.mock('./controllers/coaches'); // Mock the coachesController

const app = express();
app.use(express.json());
app.use('/coaches', router);

describe('Coaches Routes', () => {
  describe('GET /coaches', () => {
    test('should fetch all coaches', async () => {
      const mockCoaches = [{ id: 1, name: 'Coach 1' }, { id: 2, name: 'Coach 2' }];
      coachesController.getAllCoaches.mockImplementation((req, res) => res.json(mockCoaches));

      const response = await request(app).get('/coaches');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockCoaches);
    });
  });

  describe('GET /coaches/:CoachID', () => {
    test('should fetch a single coach by ID', async () => {
      const mockCoach = { id: 1, name: 'Coach 1' };
      coachesController.getCoachById.mockImplementation((req, res) => res.json(mockCoach));

      const response = await request(app).get('/coaches/1');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockCoach);
    });
  });


  describe('Coaches Routes', () => {
    describe('POST /coaches', () => {
      const validCoachData = {
        coachId: 'C123',
        name: 'John Doe',
        age: 45,
        nationality: 'American',
        teamId: 'T001',
      };
  
      test('should create a new coach with valid data', async () => {
        coachesController.createCoach.mockImplementation((req, res) => {
          return res.status(201).json({ ...validCoachData });
        });
  
        const response = await request(app).post('/coaches').send(validCoachData);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(validCoachData);
      });
  
      test('should not create a coach with invalid coachId', async () => {
        const invalidCoachData = { ...validCoachData, coachId: 'InvalidID' };
  
        coachesController.createCoach.mockImplementation((req, res) => {
          return res.status(400).json({ error: 'Invalid coach ID format' });
        });
  
        const response = await request(app).post('/coaches').send(invalidCoachData);
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid coach ID format');
      });
  
      test('should not create a coach with invalid age', async () => {
        const invalidCoachData = { ...validCoachData, age: 150 };
  
        coachesController.createCoach.mockImplementation((req, res) => {
          return res.status(400).json({ error: 'Invalid age' });
        });
  
        const response = await request(app).post('/coaches').send(invalidCoachData);
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid age');
      });
  
      
    });
    describe('PUT /coaches/:Coach_ID', () => {
        const validUpdateData = {
          name: 'Updated Name',
          age: 50,
          nationality: 'Canadian',
          //
        };
    
        test('should update a coach with valid data', async () => {
          const coachId = 'C123';
          coachesController.updateCoach.mockImplementation((req, res) => {
            return res.status(200).json({ coachId, ...validUpdateData });
          });
    
          const response = await request(app).put(`/coaches/${coachId}`).send(validUpdateData);
          expect(response.statusCode).toBe(200);
          expect(response.body).toEqual({ coachId, ...validUpdateData });
        });
    
        test('should not update a coach with invalid data', async () => {
          const coachId = 'C123';
          const invalidUpdateData = { ...validUpdateData, age: 150 }; // Invalid age
    
          coachesController.updateCoach.mockImplementation((req, res) => {
            return res.status(400).json({ error: 'Invalid data' });
          });
    
          const response = await request(app).put(`/coaches/${coachId}`).send(invalidUpdateData);
          expect(response.statusCode).toBe(400);
          expect(response.body.error).toBe('Invalid data');
        });
    
        test('should handle non-existent coach update', async () => {
          const coachId = 'C999'; // Non-existent coach
    
          coachesController.updateCoach.mockImplementation((req, res) => {
            return res.status(404).json({ error: 'Coach not found' });
          });
    
          const response = await request(app).put(`/coaches/${coachId}`).send(validUpdateData);
          expect(response.statusCode).toBe(404);
          expect(response.body.error).toBe('Coach not found');
        });

        describe('DELETE /coaches/:Coach_ID', () => {
            test('should delete a coach with a valid CoachID', async () => {
              const coachId = 'C123';
              coachesController.deleteCoach.mockImplementation((req, res) => {
                return res.status(200).json({ message: 'Coach deleted successfully' });
              });
        
              const response = await request(app).delete(`/coaches/${coachId}`);
              expect(response.statusCode).toBe(200);
              expect(response.body.message).toEqual('Coach deleted successfully');
            });
        
            test('should handle non-existent coach deletion', async () => {
              const coachId = 'C999'; // Non-existent coach
        
              coachesController.deleteCoach.mockImplementation((req, res) => {
                return res.status(404).json({ error: 'Coach not found' });
              });
        
              const response = await request(app).delete(`/coaches/${coachId}`);
              expect(response.statusCode).toBe(404);
              expect(response.body.error).toBe('Coach not found');
            });
        
            // Additional tests can be added for other scenarios, like invalid CoachID format
          });
        
          // ... 
        });
        // 
      });
    // 
  });
  //

