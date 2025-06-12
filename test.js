const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// /!\ Bind the router db to the app
server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(auth);
server.use(router);

server.listen(3000, () => {
  console.log("JSON Server with Auth is running on port 3000");
});
