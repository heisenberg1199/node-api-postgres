const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries')

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

const { getUsers, 
        getUserById,
        createUser,
        updateUserById,
        deleteUser
    } = db;

app.get("/", (req, res) => {
    res.json({
        info: 'Node.js, Express and Postgres API'
    });
});

app.get("/users", getUsers);
app.get("/users/:id", getUserById);
app.post("/users", createUser);
app.put("/users/:id", updateUserById);
app.delete("/users/:id", deleteUser)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});