function guardarTareas(tareas) {
    localStorage.setItem('tareas', JSON.stringify(tareas));
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

function generarIdCategoria(categorias) {
    return generarId(categorias, 'cat');
}

function eliminarTarea(idTarea) {
    const tareas = cargarTareas();
    const tareasActualizadas = [];
    tareas.forEach(tarea => {
        if (tarea.id !== idTarea) {
            tareasActualizadas.push(tarea);
        }
    });
    guardarTareas(tareasActualizadas);
}

function eliminarCategoria(idCategoria) {
    const categorias = cargarCategorias();
    const categorasActualizadas = [];
    categorias.forEach(categoria => {
        if (categoria.id !== idCategoria) {
            categorasActualizadas.push(categoria);
        }
    });
    console.log(categorasActualizadas);
    guardarCategorias(categorasActualizadas);
}