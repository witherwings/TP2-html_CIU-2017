carmenSandiegoApp.controller('PaisesCtrl', function (Paises) {
	'use strict';

	var self = this;

	self.paises = [];
    self.places = ["Embajada", "Banco", "Club", "Biblioteca"];
    self.creating = false;

	function errorHandler(error) {
        self.notifyError(error.data);
    }

	this.updateList = function() {
        Paises.query(function(data) {
            self.paises = data;
        }, errorHandler);
    };
    
    this.updateList();

    // AGREGAR
    this.createCountry = function() {
        Paises.save(this.newCountry, function(data) {
            self.messageNotify('Pais agregado con id:' + data.id);
            self.updateList();
            self.newCountry = null;
        }, errorHandler);
    };

    // ELIMINAR
    this.deleteCountryById = function(pais) {
        var mensaje = "¿Está seguro de eliminar: '" + pais.name + "'?";
        bootbox.confirm(mensaje, function(confirma) {
            if (confirma) {
                Paises.remove(pais, function() {
                    self.messageNotify('Pais eliminado!');
                    self.updateList();
                }, errorHandler);
                //Paises.delete('//localhost:9000/paises/' + pais.id);
            }
        });
    }; 

    // NUEVO PAIS
    this.newPais = function() {
        var newc = {
            "id": 999,
            "name": "Nombre",
            "features": [],
            "connectedCountries": [],
            "places": [] 
        };
        this.paisSeleccionado = newc;
        this.creating = true;
    };
    
    // VER DETALLE
    this.paisSeleccionado = null;

    this.verDetallePais = function(id) {
        //this.paisSeleccionado = pais;
        this.paisSeleccionado = Paises.get({},{'id': id});
    };

    // MODIFICAR
    this.aceptar = function() {
        if (!this.creating) {
            Paises.remove(this.paisSeleccionado, function() {
                self.messageNotify('Pais eliminado!');
                self.updateList();
            }, errorHandler);
        }
        this.newCountry = this.paisSeleccionado;
        this.createCountry();
    };

    // QUITAR FEATURE
    this.removeFeature = function(feature) {
        var temp = new Array();   
        for ( var i = 0; i < this.paisSeleccionado.features.length; i++ ) {
            if( this.paisSeleccionado.features[i] != feature ) {
                temp.push(this.paisSeleccionado.features[i]);
            }
        }
        this.paisSeleccionado.features = temp;
    };

    // AGREGAR FEATURE
    this.new_feature = "";

    this.addFeature = function() {
        this.paisSeleccionado.features.push(this.new_feature);
    };

    // QUITAR CONEXION
    this.removeConnection = function(conn) {
        var temp = new Array();   
        for ( var i = 0; i < this.paisSeleccionado.connectedCountries.length; i++ ) {
            if( this.paisSeleccionado.connectedCountries[i] != conn ) {
                temp.push(this.paisSeleccionado.connectedCountries[i]);
            }
        }
        this.paisSeleccionado.connectedCountries = temp;
    }

    // AGREGAR CONEXION
    this.selectedConn = this.paises[0];

    this.addConnection = function() {
        this.paisSeleccionado.connectedCountries.push(this.selectedConn);
    }

    // QUITAR LUGAR
    this.removePlace = function(place) {
        var temp = new Array();   
        for ( var i = 0; i < this.paisSeleccionado.places.length; i++ ) {
            if( this.paisSeleccionado.places[i] != place ) {
                temp.push(this.paisSeleccionado.places[i]);
            }
        }
        this.paisSeleccionado.places = temp;
    }

    // AGREGAR LUGAR
    this.selectedPlace = "";
    this.addPlace = function() {
        this.paisSeleccionado.places.push(this.selectedPlace);
    }

     // FEEDBACK & ERRORES
    this.msgs = [];
    this.messageNotify = function(mensaje) {
        this.msgs.push(mensaje);
        this.notify(this.msgs);
    };

    this.errors = [];
    this.notifyError = function(mensaje) {
        this.errors.push(mensaje);
        this.notify(this.errors);
    };

    this.notify = function(mensajes) {
        $timeout(function() {
            while (mensajes.length > 0) mensajes.pop();
        }, 3000);
    };

});
