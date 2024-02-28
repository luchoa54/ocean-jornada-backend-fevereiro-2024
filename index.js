require('dotenv').config()
const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const dbURL = process.env.DATABASE_URL
const dbName = process.env.DATABASE_NAME

async function main() {

  const client = new MongoClient(dbURL)

  console.log("Conectando ao banco de dados...")
  await client.connect()
  console.log("Banco de dados conectado com sucesso!")

  const app = express()
  app.use(express.json())

  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

  const db =  client.db(dbName)
  const collection = db.collection('items')

  app.get('/', function (req, res) {

    res.send('Hello World!')

  })

  app.get('/oi', function (req, res) {

    res.send('Olá mundo')

  })

  app.get('/item', async function (req, res) {
    const items = await collection.find().toArray()

    res.send(items)
  })

  app.get('/item/:id', async function (req, res) {
    // Acesso o ID no parâmetro de rota
    const id = req.params.id

    // Acesso o item na collection baseado no ID recebido
    const item = await collection.findOne({
      _id: new ObjectId(id)
    })

    // Envio o item obtido como resposta HTTP
    res.send(item)
  })

  app.post('/item', async function (req, res) {
    try {
    const nome = req.body.nome

    const result = await collection.insertOne({nome})

    lista.push(nome)
    res.send("Item adicionado com sucesso!")
    }catch(error) {
      console.log("Erro")
      res.send("Ocorreu uma falha ao adicionar o item!")
    }
  })

  app.put('/item/:id', async function (req, res) {
    const id = req.params.id

    // Acesso o item na collection baseado no ID recebido
    const novoItem = req.body

    collection.updateOne (
      {_id: new ObjectId(id)},
      {$set: novoItem}
    )

    res.send("Item atualizado com sucesso!")
  })

  app.delete('/item/:id', async function (req, res) {
    const id = req.params.id

    await collection.deleteOne( {_id: new ObjectId(id)})

    res.send("Item deletado com sucesso!")
  })

  app.listen(3000)
}

main()