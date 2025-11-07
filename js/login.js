const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const fs = require('fs');

const app = express();
const PORT = 3000;

// carrega usuários do arquivo, se existir
let usuarios = [];
if (fs.existsSync('usuarios.json')) {
  usuarios = JSON.parse(fs.readFileSync('usuarios.json', 'utf-8'));
}

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'segredo-super-seguro',
  resave: false,
  saveUninitialized: false
}));

// rota de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    return res.redirect('/login.html?msg=nao_encontrado');
  }

  const senhaConfere = await bcrypt.compare(senha, usuario.senha);
  if (!senhaConfere) {
    return res.redirect('/login.html?msg=senha_incorreta');
  }

  req.session.usuario = usuario;
  res.redirect('./index.html?msg=login_ok');
});

// rota de logout
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/aindex.html');
});

// rota só para testar quem está logado
app.get('/me', (req, res) => {
  if (req.session.usuario) {
    res.json(req.session.usuario);
  } else {
    res.status(401).send('Não autenticado');
  }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
