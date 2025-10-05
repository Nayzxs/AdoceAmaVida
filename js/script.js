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

// ===== CARROSSEL AUTOMÁTICO =====
const dotsContainer = document.querySelector(".animais-adocao .dots");
let currentIndex = 0;
const total = animaisMostrados.length;

// Criar pontinhos dinamicamente
for (let i = 0; i < total; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll(".animais-adocao .dot");

function goToSlide(index) {
  containerAnimais.style.transform = `translateX(${-index * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
  currentIndex = index;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % total;
  goToSlide(currentIndex);
}

// Passa automático a cada 3s
setInterval(nextSlide, 3000);
