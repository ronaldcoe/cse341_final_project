const request = require('supertest');
const express = require('express');
const router = require('../routes/players'); 
const playersController = require('../controllers/players'); 

jest.mock('../controllers/players'); // Mock the playersController

const app = express();
app.use(express.json());
app.use('/players', router);
app.get('/players/position/:Position', playersController.getPlayersByPosition); 

describe('Players Routes', () => {
  describe('GET /players', () => {
    test('should fetch all players', async () => {
      const mockPlayers = [{ playerId: 'P001', name: 'Player A' }, { playerId: 'P002', name: 'Player B' }];
      playersController.getAllPlayers.mockImplementation((req, res) => res.status(200).json(mockPlayers));

      const response = await request(app).get('/players');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockPlayers);
    });
  });

  describe('GET /players/:Player_ID', () => {
    test('should fetch a single player by ID', async () => {
      const mockPlayer = { playerId: 'P001', name: 'Player A' };
      playersController.getPlayerById.mockImplementation((req, res) => res.status(200).json(mockPlayer));

      const response = await request(app).get('/players/P001');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockPlayer);
    });
  });


  describe('GET /players/position/:Position', () => {
    test('should fetch players by position', async () => {
      const position = 'Goalkeeper';
      const mockPlayers = [{ playerId: 'P003', name: 'Player C', position: position }];
      playersController.getPlayersByPosition.mockImplementation((req, res) => res.status(200).json(mockPlayers));

      const response = await request(app).get(`/players/position/${position}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockPlayers); 
    });
  });
  

  describe('POST /players', () => {
    test('should create a new player', async () => {
      const newPlayerData = { playerId: 'P004', name: 'Player D' };
      playersController.createPlayer.mockImplementation((req, res) => res.status(201).json(newPlayerData));

      const response = await request(app).post('/players').send(newPlayerData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(newPlayerData);
    });
  });

  describe('PUT /players/:Player_ID', () => {
    test('should update a player', async () => {
      const playerId = 'P001';
      const updateData = { name: 'Player A Updated' };
      playersController.updatePlayer.mockImplementation((req, res) => res.status(200).json({ playerId, ...updateData }));

      const response = await request(app).put(`/players/${playerId}`).send(updateData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ playerId, ...updateData });
    });
  });

  describe('DELETE /players/:Player_ID', () => {
    test('should delete a player', async () => {
      const playerId = 'P002';
      playersController.deletePlayer.mockImplementation((req, res) => res.status(204).send());

      const response = await request(app).delete(`/players/${playerId}`);
      expect(response.statusCode).toBe(204);
    });
  });
});
