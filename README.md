# Taskfolio Server

Taskfolio Server is a Node.js REST API for managing tasks and users, built with Express and MongoDB.

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a task by ID
- `POST /api/tasks` - Create a new task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Users

- `GET /api/users/:email` - Get user by email
- `PATCH /api/users/:email` - Update user by email
- `POST /api/users` - Create a new user

## License

MIT
