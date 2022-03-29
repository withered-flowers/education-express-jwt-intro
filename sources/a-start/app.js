const express = require("express");
const app = express();

const routes = require("./routes/index.js");

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(port, (_) => console.log(`Apps is working at port ${port}`));
