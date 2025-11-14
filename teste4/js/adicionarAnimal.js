const animalForm = document.getElementById('animalForm');
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

animalForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;
  const arquivo = document.getElementById('arquivo');
  const raca = document.getElementById('raca').value;
  const idade = document.getElementById('idade').value;
  const sexo = document.querySelector('input[name="sexo"]:checked').value;

  // pega os destaques separados por vírgula
  const destaques = document.getElementById('destaques').value
                      .split(',')
                      .map(d => d.trim())
                      .filter(d => d !== "");

  if (arquivo.files && arquivo.files[0]) {
    const reader = new FileReader();

    reader.onload = function(e) {
      const novoAnimal = {
        nome,
        descricao,
        raca,
        idade,
        sexo,
        destaques, // << agora salva dentro do animal
        foto: e.target.result
      };

      let animais = JSON.parse(localStorage.getItem('animais')) || [];
      animais.push(novoAnimal);
      localStorage.setItem('animais', JSON.stringify(animais));

      alert("Animal adicionado com sucesso!");
      animalForm.reset();
      preview.src = "/assets/img/addimg.png"; // volta imagem padrão
    };

    reader.readAsDataURL(arquivo.files[0]);
  } else {
    alert("Selecione uma foto do animal.");
  }
});
