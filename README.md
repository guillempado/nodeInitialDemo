
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


<br><hr><br>

# Disseny

## Casos d'ús

### 1) Un usuari es pot registrar a l'aplicació

1. L'usuari accedeix a qualsevol ruta
2. El sistema detecta que no envia token a header i redirigeix usuari a /login, el qual dona opció a fer register per basicAuth (username + password), login per basicAuth (username + password) o login per googleAuth (enllaç a autenticació externa per google).
3. L'usuari envia el nom d'usuari i contrassenya per registrar-se.
4. El sistema genera un token, el guarda a la base de dades i l'envia al frontend
5. El frontend fa servir el token a cada request: server és stateless, d'aquesta manera cada request és autenticat.

### 2) Un usuari fa login
1. L'usuari accedeix a qualsevol ruta
2. El sistema detecta que no envia token a header i redirigeix usuari a /login, el qual dona opció a fer register per basicAuth (username + password), login per basicAuth (username + password) o login per googleAuth (enllaç a autenticació externa per google).
3. L'usuari envia el nom d'usuari i contrassenya correctes per fer login.
4. El sistema genera token, comprova que existeix a la base de dades i envia al frontend.

Alternativa d'error:

3. L'usuari envia nom i contrasseya incorrectes (mala contrassenya o usuari no existeix)
4. El sistema envia error de login a la mateixa pàgina de login, la qual el mostra.

### 3) Un usuari personalitza les seves dades

Raonament: en crear un usuari per basicAuth, el nom d'usuari és el mateix del registre. En cas que el login sigui per googleAuth, el nom d'usuari l'aporta Google. Però un usuari pot voler personalitzar el nom que mostra l'aplicació.

1. L'usuari accedeix a /user
2. El sistema mostra un formulari amb les dades de l'usuari preomplertes (de moment, només existeix 'name')
3. L'usuari canvia els camps que vulgui i envia el formulari
4. El sistema accepta els canvis i envia missatge a mateixa pàgina per mostrar que s'ha modificat amb èxit

Alternativa d'error:

3. L'usuari envia valors no vàlids (per exemple, canvia el nom d'usuari pel d'un altre usuari preexistent)
4. El sistema envia l'error a la mateixa pàgina, la qual mostra l'error a l'usuari

### 4) Un usuari crea una sala
1. L'usuari accedeix a /rooms
2. El sistema mostra les sales disponibles i un formulari per crear-ne de noves
3. L'usuari introdueix un nom de sala per crear
4. El sistema crea sala i envia a front la llista de sales actualitzades
5. El front re-renderitza les sales

Alternativa d'error:

3. L'usuari envia el nom d'una sala que ja existeix
4. El sistema envia l'error a la mateixa pàgina, la qual el mostra a l'usuari

### 5) Un usuari accedeix a una sala i envia missatges
1. L'usuari accedeix a /rooms
2. El sistema mostra les sales disponibles i un formulari per crear-ne de noves
3. L'usuari clica a una sala
4. El sistema redirecciona a /chat i envia a front els missatges previs d'aquell xat
5. El front renderitza els missatges previs juntament amb formulari per enviar nou missatge (l'autor és el mateix usuari que ha fet login: el formulari només demana missatge a enviar)
6. L'usuari entra un missatge i l'envia
7. El sistema rep el missatge, el guarda a la base de dades i el reenvia a totes les sales

<br>

## Model de dades

- USER
  - id INT AUTO_INCREMENT NOT NULL (PK)
  - name VARCHAR NOT NULL UNIQUE - no el faig PK perquè l'usuari el pugui canviar
  - username VARCHAR NOT NULL - per basicAuth (no guardar en BBDD però forma part del model de dades)
  - password VARCHAR NOT NULL - per basicAuth (no guardar en BBDD però forma part del model de dades)
  - basicAuthToken: VARCHAR (pot ser null si s'ha identificat per Google)
  - googleAuthToken: VARCHAR (pot ser null si s'ha identificat per basicAuthToken)
  - RESTRICCIÓ: !(basicAuthToken == null and googleAuthToken == null): hi ha d'haver com a mínim un sistema d'autenticació no buit.

<br>

- ROOM
  - name VARCHAR (PK) - evito sales amb noms repetits

<br>

- MESSAGE
  - id INT AUTO_INCREMENT NOT NULL (PK) - evito claus compostes per simplicitat
  - user (FK a USER)
  - room (FK a ROOM)
  - body VARCHAR NOT NULL (el cos del missatge, li diria 'text' però és reserved word)


<br>

(Cal guardar-ho tot per poder reiniciar el servidor i no perdre dades)


<br>

# Implementació: Git Tags

S'ha marcat amb etiquetes de Git els commits principals de l'aplicació i s'expliquen a continuació.


## 1) Sockets demo

Reimplementació de la demo de [l'article de Medium](https://medium.com/@carlosazaustre/usando-websockets-con-nodejs-y-socketio-b02f66bcb58d). Prova de concepte i punt de partida d'implementació de la funcionalitat.

## 2) Login demo

Prova de concepte del cas d'ús de login mitjançant tokens de sessió. Punt de partida de la implementació i debug.

Important: només es garanteix el funcionament de la demo al commit de la demo. Els commits que vinguin després prioritzaran l'app, per exemple no té sentit mantenir 'demoProtectedRoute'.

Per executar la demo:
1. Importar la col·lecció de Postman
2. Executar POST /login
3. Copiar el jwtoken rebut (sense les "") i enganxar-lo al header 'x-access-token' de GET /protected
4. Executar GET /protected

El token caduca en 1 minut i es comprova que:
1. En enviar request amb el token nou, l'API retorna status 200 amb missatge: "Protected route accessed!"
2. Es pot reenviar el GET requests tants cops com es vulgui i s'obté el mateix resultat dins del minut en què el token és vàlid
3. En passar un minut, sense modificar res i renviar el request, l'API retorna status 401 amb missatge: "Unauthorized Access"
4. Si eliminem el token, l'API retorna status 403 amb missatge: "Forbidden Access"


## 3) BBDD

MySQL amb sequelize. Inicialització:

1. `.env` amb usuari, contrassenya, uri de la BBDD i flag d'inicialització amb opcions: DROP_CREATE, CREATE, NONE. 
2. Les taules les crea el mateix sequelize, només caldrà executar com a root la creació de l'usuari per l'aplicació, grant de privilegis i creació de la taula.
3. Proposta de mecanisme: sql script per DROP_CREATE, sql script per CREATE i execSync a start d l'aplicació que recuperi de vars d'entorn si cal executar algun script com a root user i ho faci. 


## 4) Before_react

Versió de l'app abans de separar client i servidor: 
- Servidor retorna HTML amb JS incrustat en tag script adhoc en comptes d'haver-hi una separació real i que servidor funcioni només com a API.
- No hi ha funcionalitat d'estil (Bootstrap, CSS).

### 4.1) Funcions implementades:
1. S'han modelat totes les vistes i la navegació entre elles.
2. S'ha implementat comunicació per sockets a mode demo entre client i servidor per la pàgina de xats.
3. S'ha implementat el model de dades, la permanència amb sequelize i les opcions d'inicialització de la base de dades mitjançant variables d'entorn (consultar /.env-template)
4. S'ha implementat la pàgina de login i la de register d'usuaris: de moment només es poden enregistrar per basic Auth (introduint username i password) i l'app guarda les contrassenyes com a salted hash.
5. S'ha implementat la generació del token de sessió a partir de l'username + password, el qual té caducitat i es retorna com a cookie un cop l'usuari s'ha autenticat (per creació de nou usuari o login).
6. S'ha implementat (i fet ús d') un middleware que comprova que els requests del client continguin un token de sessió vàlid a les cookies del header per permetre l'accés a la pàgina. En cas contrari, es fa redirecció a la pàgina de login.
7. S'ha implementat el print de missatges d'error per query params (pag rep l'error i JS l'imprimeix sobre un div buit d'id=errorMessage).

### 4.2) Feina pendent, primera iteració:
1. Crear una SPA en React + Redux + Bootstrap que recordi a Whatsapp o Telegram: 1/4-1/3 de l'esquerra de la pantalla per llista de sales + opció de crear sala, cantó dret amb el xat + formulari d'entrada i enviament de nou missatge ancorat a baix.
2. Pel que fa al servidor, haurà de quedar implementat completament com un REST API: les rutes disponibles s'hauran d'ajustar a la manera correcta de construir URIs, l'API haurà de retornar un JSON en tots els casos, s'haurà d'aportar documentació de les rutes, finalment s'haurà d'aportar també la col·lecció de Postman per provar l'API.

### 4.3) Feina pendent, segona iteració:
1. Implementar l'autenticació per Google Auth i que un mateix usuari pugui tenir les dues formes d'autenticació.
2. En cas que quedi temps, millorar l'app amb alguna de les següents opcions:
   1. Fer el client responsive, des de >1080p fins a amplada de mòbil (col·lapsant sales a menú d'hamburguesa i que només es mostri la vista de xat, etc.).
   2. Reimplementar l'API en Typescript.
   3. Funcionalitat d'usuari: permetre afegir una descripció i un avatar, que l'avatar es mostri en miniatura als xats al costat del nom, que clicar sobre l'avatar d'un usuari al xat porti a la seva pàgina personal...
   4. Personalització de l'estil: Bootstrap és genèric, millorar afegint CSS sobre propietats concretes i mostrar així vistes més personalitzades.


<br>

# Fonts

## Demos

- sockets: https://medium.com/@carlosazaustre/usando-websockets-con-nodejs-y-socketio-b02f66bcb58d
- basicAuth: https://www.dotnettricks.com/learn/nodejs/token-based-authentication-using-json-web-token

## Desat de contrassenyes a BBDD: Implementació per Salted Hash
- https://www.codementor.io/@petrepopescu/how-to-properly-store-a-password-in-the-database-1k0qcoog92
- https://www.geeksforgeeks.org/store-password-database/
- https://www.vaadata.com/blog/how-to-securely-store-passwords-in-database/
- https://www.codespot.org/hashing-passwords-in-nodejs/

## React client
- https://create-react-app.dev/docs/getting-started/
- https://dev.to/ericchapman/react-cheat-sheet-updated-may-2021-1mcd
- https://www.telerik.com/blogs/react-class-component-vs-functional-component-how-choose-whats-difference
- https://javascript.info/
- https://reactjs.org/docs/refs-and-the-dom.html
- https://reactjs.org/docs/context.html
- https://reactjs.org/docs/react-component.html
- https://react-redux.js.org/
- https://react-bootstrap.github.io/
- https://github.com/vicenlu/react-movies-web
- https://www.w3schools.com/react/react_router.asp
- https://smartdevpreneur.com/the-ultimate-guide-to-bootstrap-padding/