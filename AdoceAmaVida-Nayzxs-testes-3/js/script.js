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






//posters 


document.addEventListener('DOMContentLoaded', () => {
    const containerDicas = document.querySelector('.box-dicas');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (!containerDicas || posts.length === 0) return;

    // Limpa o conteúdo atual
    containerDicas.innerHTML = '';

    // Pega apenas os 4 últimos posts
    const ultimosPosts = posts.slice(-4).reverse();

    ultimosPosts.forEach((post, index) => {
      // Cria o card
      const card = document.createElement('div');
      card.classList.add('card-dicas');

      // alterna cor de fundo como no layout original
      card.id = index % 3 === 0 ? 'azul' : 'transparent';

      card.innerHTML = `
      <a href="${post.link}" target="_blank">
        <img class="img-dicas" src="${post.imagem}" alt="${post.titulo}">
          <div class="texto-dicas">
          <h1>${post.titulo}</h1>
          <p>${post.descricao}</p>
          </div>
          </a>
      `;

      // adiciona ao container
      containerDicas.appendChild(card);
    });
  });


