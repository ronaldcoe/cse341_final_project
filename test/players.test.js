const request = require('supertest');
const express = require('express');
const router = require('../routes/players'); 
const playersController = require('../controllers/players'); 

jest.mock('../controllers/players'); // Mock the playersController
jest.mock('../middleware/authenticate', () => ({ // Mock the authenticate middleware
  isAuthenticated: (req, res, next) => next(),
}));

const app = express();
app.use(express.json());
app.use('/players', router);
app.get('/players/position/:Position', playersController.getPlayersByPosition); 

describe('Players Routes', () => {
  describe('GET /players', () => {
    test('should fetch all players', async () => {
      const mockPlayers = [
        {
          Player_ID: 'P001',
          Name: 'Player A',
          Age: '20',
          Height: '180cm',
          Nationality: 'American',
          Position: 'Midfielder',
          Team_ID: 'T001'
        },
        {
          Player_ID: 'P002',
          Name: 'Player B',
          Age: '22',
          Height: '175cm',
          Nationality: 'British',
          Position: 'Defender',
          Team_ID: 'T002'
        }
      ];
      playersController.getAllPlayers.mockImplementation((req, res) => res.status(200).json(mockPlayers));

      const response = await request(app).get('/players');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockPlayers);
    });
  });

  describe('GET /players/:Player_ID', () => {
    test('should fetch a single player by ID', async () => {
      const mockPlayer = {
        Player_ID: 'P001',
        Name: 'Player A',
        Age: '20',
        Height: '180cm',
        Nationality: 'American',
        Position: 'Midfielder',
        Team_ID: 'T001'
      };
      playersController.getPlayerById.mockImplementation((req, res) => res.status(200).json(mockPlayer));

      const response = await request(app).get('/players/P001');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockPlayer);
    });
  });

  describe('GET /players/position/:Position', () => {
    test('should fetch players by position', async () => {
      const position = 'Goalkeeper';
      const mockPlayers = [
        {
          Player_ID: 'P003',
          Name: 'Player C',
          Age: '23',
          Height: '185cm',
          Nationality: 'German',
          Position: position,
          Team_ID: 'T003'
        }
      ];
      playersController.getPlayersByPosition.mockImplementation((req, res) => res.status(200).json(mockPlayers));

      const response = await request(app).get(`/players/position/${position}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockPlayers);
    });
  });

  describe('POST /players', () => {
    test('should create a new player', async () => {
      const newPlayerData = {
        Player_ID: 'P004',
        Name: 'Player D',
        Age: '21',
        Height: '178cm',
        Nationality: 'Spanish',
        Position: 'Forward',
        Team_ID: 'T004'
      };
      playersController.createPlayer.mockImplementation((req, res) => res.status(201).json(newPlayerData));

      const response = await request(app).post('/players').send(newPlayerData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(newPlayerData);
    });
  });

  describe('PUT /players/:Player_ID', () => {
    test('should update a player', async () => {
      const playerId = 'P001';
      const updateData = {
        Name: 'Player A Updated',
        Age: '25',
        Height: '182cm',
        Nationality: 'American',
        Position: 'Midfielder'
      };
      playersController.updatePlayer.mockImplementation((req, res) => res.status(200).json({ Player_ID: playerId, ...updateData }));

      const response = await request(app).put(`/players/${playerId}`).send(updateData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ Player_ID: playerId, ...updateData });
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
