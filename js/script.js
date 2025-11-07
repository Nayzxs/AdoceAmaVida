 const btn = document.querySelector(".menu-btn");
    const menu = document.getElementById("menu");

    // Abre/fecha menu ao clicar no botão
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // impede de fechar imediatamente
      menu.classList.toggle("show");
    });

    // Fecha se clicar fora
    document.addEventListener("click", () => {
      menu.classList.remove("show");
    });



    
    // Pega os animais do localStorage
const animais = JSON.parse(localStorage.getItem('animais')) || [];

// Pega a div que vai receber os cards
const containerAnimais = document.querySelector(".container-animais");

// Pega apenas os 4 primeiros animais
const animaisMostrados = animais.slice(0, 4);

// Limpa container
containerAnimais.innerHTML = "";

// Cria os cards dinamicamente
animaisMostrados.forEach((animal, index) => {
  const card = document.createElement("div");
  card.classList.add("cards-animais");

  card.innerHTML = `
    <div class="card-foto">
      <img class="foto" src="${animal.foto}" alt="${animal.nome}">
    </div>
    <h2 class="nome">${animal.nome}</h2>
    <p class="raca">${animal.raca}</p>
  `;

  // Adiciona evento de clique para ir ao perfil
  card.addEventListener("click", () => {
    localStorage.setItem("animalSelecionado", index);
    window.location.href = "/html/pets/perfilAnimal.html";
  });

  containerAnimais.appendChild(card);
});


