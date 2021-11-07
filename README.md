# My Pet Friend - a blog app

A blog website created with React, Bootstrap, Strapi and Google Maps&Places API. It includes some cool features, such as locating nearby veterinaries and pet shops.

## Demo

https://mypetfriend.uozanyildiz.dev

## Installation

Install project with npm.

```bash
  npm install
  cd backend
```

Install backend & frontend with npm.

```bash
  cd backend & npm install
  cd frontend & npm install
```

Change .env file according to your information in frontend folder.

```bash
REACT_APP_API_URL=https://your-backend-api-url.com
REACT_APP_GOOGLE_MAPS_API_KEY=yourGoogleMapsApiKey
REACT_APP_WEBSITE_NAME=projectName
```

Add your Google Maps API key in backend\config\server.js.

```bash
..port: env.int("PORT", 1337),

apiKey: env("MAPS_API_KEY", "your google maps api key"),

  admin: {..

```

## Tech Stack

**Client:** React, Google Maps & Places API, React-Bootstrap, React-Router, Axios, React-Markdown, React-Helmet

**Server:** Strapi, SQLite

## License

[MIT](https://choosealicense.com/licenses/mit/)
