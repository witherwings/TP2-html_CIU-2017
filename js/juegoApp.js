carmenSandiegoApp.controller('JuegoCtrl', function (Juego) {
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
    
});