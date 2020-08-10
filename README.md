# Simple App to create, read, update and delete notes.

This application allows users to sign in / sign up through the Local strategy, also have session support. Users can create, read, update and delete notes. The App was implemented with Nodejs, Express, Mongodb and Javascript.

## INSTALATION

1. prepare database
2. Add environment variables: ./.env
3. install the required modules, in main folder write: npm install 

## RUN PROJECT

npm start - to run the whole project  
npm run dev - to run the whole project in development mode

## STRUCTURE

    - src : whole app
        - config: Local authentication strategy
        - controllers: make requests to the database taking into account the model (index, notes, users)
        - helpers: user authentication and date format
        - models: database schemes (note, user)
        - routes: handles requests made by the client (call the authentication process, call 
                the controllers)
        - views: all handlebars pages (index and about are the main pages)    
        - database: connection to the database
        - index: file that handles whole app
        - server: configurations of the server


## DESCRIPTION

**Actions:**

- User can create an account using local auth
- User can sign in using existing local account
- User can create/read/update/delete notes he/she has created

**The creation of an account or the login in the application locally:** 

- User fill a form to sign in / sign up
- User sends data (requests data from the server - HTTP)
- If data is ok, user is signed in / signed up and a session is created
- server send the requested data 

**The isAuthenticated function is responsible for protecting routes, on the server side. In case the user is not authenticated, it will not be possible to access the private views (notes).**

## TO IMPLEMENT

- add testing
- stylize pages
- try with jwt