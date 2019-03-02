This is a sample setup of below frontend technical stack:

- React / Redux
- redux-form
- Next.js
- Material UI

This uses https://jsonplaceholder.typicode.com/ to show sample API calls.

# install

`npm install`

# run

Run below to  build the application.

```shell
npm run build
```

Run below to run the application using `.env` file to provide environment variables.

```shell
npm run start_local
```

For devleopment, run:

```shell
npm run dev
```

Node.js debug port is open in development.

# configuration

The configuration is set up via environemnt variables.
When start the server with `npm run dev` or `npm run start_local`, the environment variables are read from `.env`.
Below is a sample of `.env`. Note that when you download the source code, you would only find `.env.sample` file. You would need to copy that file to `.env` and change the settings to fit your needs.

```shell
# always keep this line untouched
UISVR=1
# the port of this UI server. If not configured, default is 3000
UISVR_PORT=3030
# the API server of, say, some APIs
UISVR_APISERVER=https://jsonplaceholder.typicode.com/
# application title displayed in browser
UISVR_APPTITLE=Next.js Sample
# whether in debug mode or not. Note this would also pass down to browser
UISVR_DEBUG=true
```

Below static files inside folder `static` shall also be changed as per project needs.

- favicon.ico
- company_logo.svg

Note other files inside `static` folder are useless.

# TODO

[ ] JSX eslint errors
