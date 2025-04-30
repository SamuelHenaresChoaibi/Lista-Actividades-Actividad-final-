//Función para guardar las tareas que crea el usuario desde 'crear-tasca.html'
/**
 * 
 * @param {*} tareas 
 */
function guardarTareas(tareas) {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

//Función para guardar las tareas que son introducidos desde 'index.html' a partir de un archivo JSON
/**
 * 
 * @param {*} tareasJSON 
 */
function guardarTareasJSON(tareasJSON){
    localStorage.setItem('tareasJSON', JSON.stringify(tareasJSON));
}

//Carga las tareas guardadas que han sido creadas por el usuario
/**
 * 
 * @returns 
 */
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

//Carga las tareas guardadas que han sido cargadas desde un JSON
/**
 * 
 * @returns 
 */
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

//Guarda la lista de categorías tanto creados por el usuario como los del archvio JSON
/**
 * 
 * @param {*} categorias 
 */
function guardarCategorias(categorias) {
    localStorage.setItem('categorias', JSON.stringify(categorias));
}

//Carga la lista de categorías guardadas
/**
 * 
 * @returns 
 */
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

//Función genérica para crear un ID de cualquier objeto
/**
 * 
 * @param {*} item 
 * @param {*} prefijo 
 * @returns 
 */
function generarId(item, prefijo) {
    if (!item.length) return `${prefijo}-001`;
    const ultimoId = parseInt(item[item.length - 1].id.split('-')[1]);
    console.log(`${prefijo}-${String(ultimoId + 1).padStart(3, '0')}`);
    return `${prefijo}-${String(ultimoId + 1).padStart(3, '0')}`;
}

//Función para generar un ID para cada tarea
/**
 * 
 * @param {*} tareas 
 * @returns 
 */
function generarIdTarea(tareas) {
    return generarId(tareas, 'task')
}

//Función para eliminar una tarea creada por el usuario
/**
 * 
 * @param {*} idTarea 
 */
function eliminarTarea(idTarea) {
    const tareas = cargarTareas();
    const tareasActualizadas = tareas.filter(tarea => tarea.id !== idTarea);
    guardarTareas(tareasActualizadas);
}

//Función para eliminar una tarea cargada desde un JSON
/**
 * 
 * @param {*} idTarea 
 */
function eliminarTareaJSON(idTarea) {
    const tareasJSON = cargarTareasJSON();
    const tareasActualizadasJSON = tareasJSON.filter(tarea => tarea.id !== idTarea);
    guardarTareasJSON(tareasActualizadasJSON);
}

//Función para eliminar una categoría de la lista
/**
 * 
 * @param {*} nomCategoria 
 */
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