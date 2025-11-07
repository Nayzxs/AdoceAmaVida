document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const posts = JSON.parse(localStorage.getItem('posts')) || [];

  // Caso não haja posts salvos
  if (posts.length === 0) {
    container.innerHTML = `<p style="text-align:center;">Nenhum post adicionado ainda.</p>`;
    return;
  }

  // Cria cada card igual ao modelo do HTML
  posts.forEach((post, index) => {
    const card = document.createElement('a');
    card.classList.add('card-dicas');
    card.href = post.link || "#";
    card.target = "_blank";

    // adiciona ID alternando entre "azul" e "transparent" só para exemplo visual
    card.id = index % 2 === 0 ? "azul" : "transparent";

    card.innerHTML = `
      <img class="img-dicas" src="${post.imagem}" alt="${post.titulo}" width="150px" heigth="150px" >
      <div class="texto-dicas">
        <h1>${post.titulo}</h1>
        <p>${post.descricao}</p>
      </div>
    `;

    container.appendChild(card);
  });
});
