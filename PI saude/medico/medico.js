// Chaves para localStorage
const STORAGE_KEYS = {
  APPOINTMENTS: 'medico_appointments',
  PROFILE: 'medico_profile'
};

// Dados padrão iniciais
const defaultAppointments = [
  {
    id: generateId(),
    patient: 'Ana Beatriz',
    specialty: 'Dermatologia',
    date: '2025-10-10T14:30',
    notes: 'Consulta de rotina para avaliação de alergias.'
  },
  {
    id: generateId(),
    patient: 'Carlos Eduardo',
    specialty: 'Cardiologia',
    date: '2025-10-11T09:00',
    notes: 'Revisão pós-infarto, ajustar medicação.'
  },
  {
    id: generateId(),
    patient: 'Fernanda Lima',
    specialty: 'Psicologia',
    date: '2025-10-12T16:00',
    notes: 'Sessão de terapia cognitivo-comportamental.'
  }
];

const defaultProfile = {
  name: "Dr. Médico",
  email: "medico@email.com",
  phone: "(00) 00000-0000",
  crm: "123456-SP",
  specialty: "Clínico Geral"
};

// Estado global
let appointments = [];
let profile = {};

// Elementos DOM
const navItems = document.querySelectorAll('.sidebar ul li');
const logoutBtn = document.getElementById('logoutBtn');
const sections = document.querySelectorAll('.section');

const appointmentsList = document.getElementById('appointments-list');
const patientsListContainer = document.getElementById('patients-list-container');
const profileView = document.getElementById('profile-view');
const profileEdit = document.getElementById('profile-edit');

const profileEditForm = document.getElementById('profile-edit-form');

// Modal elementos
const modal = document.getElementById('consultationsModal');
const modalPatientName = document.getElementById('modalPatientName');
const modalConsultationsList = document.getElementById('modalConsultationsList');
const closeBtn = modal?.querySelector('.close-btn'); // opcional (confirma se existe)

// -------------------------
// Funções auxiliares
// -------------------------

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function formatDate(datetime) {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(datetime).toLocaleString('pt-BR', options);
}

// -------------------------
// Navegação entre abas
// -------------------------

function showSection(idToShow) {
  sections.forEach(section => {
    if (section.id === idToShow) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });

  navItems.forEach(li => {
    if (li.textContent.toLowerCase() === idToShow.replace('section-', '')) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });
}

// -------------------------
// Renderizar Agenda (Consultas)
// -------------------------

function createAppointmentCard(appointment) {
  const card = document.createElement('div');
  card.classList.add('appointment-card');

  const header = document.createElement('div');
  header.classList.add('appointment-header');

  const patientName = document.createElement('div');
  patientName.classList.add('patient-name');
  patientName.textContent = appointment.patient;

  const appointmentDate = document.createElement('div');
  appointmentDate.classList.add('appointment-date');
  appointmentDate.textContent = formatDate(appointment.date);

  header.appendChild(patientName);
  header.appendChild(appointmentDate);

  const details = document.createElement('div');
  details.classList.add('appointment-details');
  details.textContent = `${appointment.specialty} - ${appointment.notes}`;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.style.marginTop = '15px';

  // Cancelar agendamento
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancelar';
  cancelBtn.classList.add('cancel-btn');
  cancelBtn.onclick = () => cancelAppointment(appointment.id);

  buttonsDiv.appendChild(cancelBtn);

  card.appendChild(header);
  card.appendChild(details);
  card.appendChild(buttonsDiv);

  return card;
}

function renderAppointments() {
  appointmentsList.innerHTML = '';

  if (appointments.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'Nenhuma consulta agendada.';
    emptyMsg.style.fontWeight = '600';
    emptyMsg.style.color = '#6b8e23';
    appointmentsList.appendChild(emptyMsg);
    return;
  }

  appointments.forEach(appt => {
    const card = createAppointmentCard(appt);
    appointmentsList.appendChild(card);
  });
}

function cancelAppointment(id) {
  if (confirm('Deseja cancelar esta consulta?')) {
    appointments = appointments.filter(a => a.id !== id);
    saveToStorage(STORAGE_KEYS.APPOINTMENTS, appointments);
    renderAppointments();
    renderPatientsList(); // Atualiza lista de pacientes também
  }
}

// -------------------------
// Renderizar Pacientes
// -------------------------

function getUniquePatients() {
  const patientsMap = {};
  appointments.forEach(appt => {
    if (!patientsMap[appt.patient]) {
      patientsMap[appt.patient] = [];
    }
    patientsMap[appt.patient].push(appt);
  });
  return patientsMap;
}

// Modal - abrir e fechar
function openConsultationsModal(patientName) {
  modalConsultationsList.innerHTML = ''; // limpa conteúdo antigo

  modalPatientName.textContent = `Consultas de ${patientName}`;

  // Filtra consultas do paciente pelo nome
  const patientAppointments = appointments.filter(a => a.patient === patientName);

  if (patientAppointments.length === 0) {
    modalConsultationsList.innerHTML = '<p>Não há consultas registradas para este paciente.</p>';
  } else {
    patientAppointments.forEach(appt => {
      const card = document.createElement('div');
      card.className = 'modal-consultation-card';

      card.innerHTML = `
        <h4>${appt.specialty} - ${formatDate(appt.date)}</h4>
        <p><strong>Notas:</strong> ${appt.notes}</p>
      `;

      modalConsultationsList.appendChild(card);
    });
  }

  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function renderPatientsList() {
  if (!patientsListContainer) return;
  patientsListContainer.innerHTML = '';

  const patientsMap = getUniquePatients();

  const ul = document.createElement('ul');

  for (const [patientName] of Object.entries(patientsMap)) {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.marginBottom = '12px';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = patientName;
    nameSpan.style.fontWeight = '600';
    nameSpan.style.color = '#33691e';

    const detailsBtn = document.createElement('button');
    detailsBtn.textContent = 'Ver Consultas';
    detailsBtn.style.backgroundColor = '#aed581';
    detailsBtn.style.border = 'none';
    detailsBtn.style.padding = '6px 14px';
    detailsBtn.style.borderRadius = '8px';
    detailsBtn.style.color = '#2e7d32';
    detailsBtn.style.fontWeight = '700';
    detailsBtn.style.cursor = 'pointer';
    detailsBtn.style.transition = 'background-color 0.3s ease';

    detailsBtn.onmouseover = () => {
      detailsBtn.style.backgroundColor = '#9ccc65';
    };
    detailsBtn.onmouseout = () => {
      detailsBtn.style.backgroundColor = '#aed581';
    };

    detailsBtn.onclick = () => openConsultationsModal(patientName);

    li.appendChild(nameSpan);
    li.appendChild(detailsBtn);
    ul.appendChild(li);
  }

  if (ul.children.length === 0) {
    patientsListContainer.textContent = 'Nenhum paciente encontrado.';
    return;
  }

  patientsListContainer.appendChild(ul);
}

// -------------------------
// Renderizar Perfil
// -------------------------

function renderProfile() {
  if (!profileView) return;
  profileView.innerHTML = `
    <p><strong>Nome:</strong> ${profile.name}</p>
    <p><strong>Email:</strong> ${profile.email}</p>
    <p><strong>Telefone:</strong> ${profile.phone}</p>
    <p><strong>CRM:</strong> ${profile.crm}</p>
    <p><strong>Especialidade:</strong> ${profile.specialty}</p>
    <button id="editProfileBtn">Editar Perfil</button>
  `;

  document.getElementById('editProfileBtn').onclick = () => {
    showSection('section-profile-edit');
    fillProfileEditForm();
  };
}

// -------------------------
// Editar Perfil
// -------------------------

function fillProfileEditForm() {
  if (!profileEditForm) return;
  profileEditForm.name.value = profile.name;
  profileEditForm.email.value = profile.email;
  profileEditForm.phone.value = profile.phone;
  profileEditForm.crm.value = profile.crm;
  profileEditForm.specialty.value = profile.specialty;
}

function saveProfileFromForm() {
  if (!profileEditForm) return;

  profile.name = profileEditForm.name.value.trim();
  profile.email = profileEditForm.email.value.trim();
  profile.phone = profileEditForm.phone.value.trim();
  profile.crm = profileEditForm.crm.value.trim();
  profile.specialty = profileEditForm.specialty.value.trim();

  saveToStorage(STORAGE_KEYS.PROFILE, profile);
  renderProfile();
  showSection('section-profile');
}

// -------------------------
// Inicialização
// -------------------------

function init() {
  // Carregar dados do localStorage ou usar default
  appointments = loadFromStorage(STORAGE_KEYS.APPOINTMENTS) || defaultAppointments;
  profile = loadFromStorage(STORAGE_KEYS.PROFILE) || defaultProfile;

  // Renderizar inicialmente
  renderAppointments();
  renderPatientsList();
  renderProfile();
  showSection('section-agenda');

  // Setup navegação sidebar
  navItems.forEach(li => {
    li.addEventListener('click', () => {
      const text = li.textContent.toLowerCase();
      if (text === 'agenda') showSection('section-agenda');
      else if (text === 'pacientes') showSection('section-pacientes');
      else if (text === 'perfil') showSection('section-profile');
    });
  });

  // Logout
  logoutBtn.addEventListener('click', () => {
    window.location.href = "../login/login.html";
  });

  // Form submit profile edit
  if (profileEditForm) {
    profileEditForm.addEventListener('submit', e => {
      e.preventDefault();
      saveProfileFromForm();
    });

    // Cancelar edição perfil
    const cancelEditBtn = document.getElementById('cancelProfileEdit');
    if (cancelEditBtn) {
      cancelEditBtn.onclick = () => showSection('section-profile');
    }
  }

  // Modal close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

init();
