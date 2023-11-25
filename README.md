# Recipe Management Application

The Recipe Management Application is a web-based platform built to facilitate recipe creation, storage, and management. It allows users to create, store, and manage their recipes while providing features to view, update, and delete them.

## Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

* Node.js
* Express.js
* React
* Firebase
* MongoDB Atlas
* Firestore
* Cloudinary

## Features

- **User Authentication**: Firebase authentication for secure user management.
- **Recipe Creation**: Allows users to create and upload recipes with details.
- **Recipe Listing**: Displays a list of recipes with essential information.
- **Update and Delete**: Allows users to modify or delete their recipes.
- **API Documentation**: Accessible via `/api-docs` endpoint.
## Architecture
![Diagramme sans nom drawio](https://github.com/HansLanda14ib/gestion-recette/assets/100965812/eebc9a2d-863b-47ef-8c24-f1ea016d8224)

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB database setup.
- Firebase project for authentication.
- Cloudinary account for image uploads.

### Installation

1. Clone the repository.
```bash
git clone https://github.com/HansLanda14ib/gestion-recette.git
```
**1. Node.js:** Make sure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/en/download/current).

**2. MongoDB:** For running the MongoDB databases use MongoDB Cloud from here.
- Go to Atlas website [here](https://www.mongodb.com/cloud/atlas). and click on Try Free then create an account
- Click on Build a Cluster then choose a provider and a region then click on Create Cluster
- Click on Database Access from the left menu then click on Add new database user
- Give a username and a password then click on Add user
- Click on Network Access from the left menu then click on Add IP Address
- Click on Allow access from anywhere then click on Confirm
- Click on Clusters from the left menu then click on Connect
- Choose Connect your application then copy the connection string and paste it in the `.env` file variable named `MONGO_URI`


**3. Firebase Account:** 
Set up a Firebase account and project for the Auth Service. You can create a project through the Firebase Console. 
- Go to : https://console.firebase.google.com/
- Click : Create a project and give a name to your project
- Disable : Google Analytics for this project then wait for the project to be created.
- **Configure Authentication:**
    - Click : **Authentication** from the left menu then click on Get Started
    - Click : Email/Password then click on Enable
- Go back to the left menu and click on **Project Overview**
  
- **Configure firestore:**
    - Click on **firestore** from the left menu then click on **Create database**
    - Choose Start in *test mode* then click on **Enable**

- **Configure Realtime Database:**
    - Click on **RealTime Database** from the left menu then click on **Create database**
    - Choose Start in *test mode* then click on **Enable**

- Go back to the left menu and click on **Project Overview**
    - Click : Add app then choose **web** : 
    - Give a name to your app then click on **Register app**
      ##### **Frontend-app setting:**
    - Copy the config object and paste it in the `.env` file in the **frontend directory** (remember if you re using REACT, your env variables must start with `REACT_APP_` )
          - `REACT_APP_APIKEY`= 
          - `REACT_APP_AUTHDOMAIN`= 
          - `REACT_APP_DATABASEURL`= 
          - `REACT_APP_PROJECTID`= 
          - `REACT_APP_STORAGEBUCKET`= 
          - `REACT_APP_MESSAGINGSENDERID`= 
          - `REACT_APP_APPID`=
  
          ** `.env` file example: **
  
         ![env file example](https://github.com/HansLanda14ib/hotels-booking-api/assets/100965812/284c5ce6-b67c-4a88-bf7a-8ece96e77efe)

    ##### **Configure firebase for backend-app setting:**
  - Click on the :gear: next to Project Overview then click on **Project settings**
  - Click on **Service accounts** then click on *Generate new private key*
  - Copy the content of the downloaded file and paste in file named `service-account.json` in `src/firebase` directory
  - Example of `/firebase/service-account.json` file :
  
   ![service-account.json](https://github.com/HansLanda14ib/hotels-booking-api/assets/100965812/ae919115-87c9-4cb0-a98d-91dcd6f2806f)

3. Install backend dependencies: `npm install` in the root directory.
4. Install frontend dependencies: `npm install` in the `client` directory.
5. Set up environment variables for Firebase, Cloudinary, and MongoDB.
6. Start the backend server: `npm start`.
7. Start the frontend application: `cd client && npm start`.
8. if you want to start all at once : `npm run dev`

## API Documentation

Access the API documentation by visiting `/api-docs` on the running server. Ex : http://localhost:5001/api-docs

