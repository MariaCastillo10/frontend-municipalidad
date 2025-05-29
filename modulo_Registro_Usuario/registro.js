const form = document.getElementById('form-registro');
const tablaBody = document.querySelector('#tablaUsuarios tbody');

let usuarios = [];

function renderTabla() {
  tablaBody.innerHTML = '';
  usuarios.forEach((usuario, index) => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.email}</td>
      <td>${usuario.telefono}</td>
      <td>
        <button class="accion-btn editar" data-index="${index}" title="Editar">&#9998;</button>
        <button class="accion-btn eliminar" data-index="${index}" title="Eliminar">&#10060;</button>
      </td>
    `;

    tablaBody.appendChild(fila);
  });
}

function resetForm() {
  form.reset();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!nombre || !email || !telefono || !password) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Verificar si estamos editando
  if (form.dataset.editIndex !== undefined) {
    const index = form.dataset.editIndex;
    usuarios[index] = { nombre, email, telefono, password };
    delete form.dataset.editIndex;
  } else {
    usuarios.push({ nombre, email, telefono, password });
  }

  renderTabla();
  resetForm();
});

// Delegación de eventos para botones de editar y eliminar
tablaBody.addEventListener('click', (e) => {
  if (e.target.classList.contains('eliminar')) {
    const index = e.target.dataset.index;
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      usuarios.splice(index, 1);
      renderTabla();
    }
  } else if (e.target.classList.contains('editar')) {
    const index = e.target.dataset.index;
    const usuario = usuarios[index];

    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('email').value = usuario.email;
    document.getElementById('telefono').value = usuario.telefono;
    document.getElementById('password').value = usuario.password;

    form.dataset.editIndex = index;
  }
});

// Inicializar tabla vacía
renderTabla();
