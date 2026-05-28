const btnUsuarios    = document.getElementById('btnUsuarios');
const btnRecetas     = document.getElementById('btnRecetas');
const btnIngredientes = document.getElementById('btnIngredientes');
const formBuscarUsuario = document.getElementById('formBuscarUsuario');
const emailBusqueda  = document.getElementById('emailBusqueda');
const estado         = document.getElementById('estado');
const resultados     = document.getElementById('resultados');

async function llamarApi(url, etiqueta) {
    resultados.innerHTML = '';
    estado.textContent = `Cargando ${etiqueta}...`;

    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
        const datos = await respuesta.json();

        const lista = Array.isArray(datos) ? datos : (datos.resultados || []);
        estado.textContent = `${lista.length} ${etiqueta} encontrado(s).`;

        if (lista.length === 0) {
            resultados.innerHTML = '<div class="vacio">No hay resultados.</div>';
            return;
        }

        resultados.innerHTML = lista.map(item => `
            <article class="resultado">
                ${Object.entries(item).map(([k, v]) =>
                    `<p><strong>${k}:</strong> ${v}</p>`
                ).join('')}
            </article>
        `).join('');

    } catch (error) {
        estado.textContent = '';
        resultados.innerHTML = `<div class="error">${error.message}</div>`;
    }
}

btnUsuarios.addEventListener('click', () =>
    llamarApi('api/usuarios', 'usuarios'));

btnRecetas.addEventListener('click', () =>
    llamarApi('api/recetas?_limit=4', 'recetas'));

btnIngredientes.addEventListener('click', () =>
    llamarApi('api/ingredientes?_limit=7', 'ingredientes'));

formBuscarUsuario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const email = emailBusqueda.value.trim();
    if (!email) return;
    llamarApi(`api/usuarios?email=${encodeURIComponent(email)}`, 'usuarios');
});
