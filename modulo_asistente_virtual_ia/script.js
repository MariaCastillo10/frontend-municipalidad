const chatWindow = document.getElementById("chat");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

// Función para agregar mensaje al chat
function agregarMensaje(texto, clase) {
  const mensajeDiv = document.createElement("div");
  mensajeDiv.classList.add("message", clase);
  mensajeDiv.textContent = texto;
  chatWindow.appendChild(mensajeDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Función simulada para generar respuesta (aquí va la lógica o API real)
function generarRespuesta(texto) {
  texto = texto.toLowerCase();

  if (texto.includes("hola")) {
    return "¡Hola! ¿En qué puedo ayudarte hoy?";
  }
  if (texto.includes("tramite") && texto.includes("registro")) {
    return "Para registrar un trámite, dirígete al módulo de Registro de Trámites.";
  }
  if (texto.includes("horario")) {
    return "Nuestro horario de atención es de lunes a viernes, 8:00am a 5:00pm.";
  }
  if (texto.includes("notificaciones")) {
    return "Las notificaciones SMS te mantienen informado sobre el estado de tus trámites.";
  }

  return "Lo siento, no entendí tu consulta. ¿Podrías reformularla?";
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const textoUsuario = userInput.value.trim();
  if (!textoUsuario) return;

  agregarMensaje(textoUsuario, "user");

  // Simular retraso en respuesta
  setTimeout(() => {
    const respuesta = generarRespuesta(textoUsuario);
    agregarMensaje(respuesta, "bot");
  }, 600);

  userInput.value = "";
  userInput.focus();
});
