document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // impede o refresh da página

  const tipo = document.getElementById("tipo").value;

  if (tipo === "paciente") {
    window.location.href = "../paciente/paciente.html"; 
  } else if (tipo === "medico") {
    window.location.href = "../medico/medico.html"; 
  } else {
    alert("Por favor, selecione um tipo de usuário.");
  }
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../service-worker.js')
    .then(() => console.log('Service Worker registrado!'))
    .catch(err => console.log('Erro ao registrar o Service Worker:', err));
}
