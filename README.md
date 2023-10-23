# Simple API CRUD Operations using Express and Express-validator

This repository contains a simple API that demonstrates CRUD (Create, Read, Update, Delete) operations using the Express framework and the Express-validator library.
It serves as a starting point for building RESTful APIs with basic validation and error handling.

## Features

- Create, read, update, and delete operations for a resource
- Input validation using Express-validator
- Error handling and response formatting
- Modular code structure for scalability and maintainability

## Prerequisites

Before running the API, ensure that you have the following prerequisites installed on your system:

- Node.js
- NPM (Node Package Manager)

## Getting Started

To get started with the API, follow these steps:

1. Clone the repository to your local machine: https://github.com/Ahmedl-Be/CRUD-API.git
2. Navigate to the project directory: cd simple-api-express
3. Install the dependencies using NPM: npm install
4. Start the API: npm start

##API Endpoints

The following endpoints are available for interacting with the API:

| Endpoint      | HTTP Method | Description                   |
| ------------- | ----------- | ----------------------------- |
| `/api/courses` | GET         | Retrieve all courses        |
| `/api/courses/:courseId` | GET     | Retrieve a specific resource  |
| `/api/courses` | POST        | Create a new course         |
| `/api/courses/:courseId` | PUT     | Update a specific course    |
| `/api/courses/:courseId` | DELETE  | Delete a specific course    |


## Request and Response Format

The API expects and returns JSON data. Here's an example of the request and response format for the create operation:

**Request:**

```json
POST /api/course
Content-Type: application/json

{
  "title": "Node.js course",
  "price": "90"
}
```

**Response:**

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "5",
  "title": "Node.js course",
  "price": "90"
}
```

## Validation

The API uses Express-validator to validate incoming requests. It performs basic validation checks on the request data, 
such as required fields and string lengths. If the request does not pass the validation, an appropriate error response will be returned.

