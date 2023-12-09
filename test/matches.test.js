const request = require('supertest');
const express = require('express');
const router = require('../routes/matches'); 
const matchesController = require('../controllers/matches'); 

jest.mock('../controllers/matches'); // Mock the matchesController
jest.mock('../middleware/authenticate', () => ({
  isAuthenticated: (req, res, next) => next(),
}));


const app = express();
app.use(express.json());
app.use('/matches', router);

describe('Matches Routes', () => {
  describe('GET /matches', () => {
    test('should fetch all matches', async () => {
      const mockMatches = [
        {
          Match_ID: 'M001',
          Date: '2023-01-01T00:00:00.000Z',
          Teams_Involved: ['T001', 'T002'],
          Score: '2-1',
          Stadium: 'Stadium 1',
          Goals: [
            { Player_ID: 'P001', Time: '45' },
            { Player_ID: 'P002', Time: '60' }
          ]
        }
      ];
      matchesController.getAllMatches.mockImplementation((req, res) => res.status(200).json(mockMatches));

      const response = await request(app).get('/matches');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockMatches);
    });
  });

  describe('GET /matches/:Match_ID', () => {
    test('should fetch a single match by ID', async () => {
      const mockMatch = {
        Match_ID: 'M001',
        Date: '2023-01-01T00:00:00.000Z',
        Teams_Involved: ['T001', 'T002'],
        Score: '2-1',
        Stadium: 'Stadium 1',
        Goals: [
          { Player_ID: 'P001', Time: '45' },
          { Player_ID: 'P002', Time: '60' }
        ]
      };
      matchesController.getMatchById.mockImplementation((req, res) => res.status(200).json(mockMatch));

      const response = await request(app).get('/matches/M001');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockMatch);
    });
  });

  describe('POST /matches', () => {
    test('should create a new match', async () => {
      const newMatchData = {
        Match_ID: 'M003',
        Date: '2023-01-01T00:00:00.000Z',
        Teams_Involved: ['T003', 'T004'],
        Score: '1-0',
        Stadium: 'Stadium 2',
        Goals: [
          { Player_ID: 'P003', Time: '30' }
        ]
      };
      matchesController.createMatch.mockImplementation((req, res) => res.status(201).json(newMatchData));

      const response = await request(app).post('/matches').send(newMatchData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(newMatchData);
    });
  });

  describe('PUT /matches/:Match_ID', () => {
    test('should update a match', async () => {
      const matchId = 'M001';
      const updateData = {
        Teams_Involved: ['T001', 'T003'],
        Score: '3-1'
      
      };
      matchesController.updateMatch.mockImplementation((req, res) => res.status(200).json({ Match_ID: matchId, ...updateData }));

      const response = await request(app).put(`/matches/${matchId}`).send(updateData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ Match_ID: matchId, ...updateData });
    });
  });

  describe('DELETE /matches/:Match_ID', () => {
    test('should delete a match', async () => {
      const matchId = 'M002';
      matchesController.deleteMatch.mockImplementation((req, res) => res.status(204).send());

      const response = await request(app).delete(`/matches/${matchId}`);
      expect(response.statusCode).toBe(204);
    });
  });
});
