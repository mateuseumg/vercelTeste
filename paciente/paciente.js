const professionals = {
  cardiologia: [
    { name: 'Dr. João Silva', specialty: 'Cardiologia' },
    { name: 'Dra. Maria Costa', specialty: 'Cardiologia' },
  ],
  dermatologia: [
    { name: 'Dra. Ana Paula', specialty: 'Dermatologia' },
    { name: 'Dr. Carlos Mendes', specialty: 'Dermatologia' },
  ],
  pediatria: [
    { name: 'Dra. Helena Souza', specialty: 'Pediatria' },
    { name: 'Dr. Pedro Santos', specialty: 'Pediatria' },
  ],
  psicologia: [
    { name: 'Dra. Carla Ribeiro', specialty: 'Psicologia' },
    { name: 'Dr. Lucas Almeida', specialty: 'Psicologia' },
  ],
  odontologia: [
    { name: 'Dra. Fernanda Lima', specialty: 'Odontologia' },
    { name: 'Dr. Rafael Gomes', specialty: 'Odontologia' },
  ],
};

const specialtySelect = document.getElementById('specialty');
const professionalList = document.getElementById('professional-list');

function clearProfessionals() {
  professionalList.innerHTML = '';
}

function createProfessionalCard(professional) {
  const card = document.createElement('div');
  card.classList.add('professional-card');

  // Criar círculo com iniciais
  const initials = professional.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  const photo = document.createElement('div');
  photo.classList.add('professional-photo');
  photo.textContent = initials;

  const name = document.createElement('div');
  name.classList.add('professional-name');
  name.textContent = professional.name;

  const specialty = document.createElement('div');
  specialty.classList.add('professional-specialty');
  specialty.textContent = professional.specialty;

  const btn = document.createElement('button');
  btn.classList.add('btn-appointment');
  btn.textContent = 'Marcar Consulta';
  btn.addEventListener('click', () => {
    alert(`Consulta marcada com ${professional.name}!`);
  });

  card.appendChild(photo);
  card.appendChild(name);
  card.appendChild(specialty);
  card.appendChild(btn);

  return card;
}

specialtySelect.addEventListener('change', (e) => {
  clearProfessionals();
  const selected = e.target.value;
  if (professionals[selected]) {
    professionals[selected].forEach((pro) => {
      const card = createProfessionalCard(pro);
      professionalList.appendChild(card);
    });
  }
});
// Chatbot Interação
function toggleChat() {
  const body = document.getElementById('chatbot-body');
  const btn = document.getElementById('toggle-btn');
  body.style.display = body.style.display === 'none' ? 'block' : 'none';
  btn.textContent = body.style.display === 'none' ? '+' : '−';
}

function sendMessage() {
  const input = document.getElementById('chatbot-input');
  const messages = document.getElementById('chatbot-messages');
  const text = input.value.trim();

  if (text !== '') {
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = text;
    messages.appendChild(userMessage);

    // Simula resposta do bot
    const botMessage = document.createElement('div');
    botMessage.className = 'bot-message';

    // Respostas básicas simuladas
    let reply = "Desculpe, não entendi. Você pode reformular?";
    const lower = text.toLowerCase();

    if (lower.includes("marcar") || lower.includes("consulta")) {
      reply = "Claro! Escolha uma especialidade acima para agendar.";
    } else if (lower.includes("horário")) {
      reply = "Os horários disponíveis aparecerão após escolher o profissional.";
    } else if (lower.includes("ajuda") || lower.includes("atendimento")) {
      reply = "Estou aqui para te ajudar! Pergunte sobre especialidades ou agendamentos.";
    }

    botMessage.textContent = reply;
    messages.appendChild(botMessage);

    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  }
}
// Cancelar Consulta
function cancelAppointment(button) {
  const li = button.parentElement;
  const confirmed = confirm("Tem certeza que deseja cancelar esta consulta?");
  if (confirmed) {
    li.remove();
    alert("Consulta cancelada com sucesso.");
  }
}
