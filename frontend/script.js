async function buscarFilmes() {
    // acessar a rota GET do backend, trazer os sfilmes e mostrar os filmes na tela
    const resposta = await fetch("https://atv1-lemon.vercel.app/all-tasks") // resposta do backend
    const filmes = await resposta.json() // converte a resposta num objeto JS
    const sectionFilmes = document.querySelector(".filmes")

    filmes.forEach((filme) => {
        console.log(filme)
        sectionFilmes.innerHTML += `
                    <div>
                        <h2>${filme.titulo}</h2>
                        <p><strong>Gênero:</strong> ${filme.genero}</p>
                        <p><strong>Duração:</strong> ${filme.duracao} minutos</p>
                        <p><strong>Classificação indicativa:</strong> ${filme.classificacao > 0 ? filme.classificacao + ' anos' : 'Livre'}</p>

                        <button onclick="apagarFilme(${filme.id})">Apagar</button>
                    </div>
                `
    })
}

buscarFilmes()

async function apagarFilme(id) {
    const respostaDeSucessoAoApagar = await fetch(`https://atv1-lemon.vercel.app/delete-task/${id}`, { method: "DELETE" })
    const mensagem = await respostaDeSucessoAoApagar.json()

    alert(mensagem.message)

    window.location.reload()
}