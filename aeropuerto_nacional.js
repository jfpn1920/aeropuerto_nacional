//---------------------------------------//
//--|funcionalidad_aeropuerto_nacional|--//
//---------------------------------------//
const formulario_vuelo = document.getElementById("formulario_vuelo");
const numero_vuelo = document.getElementById("numero_vuelo");
const destino_vuelo = document.getElementById("destino_vuelo");
const horario_vuelo = document.getElementById("horario_vuelo");
const estado_vuelo = document.getElementById("estado_vuelo");
const lista_vuelos = document.getElementById("lista_vuelos");
const cantidad_vuelos = document.getElementById("cantidad_vuelos");
const limpiar_vuelos = document.getElementById("limpiar_vuelos");
const mensaje_vacio = document.getElementById("mensaje_vacio");
//--------------------------------------------//
//--|cargar_y_guardar_datos_en_localstorage|--//
//--------------------------------------------//
let vuelos = JSON.parse(localStorage.getItem("vuelos_aeropuerto")) || [];
function guardar_vuelos() {
    localStorage.setItem("vuelos_aeropuerto", JSON.stringify(vuelos));
}
//--------------------//
//--|mostrar_vuelos|--//
//--------------------//
function mostrar_vuelos() {
    lista_vuelos.innerHTML = "";
    cantidad_vuelos.textContent = vuelos.length;
    if (vuelos.length === 0) {
        mensaje_vacio.style.display = "block";
        return;
    }
    mensaje_vacio.style.display = "none";
    vuelos.forEach(
        function(vuelo, indice) {
            const fila = document.createElement("tr");
            const clase_estado = vuelo.estado === "Cancelado" ? "estado_vuelo estado_cancelado" : "estado_vuelo";
            fila.innerHTML = `
                <td>
                    <strong>${vuelo.numero}</strong>
                </td>
                <td>${vuelo.destino}</td>
                <td>${vuelo.horario}</td>
                <td>
                    <span class="${clase_estado}">${vuelo.estado}</span>
                </td>
                <td>
                    <button class="boton_eliminar" data-indice="${indice}" type="button"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            lista_vuelos.appendChild(fila);
        }
    );
    agregar_eventos_eliminar();
}
//---------------------//
//--|registrar_vuelo|--//
//---------------------//
function registrar_vuelo() {
    const nuevo_vuelo = {
        numero: numero_vuelo.value.trim(),
        destino: destino_vuelo.value.trim(),
        horario: horario_vuelo.value,
        estado: estado_vuelo.value
    };
    vuelos.push(nuevo_vuelo);
    guardar_vuelos();
    mostrar_vuelos();
    formulario_vuelo.reset();
}
//-----------------------//
//--|evento_formulario|--//
//-----------------------//
formulario_vuelo.addEventListener(
    "submit",
    function(evento) {
        evento.preventDefault();
        registrar_vuelo();
    }
);
//--------------------//
//--|eliminar_vuelo|--//
//--------------------//
function eliminar_vuelo(indice) {
    vuelos.splice(indice, 1);
    guardar_vuelos();
    mostrar_vuelos();
}
//----------------------//
//--|eventos_eliminar|--//
//----------------------//
function agregar_eventos_eliminar() {
    const botones_eliminar = document.querySelectorAll(".boton_eliminar");
    botones_eliminar.forEach(
        function(boton) {
            boton.addEventListener(
                "click",
                function() {
                    const indice = Number(boton.dataset.indice);
                    eliminar_vuelo(indice);
                }
            );
        }
    );
}
//-------------------//
//--|limpiar_todos|--//
//-------------------//
limpiar_vuelos.addEventListener(
    "click",
    function() {
        if (vuelos.length === 0) {
            return;
        }
        const confirmar = confirm("¿Deseas eliminar todos los vuelos?");
        if (!confirmar) {
            return;
        }
        vuelos = [];
        localStorage.removeItem("vuelos_aeropuerto");
        mostrar_vuelos();
    }
);
mostrar_vuelos();