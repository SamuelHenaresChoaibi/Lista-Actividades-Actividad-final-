function guardarTareas(tareas) {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function guardarTareasJSON(tareasJSON){
    localStorage.setItem('tareasJSON', JSON.stringify(tareasJSON));
}

function cargarTareas() {
    const tareas = localStorage.getItem('tareas');
    try {
        console.log(tareas);
        return tareas ? JSON.parse(tareas) : [];
    } catch (error) {
        console.error('Error al cargar tareas:', error);
        return [];
    }
}

function cargarTareasJSON() {
    const tareasJSON = localStorage.getItem('tareasJSON');
    try {
        console.log(tareasJSON);
        return tareasJSON ? JSON.parse(tareasJSON) : [];
    } catch (error) {
        console.error('Error al cargar tareas:', error);
        return [];
    }
}

function guardarCategorias(categorias) {
    localStorage.setItem('categorias', JSON.stringify(categorias));
}

function cargarCategorias() {
    const categorias = localStorage.getItem('categorias');
    try {
        console.log(categorias);
        return categorias ? JSON.parse(categorias) : [];
    } catch (error) {
        console.error('Error al cargar categorías:', error);
        return [];
    }
}

function generarId(item, prefijo) {
    if (!item.length) return `${prefijo}-001`;
    const ultimoId = parseInt(item[item.length - 1].id.split('-')[1]);
    console.log(`${prefijo}-${String(ultimoId + 1).padStart(3, '0')}`);
    return `${prefijo}-${String(ultimoId + 1).padStart(3, '0')}`;
}

function generarIdTarea(tareas) {
    return generarId(tareas, 'task')
}

function eliminarTarea(idTarea) {
    const tareas = cargarTareas();
    const tareasActualizadas = tareas.filter(tarea => tarea.id !== idTarea);
    guardarTareas(tareasActualizadas);
}

function eliminarTareaJSON(idTarea) {
    const tareasJSON = cargarTareasJSON();
    const tareasActualizadasJSON = tareasJSON.filter(tarea => tarea.id !== idTarea);
    guardarTareasJSON(tareasActualizadasJSON);
}

function eliminarCategoria(nomCategoria) {
    const categorias = cargarCategorias();
    const categoriasActualizadas = [];
    categorias.forEach(categoria => {
        if (categoria.nom !== nomCategoria) {
            categoriasActualizadas.push(categoria);
        }
    });
    console.log(categoriasActualizadas);
    guardarCategorias(categoriasActualizadas);
}