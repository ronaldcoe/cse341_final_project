const request = require('supertest');
const express = require('express');
const router = require('../routes/teams'); 
const teamsController = require('../controllers/teams'); 

jest.mock('../controllers/teams'); // Mock the teamsController

const app = express();
app.use(express.json());
app.use('/teams', router);

describe('Teams Routes', () => {
  describe('GET /teams', () => {
    test('should fetch all teams', async () => {
      const mockTeams = [{ teamId: 'T001', teamName: 'Team A' }, { teamId: 'T002', teamName: 'Team B' }];
      teamsController.getAllTeams.mockImplementation((req, res) => res.status(200).json(mockTeams));

      const response = await request(app).get('/teams');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockTeams);
    });
  });

  describe('GET /teams/:Team_ID', () => {
    test('should fetch a single team by ID', async () => {
      const mockTeam = { teamId: 'T001', teamName: 'Team A' };
      teamsController.getTeamById.mockImplementation((req, res) => res.status(200).json(mockTeam));

      const response = await request(app).get('/teams/T001');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockTeam);
    });
  });

  describe('POST /teams', () => {
    test('should create a new team', async () => {
      const newTeamData = { teamId: 'T003', teamName: 'Team C' };
      teamsController.createTeam.mockImplementation((req, res) => res.status(201).json(newTeamData));

      const response = await request(app).post('/teams').send(newTeamData);
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(newTeamData);
    });
  });

  describe('PUT /teams/:Team_ID', () => {
    test('should update a team', async () => {
      const teamId = 'T001';
      const updateData = { teamName: 'Team A Updated' };
      teamsController.updateTeam.mockImplementation((req, res) => res.status(200).json({ teamId, ...updateData }));

      const response = await request(app).put(`/teams/${teamId}`).send(updateData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ teamId, ...updateData });
    });
  });

  describe('DELETE /teams/:Team_ID', () => {
    test('should delete a team', async () => {
      const teamId = 'T002';
      teamsController.deleteTeam.mockImplementation((req, res) => res.status(204).send());

      const response = await request(app).delete(`/teams/${teamId}`);
      expect(response.statusCode).toBe(204);
    });
  });
});
