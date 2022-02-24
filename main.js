const port = 3000;
const express = require("express");
const app = express();
homeController = require("./controllers/homeController");

app.set("view engine", "pug");

app.get('/', homeController.top)

app.listen(port, () => {
	console.log("server start http://localhost:%d/", port);
});