
document.getElementById("formCita").addEventListener("submit", function (e) {
    e.preventDefault();
    const dni = document.getElementById("dni").value;
    const tipoTramite = document.getElementById("tipoTramite").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    const tbody = document.querySelector("#tablaCitas tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${dni}</td>
        <td>${tipoTramite}</td>
        <td>${fecha}</td>
        <td>${hora}</td>
        <td><button onclick="eliminarCita(this)">Eliminar</button></td>
    `;

    tbody.appendChild(row);
    this.reset();
});

function eliminarCita(btn) {
    const row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
