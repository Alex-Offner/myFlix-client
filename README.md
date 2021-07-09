# myFlix Client-Side
<p>This project focuses on the client-side of my movie app. It relys on the movie_app with server-side coded REST API and database which is hosted on Heroku. It uses React, Bootstrap and Redux and is design as a single-page application to navigate between components.
A user can register, login add movies to their list of favourites and check them and their user data on his profil view.

The user can view a list of different movies, get information on them and learn about the genre and director. 

The app is responsive and runs on multible devices.
<p>
  
# Overview
  
  ## MainView
  * Returns a list of all avaiable movies to the user
  * User can click on a movie to get more information
  * Navbar helps to coordinate and set to different views
  * Searchbar allows user to filter movies
  
  
  ## RegistrationView
  * Allows user to register with a username,password, email and a birthday (optional)
  
  ## LoginView
  * Allows registered users to login with their username and password
  
  ## MovieCard
  * Gives the user more information of a movie (like description, genre, director)
  * Allows the user to add a movie to their favourites list
  
  ## Director/Genre view
  * Gives more information about director or genre (Description/Bio)
  
  ## ProfileView
  * Allows the user to see his userdata (username, email, birthday)
  * Allows the user to change his data (username, password, email, birthday) 
  * Display a list of favourite movies, where the user can remove selected movies
  * Allows user to delete their profile
  
  
  # Stack, Dependencies, Parcel
  
  ## Stack
  * The complete project was developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack
  
  ## Dependencies
    "axios": "^0.21.1",
    "bootstrap": "^4.6.0",
    "prop-types": "^15.7.2",
    "react": "^17.0.2",
    "react-bootstrap": "^1.6.1",
    "react-dom": "^17.0.2",
    "react-redux": "^7.2.4",
    "react-router-dom": "^5.2.0",
    "redux": "^4.1.0",
    "redux-devtools-extension": "^2.13.9"
  
  ## Parcel
  * Parcel path for hosting locally: src/index.html

