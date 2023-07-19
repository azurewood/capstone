const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const app = express();
const cors = require('cors')
require("dotenv").config();

app.use(cors());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

// swagger
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

let dbConnect = require("./dbConnect");
// parse requests of content-type - application/json
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to weather NZ service." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(`${username} is trying to login ..`);

    if (username === "zhouj" && password === "azurewood@NZ") {
        return res.json({
            token: jsonwebtoken.sign({ user: "zhouj" }, process.env.JWT_SECRET),
        });
    }
    return res
        .status(401)
        .json({ message: "The username and password your provided are invalid" });
});

const weatherRoutes = require('./routes/weatherRoutes')
app.use('/api/weather', weatherRoutes)

const cityRoutes = require('./routes/cityRoutes')
app.use('/api/', cityRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});