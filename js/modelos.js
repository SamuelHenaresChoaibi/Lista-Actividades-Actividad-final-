class Task {
    constructor(id, titulo, descripcion, fecha, categoria, prioridad, realizada) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.categoria = categoria;
        this.prioridad = prioridad;
        this.realizada = realizada;
    }
    
    marcarComoRealizada() {
        this.realizada = true;
    }
}

class Category{
    constructor(nombre, color){
        this.nombre = nombre;
        this.color = color;
    }
}