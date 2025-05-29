document.addEventListener('DOMContentLoaded', () => {
  const formBusqueda = document.getElementById('formBusqueda');
  const resultadoDiv = document.getElementById('resultadoBusqueda');

  formBusqueda.addEventListener('submit', (e) => {
    e.preventDefault();

    const dni = document.getElementById('dniBusqueda').value.trim();
    if (!/^\d{8}$/.test(dni)) {
      alert('Ingrese un DNI válido de 8 dígitos.');
      return;
    }

    const tramites = JSON.parse(localStorage.getItem('tramites')) || [];
    const encontrados = tramites.filter(t => t.dni === dni);

    resultadoDiv.innerHTML = '';

    if (encontrados.length === 0) {
      resultadoDiv.innerHTML = `<p class="mensaje-error">No se encontraron trámites con ese DNI.</p>`;
    } else {
      encontrados.forEach(tramite => {
        const card = document.createElement('div');
        card.className = 'card-tramite';

        // color por estado
        let estadoColor = '';
        if (tramite.estado === 'Pendiente') estadoColor = 'amarillo';
        else if (tramite.estado === 'En proceso') estadoColor = 'azul';
        else if (tramite.estado === 'Finalizado') estadoColor = 'verde';

        card.innerHTML = `
          <h3>${tramite.tipoTramite}</h3>
          <p><strong>Nombre:</strong> ${tramite.nombre}</p>
          <p><strong>Fecha de Registro:</strong> ${tramite.fechaRegistro}</p>
          <p><strong>Estado:</strong> <span class="estado ${estadoColor}">${tramite.estado}</span></p>
        `;

        resultadoDiv.appendChild(card);
      });
    }
  });
});
