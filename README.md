# maillard-backend

The backend service for the Maillard recipe manager application

# Instructions to run locally

- Open a temrinal in the root of the project and run `npm i`
- Create a `.env` file in the root directory and paste the following into it:

PORT = [A free port number]
MONGO_URI = [Your mongoDB URI]
GOOGLE_API_CLIENT_ID = [Your Id]
GOOGLE_API_CLIENT_SECRET = [Your Secret]
REDIRECT_URI = [Redirect URL]
COOKIES_SECRET = [Cookies Secret]
CONSUMER_URL = [URL of the consumer application]

- Open the terminal and run `npm run dev`
