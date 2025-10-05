const listaAnimais = document.getElementById('listaAnimais');
const animais = JSON.parse(localStorage.getItem('animais')) || [];

if (animais.length === 0) {
  listaAnimais.innerHTML = "<p>Nenhum animal cadastrado.</p>";
} else {
  animais.forEach((animal, index) => {
    const item = document.createElement('div');
    item.className = "animal-item";
    item.innerHTML = `
      <img src="${animal.foto}" alt="${animal.nome}" width="110" height="120">
      <span>${animal.nome}</span>
    `;

    item.addEventListener('click', () => {
      localStorage.setItem('animalSelecionado', index);
      window.location.href = "alterarAnimal.html";
    });

    listaAnimais.appendChild(item);
  });
}
