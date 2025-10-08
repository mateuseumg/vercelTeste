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
