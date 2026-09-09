async function cadastrarFilme() {
    const titulo = document.getElementById("titulo")
    const genero = document.getElementById("genero")
    const classificacao = document.getElementById("classificacao")
    const duracao = document.getElementById("duracao")

    if (titulo.value === "" || genero.value === "" || classificacao.value === "" || duracao.value === "") {
        alert("Preencha todos os campos!")
        return  
    }

    const filme = {
        titulo: titulo.value,
        genero: genero.value,
        classificacao: classificacao.valueAsNumber,
        duracao: duracao.valueAsNumber
    }

    const resposta = await fetch("https://atv1-lemon.vercel.app/create-task", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(filme)
    })

    const mensagem = await resposta.json()

    alert(mensagem.message)

    window.location.href = "../index.html"
}