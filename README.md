🚗 AutoVista — Full E-Commerce Platform with Admin Panel
AutoVista is a full-stack E-Commerce web application built with React.js (frontend) and Laravel (backend).
It allows users to browse a catalog of cars for sale, view detailed information, and manage their shopping cart.
An integrated Admin Dashboard enables administrators to manage car listings, photos, and user access.

🌐 Main Features
👤 User Side
Register and log in securely.

Browse the list of available cars.

View car details: model, year, mileage, price, and image.

Add cars to the shopping cart.

🛠️ Admin Side
Secure login using admin credentials (admin@autovista.com).

Access a private dashboard at /admin.

Full CRUD management for car listings:

➕ Add new cars.

✏️ Edit existing listings.

❌ Delete cars.

🖼️ Manage car images (add/remove).

⚙️ Technical Stack
Layer	Technologies Used
Frontend	React.js, React Router, Context API (or Redux), CSS
Backend	Laravel 11 (API REST), Sanctum for authentication
Database	MySQL
Security	Middleware auth:sanctum and admin for protected routes
Storage	LocalStorage for user token and role persistence

🔁 Smart Redirection
After login:

If role = admin → redirect automatically to /admin/cars.

If role = user → redirect to / (Home page).

🧱 Project Architecture
pgsql
Copier le code
ecommerce-frontend/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Login.jsx
│   │   └── CarList.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── AdminCars.jsx
│   ├── App.js
│   └── App.css
│
└── backend/
    ├── app/
    │   ├── Http/
    │   │   ├── Controllers/
    │   │   │   ├── AuthController.php
    │   │   │   └── CarController.php
    │   │   └── Middleware/AdminMiddleware.php
    │   └── Models/User.php, Car.php
    ├── database/
    │   ├── migrations/
    │   └── seeders/AdminSeeder.php
    └── routes/api.php
🚀 How It Works
The backend provides a RESTful API for authentication and car management.

The frontend consumes this API via Axios.

Admin users can add, edit, and delete car listings from their dashboard.

All protected routes are secured by Laravel Sanctum middleware.
