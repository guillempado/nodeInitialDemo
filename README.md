
# Node Initial Project

### Project Structure

Main structure of node.js project. Folders / files:

- <b>\_\_tests__</b>. Tests folder. See [Jest Docs](https://jestjs.io/es-ES/docs/configuration) and [Chai Docs](https://www.chaijs.com/)
- <b>app</b>:
    - <b>config</b>
    - <b>controllers</b>
    - <b>crons</b>
    - <b>middleware</b>
    - <b>models</b>
    - <b>routes</b>
    - <b>tmp</b>
    - <b>app.js</b>. Entry point.
- <b>.env</b>. Environment descriptor. See [dotenv doc](https://www.npmjs.com/package/dotenv).
- <b>.eslintrc</b>. Linter JS, static code analyzer. See [EsLint Docs](https://eslint.org/docs/user-guide/configuring/configuration-files).
- <b>.prettierignore</b>. Code formatter. See [Prettier Config](https://prettier.io/docs/en/configuration.html) and [Prettier Ignore](https://prettier.io/docs/en/ignore.html).
- <b>.ecosystem.config.js</b>. Process Manage at runtime. See [PM2 Docs](https://pm2.keymetrics.io/).
- <b>package.json</b>.

### Import project for use with WebStorm

Follow the steps below:
* Clone the project from the Github Platform. Execute:
  ```
  git clone [url project]
  ```
* Open the project downloaded.
![Open Project](img/webstorm_open.png)


### Import project for use with Visual Studio Code

Follow the steps below:
* Clone the project from the Github Platform. Execute:
  ```
  git clone [url project]
  ```
* Open the project downloaded.
  ![Open Project](img/VSC_open.png)


### Utilities

* [Node Developers Guide](https://nodejs.dev/learn)
* **.gitignore file** configuration. See [Official Docs](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files).
* **Git branches**. See [Official Docs](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)


<hr>

# Sprint4_GuillemParrado


Per importar col·lecció Postman:
1. Obrir Postman -> Collections -> Import -> seleccionar `Sprint4_GuillemParrado.postman_collection.json`

Els endpoints de l'API son:
- GET /user: retorna usuari Guillem, l'edat i la url des d'on es fa el request
- POST /upload: permet pujar des d'un form un arxiu d'imatge que tingui extensió png, jpg o gif. Retorna un missatge d'error en cas que l'extensió de l'arxiu no coincideixi amb aquestes.
- POST /time: Necessita autenticació bàsica, rep com a paràmetre un JSON amb el nom d'usuari i retorna un objecte JSON que amb l'hora i data actual. Afegeix a la capçalera 'Cache-control: no-cache' i habilita CORS en les respostes. En cas de no rebre autenticació o un cos JSON amb el nom d'usuari, retorna error 400.

