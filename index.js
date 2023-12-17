const path = require('path');
const express = require('express');

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


//route
app.get('/', (req, res) => res.render("home"));

app.listen(PORT, () => console.log(`server Started at PORT: ${PORT}`));