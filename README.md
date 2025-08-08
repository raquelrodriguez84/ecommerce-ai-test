# ecommerce-ai-test
Simple React app implementing a rule-based product recommendation system based on user-selected category and budget.
# Ecommerce AI Test - Product Recommendation System

## Description

This is a simple React application that implements a basic product recommendation system based on user-selected category and budget filters. It suggests 3 to 5 relevant products from a predefined list. The recommendation logic is rule-based and runs entirely on the client side without any backend.

## Features

- Filter products by category and maximum budget
- Shows product details including name, price, rating (with stars), and description
- Limits recommendations to between 3 and 5 products
- Displays all products when no filters are applied

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/raquelrodriguez84/ecommerce-ai-test.git
Navigate to the project directory:


cd ecommerce-ai-test
Install dependencies:


npm install
Start the development server:

npm start
Open your browser and visit http://localhost:3000 to see the app in action.

AI Feature
Basic rule-based recommendation system filtering products by user preferences (category and budget)

No advanced ML or backend integration — all logic runs client-side

Tools and Libraries Used
React (functional components and hooks)

CSS for styling

No backend required, data is local in a JSON array

Assumptions
User preferences are captured only via category and budget inputs

Recommendations are limited to 3 to 5 products based on filters

Product data is static and loaded from a local file

