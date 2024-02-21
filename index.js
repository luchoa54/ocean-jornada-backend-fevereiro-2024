const express = require('express')

const app = express()

 
app.get('/', function (req, res) {

  res.send('Hello World!')

})

const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

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

app.listen(3000)