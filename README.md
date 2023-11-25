# Recipe Management Application

The Recipe Management Application is a web-based platform built to facilitate recipe creation, storage, and management. It allows users to create, store, and manage their recipes while providing features to view, update, and delete them.

## Technologies Used

- **Node.js**: Backend server environment.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database used for storing recipe data.
- **React**: Frontend library for building user interfaces.
- **Firebase**: Used for user authentication.
- **Cloudinary**: Utilized for handling image uploads.
- **Swagger/OpenAPI**: Provides API documentation.

## Features

- **User Authentication**: Firebase authentication for secure user management.
- **Recipe Creation**: Allows users to create and upload recipes with details.
- **Recipe Listing**: Displays a list of recipes with essential information.
- **Recipe Details**: Provides detailed information about a selected recipe.
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
2. Install backend dependencies: `npm install` in the root directory.
3. Install frontend dependencies: `npm install` in the `client` directory.
4. Set up environment variables for Firebase, Cloudinary, and MongoDB.
5. Start the backend server: `npm start`.
6. Start the frontend application: `cd client && npm start`.

## API Documentation

Access the API documentation by visiting `/api-docs` on the running server.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for improvements or new features.

## License

This project is licensed under the [MIT License](LICENSE).
