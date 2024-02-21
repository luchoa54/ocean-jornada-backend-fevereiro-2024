const express = require('express')

const app = express()
app.use(express.json())

const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

app.get('/', function (req, res) {

  res.send('Hello World!')

})

app.get('/oi', function (req, res) {

  res.send('Olá mundo')

})

app.get('/item', function (req, res) {

  res.send(lista)

})

app.get('/item/:id', function (req, res) {
  const id = req.params.id

  if (id >= 3) {
    res.send("Inválido")
  }else {
    res.send(lista[id])
  }
})

app.post('/item', function (req, res) {
  const body = req.body.nome
  lista.push(body)
  res.send("Item adicionado com sucesso!")
}) 

app.delete('/item', function (req, res) {
  const body = req.body.nome

  if(lista.includes(body)) {
    lista.pop(body)
    res.send("Item removido com sucesso!")
  }else {
    res.send("Item não está na lista!")
  }
}) 

app.listen(3000)