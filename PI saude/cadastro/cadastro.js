
document.getElementById("cadastroForm").addEventListener("submit", function(event) {
  event.preventDefault();

  console.log('submit do cadastro acionado'); // verifica se o evento disparou

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const tipo = document.getElementById("tipo").value;

  if (!tipo) {
    alert("Por favor, selecione um tipo de usuário.");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  const novoUsuario = { nome, email, telefone, senha, tipo };
  localStorage.setItem("usuarioCadastrado", JSON.stringify(novoUsuario));

  alert("Cadastro realizado com sucesso!");


window.location.href = "/login/login.html";
});
