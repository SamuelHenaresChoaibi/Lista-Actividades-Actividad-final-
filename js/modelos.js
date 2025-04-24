class Tarea {
    constructor(id, titulo, descripcio, data, categoria, prioritat, realitzada) {
        this.id = id;
        this.titulo = titulo;
        this.descripcio = descripcio;
        this.data = data;
        this.categoria = categoria;
        this.prioritat = prioritat;
        this.realitzada = realitzada;
    }
    
    marcarComoRealizada() {
        this.realitzada = true;
    }
}

class Categoria {
    constructor(id, nom, color){
        this.id = id;
        this.nom = nom;
        this.color = color;
    }
}