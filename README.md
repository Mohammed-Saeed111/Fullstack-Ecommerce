# MEAN Stack E-commerce Project

This project is a full-stack e-commerce application built using the **MEAN stack** (MongoDB, Express.js, Angular, and Node.js). It provides a platform for users to browse products, add items to their cart, place orders, and manage their profiles. Admin users can manage categories, products, and orders.

---

## Features

### **User Module**
- **Authentication**
  - Register and login functionality.
  - Secure API endpoints for user authentication.
- **Shopping**
  - Home page:
    - Dynamic category menu.
    - Featured products section.
    - New arrivals section.
    - Product search functionality.
  - Product list page:
    - Pagination for seamless navigation.
    - Filters (category, price range).
    - Sorting options (Normal, Low to High, High to Low, New Arrivals).
  - Product detail page:
    - Product information.
    - Product images.
    - Similar products list.
  - Shopping cart:
    - Add products to the cart.
    - View cart with selected products and amounts.
    - Actions: **Buy Now**, **Clear Cart**.
  - Order processing:
    - Place orders from the cart.
    - Add delivery address.
    - Select payment method (Cash or Online Payment).
  - **My Orders**:
    - Track orders with their current status.

### **Admin Module**
- **Category Management**
  - Add, update, and delete categories.
- **Product Management**
  - Add, update, and delete products.
- **Order Management**
  - View all user orders.
  - Update order statuses (e.g., Processing, Shipped, Delivered).

---

## Technologies Used

1. **Frontend**: Angular with Angular Material and Tailwind CSS for a modern, responsive UI.
2. **Backend**: Node.js and Express.js for scalable RESTful APIs.
3. **Database**: MongoDB for storing user, product, category, cart, wishlist, and order data.
4. **Styling**: Tailwind CSS for efficient and flexible design.

---

## Project Setup

### **Frontend: Angular**
1. Create a new Angular project:
   \`\`\`bash
   ng new e-commerce
   \`\`\`
2. Install Angular Material:
   \`\`\`bash
   ng add @angular/material
   \`\`\`
3. Set up Tailwind CSS:
   - Install dependencies:
     \`\`\`bash
     npm install -D tailwindcss postcss autoprefixer
     \`\`\`
   - Initialize Tailwind CSS:
     \`\`\`bash
     npx tailwindcss init
     \`\`\`
   - Configure \`tailwind.config.js\` and include Tailwind in \`styles.css\`.

### **Backend: Node.js and Express.js**
1. Create a backend project:
   \`\`\`bash
   mkdir backend && cd backend
   npm init -y
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   npm install express mongoose cors body-parser bcryptjs jsonwebtoken
   \`\`\`
3. Set up the project architecture with folders:
   \`routes\`, \`controllers\`, \`models\`, \`middleware\`.

---

## Installation Instructions

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-repo/e-commerce.git
   \`\`\`
2. Install frontend dependencies:
   \`\`\`bash
   cd frontend && npm install
   \`\`\`
3. Install backend dependencies:
   \`\`\`bash
   cd backend && npm install
   \`\`\`
4. Run the frontend:
   \`\`\`bash
   ng serve
   \`\`\`
5. Run the backend:
   \`\`\`bash
   node server.js
   \`\`\`
6. Access the application:
   - Frontend: \`http://localhost:4200\`
   - Backend: \`http://localhost:3000\`

---

## Future Enhancements

- Add advanced filters (brand, ratings).
- Implement product reviews and ratings.
- Integrate third-party payment gateways.
- Introduce real-time order tracking.
- Add multi-language support.
`;
