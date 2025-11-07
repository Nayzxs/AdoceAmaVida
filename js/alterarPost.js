// alterarPost.js

const posts = JSON.parse(localStorage.getItem('posts')) || [];
const index = localStorage.getItem('postSelecionado');
const formContainer = document.getElementById('formContainer');

if (posts[index]) {
  const post = posts[index];

  // Monta o formulário igual ao adicionarPost, mas com os dados do post
  formContainer.innerHTML = `
  <div class="post">
    <div class="perfil">
      <img id="preview" src="${post.imagem || '/assets/img/addimg.png'}" alt="Preview"
          style="width:150px; height:150px; border-radius:50vh;">
      <label class="custom-file">
        Alterar imagem
        <input type="file" id="arquivo" accept="image/*">
      </label>
    </div>

    <div class="container">
      <div class="informacoes">
        <label for="tituloConteudo">Titulo do conteúdo</label>
        <input type="text" class="input" id="tituloConteudo" value="${post.titulo}" required><br>
        
        <label for="linkConteudo">Link do conteúdo</label>
        <input type="text" class="input" id="linkConteudo" value="${post.link}" required>
      </div>
      
      <div class="bio">
        <label for="descricao">Descrição do conteúdo</label>
        <textarea id="descricao" placeholder="Descrição do conteúdo" rows="10">${post.descricao}</textarea>
                    <div class="botoes">
                <button id="excluirBtn" class="botao">Excluir</button>
                <button id="cancelarBtn" class="botao">Cancelar</button>
                <button id="salvarBtn" class="botao">Salvar</button>
            </div>
      </div>
    </div>
  </div>
  `;

  // Botões
  document.getElementById('salvarBtn').addEventListener('click', () => {
    post.titulo = document.getElementById('tituloConteudo').value;
    post.link = document.getElementById('linkConteudo').value;
    post.descricao = document.getElementById('descricao').value;

    const arquivoInput = document.getElementById('arquivo');
    if (arquivoInput.files && arquivoInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        post.imagem = e.target.result;
        localStorage.setItem('posts', JSON.stringify(posts));
        alert("Post atualizado com sucesso!");
        window.location.href = "/html/Admin/selecionarPost.html";
      }
      reader.readAsDataURL(arquivoInput.files[0]);
    } else {
      localStorage.setItem('posts', JSON.stringify(posts));
      alert("Post atualizado com sucesso!");
      window.location.href = "/html/Admin/selecionarPost.html";
    }
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
    const nomePostSpan = document.getElementById("nomeAnimal") || document.getElementById("nomePost");
    if (nomePostSpan) nomePostSpan.textContent = post.titulo;
    modal.style.display = "block";
  });

  // Fechar modal
  btnCancelarModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Confirmar exclusão
  btnConfirmarModal.addEventListener("click", () => {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    window.location.href = "/html/Admin/indexAdmin.html";
  });

} else {
  formContainer.innerHTML = `<p>Post não encontrado.</p>`;
}
