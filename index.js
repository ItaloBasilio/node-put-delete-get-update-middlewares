const express = require('express');
const app = express();
const uuid = require('uuid');
const port = 3000;

const users = [];

app.use(express.json()); // Para análise de corpos JSON
app.use(express.urlencoded({ extended: true })); // Para análise de dados de formulário




app.get('/users', (request, response) => {
    return response.json(users);
});



app.post('/users', (request, response) => {
    const { name, age } = request.body;

    console.log(uuid.v4())
    const user = { id: uuid.v4(), name, age };
    users.push(user); // para adicionar o usuario no array

    return response.status(201).json(user); // inseri user para retornar somente o usuario que eu criar

    // criado o status 201 para ficar mais semantico
});








app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(uuid.v4());
});
