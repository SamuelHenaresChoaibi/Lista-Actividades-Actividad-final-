document.addEventListener('DOMContentLoaded', () => {
    const nomInput = document.getElementById('name-task');
    const descripcionInput = document.getElementById('description');
    const fechaInput = document.getElementById('date-task');
    const categoriaSelect = document.getElementById('categoria');
    const prioridadSelect = document.getElementById('priority');
    const botonCrearTasca = document.getElementById('create-task');
    const categorias = cargarCategorias();

    function cargarCategoriasSelect() {
        categoriaSelect.innerHTML = '';
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.nom;
            option.textContent = categoria.nom;
            categoriaSelect.appendChild(option);
        });
    }

    botonCrearTasca.addEventListener('click', () => {
        const nomValue = nomInput.value.trim();
        const descripcionValue = descripcionInput.value.trim();
        const fechaValue = fechaInput.value;
        const categoriaValue = categoriaSelect.value;
        const prioridadValue = prioridadSelect.value;
        let colorCategoria = '';

        if (!nomValue || !descripcionValue || !fechaValue || !categoriaValue || !prioridadValue) {
            alert("Hay que rellenar todos los campos para crear una tarea");
        } else {
            categorias.forEach(categoria => {
                if(categoria.nom === categoriaValue){
                    colorCategoria = categoria.color;
                }
            });
            const tareas = cargarTareas();
            const tareaNueva = new Tarea(
                generarIdTarea(tareas), 
                nomValue, 
                descripcionValue, 
                fechaValue, 
                {
                    nom: categoriaValue,
                    color: colorCategoria
                }, 
                prioridadValue, 
                false);

            tareas.push(tareaNueva);
            guardarTareas(tareas);
            nomInput.value = '';
            descripcionInput.value = '';
            fechaInput.value = '';
            prioridadSelect.value = 'Alta';
        }
    });

    cargarCategoriasSelect();
});
