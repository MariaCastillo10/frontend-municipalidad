document.getElementById('form-notificacion').addEventListener('submit', function(event) {
  event.preventDefault();

  const tipo = document.getElementById('tipoNotificacion').value;
  const mensaje = document.getElementById('mensaje').value.trim();
  const destinatario = document.getElementById('destinatario').value.trim();

  const resultadoDiv = document.getElementById('resultado');

  if (!tipo || !mensaje || !destinatario) {
    resultadoDiv.textContent = 'Por favor, completa todos los campos.';
    resultadoDiv.style.color = 'red';
    return;
  }

  resultadoDiv.textContent = `Notificación de tipo "${tipo}" enviada exitosamente a ${destinatario}!`;
  resultadoDiv.style.color = 'green';

  this.reset();
});
