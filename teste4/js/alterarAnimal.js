const animais = JSON.parse(localStorage.getItem('animais')) || [];
const index = localStorage.getItem('animalSelecionado');
const formContainer = document.getElementById('formContainer');

if(animais[index]) {
  const animal = animais[index];
formContainer.innerHTML = `
  <div class="card-foto-perfil">
    <img class="foto" src="${animal.foto}" alt="${animal.nome}">
    <input type="file" id="alterarFoto">
  </div>

  <div class="informacoes">
    <label>Alterar nome do animal</label>
    <input type="text" id="nomeInput" value="${animal.nome}">
    
    <label>Alterar idade</label>
    <input type="text" id="idadeInput" value="${animal.idade || ''}">
    
    <label>Alterar raça</label>
    <input type="text" id="racaInput" value="${animal.raca || ''}">
    </div>
    <div class="descricao">
    
    <label>Alterar descrição</label>
    <textarea id="descricaoInput">${animal.descricao}</textarea>

    <label>Alterar destaques (separados por vírgula)</label>
    <input type="text" id="destaquesInput" value="${animal.destaques ? animal.destaques.join(', ') : ''}">
    </div>
    `;

  // Botões
document.getElementById('salvarBtn').addEventListener('click', () => {
  animal.nome = document.getElementById('nomeInput').value;
  animal.idade = document.getElementById('idadeInput').value;
  animal.raca = document.getElementById('racaInput').value;
  animal.descricao = document.getElementById('descricaoInput').value;

  const destaquesTexto = document.getElementById('destaquesInput').value;
  animal.destaques = destaquesTexto.split(',')
                                   .map(d => d.trim())
                                   .filter(d => d !== "");

  localStorage.setItem('animais', JSON.stringify(animais));
  alert("Perfil atualizado com sucesso!");
  window.location.href = "/html/Admin/selecionarAnimal.html";
});

  document.getElementById('cancelarBtn').addEventListener('click', () => {
    window.history.back();
  });

  const modal = document.getElementById("modal");
const btnExcluir = document.getElementById("excluirBtn");
const btnCancelarModal = document.getElementById("cancelar");
const btnConfirmarModal = document.getElementById("confirmar");

// Abrir modal ao clicar em Excluir
btnExcluir.addEventListener("click", () => {
  // pega o span dentro do modal
  const nomeAnimalSpan = document.getElementById("nomeAnimal");
  nomeAnimalSpan.textContent = animal.nome; // insere o nome do animal

  modal.style.display = "block"; // mostra o modal
});


// Se clicar em cancelar → fecha o modal
btnCancelarModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Se clicar em confirmar → exclui
btnConfirmarModal.addEventListener("click", () => {
  animais.splice(index, 1);
  localStorage.setItem("animais", JSON.stringify(animais));
  window.location.href = "/html/Admin/indexAdmin.html";
});


} else {
  formContainer.innerHTML = `<p>Animal não encontrado.</p>`;
}
