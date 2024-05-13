# Twittagram

<details>
  <summary>Content 📝</summary>
  <ol>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#goal">Goal</a></li>
    <li><a href="#deployment-🚀">Deployment</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#local-installation">Installation</a></li>
    <li><a href="#views">Views</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#decisions">Decisions</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#known-issues">Known Issues</a></li>
    <li><a href="#author">Authort</a></li>
  </ol>
</details>

## About the project
This was the final project for an FSD bootcamp at GeeksHubs Academy. The project consisted in designing and making a full webapp from scratch, back and front. This is the front of the project. I decided to make an app for teachers to create groups, students and tasks and easily mark the tasks and get the correctly weighted final marks for each student.

## Goal
The project required us to make a front-end application in react. It also required the following views and features:

- Home view
- Register view
- Login view
- Editable profile
- Crud of group
- Crud of student
- crud of tasks
- crud of marks


## Deployment 🚀
<div align="center">
    comming soon
</div>

## Stack
Technologies employed:
<div align="center">
<a href="https://es.react.dev/">
    <img src= "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
</a>
<a href="">
    <img src= "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/node.js-026E00?style=for-the-badge&logo=node.js&logoColor=white"/>
</a>
<a href="https://developer.mozilla.org/es/docs/Web/JavaScript">
    <img src= "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
</a>
<a href="https://redux.js.org/">
    <img src= "https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/>
</a>
 </div>


## Installation
1. Clone the repo: ` $ git clone https://github.com/Eryhnar/ScholarTrack-front.git`
2. ` $ npm install `
3. Follow the server installation steps detailed here: `https://github.com/Eryhnar/ScholarTrack.git`
4. In the apiCalls file, adjust root to the address of your server from step 3
5. Execute `$ npm run dev` and open the address returned in the browser

## Views
comming soon

## Features

- Refetches, fetch caching, fetch invalidation when another fetch is requested. 

- Responsive design

- Redirects: There is a system to redirect users from routes that don't exist or the do not have access to.

- Dynamic header that changes depending on the view.

- AI chat (comming soon): AI chat to help plan your classes and prepare tasks.

- Calendar (comming soon): Calendar of your classes with navigation to the lesson plan for that session (also comming soon).


## Credentials
    These are some of the credentials provided in the seeder.
    - user@user.com password: Aa123456 (user)

## Decisions

- The design tries to minimize calls to the api.

## Roadmap
- Add Ai chat
- Add session crud
- Add calendar view
- Reimplement user token revocation
- Reimplement google login
- Reimplement delete functions
- Implement Attendance lists
- Add the possibility to add tags to tasks
- Add the possibility of reusing a student in other groups
- Add the possibility of reusing a task in other groups
- Add group grading scale settings to customize how the marks are displayed and requested


## Known issues
- The delete functions were removed temporarily due to issues with the cluster.
- Likewise the attendance was removed due to issues with the cluster.
- Sometimes CreateMarks view fails on first access. (Being investigated)

## Author 

- **Pedro Fernández** - Project Developer
  - [GitHub](https://github.com/Eryhnar) - [LinkedIn](https://www.linkedin.com/in/pedro-fernandez-bel-68a2b9155/)
