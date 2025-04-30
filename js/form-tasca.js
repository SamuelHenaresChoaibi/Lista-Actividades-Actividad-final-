document.addEventListener('DOMContentLoaded', () => {
    //Elementos HTML
    const nomInput = document.getElementById('name-task');
    const descripcionInput = document.getElementById('description');
    const fechaInput = document.getElementById('date-task');
    const categoriaSelect = document.getElementById('categoria');
    const prioridadSelect = document.getElementById('priority');
    const botonCrearTasca = document.getElementById('create-task');
    const categorias = cargarCategorias();

    //Función para cargar en el 'select' de categorías todas las categorías existentes
    /**
     * 
     */
    function cargarCategoriasSelect() {
        categoriaSelect.innerHTML = '';
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.nom;
            option.textContent = categoria.nom;
            categoriaSelect.appendChild(option);
        });
    }

    //Evento para crear una tarea
    botonCrearTasca.addEventListener('click', () => {
        const nomValue = nomInput.value.trim();
        const descripcionValue = descripcionInput.value.trim();
        const fechaValue = fechaInput.value;
        const categoriaValue = categoriaSelect.value;
        const prioridadValue = prioridadSelect.value;
        let colorCategoria = '';

        //Validación de campos
        if (!nomValue || !descripcionValue || !fechaValue || !categoriaValue || !prioridadValue) {
            alert("Hay que rellenar todos los campos para crear una tarea");
        } else {
            categorias.forEach(categoria => {
                if (categoria.nom === categoriaValue) {
                    colorCategoria = categoria.color;
                }
            });
            const tareas = cargarTareas();
            //Nueva Tarea
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

    //Llamamos a la función cada vez que se actualice la página
    cargarCategoriasSelect();
});
