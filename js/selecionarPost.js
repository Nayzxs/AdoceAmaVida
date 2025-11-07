const listaPosts = document.getElementById('listaPosts');
const posts = JSON.parse(localStorage.getItem('posts')) || [];

if (posts.length === 0) {
  listaPosts.innerHTML = `<p style="text-align:center;">Nenhum post cadastrado.</p>`;
} else {
  posts.forEach((post, index) => {
    const card = document.createElement('div');
    card.classList.add('card-post');
    card.innerHTML = `
      <img src="${post.imagem}" alt="${post.titulo}" class="img-post">
      <div class="info">
        <h3>${post.titulo}</h3>
        <button class="btn-alterar" data-index="${index}">Alterar</button>
      </div>
    `;
    listaPosts.appendChild(card);
  });

  document.querySelectorAll('.btn-alterar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      localStorage.setItem('postSelecionado', index);
      window.location.href = "/html/Admin/alterarPost.html";
    });
  });
}
