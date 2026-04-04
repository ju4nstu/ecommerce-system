# E-Commerce System

A scalable microservices-based e-commerce backend built with Node.js and Fastify, featuring user authentication, product management, shopping cart, and payment processing.

## Architecture

This project follows a **Microservices Architecture** pattern with the following components:

- **API Gateway**: Routes requests to appropriate services and acts as a load balancer
- **Independent Microservices**: Each service (Users, Products, Shopping Cart, Orders, Payments, Notifications) operates independently
- **Scalability**: Services can be deployed and scaled independently
- **Database**: PostgreSQL with Knex query builder

## Features

### ✅ Implemented Features

#### User Management
- **User Authentication**: JWT-based secure authentication
  - Sign up with secure password hashing (bcrypt)
  - Sign in with email and password
  - Secure token generation and cookie management
- **User Profiles**: 
  - View user profile information
  - Update profile data
  - Delete user account
- **Security Features**:
  - Password strength validation
  - Age verification
  - Rate limiting
  - Helmet protection (security headers)

#### Product Management
- **Product Listing**: Browse all active products with pagination
  - Offset-based pagination
  - Customizable page size and sorting
  - Sort by price (ascending/descending)
- **Product Search**: Search products by name or description
- **Product Details**: View detailed information about a specific product
- **Read-Only Access**: Products are managed separately and queried via API

#### Payment Processing
- **Stripe Integration**: Backend-only payment intent creation
  - Create payment intents
  - Return client_secret to frontend for secure client-side processing

#### Error Handling
- Centralized error handling with custom error classes
- Proper HTTP status codes and error messages

### 🚧 In Progress

#### Shopping Cart Module
- Add items to cart
- Remove items from cart
- Update item quantities
- View cart contents
- Calculate cart totals

#### Orders Module
- Create orders from cart
- View order history
- Track order status
- Order management endpoints

#### Payment Module
- Payment processing workflows
- Transaction management
- Payment verification

#### Notifications Module
- Order confirmation emails
- Shipping update notifications
- Event-triggered notifications

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Fastify (high-performance web framework)
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: PostgreSQL
- **Query Builder**: Knex.js
- **Security**: 
  - bcrypt (password hashing)
  - Helmet (security headers)
  - Rate limiting
  - Cookies with httpOnly flag
- **Payments**: Stripe API
- **Development**: Nodemon (auto-restart)
- **Testing**: Jest

## Project Structure

```
ecommerce-system/
├── APIGateway/           # API Gateway - routes requests to services
├── users/                # User management service
│   ├── services/         # Business logic (auth, profiles)
│   ├── routes/           # API endpoints
│   ├── models/           # Schema validation
│   ├── config/           # Database configuration
│   └── tests/            # Unit tests
├── products/             # Product service
│   ├── services/         # Product logic (list, search, details)
│   ├── routes/           # Product endpoints
│   ├── config/           # Database configuration
│   └── tests/            # Product tests
├── shoppingCart/         # Shopping cart service (in progress)
├── orders/               # Order management (in progress)
├── payment/              # Payment processing (in progress)
├── notification/         # Email notifications (in progress)
├── errorHandler/         # Centralized error handling
└── docs/                 # Architecture documentation
    └── adr/              # Architecture Decision Records
```

## API Endpoints

### Users Service
- `POST /users/signup` - Register new user
- `POST /users/signin` - Login user
- `GET /users/profile` - Get user profile (protected)
- `PUT /users/profile` - Update user profile (protected)
- `DELETE /users/profile` - Delete user account (protected)
- `GET /users/database` - Get database information

### Products Service
- `GET /products` - List all products with pagination
  - Query params: `page_number`, `page_size`, `sort`
- `GET /products/:id` - Get product details
- `GET /products/search/:input` - Search products

### Payment Service
- Payment endpoints (Stripe integration ready)

### Shopping Cart (In Progress)
- Add to cart
- Remove from cart
- View cart
- Update quantities


## Development Status

This is an active development project with features actively being built and tested.
