# CRUD API with User Registration and Authentication

This repository contains a CRUD (Create, Read, Update, Delete) API for user management, including user registration and authentication. It also features role-based permissions where some users have the ability to access and manipulate user data and create/delete courses, while others have different specific permissions.

The project is built using Node.js and Express.js for the backend, with MongoDB as the database. Various npm packages are used to enhance the functionality of the application, such as bcryptjs for password hashing, jsonwebtoken for authentication, mongoose for database modeling, express-validator for request validation, multer for handling file uploads, and more.

## Features

- Create, read, update, and delete operations for a resource
- Input validation using Express-validator
- Error handling and response formatting
- Modular code structure for scalability and maintainability
- User Registration: Users can register by providing their name, email, password, avatar and role
- User Authentication: Registered users can log in using their credentials.
- Role-Based Permissions: Different users have different permissions. Some users can access and manage user data, while others can create and delete courses, and there can be other roles with specific permissions.
- Get All Users: Users with the necessary permissions can retrieve a list of all registered users.
- Secure Authentication: Passwords are securely hashed using bcryptjs, and users receive JSON Web Tokens (JWT) upon successful login to authenticate their requests.
- File Upload: It supports file upload functionality using multer for things like profile pictures.

## Prerequisites

Before running the API, ensure that you have the following prerequisites installed on your system:

- Node.js
- NPM (Node Package Manager)
- MongoDB

## Getting Started

To get started with the API, follow these steps:

1. Access the deployed version of the application at the base URL: https://crud-api-with-login-register.onrender.com.
2. BASE_URL : https://crud-api-with-login-register.onrender.com
3. Interact with the API by making HTTP requests to specific routes. For example, to retrieve a list of all courses, make a GET request to the following URL:
   {{BASE_URL}}/api/courses

## API Endpoints

The following endpoints are available for interacting with the API:

| Endpoint      | HTTP Method | Description                   |
| ------------- | ----------- | ----------------------------- |
| `/api/courses` | GET         | Retrieve all courses        |
| `/api/courses/:courseId` | GET     | Retrieve a specific course  |
| `/api/courses` | POST        | Create a new course         |
| `/api/courses/:courseId` | PUT     | Update a specific course    |
| `/api/courses/:courseId` | DELETE  | Delete a specific course    |
| `/api/users` | GET        | Get all users         |
| `/api/users/register` | POST     | Register    |
| `/api/users/login` | POST  | Login    |


## Request and Response Format

The API expects and returns JSON data. Here's an example of the request and response format for the create operation:

**Request:**

```json
POST /api/users/login
Content-Type: application/json

{
    "email": "ahmed02@be.com",
    "password": "123456"
}
```

**Response:**

```json
HTTP/1.1 200 Ok
Content-Type: application/json

{
    "status": "success",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWVkMDJAYmUuY29tIiwiaWQiOiI2NTQ0NDRiODYzYjg5YzQzY2VjZTRkMTYiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5OTE0MDc5NCwiZXhwIjoxNjk5MTQxMDk0fQ.dgQ3251X8qwzPZrBIxssOLC6YQLSpo6s5MIAyNzxq4A"
    }
}
```

## Response Format (JSend)

This API follows the JSend specification for response format. Responses will be in the following format:

{
  "status": "success",
  "data": {
    // Your response data here
  }
}

`status` can be "success," "fail," or "error" to indicate the outcome of the request.
`data` contains the response data.


## Validation

The API uses Express-validator to validate incoming requests. It performs basic validation checks on the request data, 
such as required fields and string lengths. If the request does not pass the validation, an appropriate error response will be returned.

