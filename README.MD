# Sports Facility Booking Platform

## Project Overview
Welcome to the Sports Facility Booking Platform, an innovative backend application crafted to streamline the booking process for sports facilities. Powered by TypeScript, Express.js, and Mongoose, this platform delivers a robust suite of features tailored for efficient management of users, facilities, and bookings.

## Features

### User Authentication & Authorization:
- User Sign-Up
- User Login
- Role-based Access Control (Admin and User)

### Facility Management:
- Create, Update, and Soft Delete Facilities (Admin Only)
- Retrieve All Facilities

### Booking Management:
- Check Facility Availability
- Create, View, and Cancel Bookings (User Only)
- View All Bookings (Admin Only)
- View User-specific Bookings (User Only)

### Error Handling & Validation:
- Comprehensive Error Responses
- Input validation using Zod

### Security:
- Secure Password Handling (Hashing)
- JWT-based Authentication

### Miscellaneous:
- Transaction Management for Critical Operations
- Not Found Route Handler

## Technology Stack
- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **ODM & Validation Library:** Mongoose for MongoDB
- **Validation Library:** Zod

## Live Demo
Explore the live application at [Live Server URL](#https://assignment-3-xi-three.vercel.app).

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js (>=14.x)
- npm or yarn
- MongoDB

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/kazirauf/as-l2-as3-v-5.git

Install dependencies:
npm install
Set up environment variables:
Create a .env file in the root directory and add:
NODE_ENV=development
PORT=5000
DATABASE_URL=your_mongodb_URI
SALT_ROUND=10
JWT_ACCESS_TOKEN_SECRET=your_jwt_access_token_secret
ACCESS_TOKEN_EXPIRES_IN=1d
Start the server:
npm run start:dev
Usage
Once the server is running, use the following endpoints:

API Endpoints
User Sign Up

Route: POST /api/auth/signup
User Login

Route: POST /api/auth/login
Create a Facility (Admin Only)

Route: POST /api/facility
Update a Facility (Admin Only)

Route: PUT /api/facility/:id
Delete a Facility - Soft Delete (Admin Only)

Route: DELETE /api/facility/:id
Get All Facilities

Route: GET /api/facility
Check Facility Availability

Route: GET /api/check-availability?date=15-06-2024
Create a Booking (User Only)

Route: POST /api/bookings
View All Bookings (Admin Only)

Route: GET /api/bookings
View User-specific Bookings (User Only)

Route: GET /api/bookings/user
Cancel a Booking (User Only)

Route: DELETE /api/bookings/:id