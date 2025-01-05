# Task_Todo Application

## Overview
Task is a powerful and flexible application designed to help users manage their tasks efficiently. This README provides an overview of the application, installation instructions, and usage guidelines.

## Features
- Task management
- User authentication


## Installation
To install the Task application, follow these steps:

1. Clone the repository:
   
2. Navigate to the project directory:
    ```bash
    cd task_Todo
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage
To start the application, run the following command:
```bash
npm start
```
Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing
We welcome contributions! Please read our [contributing guidelines](CONTRIBUTING.md) for more information.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or feedback, please contact us at support@hyrist.com.

## API Testing

To test the API endpoints, you can use tools like Postman or curl. Below are the details for user login, signup, and task management:

### User Signup
Endpoint: `POST /api/signup`

#### Request
```json
{
    "username": "your_username",
    "email": "your_email@example.com",
    "password": "your_password"
}
```

#### Response
```json
{
    "message": "User registered successfully",
    "user": {
        "username": "your_username",
        "email": "your_email@example.com"
    },
    "token":{
          "jwt-auth-token"
    }
}
```

### User Login
Endpoint: `POST /api/login`

#### Request
```json
{
    "email": "your_email@example.com",
    "password": "your_password"
}
```

#### Response
```json
{
    "message": "Login successful",
    "token": "your_jwt_token"
}
```

### Authorization
To access protected routes, include the JWT token in the `Authorization` header:

```http
Authorization: Bearer your_jwt_token
```

### Task Management

#### Create Task
Endpoint: `POST /api/tasks`

##### Request
Headers:
```http
Authorization: Bearer your_jwt_token
```
Body:
```json
{
    "title": "Task Title",
    "description": "Task Description",
}
```

##### Response
```json
{
    "message": "Task created successfully",
    "task": {
        "id": "task_id",
        "title": "Task Title",
        "description": "Task Description",
        "status": "pending"
    }
}
```

#### Get Tasks
Endpoint: `GET /api/tasks`

##### Request
Headers:
```http
Authorization: Bearer your_jwt_token
```

##### Response
```json
[
    {
        "id": "task_id",
        "title": "Task Title",
        "description": "Task Description",
        "status": "pending",
        "userID":"userID"
    },
    ...
]
```

#### Update Task
Endpoint: `PUT /api/tasks/:id`

##### Request
Headers:
```http
Authorization: Bearer your_jwt_token
```
Body:
```json
{
    "title": "Updated Task Title",
    "description": "Updated Task Description",
    "status": "completed",
    "userID":"userID"
}
```

##### Response
```json
{
    "message": "Task updated successfully",
    "task": {
        "id": "task_id",
        "title": "Updated Task Title",
        "description": "Updated Task Description",
        "status": "completed",
        "userID":"userID"
    }
}
```

#### Delete Task
Endpoint: `DELETE /api/tasks/:id`

##### Request
Headers:
```http
Authorization: Bearer your_jwt_token
```

##### Response
```json
{
    "message": "Task deleted successfully"
}
```
