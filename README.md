# Mini CRM System

A simple CRM application built with Node.js, Express, MySQL, and Sequelize. It allows users to register customers, log and view customer activities, generate reports for inactive customers, and send automated email reminders. The project features JWT authentication and provides two user roles: **admin** and **seller**.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication & Security](#authentication--security)
- [Responsive UI](#responsive-ui)
- [License](#license)

## Features

- **Customer Management:**  
  Create, update, and delete customer records.
  
- **Activity Logging:**  
  Log customer activities, and view activity history.

- **Inactive Customers Report:**  
  Generate reports for customers who haven't been contacted within a configurable threshold (e.g., 30 days).

- **Email Reminders:**  
  Automated email reminders to re-engage inactive customers using Nodemailer.

- **JWT Authentication:**  
  Secure endpoints with token-based authentication.

- **User Roles:**  
  Different actions available for **admins** (full access) and **sellers** (restricted access).

- **Responsive UI:**  
  A modern, responsive frontend (HTML/CSS/JavaScript) that works well on both desktop and mobile devices.

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MySQL, Sequelize ORM
- **Authentication:** JWT
- **Email Notifications:** Nodemailer
- **Frontend:** HTML, CSS (responsive design)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/crm-project.git
   cd crm-project/CRM
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Database Setup:**

   - Create a MySQL database.
   - Update your database configuration in the Sequelize configuration file (e.g., `config/config.json`).

4. **Environment Variables:**

   Create a `.env` file in the project root with the following variables:

   ```dotenv
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=admin
   DB_NAME=crm_database
   JWT_SECRET=secretkey
   ```

5. **Run Database Migrations (if applicable):**

   ```bash
   npx sequelize-cli db:migrate
   ```

## Usage

1. **Start the Server:**

   ```bash
   npm start
   ```

2. **Access the App:**

   - **Frontend:** Open `frontend/index.html` in your browser.
   - **API:** The backend API is available at `http://localhost:3000/api`

3. **Login & User Roles:**

   - Use the login page (`login.html`) to authenticate.
   - Depending on your role (admin or seller), you'll have access to different functionalities.
    email: admin@example.com / seller: john@example.com
    password:admin: your_password/seller: password
## Project Structure

```
CRM/
├── controllers/           # Controllers for handling request logic.
│   ├── customerController.js
│   └── activityController.js
├── middleware/            # Authentication and other middleware.
│   └── authMiddleware.js
├── models/                # Sequelize data models.
│   ├── customer.js
│   └── activity.js
├── routes/                # Express route definitions.
│   ├── customerRoutes.js
│   └── activityRoutes.js
├── services/              # Business logic, separate from controllers.
│   ├── customerService.js
│   └── activityService.js
├── frontend/              # Frontend files (HTML, CSS, JS).
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── report.js
│   │   ├── addActivity.js
│   │   └── customerDetails.js
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── customerDetails.html
│   ├── addEditCustomer.html
│   └── addActivity.html
├── app.js                 # Main Express application file.
├── package.json           # Project dependencies & scripts.
└── README.md              # Project documentation.
```

## API Endpoints

- **Authentication:**  
  - `POST /api/auth/login` - Log in and receive a JWT.
  - `POST /api/auth/register` - Register a new user (if enabled).

- **Customers:**  
  - `GET /api/customers/:id` - Retrieve details for a specific customer.
  - `POST /api/customers` - Create a new customer.
  - `PUT /api/customers/:id` - Update customer details.
  - `DELETE /api/customers/:id` - Delete a customer (admin only).
  - `GET /api/customers/inactiveCustomers` - Get a list of inactive customers.

- **Activities:**  
  - `GET /api/activities?customerId=ID` - Get activities for a customer.
  - `POST /api/activities` - Log a new customer activity.

## Authentication & Security

- All protected routes require a valid JWT to be sent as a bearer token in the `Authorization` header.
- Middleware (`authMiddleware.js`) is applied to ensure endpoints are secure.
- Role-based access is enforced on sensitive operations (e.g., only admins can delete customers).

## Responsive UI

- The frontend utilizes responsive design techniques:
  - CSS media queries adjust layout for smaller devices (phones, tablets).
  - A modern, mobile-friendly design is provided with clear typography and spacing.
  - Tested responsiveness on devices including the iPhone 15.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README according to your project’s specific requirements and features.