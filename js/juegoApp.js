carmenSandiegoApp.controller('JuegoCtrl', function (Juego, Villanos, OrdenDeArresto, Viajar) {
	var self = this;

    self.data = null;

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
    this.emitirOrden = function() {
        OrdenDeArresto.save(this.orden, function(data) {
            self.notificarMensaje('Orden Emitida!');
            self.orden =null;
        }, errorHandler);
    };
    /////////////////////////////
    ///// Parte de viajar /////
    this.emitirOrden = function() {
        Viajar.save(this.viaje, function(data) {
            self.notificarMensaje('Viaje echo!');
            self.setPaisesFallidos();
            self.viaje = null;
        }, errorHandler);
    };
    ///////////////////////////    

    self.paisAnterior =null;

    this.paisAnterior = function(){
    	if(self.data.paisesVisitados.length < 1){
    		this.paisAnterior = "Ninguno";
    	}else{
    		this.paisAnterior = self.data.paisesVisitados[self.data.paisesVisitados.length-1];
    	}
    };

    self.paisesFallidos = [];

    this.setPaisesFallidos = function(){
    	if(self.data.paisesFallidos.length > 0){
    		self.paisesFallidos = self.data.paisesFallidos;
    	}else{
            self.paisesFallidos.push("Ninguno");
        }
    };
    
    // FEEDBACK & ERRORES
    this.msgs = [];
    this.notificarMensaje = function(mensaje) {
        this.msgs.push(mensaje);
        this.notificar(this.msgs);
    };

    this.errors = [];
    this.notificarError = function(mensaje) {
        this.errors.push(mensaje);
        this.notificar(this.errors);
    };

    this.notificar = function(mensajes) {
        $timeout(function() {
            while (mensajes.length > 0) mensajes.pop();
        }, 3000);
    };
    
});