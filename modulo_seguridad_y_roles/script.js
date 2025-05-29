document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formSeguridad');
  const tablaBody = document.querySelector('#tablaSeguridad tbody');

  // Guardar roles asignados en memoria temporal (puede ser reemplazado con backend)
  let rolesAsignados = [];

  // Función para mostrar los roles en la tabla
  function mostrarRoles() {
    tablaBody.innerHTML = ''; // Limpiar tabla

    rolesAsignados.forEach((item, index) => {
      const fila = document.createElement('tr');

      fila.innerHTML = `
        <td>${item.usuario}</td>
        <td>${item.rol}</td>
        <td><button data-index="${index}" class="btnEliminar">Eliminar</button></td>
      `;

      tablaBody.appendChild(fila);
    });

    // Añadir evento para botones eliminar
    document.querySelectorAll('.btnEliminar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        rolesAsignados.splice(idx, 1);
        mostrarRoles();
      });
    });
  }

  // Manejar el envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const rol = document.getElementById('rol').value;

    if (usuario === '' || rol === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Validar si usuario ya tiene rol asignado
    const existe = rolesAsignados.some(item => item.usuario.toLowerCase() === usuario.toLowerCase());
    if (existe) {
      alert('Este usuario ya tiene un rol asignado.');
      return;
    }

    rolesAsignados.push({ usuario, rol });

    form.reset();
    mostrarRoles();
  });

  mostrarRoles(); // Inicializar tabla vacía
});
