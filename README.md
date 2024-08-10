# WineNot
Course project - second term

## Project Description
WineNot is a web application designed for wine enthusiasts to discover, review, and share their experiences with various wines. The platform allows users to explore wines, read and write reviews, and manage their profiles.

## Features
- **View Detailed Wine Information**: Access comprehensive details about each wine, such as its origin, year, type, region, and rating.
- **Add and Read Reviews for Specific Wines**: Users can add their own reviews and read others' reviews on specific wines, enhancing the community-driven experience.
- **Add and Read Reviews for Your Own Wines**: Have a wine that isn’t listed? Add it yourself and start collecting reviews from other users.
- **Error Handling**: Receive clear and informative error messages for failed login attempts or other issues.

## Extra features
- **Browse Wines by Type**: Easily filter and explore wines by their type, including red, white, rosé, bubbles, and dessert.
- **User Authentication and Profile Management**: Secure user authentication ensures that only registered users can add, update, or delete their reviews. Users can manage their profiles and view their submitted reviews.
- **Loading Animations**: Experience smooth transitions and feedback while browsing the site, with loading animations to enhance user experience.
- **Top 10 Wines Showcase**: Discover the top-rated wines on our platform through a dynamic slideshow. The background color of each wine changes according to its type—red for red wines, white for white wines, and so on, providing a visually engaging experience.

## Installation and Setup Instructions
1. Clone the repository: `git clone https://github.com/yourusername/yourproject.git`
2. Navigate to the project directory: `cd yourproject`
3. Install dependencies: `npm install`
4. Set up environment variables in a `.env` file (see `.env.example` for reference)
5. Start the server: `npm run start`

## Usage
1. Open your browser and navigate to `https://winenot-i5n3.onrender.com` after starting the server.
2. **Log in** or **sign up** to access all features.
3. Browse wines by selecting a category (red, white, rose, sparkling, dessert).
4. Click on a wine to view detailed information.
5. Add reviews to wines by clicking the "Add Review" button (requires login).
6. Manage your profile and view your reviews by accessing your account.


## API Endpoints

### User Endpoints
- **POST /api/users/signup**: Create a new user account.
- **POST /api/users/login**: Log in to an existing user account.
- **PATCH /api/users/profile**: Update the logged-in user's profile.
- **DELETE /api/users/profile**: Delete the logged-in user's account along with all associated reviews.

### Wine Review Endpoints (Wines Page)
- **GET /api/wine-reviews/:wineId**: Retrieve all reviews for a specific wine by its ID.
- **POST /api/wine-reviews**: Create a new review for a specific wine.

### User Wine Review Endpoints (Reviews Page)
- **GET /api/reviews**: Retrieve all user-created wine reviews.
- **POST /api/reviews**: Create a new review for a user-added wine.
- **GET /api/reviews/:id**: Retrieve a specific user-added wine review by ID.
- **PATCH /api/reviews/:id**: Update a specific user-added wine review by ID.
- **DELETE /api/reviews/:id**: Delete a specific user-added wine review by ID.

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- HTML/CSS/JavaScript

## Authors
- Nicolas Buscemi

## License
This project is licensed under the MIT License.

## Sources and References
- **Images and Visuals**:
  - Wine bottle image used in the "About" section: [AboutBottle](http://forgraphictm.com/wine-bottle-mockup/)
  - AI-generated images "wine-review.png" and "bottleBanner.png" created using [Adobe Firefly](https://www.adobe.com/sensei/generative-ai/firefly.html).

- **API and Data**:
  - Wine data fetched from [SampleAPIs](https://sampleapis.com/wines/api) for demonstration purposes.
  - General data handling and API design patterns referenced from [RESTful API Design: Best Practices in API Design with REST](https://restfulapi.net/).

- **Web Development**:
  - User authentication and management based on practices from [Auth0 documentation](https://auth0.com/docs/).
  - MongoDB schema design inspired by [Mongoose documentation](https://mongoosejs.com/docs/guide.html).
  - Responsive web design techniques applied using principles from [CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).
  - Loading animations and transitions guided by tutorials from [CSS-Tricks](https://css-tricks.com/almanac/properties/a/animation/).
  - JavaScript event handling and DOM manipulation inspired by [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

- **Backend Development**:
  - Node.js and Express.js framework setup and configuration referenced from [Express.js Guide: The Comprehensive Book on Express.js](https://expressjs.com/en/guide/routing.html).
  - Environment configuration and management using [dotenv](https://www.npmjs.com/package/dotenv).
  - API request validation and error handling guided by [Express.js Error Handling](https://expressjs.com/en/guide/error-handling.html).

- **Security and Best Practices**:
  - Authentication and security practices based on [OWASP Top 10](https://owasp.org/www-project-top-ten/).
  - User session management and token-based authentication guided by [JWT.io](https://jwt.io/introduction/).

- **Project Management**:
  - Git workflow and version control following best practices from [Pro Git by Scott Chacon and Ben Straub](https://git-scm.com/book/en/v2).
  - Documentation and README structure referenced from various successful GitHub projects and [Make a README](https://www.makeareadme.com/).

- **Tools**:
  - IDE: [Visual Studio Code](https://code.visualstudio.com/).
  - Testing: [Postman](https://www.postman.com/) for API testing.
  - Design and prototyping: [AdobeXd](https://helpx.adobe.com/fr/xd/get-started.html) for UI/UX design.

- **AI Assistance**:
  - Portions of code troubleshooting, documentation drafting, and development guidance were supported by [ChatGPT](https://chat.openai.com/).


## Testing Credentials
- Username: `user`
- Password: `password`
