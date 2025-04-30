class Tarea {
    constructor(id, titol, descripcio, data, categoria, prioritat, realitzada) {
        this.id = id;
        this.titol = titol;
        this.descripcio = descripcio;
        this.data = data;
        this.categoria = {
            nom: categoria.nom,
            color: categoria.color
        };
        this.prioritat = prioritat;
        this.realitzada = realitzada;
    }
    
    marcarComoRealizada() {
        this.realitzada = true;
    }
}

class Categoria {
    constructor(nom, color){
        this.nom = nom;
        this.color = color;
    }
}