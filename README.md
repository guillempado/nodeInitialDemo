# Chat app

App de sales de xat amb login.

## Contingut

- /sockets_demo: per al suport al desenvolupament, inclou una demo d'implementació del mecanisme de treball amb websockets.
- /server: conté el servidor que permet el registre i login d'usuaris i dona suport a la connexió per websockets.
- /app: react app que consumeix l'api del servidor.

## Endpoints del servidor
- `localhost:3000/api_v1.0/auth/login`: permet rebre un usuari que ja es trobi registrat juntament amb la contrassenya d'accés i retorna un token de sessió
- `localhost:3000/api_v1.0/auth/signup`: permet registrar usuaris amb una contrassenya i retorna token de sessió
- `localhost:3000/api_v1.0/auth/google`: rep `code` d'autenticació de google, n'obté el nom d'usuari i retorna token de sessió per l'usuari

## Instruccions d'arrencada

1. Copiar `/server/.env-template` a `/server/.env`, introduir-hi les credencials d'accés correctes a `mysql` (caldrà treure també `drop_create`en cas que volguem tenir permanència de dades entre reinicis del servidor) i arrencar el servidor de `mysql` en cas que calgui.
2. Obrir un terminal, navegar a la carpeta `/server` i executar `npm start`
3. Obrir un segon terminal, navegar a la carpeta `/app` i executar `npm start`
4. Navegar a `http://localhost` per usar l'app

Per poder fer servir l'autenticació de google, caldrà incloure `http://localhost/login` a les redireccions vàlides de google cloud credentials.

També caldrà modificar `/server/.env` i `/app/src/google.config.js` perquè l'app i el servidor tinguin les credencials vàlides.