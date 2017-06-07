carmenSandiegoApp.controller('JuegoCtrl', function (Juego, Villanos, OrdenDeArresto, Viajar, Paises, Pista, $timeout) {
	
	var self = this;
    
	self.data = null;
    self.villanos = [];
    self.orden = null;
    self.paisesVisitados = [];
    self.paisesFallidos = [];
    self.paisAnterior = $(self.paisesVisitados).last();

    function errorHandler(error) {
        self.notifyError(error.data);
    }

	self.startGame = function() {
        Juego.save(function(data) {
            self.data = data;
        }, errorHandler);
    };
    
    self.getVillains = function() {
        Villanos.query(function(data) {
            self.villanos = data;
        }, errorHandler);
    };

    self.startGame();
    self.getVillains();

      
    ///// Parte de orden de arresto /////
    self.emitirOrden = function(villano) {
    	self.orden = {villano: villano, casoId: self.data.id}
        OrdenDeArresto.save({"villanoId": villano.id, "casoId": self.data.id }, function(data) {
            self.notificarMensaje('Orden Emitida!');
        }, errorHandler);
    };

    self.mensajeDeOrden = function(){
        var msg = "No se emitio orden aun.";
        if(self.orden != null){
            msg = "Se emitio orden para " + self.orden.villano.name;
        }
        return msg;
    };  

    self.viajar = function(selectedCountry){	
        Viajar.save({"destinoId": selectedCountry.id, "casoId": self.data.id}, function(data){
            self.paisAnterior = self.data.pais;
            self.paisesVisitados.push(selectedCountry);
            self.data = data;
            self.notificarMensaje('Viaje realizado!');
        });
    };

    self.volver = function(){
        self.paisesFallidos.push(self.data.pais);
        self.paisesVisitados.pop();
        
        Viajar.save({"destinoId": self.paisAnterior.id, "casoId": self.data.id}, function(data){   
        	self.data = data;
            //self.data.pais = Paises.get({ id: self.data.pais.id});
        });
    };
   
    self.setPaisesFallidos = function(){
    	if(self.data.paisesFallidos.length > 0){
    		self.paisesFallidos = self.data.paisesFallidos;
    	}else{
            self.paisesFallidos.push("Ninguno");
        }
    };

    self.obtenerPista = function(lugar){
        Pista.query({place: lugar, caseID: self.data.id},{}, function(data) {
            	alert(data.pista);
        }, errorHandler);
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