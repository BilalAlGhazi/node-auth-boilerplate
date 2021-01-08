# Node.JS API Authentication Boilerplate

When working on back end API for mobile and/or web apps I usually have to re-write the authentication code from scratch in each application. So I decided to put together the boilerplate for the authentication part of the API so that it can be used by me and anyone else who might find it interesting. Please feel free to suggest improvements by submitting pull requests.

This example uses MongoDB database to store the user info, but the same concept can be used for any other database by modifying the database communication logic. Perhaps a good improvement could be abstracting the database connection logic so it becomes even easier to use other databases.

# Running the Code

After cloning the repo and installing dependencies by running `yarn`, you have to add a `.env` file with the following variables:

```
APP_PORT: the port that the web server will work on. eg 3000.
JWT_KEY: A random string that will be used to encode the JWT token, this needs to be kept secure when you go to production.
DB_CONNECTION_STRING: the connection string for your MondoDB database
```
