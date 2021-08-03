#SOCIALMEDIAMOCK
* The app uses functional React.js and the React context for global state management, and Node Express with MongoDB for backend.  
* Images are, however, stored locally on the server.
* You can register, login and create posts, like and unlike posts, view the profile of users on your feed in the application.
* It’s partially functional, i.e, some parts of the application are purely created with css and dummy data.
* Search functionality has not been implemented yet. Error handling is not done, for the most part.

* To run the app,
    1. In one terminal go to SocialMediaMock>backend, do npm install first, then do npm run start.
    2. In another terminal go to SocialMediaMock>frontend, do npm install first, then do npm run start.
    3. Since by default, on registering as a new user you won’t have any ‘friends’ to follow,
    please do the following in a new browser
        *   Go to http://localhost:3000/login in a new browser.
        *   Enter Email : alex@gmail.com, Password : ALEX56
        *   Hit the login button.