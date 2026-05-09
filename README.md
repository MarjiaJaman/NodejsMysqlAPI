# Node.js MySQL API

A RESTful API built with Node.js, Express, and MySQL with JWT authentication, posts, comments, and image uploads.

## Features

- 🔐 **User Authentication** - Secure JWT-based authentication with bcrypt password hashing
- 📝 **Posts Management** - Full CRUD operations for blog posts
- 💬 **Comments System** - Nested comments with user associations
- 🖼️ **Image Upload** - File upload handling with Multer
- 🏷️ **Category System** - Organize posts with categories
- 👤 **User Roles** - Role-based access control with address management
- 🔄 **Database Migrations** - Version-controlled database schema with Sequelize
- 🐳 **Docker Ready** - Containerized deployment with Docker Compose
- ⚡ **Auto Reload** - Development mode with Nodemon

## Tech Stack

Node.js • Express • MySQL • Sequelize • JWT • bcryptjs • Multer • Docker

## Prerequisites

- Node.js (v14+)
- MySQL (v8+)
- Docker & Docker Compose (optional)

## Quick Start

### Using Docker (Recommended)

```bash
git clone https://github.com/MarjiaJaman/NodejsMysqlAPI.git
cd nodejs-mysql-api
docker-compose up --build
```

The app will start on `http://localhost:3000` with MySQL on port `3310`

### Local Setup

```bash
git clone https://github.com/MarjiaJaman/NodejsMysqlAPI.git
cd nodejs-mysql-api
npm install
```

Configure database in `config/config.json`:

```json
{
  "development": {
    "username": "your_username",
    "password": "your_password",
    "database": "nodejs_mysql_api",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Run migrations and start:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all  # Optional: seed sample data
npm start
```

## API Endpoints

### Authentication

- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login and receive JWT token
- `GET /api/v1/user/profile` - Get user profile 🔒

### Posts

- `GET /api/v1/posts` - Get all posts
- `GET /api/v1/posts/:id` - Get single post
- `POST /api/v1/posts` - Create post 🔒
- `PUT /api/v1/posts/:id` - Update post 🔒
- `DELETE /api/v1/posts/:id` - Delete post 🔒

### Comments

- `GET /api/v1/comments` - Get all comments
- `POST /api/v1/comments` - Create comment 🔒
- `PUT /api/v1/comments/:id` - Update comment 🔒
- `DELETE /api/v1/comments/:id` - Delete comment 🔒

### Images

- `GET /api/v1/images` - Get all images
- `POST /api/v1/images` - Upload image 🔒
- `DELETE /api/v1/images/:id` - Delete image 🔒

🔒 = Requires JWT token in header: `Authorization: Bearer <your_token>`

## Database Migrations

```bash
# Create new migration
npx sequelize-cli migration:generate --name migration-name

# Run migrations
npx sequelize-cli db:migrate

# Rollback last migration
npx sequelize-cli db:migrate:undo
```

## License

ISC © [Marjia Jaman](https://github.com/MarjiaJaman)
