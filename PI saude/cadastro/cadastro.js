/*document.getElementById("cadastroForm").addEventListener("submit", function(event) {
  event.preventDefault(); // impede o refresh da página

  const tipo = document.getElementById("tipo").value;

  if (tipo === "paciente") {
    window.location.href = "../login/login.html"; 
  } else if (tipo === "medico") {
    window.location.href = "../login/login.html"; 
  } else {
    alert("Por favor, selecione um tipo de usuário.");
  }
   if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }
});*/


document.getElementById("cadastroForm").addEventListener("submit", function(event) {
  event.preventDefault(); // impede o envio padrão

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const tipo = document.getElementById("tipo").value;

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem.");
    return;
  }

  const novoUsuario = {
    nome,
    email,
    telefone,
    senha,
    tipo
  };

  // Armazena no localStorage (apenas para protótipos)
  localStorage.setItem("usuarioCadastrado", JSON.stringify(novoUsuario));


  window.location.href = "../login/login.html";
});