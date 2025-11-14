const postForm = document.getElementById('postForm');
const input = document.getElementById('arquivo');
const preview = document.getElementById('preview');

// Preview da imagem
input.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      preview.src = reader.result;
      preview.style.display = 'block';
    });
    reader.readAsDataURL(file);
  }
});

postForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const tituloConteudo = document.getElementById('tituloConteudo').value.trim();
  const linkConteudo = document.getElementById('linkConteudo').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const arquivo = document.getElementById('arquivo');

  if (!tituloConteudo || !descricao || !arquivo.files.length) {
    alert("Preencha todos os campos e adicione uma imagem.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const novoPost = {
      titulo: tituloConteudo,
      link: linkConteudo,
      descricao,
      imagem: e.target.result,
      data: new Date().toLocaleDateString('pt-BR')
    };

    // Salva no localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(novoPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    alert("Post adicionado com sucesso!");
    postForm.reset();
    preview.src = "/assets/img/addimg.png";
  };

  reader.readAsDataURL(arquivo.files[0]);
});
