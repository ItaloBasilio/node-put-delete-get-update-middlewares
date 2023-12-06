const express = require('express');
const app = express();
const uuid = require('uuid');
const port = 4000;
//////////////////////////////////////////////////////////////////////

const users = [];

app.use(express.json()); // Para análise de corpos JSON
app.use(express.urlencoded({ extended: true })); // Para análise de dados de formulário

//////////////////////////////////////////////////////////////////////
// Interceptador

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)


    if (index < 0) {
        return response.status(400).json({ error: "User Note Found" })
    }

    request.userIndex = index
    request.userId = id

    next()
}
//////////////////////////////////////////////////////////////////////



app.get('/users', (request, response) => {
    return response.json(users);
});


//////////////////////////////////////////////////////////////////////

// atualização do nosso usuario
app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser);
});
//////////////////////////////////////////////////////////////////////


app.delete('/users/:id', checkUserId, (request, response) => {

    const index = request.userIndex
    //deletar itens do array a partir de um indice
    users.splice(index, 1)

    return response.status(204).json();
});



app.post('/users', (request, response) => {
    const { name, age } = request.body;

    //console.log(uuid.v4())
    const user = { id: uuid.v4(), name, age };
    users.push(user); // para adicionar o usuario no array

    return response.status(201).json(user); // inseri user para retornar somente o usuario que eu criar

    // criado o status 201 para ficar mais semantico
});

//////////////////////////////////////////////////////////////////////


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(uuid.v4());
});
