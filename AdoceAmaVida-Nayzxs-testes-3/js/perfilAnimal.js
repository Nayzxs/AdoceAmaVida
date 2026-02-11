const perfilContainer = document.getElementById('perfilContainer');
const animais = JSON.parse(localStorage.getItem('animais')) || [];
const index = localStorage.getItem('animalSelecionado');

if(animais[index]) {
    const animal = animais[index];
    perfilContainer.innerHTML = `
        <div class="card-foto-perfil">
            <img class="foto" src="${animal.foto}" alt="${animal.nome}" width="200" height="200">
        </div>
        <div class="informacoes">
            <h2 class="nome">${animal.nome}</h2>
            <h3 class="raca">${animal.raca}</h3>
            <h3 class="idade">${animal.idade} Anos</h3>
            <h4>Sobre o animal</h4>
            <p class="descricao"> ${animal.descricao}</p>
        </div>
    `;

    // Botão de contato via WhatsApp
    const contatoBtn = document.getElementById('contatoBtn');
    contatoBtn.addEventListener('click', () => {
        const nomeAnimal = encodeURIComponent(animal.nome);
        const racaAnimal = encodeURIComponent(animal.raca);
        const idadeAnimal = encodeURIComponent(animal.idade);
        const descricaoAnimal = encodeURIComponent(animal.descricao);
        const linkPerfil = encodeURIComponent(window.location.href);

        const mensagem = `Olá! Tenho interesse no animal ${nomeAnimal}. Vi o perfil aqui: ${linkPerfil}. ${descricaoAnimal}`;

        // Coloque seu número do WhatsApp no formato internacional sem "+"
        const numeroWhats = "556191381360";

        const urlWhats = `https://wa.me/${numeroWhats}?text=${mensagem}`;
        window.open(urlWhats, "_blank");
    });

} else {
    perfilContainer.innerHTML = `<p>Animal não encontrado.</p>`;
}


function carregarCards() {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = ""; 

  if (animais[index] && animais[index].destaques) {
    animais[index].destaques.forEach(texto => {
      const card = document.createElement("div");
      card.className = "card";
      card.textContent = texto;
      container.appendChild(card);
    });
  }
}
carregarCards();


    