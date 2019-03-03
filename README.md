This is an example setup of below frontend technical stack:

- React / Redux
- redux-form
- Next.js
- Material UI

This uses https://jsonplaceholder.typicode.com/ as example to show API calls.

# install

Go into cloned or downloaded project folder, run

```shell
npm install
```

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

Once server is up using one of above methods, visit server in browser as:

http://localhost:3030/?todoId=4

If parameter `todoId` is not provided, it is defaulted to 1.

In the displayed UI, enter `Todo ID` and click `LOAD` button would load that todo.

# configuration

The configuration is set up via environemnt variables.
When start the server with `npm run dev` or `npm run start_local`, the environment variables are read from `.env`.
Below is an example of `.env`. Note that when you download the source code, you would only find `.env.sample` file. You would need to copy that file to `.env` and change the settings to fit your needs.

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

# Hints

Below could be the most common tasks you would want to start from here:

1. Call your own API. File: `actions/index.js`. Add you own API using `fetch`. Once you get the data, add to redux-form state by using redux-form actions (`change` as in this example), like:
```JavaScript
dispatch(change(constants.REDUX_FORM_NAME, 'todo', todo));
```
2. Operate data from API on UI. File: `pages/index.js` -> `components/Root.js`. In `Root.js`, use refux-form `Field` to display data returned from API and stored in redux-form state in step 1, like:
```JavaScript
<Field name="todo.title" component={TextField} label="Title"/>
```
3. And if you need redux-form data for something else, like for id to search in this example, at the bottom of `Root.js`, inside `connect`. select the data you need from redux-form state using redux-form selectors (`formValueSelector` as in this example), like:
```JavaScript
  state => {
    // https://redux-form.com/8.1.0/docs/api/formvalueselector.md/
    const selector = formValueSelector(constants.REDUX_FORM_NAME);
    return {
      idToSearch: selector(state, 'idToSearch'),
    };
  }
```

Since this example makes use of redux-form actions / reducers / selectors, so the folders `reducers` and `selectors` are empty and are only placeholders. Add your own reducers and selectors when you start to use your own redux state instead of solely on redux-form state.

# development tools

Install Visual Studio Code (VS Code) from:

https://code.visualstudio.com/download

The respository contains folder `.vscode` which is a sample setup for VS Code.

Install below extensions for VS Code and refer to documents of the extensions on how to use them:

- Debugger for Chrome
- DotENV
- ESLint
- GitLens
- npm Intellisense
- Visual Studio IntelliCode
