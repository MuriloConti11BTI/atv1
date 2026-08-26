import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json())


app.get("/",(request,response) => {
  response.json({
    message: "Filmes haha"
  })
})

app.get("/all-tasks", (request, response) => {
  const selectCommand = "SELECT * FROM filmes_MuriloContiRebeccaVilasBoas"

  sql.query(selectCommand, (error, titulo) => {
      if(error) {
          console.log(error)
          return
      }

      response.json(titulo)
  })
})

// create-task:??????????????
app.post("/create-task", (request, response) => {
  const{ titulo, genero, classificacao, duracao } = request.body

  const insertCommand = "INSERT INTO filmes_MuriloContiRebeccaVilasBoas(titulo, genero, classificacao, duracao) VALUES (?, ?, ?, ?)"

  sql.query(insertCommand, [titulo, genero, classificacao, duracao], (error) => {
    if(error) {
      console.log(error)
      return
    }

    response.status(201).json({
      message:"filme adicionado com sucesso!"
    })
  })
})

app.put("/update-task/:id", (request, response) => {
  const { id } = request.params
  const { titulo, genero, classificacao, duracao } = request.body

  let updateCommand
  let valores
  
  if(titulo && genero && duracao && classificacao) {
  updateCommand = "UPDATE filmes_MuriloContiRebeccaVilasBoas SET titulo = ?, genero = ?, classificacao = ?, duracao = ?, WHERE id = ?"
  valores = [titulo, genero, duracao, classificacao, id]

   } else if(titulo && genero && duracao) {
      updateCommand = "UPDATE filmes_MuriloContiRebeccaVilasBoas SET titulo = ?, genero = ?, duracao = ? WHERE id = ?"
      valores = [titulo, genero, duracao, id]
      } else {
      return response.status(400).json({ error: "Envie pelo menos titulo, genero, duracao e faixa etaria" })
  }

  sql.query(updateCommand, valores, (error) => {
      if(error) {
          console.log(error)
          return response.status(500).json({ error: "Erro ao atualizar o filme" })
      }

      response.json({
          message: "Filme atualizado com sucesso!"
      })
  })
})


app.listen (3306, () => {
    console.log("Servidor online")
})

const sql = mysql2.createPool({
  host: "benserverplex.ddns.net",
  user: "alunos",
  password: "senhaAlunos",
  database:"alunos_filmes03MB"
})

app.delete("/delete-task/:id", (request, response) => {
  const { id } = request.params
  
  const deleteCommand = "DELETE FROM filmes_MuriloContiRebeccaVilasBoas WHERE id =? "
  
  sql.query(deleteCommand, [id], (error) => {
  if (error) {
  console. Log(error)
  return
  }
  response. json({
  message: "Filme apagado com sucesso!"
    })
  })
})  