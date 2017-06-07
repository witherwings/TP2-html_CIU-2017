carmenSandiegoApp.controller('JuegoCtrl', function (Juego, Villanos, OrdenDeArresto, Viajar, Paises, Pista) {
	var self = this;

    self.data = null;

    self.orden = {villano:null, casoId:""};

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
    this.emitirOrden = function(villano) {
        self.orden.villano = villano;
        self.orden.casoId = self.data.id;
        OrdenDeArresto.save({"villanoId": villano.id, "casoId": self.data.id }, function(data) {
            self.notificarMensaje('Orden Emitida!');
            self.orden =null;
        }, errorHandler);
    };

    this.mensajeDeOrden = function(){
        var msg = "No se emitio orden aun.";
        if(self.orden.villano !== null){
            msg = "Se emitio orden para " + self.orden.villano.name;
        }
        return msg;
    };
    /////////////////////////////
    ///// Parte de viajar /////
    // this.emitirOrden = function() {
    //     Viajar.save(this.viaje, function(data) {
    //         self.notificarMensaje('Viaje echo!');
    //         self.setPaisesFallidos();
    //         self.viaje = null;
    //     }, errorHandler);
    // };
    ///////////////////////////    

    self.paisAnterior =null;
    
    // this.emitirOrden = function() {
    //     Viajar.save(this.viaje, function(data) {
    //         self.notificarMensaje('Viaje echo!');
    //         self.setPaisesFallidos();
    //         self.viaje = null;
    //     }, errorHandler);
    // };

    self.paisesFallidos = [];

    this.viajar = function(selectedCountry){
//    	if(self.data.paisesVisitados.length < 1){
//    		this.paisAnterior = "Ninguno";
//    	}else{
//    		this.paisAnterior = self.data.paisesVisitados[self.data.paisesVisitados.length-1];
//    	}
    	
        Viajar.save({"destinoId": selectedCountry.id, "casoId": self.data.id}, function(data){
            self.paisAnterior = self.data.pais;     
            this.data = data;
            self.data.pais = Paises.get({ id: selectedCountry.id});
            self.notificarMensaje('Viaje realizado!');
            self.setPaisesFallidos();
            self.viaje = null;
        });
    };

    this.volver = function(){
        this.paisesFallidos.push(self.data.pais);
        self.data.pais = self.paisAnterior;
        self.paisAnterior = null;
    };
   
    this.setPaisesFallidos = function(){
    	if(self.data.paisesFallidos.length > 0){
    		self.paisesFallidos = self.data.paisesFallidos;
    	}else{
            self.paisesFallidos.push("Ninguno");
        }
    };

    this.obtenerPista = function(lugar){
        Pista.query({place: lugar, caseID: self.data.id},{}, function(data) {
            // var str = "";
            // for (var i = 0; i < data.length; i++) {
            //     str = str + data[i];
            // }
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