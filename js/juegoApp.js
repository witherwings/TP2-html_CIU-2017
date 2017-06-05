carmenSandiegoApp.controller('JuegoCtrl', function (Juego, Villanos, OrdenDeArresto, Viajar) {
	var self = this;

    self.data = [];

    function errorHandler(error) {
        self.notifyError(error.data);
    }

	this.updateData = function() {
        Juego.save(function(data) {
            self.data = data;
        }, errorHandler);
    };

    this.updateData();

  	///// Parte de villanos /////
    self.villanos = [];

    this.updateVillains = function() {
        Villanos.query(function(data) {
            self.villanos = data;
        }, errorHandler);
    };
    this.updateVillains();
    /////////////////////////////
    ///// Parte de orden de arresto /////
    self.orden = null;
    self.villanoSeleccionado = null;
    self.villanoConOrden = { name : "Nadie" };

    this.emitirOrden = function() {
    	var ordenCreada = {villanoId: self.villanoSeleccionado.id, casoId: self.data.id};
        self.orden = OrdenDeArresto.save(ordenCreada);
        self.villanoConOrden = self.villanoSeleccionado;
    };
    /////////////////////////////    

    this.paisAnterior =null;

    this.paisAnterior = function(){
    	if(self.data.paisesVisitados.length < 1){
    		this.paisAnterior = "Ninguno";
    	}else{
    		this.paisAnterior = self.data.paisesVisitados[self.data.paisesVisitados.length-1];
    	}
    };

    this.paisesFallidos = [];

    this.setPaisesFallidos = function(){
    	if(self.data.paisesFallidos.length < 1){
    		this.paisesFallidos.push("Ninguno");
    	}else{
    		this.paisesFallidos = self.data.paisesFallidos;
    	}
    };

    ///// Parte de viajar /////
    this.viajar = function(paisId){
        var viaje = {destinoId: paisId, casoId: self.data.id};
        self.data = Viajar.save(viaje);
    };
    ////////////////////////////////////
    
});