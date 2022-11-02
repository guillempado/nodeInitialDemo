# Chat App

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

Per poder fer servir l'autenticació de google, caldrà incloure `http://localhost/login` a les redireccions vàlides de google cloud credentials. L'únic `scope` que necessita és `.../auth/userinfo.profile` (no cal `.../auth/userinfo.email` perquè el nom únic és el nom d'usuari, l'identificador "humà" amb que una persona s'identifica al xat com a autor de missatges, de manera que es tingui privacitat sobre el correu -com fan les principals xarxes socials en comptes de fer servir el correu. De moment no fem perfils integrats amb més d'una manera d'accés).

També caldrà modificar `/server/.env` i `/app/src/google.config.js` perquè l'app i el servidor tinguin les credencials vàlides.

## Especificacions cobertes

L'aplicació és una primera versió per complir amb tots els requisits dels tres nivells:
- OK: Aplicació de xat per websockets amb login/signup
- OK: Obrint la mateixa URL en una altra finestra del navegador podrem fer login amb un altre usuari/ària --_no es guarda el token de sessió, de manera que això sigui possible_
- OK: Verifica que estan en la mateixa sala i permet que xategin
- OK: Afegeix la possibilitat de crear múltiples sales de xat i gestiona la persistència amb MongoDB (amb Mongoose) o MySQL (amb Sequelize) --_S'ha triat MySQL amb Sequelize_
- OK: S'ha implementat l'autenticació per google.
- OK: S'ha fet el frontend amb React i Bootstrap

## Biblioteques que s'han fet servir
Per al front s'ha usat:
- create-react-app per la inicialització (és l'orígen de `react-scripts` a `package.json`)
- React, react-dom, react-dom-router
- Bootstrap: per les plantilles d'estil
- Socket.io-client: per les comunicacions de websockets
- Axios: per les peticions HTTP
- Querystring: Per convertir els atributs de l'objecte de descripció de petició d'autenticació a google al querystring d'enviament d'aquesta informació

Per a l'API s'ha usat:
- Body-parser: per convertir el cos JSON de les peticions a un objecte de javascript del que se'n puguin consultar els atributs
- Socket.io: El servidor de la connexió per websockets
- Bcrypt: per fer hashing de contrassenyes amb sal i poder-les guardar de manera segura
- Axios: per fer peticions HTTP (a google per consultar informació de l'usuari a partir del codi d'accés rebut)
- Cors: aporta el middleware per acceptar CORS provinent de l'orígen que volguem (l'hem restringit a servir només peticions de la direcció del client)
- Dotenv: permet carregar les variables d'entorn com a variables del servidor. Permet configurar contrassenyes i demés informació sensible sense que aquesta s'hagi de guardar a dins del codi.
- Express: és el servidor web.
- Googleapis: permet simplificar les peticions d'obtenció d'informació de l'usuari a partir del codi d'accés retornat per google
- Jsonwebtoken: permet construir i desxifrar tokens de sessió (en el nostre cas, contenen el nom d'usuari) a partir d'una clau simètrica.
- Mysql2: connector amb MySQL
- Nodemon: launcher de desenvolupament, reinicia el servidor cada cop que apliquem algun canvi
- Sequelize: ORM d'SQL

## Possibles millores per següents versions

- Neteja, refactorització per aplicar patrons i bones pràctiques allà on el codi hagi quedat massa complicat, externalitzar totes les opcions de configuració per `.env` o `config.js`, etc. L'aproximació a React també ha estat força naive, ja que ha estat la primera aplicació que he fet d'aquest tipus: segurament es beneficiaria de refer-la fent servir una aproximació purament funcional + hooks abans de continuar afegint més característiques a l'aplicació.
- Hi ha molt codi comentat, logs que encara fan print, etc. És una versió en proves / de demo de les funcionalitats core que no està llesta per producció, l'objectiu d'aquesta versió és ser la base d'una segona. Per això s'ha deixat tota la informació possible de desenvolupament per facilitar aquesta tasca més endavant (dit d'altra manera, caldrà descomentar els logs, silenciar el feedback que sequelize fa a cada consulta o insert, etc.)
- Estils: l'apartat del xat es beneficiaria d'un disseny mes acurat (CSS). En l'àmbit de l'arquitectura de dades, s'ha optat per enviar tots els missatges i les seves marques de temps, per poder mostrar els missatges rebuts i pendents de llegir a la vista de sales (el que a whatsapp o telegram seria una rodoneta amb el num de missatges pendents de llegir). També serà interessant mostrar el temps a la vista dels missatges com a informació secundària, com fan normalment totes les aplicacions de xat. Finalment, la vista de sales es podria moure com a columna a l'esquerra i fer el disseny responsiu. Una imatge de disseny lligat, com de marca comercial consistent també li quedaria bé.
- En l'àmbit de la funcionalitat del xat, s'ha deixat obert el tema de no passar tot l'historial de missatges a cada nova connexió. Una manera d'aconseguir-ho seria enviant només els últims 60 missatges de cada sala i tenint event per websocket de `get(room, fromTime, n = 30)`. `fromTime` seria el timestamp del missatge més antic que tinguem, l'esdeveniment es dispararia quan quedessin només 30 missatges d'historial enrera per consultar i el resultat és que se'n carregarien 30 més. Una altra funcionalitat interessant seria poder-se subscriure i des-subscriure de sales, de manera que si mai n'hi ha 1000 no rebem els missatges de totes.
- En l'àmbit de la funcionalitat de la identificació, no estaria de més connectar les diferents maneres d'accés en un únic perfil + vista de perfil on s'hi pugui posar una imatge d'usuari, descripció, informació addicional com telf, configuracions de visibilitat per la resta d'usuaris, etc. Fent-ho així, caldria guardar el token a cookie o a localstorage (millor a cookie perquè així ens despreocupem d'haver-lo d'enviar cada cop) i afegir un botó de logout per poder canviar d'usuari.
