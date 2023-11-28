# CSE 341 Final Project Proposal

## General Info
- JAYSON RONALD
- LEONI SAMUELE GIOVANNI
- RONALD COELLO DIAZ
- DAVID ADEOGUN

**EUROPEAN PREMIER LEAGUE API**

## Contents
1. [General Info](#general-info)
2. [Application Info](#application-info)
3. [API Endpoint Planning](#api-endpoint-planning)
4. [Project Scheduling and Delegation](#project-scheduling-and-delegation)
5. [Potential Risks and Risk Mitigation Techniques](#potential-risks-and-risk-mitigation-techniques)

## Application Info
### What will the API do?
**ANSWER:** Fetch various soccer teams and information. Players, coaches, matches, general data about the team.

### How will your API utilize a login system?
**ANSWER:** Login is required to prevent manipulation of data.

### What database will you use?
**ANSWER:** Mongo DB.

### How will the data be players in your database?
**ANSWER:** Create collections for respective teams in the Premier League.

### How would a frontend be able to manage authentication state based on the data you provide?
**ANSWER:** JWT Tokens.

### What pieces of data in your app will need to be secured? How will you demonstrate web security principles in the development of this app?
**ANSWER:** The Login credentials. Hashing for password management.

### What file structure and program architecture will you use for this project (how will you organize your node project)? Why?
**ANSWER:** MVC model. For code maintenance and modularization.

### What are potential stretch challenges that you could implement to go above and beyond?
**ANSWER:** Application performance optimization and show the data on the front-end.

## API Endpoint Planning
For this section, you’ll plan out what API endpoints you’ll need for your project:

- **Teams**
  - POST /teams/login
  - PUT /teams/teamsId
  - GET /teams
  - GET /teams/teamsId
  - DELETE /teams/{teamsId}

- **Players**
  - GET /players
  - GET /players/{teamID}
  - POST /players
  - PUT /players/{playerID}
  - GET /players/{position}
  - GET /players/{playerID}
  - DELETE /players/{playerID}

- **Matches**
  - POST /matches/login
  - POST /matches/logout
  - GET /matches/{team ID}
  - GET /matches
  - PUT /matches/{matchesID}
  - DELETE /matches/{matchesID}

- **Coaches**
  - POST /coaches/login
  - POST /coaches/logout
  - GET /coaches/{coach ID}
  - GET /coaches
  - PUT /coaches/{coachID}
  - DELETE /coaches/{coachsID}

**Deployment:** RENDER

## Project Scheduling and Delegation
Plan out what tasks will get completed with each lesson remaining in the semester (Only edit highlighted text).

- **Week 04 Tasks**
  - Project Proposal
- **Week 05 Tasks**
  - Create Git Repo
  - Push to Render
  - API DOCUMENTATION is complete and available at route ‘/api-docs’
  - Authentication
- **Week 06 Tasks**
  - Wrapping up CRUD functions
  - Validation
  - Testing
  - Hashing

- **Week 07 Tasks**
  - Re-testing and Video Presentation and Project Submission

### How will you divide up work in your team to ensure the following tasks all get completed?
- HTTP GET, GET (all, single)…JAYSON
- HTTP POST … JAYSON
- HTTP PUT..SAMUELE
- HTTP DELETE…SAMUELE
- Authentication…RONALD
- Validation…JAYSON & SAMUELE
- Node.js project creation..RONALD
- Create git repo and share with group: RONALD
- MongoDB setup..DAVID
- API Swagger documentation for all API routes..DAVID
- Testing…David
- Video presentation of node project, all routes functioning, mongoDB data being modified, and API documentation…DAVID

## Potential Risks and Risk Mitigation Techniques
### What are the risks involved with you being able to finish this project in a timely manner?
- Application integration

### How will you mitigate or overcome these risks?
- Team communication
