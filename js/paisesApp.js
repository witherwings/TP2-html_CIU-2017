carmenSandiegoApp.controller('PaisesCtrl', function (Paises) {
	'use strict';

	var self = this;

	self.paises = [];
    self.places = ["Embajada", "Banco", "Club", "Biblioteca"];
    self.creating = false;
    this.paisSeleccionado = null;

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
    this.verDetallePais = function(id) {
        //this.paisSeleccionado = pais;
        this.paisSeleccionado = Paises.get({},{'id': id});
    };

    // MODIFICAR
    // TODO: cambiar por metodo PUT
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
        this.paisSeleccionado.features = 
            this.arrayWithOut(this.paisSeleccionado.features, feature);
    };

    // AGREGAR FEATURE
    this.new_feature = "";
    this.addFeature = function() {
        this.paisSeleccionado.features.push(this.new_feature);
    };

    // QUITAR CONEXION
    this.removeConnection = function(conn) {
        this.paisSeleccionado.connectedCountries = 
            this.arrayWithOut(this.paisSeleccionado.connectedCountries, conn);
    }

    // AGREGAR CONEXION
    this.selectedConn = this.paises[0];
    this.addConnection = function() {
        this.paisSeleccionado.connectedCountries.push(this.selectedConn);
    }

    // QUITAR LUGAR
    this.removePlace = function(place) {
        this.paisSeleccionado.places = 
            this.arrayWithOut(this.paisSeleccionado.places, place);
    }

    this.arrayWithOut = function(arr, elemToRemove) {
        var temp = new Array();
        arr.forEach(function(elem) {
            if (elem != elemToRemove) {
                temp.push(elem);
            }
        });
        return temp;
    }

    // AGREGAR LUGAR
    this.selectedPlace = "";
    this.addPlace = function() {
        this.paisSeleccionado.places.push(this.selectedPlace);
    }

     // FEEDBACK & ERRORES
    this.msgs = [];
    this.messageNotify = function(mensaje) {
        bootbox.alert(mensaje);
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
