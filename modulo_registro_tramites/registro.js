document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formRegistro');
  const tablaCuerpo = document.querySelector('#tablaTramites tbody');
  const indiceEditar = document.getElementById('indiceEditar');

  function cargarTramites() {
    tablaCuerpo.innerHTML = '';
    const tramites = JSON.parse(localStorage.getItem('tramites')) || [];

    tramites.forEach((tramite, index) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${tramite.dni}</td>
        <td>${tramite.nombre}</td>
        <td>${tramite.tipoTramite}</td>
        <td>${tramite.fechaRegistro}</td>
        <td>${tramite.estado}</td>
        <td>
          <button class="btn-editar" data-index="${index}">✏️ Editar</button>
          <button class="btn-eliminar" data-index="${index}">🗑️ Eliminar</button>
        </td>
      `;
      tablaCuerpo.appendChild(fila);
    });
  }

  function guardarTramites(tramites) {
    localStorage.setItem('tramites', JSON.stringify(tramites));
  }

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const archivo = document.getElementById('documento').files[0];

  // Función que guarda el trámite en localStorage
  const guardarTramiteConArchivo = (archivoBase64 = null) => {
    const tramite = {
      dni: form.dni.value.trim(),
      nombre: form.nombre.value.trim(),
      tipoTramite: form.tipoTramite.value.trim(),
      fechaRegistro: form.fechaRegistro.value,
      estado: form.estado.value,
      documento: archivoBase64 // Aquí se guarda el documento como base64
    };

    if (!tramite.dni || !tramite.nombre || !tramite.tipoTramite || !tramite.fechaRegistro || !tramite.estado) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const tramites = JSON.parse(localStorage.getItem('tramites')) || [];

    if (indiceEditar.value === '') {
      tramites.push(tramite);
    } else {
      tramites[indiceEditar.value] = tramite;
    }

    guardarTramites(tramites);
    cargarTramites();
    form.reset();
    indiceEditar.value = '';
  };

  if (archivo) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const archivoBase64 = event.target.result;
      guardarTramiteConArchivo(archivoBase64);
    };
    reader.readAsDataURL(archivo);
  } else {
    guardarTramiteConArchivo(null); // Si no hay archivo, igual guarda
  }
});

  tablaCuerpo.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
      const index = e.target.dataset.index;
      const tramites = JSON.parse(localStorage.getItem('tramites')) || [];
      if (confirm('¿Estás seguro de eliminar este trámite?')) {
        tramites.splice(index, 1);
        guardarTramites(tramites);
        cargarTramites();
      }
    }

    if (e.target.classList.contains('btn-editar')) {
      const index = e.target.dataset.index;
      const tramites = JSON.parse(localStorage.getItem('tramites')) || [];
      const tramite = tramites[index];
      form.dni.value = tramite.dni;
      form.nombre.value = tramite.nombre;
      form.tipoTramite.value = tramite.tipoTramite;
      form.fechaRegistro.value = tramite.fechaRegistro;
      form.estado.value = tramite.estado;
      indiceEditar.value = index;
    }
  });

  cargarTramites();
});
