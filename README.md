# Full Stack JavaScript Todo Application

This is a full stack JavaScript todo application built with Node.js, Express, React, and MongoDB. It allows users to sign up, sign in, and create their own todo list items.

## Frontend
The frontend code for this project can be found at [https://github.com/FREDVUNI/react-todo](https://github.com/FREDVUNI/react-todo).

## Technologies Used
- Node.js
- Express
- MongoDB
- React
- MUI

## Setup
To use this application, you will need to have Node.js and MongoDB installed on your machine. Once you have these dependencies installed, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` in the project directory to install the necessary dependencies.
3. Set up your database in MongoDB and create the necessary environment variables in a `.env` file.
4. Start the server by running `npm start` in the project directory.

## API Endpoints
This backend provides the following API endpoints:

- `/api/users`
  - `POST`: create a new user
- `/api/auth`
  - `POST`: authenticate a user and get a JSON web token
- `/api/todos`
  - `GET`: get all todos for a user
  - `POST`: create a new todo for a user
- `/api/todos/:id`
  - `PUT`: update a specific todo by ID
  - `DELETE`: delete a specific todo by ID

## Contribution
If you want to contribute to this project, you can do so by following these steps:

1. Fork this repository
2. Clone the forked repository to your local machine
3. Create a new branch for your changes: `git checkout -b my-new-branch`
4. Make changes and commit them: `git commit -m "Add some feature"`
5. Push to the branch: `git push origin my-new-branch`
6. Create a new Pull Request

## Credits
This project was created by [FREDVUNI](https://github.com/FREDVUNI).

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.
