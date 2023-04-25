# Realist Platform

Realist Platform is a MERN (MongoDB, Express, React, Node.js) application with AWS (Amazon Web Services) integration, Google Maps API and advanced CRUD operations. It is a real estate marketplace where users can buy, sell or rent houses and lands.

## Table of Contents

- [Realist Platform](#realist-platform)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Features Highlights](#features-highlights)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Credits](#credits)

## Technologies Used

- MongoDB: a document-based open source database
- Express: a web application framework for Node.js
- React: a JavaScript library for building user interfaces
- Node.js: a JavaScript runtime built on Chrome's V8 JavaScript engine
- AWS (Amazon Web Services): a cloud-based platform for building, deploying and managing applications and services
- Google Maps API: a set of web services that allow developers to integrate Google Maps into their applications

## Features Highlights

- Complete login registration system with email confirmation, forgot and reset passwords
- JWT based authentication, authorization with refresh token
- AWS services such as IAM (Identity and access management) S3 (Simple storage service) and SES (Simple email service)
- Google maps and places API for displaying maps and address dropdown auto-complete
- Geo-location based search based on lattitude and longitude
- Multiple image uploads
- Advance CRUD with MongoDB using mongoose ODM (Object document mapping)
- JWT based authentication, authorization and route protection (both server and client)
- State management with React Context
- Real estate listing for buying, selling and renting house and lands
- Contact emails for buyers to communicate with sellers (Real estate agents or home owners)
- Ads (Real estate listings) like and unlike feature
- User wishlist, enquired properties list and created Ads management (create, read, update and delete)
- Advance searching with multiple search combinations (buy, sell, rent, price range, nearby location etc)
- User profile update and public profile views
- Load more pagination feature
- User dashboard (for both buyers and sellers)

## Getting Started

To get started with the project, you'll need to have the following installed on your machine:

- Node.js 
- MongoDB 

## Installation

1. Clone the repository:

```sh
git clone https://github.com/ymw0331/real-estate-marketplace-mern-aws-app.git
```

2. Install dependencies:

```sh
   cd real-estate-marketplace-mern-aws-app
   cd client
   npm install
   cd server
   npm install
```

3. Create a .env file in the server folder and add the following environment variables:

```sh
    DATABASE=<MongoDB connection string>
    MY_AWS_ACCESS_KEY_ID=<AWS access key>
    MY_AWS_SECRET_ACCESS_KEY_ID=<AWS secret access key>
    EMAIL_FROM=<Sender email address>
    REPLY_TO=<Reply-to email address>
    GOOGLE_PLACES_KEY=<Google Maps API key>
    JWT_SECRET=<JWT secret key>
    CLIENT_URL=<Client URL>
```

4. Create a .env file in the client folder and add the following environment variables:

```sh
    GOOGLE_PLACES_KEY=<Google Maps API key>
    REACT_APP_API=<Server App API URL>
```

## Credits

This project was created as part of the [React Node MERN Marketplace](https://www.udemy.com/course/react-node-mern-real-estate-marketplace/) course on Udemy, taught by Ryan Dhungel.
