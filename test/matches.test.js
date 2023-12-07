const request = require('supertest');
const express = require('express');
const router = require('../routes/matches'); 
const matchesController = require('../controllers/matches'); 

jest.mock('../controllers/matches'); // Mock the matchesController

const app = express();
app.use(express.json());
app.use('/matches', router);

describe('Matches Routes', () => {
  describe('GET /matches', () => {
    test('should fetch all matches', async () => {
      const mockMatches = [{ matchId: 'M001', teamsInvolved: ['Team A', 'Team B'] }];
      matchesController.getAllMatches.mockImplementation((req, res) => res.status(200).json(mockMatches));

      const response = await request(app).get('/matches');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockMatches);
    });
  });

  describe('GET /matches/:Match_ID', () => {
    test('should fetch a single match by ID', async () => {
      const mockMatch = { matchId: 'M001', teamsInvolved: ['Team A', 'Team B'] };
      matchesController.getMatchById.mockImplementation((req, res) => res.status(200).json(mockMatch));

      const response = await request(app).get('/matches/M001');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockMatch);
    });
  });


  describe('POST /matches', () => {
    test('should create a new match', async () => {
      const newMatchData = { matchId: 'M003', teamsInvolved: ['Team D', 'Team E'] };
      matchesController.createMatch.mockImplementation((req, res) => res.status(201).json(newMatchData));

      const response = await request(app).post('/matches').send(newMatchData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(newMatchData);
    });
  });

  describe('PUT /matches/:Match_ID', () => {
    test('should update a match', async () => {
      const matchId = 'M001';
      const updateData = { teamsInvolved: ['Team A', 'Team B Updated'] };
      matchesController.updateMatch.mockImplementation((req, res) => res.status(200).json({ matchId, ...updateData }));

      const response = await request(app).put(`/matches/${matchId}`).send(updateData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ matchId, ...updateData });
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
